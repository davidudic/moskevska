import React from 'react';
import Layout from '@/components/layout/Layout';
import GiftVouchers from '@/components/services/GiftVouchers';
import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Dárkové vouchery AKCE -30% | Chirurgická ambulance Moskevská',
  description: 'Dárkové vouchery se slevou 30% na laserovou epilaci, kosmetické výkony a další služby. Darujte zdraví a krásu svým blízkým. Chirurgická ambulance Moskevská, Liberec.',
  keywords: 'dárkové vouchery, dárkové poukazy, laserová epilace dárek, estetické služby, dárek na Vánoce, Liberec',
  alternates: {
    canonical: 'https://chirurgie-moskevska.cz/kontakt/darkove-vouchery',
  },
  openGraph: {
    title: 'Dárkové vouchery AKCE -30% | Chirurgická ambulance Moskevská',
    description: 'Darujte zdraví, krásu a sebedůvěru. Voucher se slevou 30% - ideální dárek na každou příležitost.',
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
                Darujte zdraví, krásu a sebedůvěru. Dárek, který opravdu potěší.
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

