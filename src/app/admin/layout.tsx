'use client';

import React, { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import styles from './layout.module.css';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  
  // Kontrola, zda je uživatel přihlášen
  if (status === 'loading') {
    return <div className={styles.loading}>Načítání...</div>;
  }
  
  // Pokud uživatel není přihlášen, přesměruj na přihlašovací stránku
  // s výjimkou přihlašovací stránky samotné
  if (status === 'unauthenticated' && window.location.pathname !== '/admin/login') {
    redirect('/admin/login');
    return null;
  }
  
  // Nezobrazuj admin panel na přihlašovací stránce
  if (window.location.pathname === '/admin/login') {
    return <>{children}</>;
  }
  
  return (
    <div className={styles.adminLayout}>
      {/* Navigační panel pro admin sekci */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1 className={styles.sidebarTitle}>Admin Panel</h1>
        </div>
        
        <nav className={styles.navigation}>
          <Link href="/admin/dashboard" className={styles.navLink}>
            Dashboard
          </Link>
          <Link href="/admin/blog" className={styles.navLink}>
            Správa blogu
          </Link>
          <Link href="/admin/blog/new" className={styles.navLink}>
            Nový článek
          </Link>
          <Link href="/admin/categories" className={styles.navLink}>
            Kategorie
          </Link>
          <Link href="/" className={styles.navLink}>
            Zpět na web
          </Link>
        </nav>
        
        <div className={styles.userInfo}>
          {session?.user?.name && (
            <div className={styles.userName}>
              Přihlášen jako: <span>{session.user.name}</span>
            </div>
          )}
          <Link href="/api/auth/signout" className={styles.signOutButton}>
            Odhlásit se
          </Link>
        </div>
      </aside>
      
      {/* Obsah admin panelu */}
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
} 