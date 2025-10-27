import React from 'react';
import Layout from '@/components/layout/Layout';
import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Formuláře | Chirurgická ambulance Moskevská',
  description: 'Stáhněte si potřebné formuláře pro návštěvu chirurgické ambulance Moskevská v Liberci.',
  keywords: 'formuláře, dokumenty, potvrzení, chirurgická ambulance, Liberec',
  alternates: {
    canonical: 'https://chirurgie-moskevska.cz/kontakt/formulare',
  },
  openGraph: {
    title: 'Formuláře | Chirurgická ambulance Moskevská',
    description: 'Stáhněte si potřebné formuláře pro návštěvu ambulance.',
    url: 'https://chirurgie-moskevska.cz/kontakt/formulare',
  },
};

export default function FormularePage() {
  return (
    <Layout>
      <div className={styles.formularePage}>
        <div className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Formuláře a dokumenty</h1>
              <p className={styles.heroSubtitle}>
                Stáhněte si potřebné formuláře a dokumenty
              </p>
            </div>
          </div>
        </div>
        
        <div className="container">
          <section className={styles.contentSection}>
            <div className={styles.placeholder}>
              <p>Obsah bude doplněn...</p>
              <p>Zde budou umístěny formuláře a dokumenty ke stažení.</p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

