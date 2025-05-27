'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './login.module.css';
import { FaLock, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/admin/ordinace';

  // Ověř, zda už není přihlášen
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check', {
          cache: 'no-store' // Disable cache pro debug
        });
        const data = await response.json();
        if (data.authenticated) {
          router.push(returnUrl);
        }
      } catch (error) {
        console.error('Chyba při ověřování stavu přihlášení:', error);
      }
    };
    
    checkAuth();
  }, [router, returnUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
        cache: 'no-store', // Disable cache pro debug
      });

      const data = await response.json();
      console.log('Login response:', data); // DEBUG

      if (data.success) {
        console.log('Login successful, redirecting to:', returnUrl); // DEBUG
        // Malé zpoždění, aby se cookie stihlo nastavit
        setTimeout(() => {
          window.location.href = returnUrl;
        }, 100);
      } else {
        console.log('Login failed:', data.error); // DEBUG
        setError(data.error || 'Přihlášení se nezdařilo');
      }
    } catch (error) {
      setError('Nepodařilo se připojit k serveru');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <div className={styles.logoContainer}>
            <FaLock className={styles.lockIcon} />
          </div>
          <h1 className={styles.title}>Admin přihlášení</h1>
          <p className={styles.subtitle}>Zadejte heslo pro přístup do administrace</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Heslo
            </label>
            <div className={styles.passwordInputContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.passwordInput}
                placeholder="Zadejte admin heslo"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.togglePasswordBtn}
                disabled={loading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              <FaLock className={styles.errorIcon} />
              {error}
            </div>
          )}

          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading || !password.trim()}
          >
            {loading ? (
              <>
                <FaSpinner className={styles.spinner} />
                Přihlašuji...
              </>
            ) : (
              'Přihlásit se'
            )}
          </button>
        </form>

        <div className={styles.loginFooter}>
          <p className={styles.footerText}>
            Tento systém je chráněn. Neoprávněný přístup je zakázán.
          </p>
        </div>
      </div>
    </div>
  );
}