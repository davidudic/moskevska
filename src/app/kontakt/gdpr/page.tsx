import React from 'react';
import Layout from '@/components/layout/Layout';
import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'GDPR - Ochrana osobních údajů | Chirurgická ambulance Moskevská',
  description: 'Informace o zpracování osobních údajů v souladu s nařízením GDPR. Chirurgická ambulance Moskevská, Liberec.',
  keywords: 'GDPR, ochrana osobních údajů, zpracování údajů, soukromí, ambulance Liberec',
  alternates: {
    canonical: 'https://chirurgie-moskevska.cz/kontakt/gdpr',
  },
  openGraph: {
    title: 'GDPR - Ochrana osobních údajů | Chirurgická ambulance Moskevská',
    description: 'Informace o zpracování osobních údajů v souladu s GDPR.',
    url: 'https://chirurgie-moskevska.cz/kontakt/gdpr',
  },
};

export default function GDPRPage() {
  return (
    <Layout>
      <div className={styles.gdprPage}>
        <div className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>GDPR - Ochrana osobních údajů</h1>
              <p className={styles.heroSubtitle}>
                Informace o zpracování a ochraně vašich osobních údajů
              </p>
            </div>
          </div>
        </div>
        
        <div className="container">
          <section className={styles.contentSection}>
            <div className={styles.placeholder}>
              <p>Obsah bude doplněn...</p>
              <p>Zde budou umístěny informace o zpracování osobních údajů v souladu s GDPR.</p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

