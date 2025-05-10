import React from 'react';
import Layout from '@/components/layout/Layout';
import styles from './page.module.css';
import Link from 'next/link';
import {FaCalendarAlt, FaInfoCircle, FaMapMarkerAlt, FaPhone, FaChevronRight } from 'react-icons/fa';

export const metadata = {
  title: 'Ordinační doba | Chirurgická ambulance',
  description: 'Detailní informace o ordinační době a rozvrhu lékařů. Zjistěte, kdy můžete navštívit naši chirurgickou ambulanci v Liberci.',
};

// Data ordinačních hodin - podrobněji než na homepage
const officeHours = [
  { 
    id: 1, 
    day: 'Pondělí', 
    morning: '8:00 - 12:00', 
    afternoon: '13:00 - 18:00', 
    note: 'Odpoledne pouze pro objednané pacienty'
  },
  { 
    id: 2, 
    day: 'Úterý', 
    morning: '8:00 - 12:00', 
    afternoon: '13:00 - 17:00', 
    note: 'Odpoledne stomická poradna (nutné objednání)'
  },
  { 
    id: 3, 
    day: 'Středa', 
    morning: '8:00 - 12:00', 
    afternoon: '13:00 - 18:00', 
    note: 'Odpoledne pouze pro objednané pacienty'
  },
  { 
    id: 4, 
    day: 'Čtvrtek', 
    morning: '8:00 - 12:00', 
    afternoon: '13:00 - 18:00', 
    note: 'Odpoledne pouze pro objednané pacienty'
  },
  { 
    id: 5, 
    day: 'Pátek', 
    morning: '8:00 - 12:00', 
    afternoon: 'Zavřeno', 
    note: 'Odpoledne není ordinační doba'
  },
  { 
    id: 6, 
    day: 'Sobota', 
    morning: 'Zavřeno', 
    afternoon: 'Zavřeno', 
    note: ''
  },
  { 
    id: 7, 
    day: 'Neděle', 
    morning: 'Zavřeno', 
    afternoon: 'Zavřeno', 
    note: ''
  },
];

// Removed doctors' schedule data as requested

export default function OfficeHoursPage() {
  return (
    <Layout>
      <div className={styles.officeHoursPage}>
        {/* Hero sekce */}
        <div className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Ordinační doba</h1>
              <p className={styles.heroSubtitle}>
                Kompletní informace o ordinační době a dostupnosti našich lékařů
              </p>
            </div>
          </div>
        </div>

        {/* Obsah */}
        <div className="container">
          <div className={styles.pageContent}>
            {/* Hlavní informace o ordinační době */}
            <section className={styles.mainHoursSection}>
              <h2 className={styles.sectionTitle}>Ordinační hodiny ambulance</h2>
              
              <div className={styles.hoursCard}>
                <div className={styles.hoursTable}>
                  <div className={styles.hoursHeader}>
                    <div style={{color: "#ffffff", fontWeight: 600}}>Den</div>
                    <div style={{color: "#ffffff", fontWeight: 600}}>Dopoledne</div>
                    <div style={{color: "#ffffff", fontWeight: 600}}>Odpoledne</div>
                    <div style={{color: "#ffffff", fontWeight: 600}}>Poznámka</div>
                  </div>
                  
                  {officeHours.map((item) => (
                    <div 
                      key={item.id} 
                      className={`${styles.hoursRow} ${
                        item.day === 'Sobota' || item.day === 'Neděle' 
                          ? styles.inactiveRow 
                          : ''
                      }`}
                    >
                      <div className={styles.dayColumn}>{item.day}</div>
                      <div className={styles.timeColumn} style={{color: item.morning === 'Zavřeno' ? '#999' : ''}}>{item.morning}</div>
                      <div className={styles.timeColumn} style={{color: item.afternoon === 'Zavřeno' ? '#999' : ''}}>{item.afternoon}</div>
                      <div className={styles.noteColumn}>{item.note}</div>
                      {item.note && <div className={styles.noteColumn}>{item.note}</div>}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={styles.infoBox}>
                <div className={styles.infoIcon}>
                  <FaInfoCircle />
                </div>
                <div className={styles.infoContent}>
                  <h3>Důležité informace</h3>
                  <ul>
                    <li>
                      Na odpolední ordinace je nutné se předem objednat telefonicky nebo online.
                    </li>
                    <li>
                      Pro akutní případy je vyhrazena dopolední doba, kdy přijímáme pacienty bez objednání.
                    </li>
                    <li>
                      Stomická poradna probíhá každé úterý odpoledne a je nutné se předem objednat.
                    </li>
                    <li>
                      V případě akutního problému mimo ordinační hodiny kontaktujte pohotovost v Krajské nemocnici Liberec.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Doctors' schedule section removed as requested */}

            {/* Jak se objednat */}
            <section className={styles.bookingSection}>
              <h2 className={styles.sectionTitle}>Jak se objednat</h2>
              
              <div className={styles.bookingOptions}>
                <div className={styles.bookingCard}>
                  <div className={styles.bookingIcon}>
                    <FaCalendarAlt />
                  </div>
                  <h3>Online rezervace</h3>
                  <p>
                    Nejpohodlnější způsob, jak se objednat. Vyberte si volný termín, 
                    lékaře a důvod návštěvy. Rezervaci lze provést 24 hodin denně.
                  </p>
                  <Link 
                    href="https://v3.smartmedix.net/?reg=28530801" 
                    className={styles.bookingButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Rezervovat online
                  </Link>
                </div>
                
                <div className={styles.bookingCard}>
                  <div className={styles.bookingIcon}>
                    <FaPhone />
                  </div>
                  <h3>Telefonické objednání</h3>
                  <p>
                    Zavolejte nám na číslo +420 703 611 411 v ordinačních hodinách 
                    a náš personál vám pomůže s výběrem vhodného termínu.
                  </p>
                  <a 
                    href="tel:+420703611411" 
                    className={styles.bookingButton}
                  >
                    Zavolat ihned
                  </a>
                </div>
                
                <div className={styles.bookingCard}>
                  <div className={styles.bookingIcon}>
                    <FaMapMarkerAlt />
                  </div>
                  <h3>Osobní návštěva</h3>
                  <p>
                    Přijďte k nám osobně během dopolední ordinační doby a naše 
                    zdravotní sestry vás zaregistrují na nejbližší volný termín.
                  </p>
                  <Link 
                    href="/kontakt" 
                    className={styles.bookingButton}
                  >
                    Zobrazit adresu
                  </Link>
                </div>
              </div>
            </section>

            {/* CTA sekce */}
            <section className={styles.ctaSection}>
              <div className={styles.ctaCard}>
                <h2 className={styles.ctaTitle}>Potřebujete navštívit lékaře?</h2>
                <p className={styles.ctaText}>
                  Objednejte se ještě dnes a my se o vás postaráme. V akutních případech 
                  nás navštivte bez objednání v dopoledních hodinách.
                </p>
                <div className={styles.ctaButtons}>
                  <Link 
                    href="https://v3.smartmedix.net/?reg=28530801" 
                    className={styles.primaryButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaCalendarAlt className={styles.buttonIcon} />
                    <span>Objednat se online</span>
                  </Link>
                  <Link href="/kontakt" className={styles.secondaryButton}>
                    <span>Kontaktovat ambulanci</span>
                    <FaChevronRight className={styles.buttonIcon} />
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}