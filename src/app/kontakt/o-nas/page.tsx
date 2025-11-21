import React from 'react';
import Layout from '@/components/layout/Layout';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { FaCheckCircle, FaCalendarAlt, FaPhone } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'O nás | Chirurgická ambulance Moskevská - Liberec',
  description: 'Poznejte náš tým zkušených lékařů a zdravotních sester. Chirurgická ambulance Moskevská v Liberci pod vedením MUDr. Jaroslava Chaluše.',
  keywords: 'o nás, chirurgická ambulance, MUDr. Chaluš, tým lékařů, Liberec, Moskevská',
  alternates: {
    canonical: 'https://chirurgie-moskevska.cz/kontakt/o-nas',
  },
  openGraph: {
    title: 'O nás | Chirurgická ambulance Moskevská - Liberec',
    description: 'Poznejte náš tým zkušených lékařů a zdravotních sester.',
    url: 'https://chirurgie-moskevska.cz/kontakt/o-nas',
  },
};

export default function ONasPage() {
  return (
    <Layout>
      <div className={styles.onasPage}>
        {/* Hero sekce */}
        <div className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>O nás</h1>
              <p className={styles.heroSubtitle}>
                Profesionální péče s lidským přístupem v srdci Liberce
              </p>
            </div>
          </div>
        </div>

        {/* Obsah */}
        <div className="container">
          {/* Hlavní info sekce */}
          <section className={styles.infoSection}>
            <div className={styles.infoContent}>
              <h2 className={styles.sectionTitle}>Naše ambulance</h2>
              <p>
                Od svého založení v roce 2021 se náš tým snaží poskytovat tu nejlepší péči všem našim pacientům. 
                Nabízíme široké spektrum služeb od konzultací přes malé chirurgické výkony až po finální péči 
                estetického zaměření.
              </p>
              <p>
                Ve spolupráci s blízkými ambulancemi kožních specialistů se zaměřujeme na odstraňování všech 
                nebezpečných kožních útvarů a dbáme vždy na dobrý estetický výsledek.
              </p>

              <div className={styles.valuesList}>
                <h3>Co nás charakterizuje:</h3>
                <div className={styles.valueItem}>
                  <FaCheckCircle className={styles.valueIcon} />
                  <span>Profesionální péče s lidským přístupem</span>
                </div>
                <div className={styles.valueItem}>
                  <FaCheckCircle className={styles.valueIcon} />
                  <span>Moderní vybavení a technologie</span>
                </div>
                <div className={styles.valueItem}>
                  <FaCheckCircle className={styles.valueIcon} />
                  <span>Zkušený tým lékařů a sester</span>
                </div>
                <div className={styles.valueItem}>
                  <FaCheckCircle className={styles.valueIcon} />
                  <span>Široké spektrum služeb na jednom místě</span>
                </div>
                <div className={styles.valueItem}>
                  <FaCheckCircle className={styles.valueIcon} />
                  <span>Individuální přístup ke každému pacientovi</span>
                </div>
              </div>
            </div>
            <div className={styles.infoImage}>
              <Image 
                src="/images/budova.webp" 
                alt="Budova chirurgické ambulance Moskevská v Liberci" 
                width={500} 
                height={400} 
                className={styles.sectionImage}
              />
            </div>
          </section>

          {/* Hlavní lékař */}
          <section className={styles.mainDoctorSection}>
            <h2 className={styles.sectionTitle}>Hlavní lékař</h2>
            <div className={styles.mainDoctorCard}>
              <div className={styles.doctorImageWrapper}>
                <Image 
                  src="/images/chalus.webp" 
                  alt="MUDr. Jaroslav Chaluš - hlavní lékař" 
                  width={200} 
                  height={200} 
                  className={styles.doctorImage}
                />
              </div>
              <div className={styles.doctorInfo}>
                <h3 className={styles.doctorName}>MUDr. Jaroslav Chaluš</h3>
                <p className={styles.doctorPosition}>Hlavní lékař, chirurg</p>
                <p className={styles.doctorDescription}>
                  MUDr. Jaroslav Chaluš je zkušený chirurg s dlouholetou praxí. Specializuje se na komplexní 
                  chirurgické zákroky a vede tým naší ambulance s důrazem na kvalitu péče a individuální 
                  přístup ke každému pacientovi.
                </p>
                <div className={styles.doctorDetails}>
                  <div className={styles.detailItem}>
                    <strong>Vzdělání:</strong> Lékařská fakulta UK v Praze
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Praxe:</strong> 35+ let praxe
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Specializace:</strong> Chirurgie, dermatochirurgie
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Více o týmu */}
          <section className={styles.teamInfoSection}>
            <h2 className={styles.sectionTitle}>Náš tým</h2>
            <p className={styles.teamText}>
              Kromě hlavního lékaře naši ambulanci tvoří tým zkušených lékařů různých specializací a 
              profesionálních zdravotních sester. Každý člen týmu přispívá svými znalostmi a zkušenostmi 
              k poskytování komplexní péče na nejvyšší úrovni.
            </p>
            <div className={styles.teamCta}>
              <Link href="/kontakt" className={styles.teamButton}>
                Poznejte celý náš tým
              </Link>
            </div>
          </section>

          {/* CTA sekce */}
          <section className={styles.ctaSection}>
            <div className={styles.ctaCard}>
              <h2 className={styles.ctaTitle}>Máte dotazy nebo zájem o naše služby?</h2>
              <p className={styles.ctaText}>
                Rádi vám poskytneme více informací a odpovíme na vaše otázky. Kontaktujte nás telefonicky 
                nebo se objednejte online.
              </p>
              <div className={styles.ctaButtons}>
                <Link 
                  href="https://v3.smartmedix.net/?reg=28530801" 
                  className={styles.primaryButton}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaCalendarAlt />
                  <span>Objednat se</span>
                </Link>
                <a 
                  href="tel:+420703611411" 
                  className={styles.secondaryButton}
                >
                  <FaPhone />
                  <span>+420 703 611 411</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
