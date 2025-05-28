'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './alert.module.css';
import { 
  FaExclamationTriangle, 
  FaSave, 
  FaSignOutAlt, 
  FaSpinner, 
  FaCheck, 
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaTimes
} from 'react-icons/fa';

interface AlertData {
  enabled: boolean;
  title: string;
  message: string;
  lastUpdated: string;
  updatedBy: string;
}

const AdminAlert: React.FC = () => {
  const [data, setData] = useState<AlertData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Zkontroluj přihlášení při načtení
  useEffect(() => {
    console.log('Admin alert page: Starting auth check...');
    const checkAuth = async () => {
      try {
        console.log('Admin alert page: Fetching /api/auth/check...');
        const response = await fetch('/api/auth/check', {
          cache: 'no-store'
        });
        console.log('Admin alert page: Auth check response status:', response.status);
        const result = await response.json();
        console.log('Admin alert page: Auth check result:', result);
        
        if (!result.authenticated) {
          console.log('Admin alert page: Not authenticated, redirecting to login...');
          router.push('/admin/login?returnUrl=/admin/alert');
          return;
        }
        
        console.log('Admin alert page: Authenticated, setting state...');
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Admin alert page: Auth check error:', error);
        router.push('/admin/login?returnUrl=/admin/alert');
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
    console.log('Admin alert page: Loading alert data...');
    try {
      const response = await fetch('/api/alert', {
        cache: 'no-store'
      });
      console.log('Admin alert page: Alert API response status:', response.status);
      const result = await response.json();
      console.log('Admin alert page: Alert API result:', result);
      
      if (result.success) {
        console.log('Admin alert page: Setting alert data...');
        setData(result.data);
      } else {
        console.error('Admin alert page: Failed to load alert data:', result.error);
        setMessage({ type: 'error', text: 'Nepodařilo se načíst data' });
      }
    } catch (error) {
      console.error('Admin alert page: Alert API error:', error);
      setMessage({ type: 'error', text: 'Chyba při načítání dat' });
    } finally {
      console.log('Admin alert page: Setting loading to false...');
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data) return;
    
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch('/api/alert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        cache: 'no-store',
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: 'success', text: 'Alert byl úspěšně uložen' });
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

  const updateData = (field: keyof AlertData, value: string | boolean) => {
    if (!data) return;
    
    setData({
      ...data,
      [field]: value
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
            <FaExclamationTriangle className={styles.headerIcon} />
            <div>
              <h1 className={styles.title}>Správa alertu</h1>
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
              onClick={() => router.push('/admin/ordinace')}
              className={styles.backButton}
              title="Zpět na ordinace"
            >
              <FaArrowLeft />
              Ordinace
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
            <h2>Úprava alertu</h2>
            <p>Nastavte modální upozornění, které se zobrazí návštěvníkům webu</p>
          </div>

          <div className={styles.alertCard}>
            <div className={styles.enableSection}>
              <label className={styles.enableToggle}>
                <input
                  type="checkbox"
                  checked={data.enabled}
                  onChange={(e) => updateData('enabled', e.target.checked)}
                />
                <span className={styles.toggleSlider}></span>
                Alert je {data.enabled ? 'AKTIVNÍ' : 'VYPNUTÝ'}
              </label>
            </div>

            <div className={styles.inputGroup}>
              <label>Nadpis alertu</label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => updateData('title', e.target.value)}
                placeholder="POZOR - ZMĚNA ORDINAČNÍ DOBY"
                disabled={!data.enabled}
                maxLength={100}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Text zprávy</label>
              <textarea
                value={data.message}
                onChange={(e) => updateData('message', e.target.value)}
                placeholder="V pátek 31.5. bude ordinace zavřená z důvodu školení."
                disabled={!data.enabled}
                maxLength={500}
              />
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
                    Uložit alert
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {previewMode && (
          <div className={styles.previewContainer}>
            <h3>Náhled alertu na webu</h3>
            <div className={`${styles.alertPreview} ${!data.enabled ? styles.disabledPreview : ''}`}>
              <div className={styles.alertPreviewHeader}>
                <h4 className={styles.alertPreviewTitle}>
                  {data.title || 'Nadpis alertu'}
                </h4>
                <button className={styles.alertPreviewClose}>
                  <FaTimes />
                </button>
              </div>
              <div className={styles.alertPreviewBody}>
                <p className={styles.alertPreviewMessage}>
                  {data.message || 'Text zprávy alertu...'}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminAlert;