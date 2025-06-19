import React from 'react';
import Layout from '@/components/layout/Layout';
import ServicesSection from '@/components/services/ServicesSection';
import LaserPriceList from '@/components/services/LaserPriceList';
import GiftVouchers from '@/components/services/GiftVouchers';
import styles from './page.module.css';

export const metadata = {
  title: 'Nabízené služby a ceník | Chirurgická ambulance',
  description: 'Kompletní nabídka našich služeb a aktuální ceník chirurgických zákroků, konzultací a laserových ošetření.',
};

export default function ServicesAndPricesPage() {
  return (
    <Layout>
      <div className={styles.pageContainer}>
        {/* Hero sekce */}
        <div className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Nabízené služby a ceník</h1>
              <p className={styles.heroSubtitle}>
                Jsme smluvním zařízením pro všechny zdravotní pojišťovny!
              </p>
            </div>
          </div>
        </div>

        {/* Obsah */}
        <div className="container">
          <div className={styles.pageContent}>
            <ServicesSection />
            <LaserPriceList />
            <GiftVouchers />
          </div>
        </div>
      </div>
    </Layout>
  );
}