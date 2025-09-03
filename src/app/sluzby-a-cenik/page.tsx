import React from 'react';
import Layout from '@/components/layout/Layout';
import ServicesSection from '@/components/services/ServicesSection';
import LaserPriceList from '@/components/services/LaserPriceList';
import GiftVouchers from '@/components/services/GiftVouchers';
import styles from './page.module.css';

export const metadata = {
  title: 'Služby a ceník | Chirurgická ambulance Moskevská - Liberec',
  description: 'Komplexní ceník chirurgických služeb v Liberci. Laserová epilace, operace, konzultace, estetické zákroky. Transparentní ceny na Moskevské.',
  keywords: 'ceník chirurg Liberec, ceny laserová epilace, chirurgické služby ceník, Moskevská ambulance ceny',
  alternates: {
    canonical: 'https://chirurgie-moskevska.cz/sluzby-a-cenik',
  },
  openGraph: {
    title: 'Služby a ceník | Chirurgická ambulance Moskevská - Liberec',
    description: 'Transparentní ceník všech chirurgických služeb. Laserová epilace, operace, konzultace v Liberci.',
    url: 'https://chirurgie-moskevska.cz/sluzby-a-cenik',
    images: [
      {
        url: '/images/hero-background.webp',
        width: 1200,
        height: 630,
        alt: 'Služby a ceník chirurgické ambulance',
      },
    ],
  },
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