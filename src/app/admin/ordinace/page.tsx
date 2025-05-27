'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './admin.module.css';
import { 
  FaClock, 
  FaSave, 
  FaSignOutAlt, 
  FaSpinner, 
  FaCheck, 
  FaExclamationTriangle,
  FaEye,
  FaEyeSlash,
  FaHome
} from 'react-icons/fa';

interface OrdinaceHour {
  id: number;
  day: string;
  morning: string;
  afternoon: string;
  note: string;
  active: boolean;
}

interface OrdinaceData {
  ordinacniHodiny: OrdinaceHour[];
  lastUpdated: string;
  updatedBy: string;
}

export default function AdminOrdinace() {
  const [data, setData] = useState<OrdinaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Zkontroluj přihlášení při načtení
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        const result = await response.json();
        
        if (!result.authenticated) {
          router.push('/admin/login?returnUrl=/admin/ordinace');
          return;
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Chyba při ověřování:', error);
        router.push('/admin/login?returnUrl=/admin/ordinace');
      }
    };
    
    checkAuth();
  }, [router]);

  // Načti data při načtení komponenty - pouze pokud je přihlášen
  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    try {
      const response = await fetch('/api/ordinace');
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      } else {
        setMessage({ type: 'error', text: 'Nepodařilo se načíst data' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Chyba při načítání dat' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data) return;
    
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch('/api/ordinace', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: 'success', text: 'Ordinační doba byla úspěšně uložena' });
        // Znovu načti data pro zobrazení aktuálního času aktualizace
        await loadData();
      } else {
        setMessage({ type: 'error', text: result.error || 'Nepodařilo se uložit data' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Chyba při ukládání dat' });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Chyba při odhlašování:', error);
    }
  };

  const updateHour = (id: number, field: keyof OrdinaceHour, value: string | boolean) => {
    if (!data) return;
    
    setData({
      ...data,
      ordinacniHodiny: data.ordinacniHodiny.map(hour =>
        hour.id === id ? { ...hour, [field]: value } : hour
      )
    });
  };

  if (!isAuthenticated || loading) {
    return (
      <div className={styles.loadingContainer}>
        <FaSpinner className={styles.spinner} />
        <p>{!isAuthenticated ? 'Ověřuji přihlášení...' : 'Načítám data...'}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.errorContainer}>
        <FaExclamationTriangle className={styles.errorIcon} />
        <p>Nepodařilo se načíst data</p>
        <button onClick={loadData} className={styles.retryButton}>
          Zkusit znovu
        </button>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <header className={styles.adminHeader}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <FaClock className={styles.headerIcon} />
            <div>
              <h1 className={styles.title}>Správa ordinační doby</h1>
              <p className={styles.subtitle}>
                Posledně aktualizováno: {new Date(data.lastUpdated).toLocaleString('cs-CZ')}
              </p>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className={styles.previewButton}
              title={previewMode ? 'Skrýt náhled' : 'Zobrazit náhled'}
            >
              {previewMode ? <FaEyeSlash /> : <FaEye />}
              {previewMode ? 'Skrýt náhled' : 'Náhled'}
            </button>
            <button
              onClick={() => router.push('/')}
              className={styles.homeButton}
              title="Přejít na web"
            >
              <FaHome />
              Web
            </button>
            <button
              onClick={handleLogout}
              className={styles.logoutButton}
              title="Odhlásit se"
            >
              <FaSignOutAlt />
              Odhlásit
            </button>
          </div>
        </div>
      </header>

      <main className={styles.adminMain}>
        {message && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.type === 'success' ? <FaCheck /> : <FaExclamationTriangle />}
            {message.text}
          </div>
        )}

        <div className={styles.editorContainer}>
          <div className={styles.editorHeader}>
            <h2>Úprava ordinačních hodin</h2>
            <p>Upravte ordinační hodiny pro každý den v týdnu</p>
          </div>

          <div className={styles.hoursGrid}>
            {data.ordinacniHodiny.map((hour) => (
              <div key={hour.id} className={styles.hourCard}>
                <div className={styles.dayHeader}>
                  <h3>{hour.day}</h3>
                  <label className={styles.activeToggle}>
                    <input
                      type="checkbox"
                      checked={hour.active}
                      onChange={(e) => updateHour(hour.id, 'active', e.target.checked)}
                    />
                    <span className={styles.toggleSlider}></span>
                    Aktivní
                  </label>
                </div>

                <div className={styles.timeInputs}>
                  <div className={styles.inputGroup}>
                    <label>Dopoledne</label>
                    <input
                      type="text"
                      value={hour.morning}
                      onChange={(e) => updateHour(hour.id, 'morning', e.target.value)}
                      placeholder="např. 8:00 - 12:00"
                      disabled={!hour.active}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Odpoledne</label>
                    <input
                      type="text"
                      value={hour.afternoon}
                      onChange={(e) => updateHour(hour.id, 'afternoon', e.target.value)}
                      placeholder="např. 13:00 - 18:00"
                      disabled={!hour.active}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Poznámka</label>
                  <textarea
                    value={hour.note}
                    onChange={(e) => updateHour(hour.id, 'note', e.target.value)}
                    placeholder="Doplňující informace..."
                    rows={2}
                    disabled={!hour.active}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.saveSection}>
            <button
              onClick={handleSave}
              disabled={saving}
              className={styles.saveButton}
            >
              {saving ? (
                <>
                  <FaSpinner className={styles.spinner} />
                  Ukládám...
                </>
              ) : (
                <>
                  <FaSave />
                  Uložit změny
                </>
              )}
            </button>
          </div>
        </div>

        {previewMode && (
          <div className={styles.previewContainer}>
            <h3>Náhled pro web</h3>
            <div className={styles.previewTable}>
              <div className={styles.previewHeader}>
                <div>Den</div>
                <div>Dopoledne</div>
                <div>Odpoledne</div>
                <div>Poznámka</div>
              </div>
              {data.ordinacniHodiny
                .filter(hour => hour.active)
                .map((hour) => (
                <div key={hour.id} className={styles.previewRow}>
                  <div className={styles.previewDay}>{hour.day}</div>
                  <div className={styles.previewTime}>{hour.morning}</div>
                  <div className={styles.previewTime}>{hour.afternoon}</div>
                  <div className={styles.previewNote}>{hour.note}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}