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
        <div className="container">
          <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>NABÍZENÉ SLUŽBY A CENÍK</h1>
            <p className={styles.pageSubtitle}>
              Jsme smluvním zařízením pro všechny zdravotní pojišťovny!
            </p>
          </header>
          
          <main>
            <ServicesSection />
            <LaserPriceList />
            <GiftVouchers />
          </main>
        </div>
      </div>
    </Layout>
  );
}