'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import styles from './page.module.css';
import Link from 'next/link';
import {FaCalendarAlt, FaInfoCircle, FaMapMarkerAlt, FaPhone, FaChevronRight } from 'react-icons/fa';

interface OrdinaceHour {
  id: number;
  day: string;
  morning: string;
  afternoon: string;
  note: string;
  active: boolean;
}

interface OrdinaceData {
  ordinacniHodiny: OrdinaceHour[];
  lastUpdated: string;
  updatedBy: string;
}

// Fallback data pro případ selhání API
const fallbackHours: OrdinaceHour[] = [
  { id: 1, day: 'Pondělí', morning: '8:00 - 12:00', afternoon: '13:00 - 18:00', note: 'Odpoledne pouze pro objednané pacienty', active: true },
  { id: 2, day: 'Úterý', morning: '8:00 - 12:00', afternoon: '13:00 - 17:00', note: 'Odpoledne stomická poradna (nutné objednání)', active: true },
  { id: 3, day: 'Středa', morning: '8:00 - 12:00', afternoon: '13:00 - 18:00', note: 'Odpoledne pouze pro objednané pacienty', active: true },
  { id: 4, day: 'Čtvrtek', morning: '8:00 - 12:00', afternoon: '13:00 - 18:00', note: 'Odpoledne pouze pro objednané pacienty', active: true },
  { id: 5, day: 'Pátek', morning: '8:00 - 12:00', afternoon: 'Zavřeno', note: '', active: true },
  { id: 6, day: 'Sobota', morning: 'Zavřeno', afternoon: 'Zavřeno', note: '', active: false },
  { id: 7, day: 'Neděle', morning: 'Zavřeno', afternoon: 'Zavřeno', note: '', active: false },
];

export default function OfficeHoursPage() {
  const [ordinaceData, setOrdinaceData] = useState<OrdinaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrdinaceData = async () => {
      try {
        const response = await fetch('/api/ordinace');
        const result = await response.json();
        
        if (result.success) {
          setOrdinaceData(result.data);
        } else {
          throw new Error(result.error || 'Nepodařilo se načíst data');
        }
      } catch (err) {
        console.error('Chyba při načítání ordinační doby:', err);
        setError('Nepodařilo se načíst aktuální ordinační dobu');
        
        // Použij fallback data
        setOrdinaceData({
          ordinacniHodiny: fallbackHours,
          lastUpdated: new Date().toISOString(),
          updatedBy: 'fallback'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrdinaceData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className={styles.officeHoursPage}>
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
          <div className="container">
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <p>Načítám ordinační dobu...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!ordinaceData) {
    return (
      <Layout>
        <div className={styles.officeHoursPage}>
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
          <div className="container">
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <p>Nepodařilo se načíst ordinační dobu</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

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
                  
                  {ordinaceData.ordinacniHodiny.map((item) => (
                    <div 
                      key={item.id} 
                      className={`${styles.hoursRow} ${
                        !item.active || item.morning === 'Zavřeno'
                          ? styles.inactiveRow 
                          : ''
                      }`}
                    >
                      <div className={styles.dayColumn}>{item.day}</div>
                      <div className={styles.timeColumn} style={{color: item.morning === 'Zavřeno' ? '#999' : ''}}>{item.morning}</div>
                      <div className={styles.timeColumn} style={{color: item.afternoon === 'Zavřeno' ? '#999' : ''}}>{item.afternoon}</div>
                      <div className={styles.noteColumn}>{item.note}</div>
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
                      Pro akutní případy - bez objednání - je vyhrazena dopolední doba, odpoledne pouze po telefonické dohodě.
                    </li>
                    <li>
                      Na odpolední ordinace je nutné se předem objednat telefonicky.
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

              {error && (
                <div style={{ 
                  fontSize: '0.9rem', 
                  color: '#666', 
                  textAlign: 'center', 
                  marginTop: '1rem',
                  padding: '1rem',
                  background: '#fff3cd',
                  border: '1px solid #ffeaa7',
                  borderRadius: '6px'
                }}>
                  <FaInfoCircle style={{ marginRight: '0.5rem', color: '#856404' }} />
                  {error} - zobrazují se záložní údaje. 
                  <br />
                  <small>Posledně aktualizováno: {new Date(ordinaceData.lastUpdated).toLocaleString('cs-CZ')}</small>
                </div>
              )}
            </section>

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
                    Vyberte si volný termín, lékaře a důvod návštěvy. Operační výkon objednávejte vždy po předchozí konzultaci.
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