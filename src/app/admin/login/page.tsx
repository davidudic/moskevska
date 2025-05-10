'use client';

import React, { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError('Nesprávné přihlašovací údaje');
        setIsLoading(false);
        return;
      }

      // Přesměrování na admin dashboard po úspěšném přihlášení
      router.push('/admin/dashboard');
      
    } catch (error) {
      console.error('Přihlášení selhalo', error);
      setError('Při přihlášení došlo k chybě. Zkuste to prosím znovu.');
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <Link href="/" className={styles.logoLink}>
          <h1 className={styles.logo}>Chirurgická ambulance</h1>
        </Link>
        <h2 className={styles.title}>Přihlášení do admin panelu</h2>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
              placeholder="Zadejte svůj email"
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Heslo</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
              placeholder="Zadejte své heslo"
            />
          </div>
          
          <button
            type="submit"
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? 'Přihlašování...' : 'Přihlásit se'}
          </button>
        </form>
        
        <div className={styles.backLink}>
          <Link href="/">
            ← Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    </div>
  );
} 