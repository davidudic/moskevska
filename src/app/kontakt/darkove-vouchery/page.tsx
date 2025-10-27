import React from 'react';
import Layout from '@/components/layout/Layout';
import GiftVouchers from '@/components/services/GiftVouchers';
import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Dárkové vouchery | Chirurgická ambulance Moskevská',
  description: 'Dárkové poukazy na služby chirurgické ambulance Moskevská v Liberci. Potěšte své blízké dárkem krásy a péče.',
  keywords: 'dárkové vouchery, dárkové poukazy, laserová epilace, estetické služby, Liberec',
  alternates: {
    canonical: 'https://chirurgie-moskevska.cz/kontakt/darkove-vouchery',
  },
  openGraph: {
    title: 'Dárkové vouchery | Chirurgická ambulance Moskevská',
    description: 'Dárkové poukazy na služby chirurgické ambulance. Potěšte své blízké.',
    url: 'https://chirurgie-moskevska.cz/kontakt/darkove-vouchery',
  },
};

export default function DarkoveVoucheryPage() {
  return (
    <Layout>
      <div className={styles.vouchersPage}>
        <div className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Dárkové vouchery</h1>
              <p className={styles.heroSubtitle}>
                Darujte krásu a péči svým blízkým
              </p>
            </div>
          </div>
        </div>
        
        <div className="container">
          <GiftVouchers />
        </div>
      </div>
    </Layout>
  );
}

