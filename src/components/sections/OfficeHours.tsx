'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './OfficeHours.module.css';
import { FaClock, FaUserMd } from 'react-icons/fa';

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

// Lékaři - statická data
const doctors = [
  { id: 1, name: 'MUDr. Jaroslav Chaluš', position: 'Hlavní lékař', image: '/images/chalus.webp' },
  { id: 2, name: 'MUDr. Kristýna Žďárská', position: 'Chirurg', image: '/images/zenafotka.webp' },
  { id: 3, name: 'MUDr. Valentýna Nowá', position: 'Chirurg', image: '/images/zenafotka.webp' },
  { id: 4, name: 'MUDr. Tomáš Procházka', position: 'Chirurg', image: '/images/muzfotka.webp' },
  { id: 5, name: 'MUDr. Vojtěch Hrubý', position: 'Chirurg', image: '/images/muzfotka.webp' },
  { id: 6, name: 'MUDr. David Švrček', position: 'Chirurg', image: '/images/muzfotka.webp' },
];

const OfficeHours = () => {
  const [ordinaceData, setOrdinaceData] = useState<OrdinaceData | null>(null);
  const [loading, setLoading] = useState(true);

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
        
        // Fallback na výchozí data
        setOrdinaceData({
          ordinacniHodiny: [
            { id: 1, day: 'Pondělí', morning: '8:00 - 12:00', afternoon: '13:00 - 18:00', note: 'odpoledne jen pro objednané', active: true },
            { id: 2, day: 'Úterý', morning: '8:00 - 12:00', afternoon: '13:00 - 17:00', note: 'odpoledne stomická poradna', active: true },
            { id: 3, day: 'Středa', morning: '8:00 - 12:00', afternoon: '13:00 - 18:00', note: 'odpoledne jen pro objednané', active: true },
            { id: 4, day: 'Čtvrtek', morning: '8:00 - 12:00', afternoon: '13:00 - 18:00', note: 'odpoledne jen pro objednané', active: true },
            { id: 5, day: 'Pátek', morning: '8:00 - 12:00', afternoon: 'Zavřeno', note: '', active: true },
          ],
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
      <section className={styles.officeHours}>
        <div className="container">
          <h2 className={styles.title}>Ordinační hodiny</h2>
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: '#5a6b6a' }}>Načítám ordinační dobu...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!ordinaceData) {
    return (
      <section className={styles.officeHours}>
        <div className="container">
          <h2 className={styles.title}>Ordinační hodiny</h2>
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: '#5a6b6a' }}>Nepodařilo se načíst ordinační dobu</p>
          </div>
        </div>
      </section>
    );
  }

  // Filtruj pouze aktivní dny
  const activeDays = ordinaceData.ordinacniHodiny.filter(day => day.active);

  // Funkce pro formátování hodin
  const formatHours = (day: OrdinaceHour) => {
    if (day.afternoon === 'Zavřeno' || !day.afternoon) {
      return day.morning;
    }
    return `${day.morning}, ${day.afternoon}`;
  };

  return (
    <section className={styles.officeHours}>
      <div className="container">
        <h2 className={styles.title}>Ordinační hodiny</h2>
        <p className={styles.subtitle}>
          Jsme tu pro vás od pondělí do pátku
        </p>
        
        <div className={styles.grid}>
          {/* Ordinační hodiny */}
          <div className={styles.hoursCard}>
            <h3 className={styles.hoursTitle}>
              <FaClock />
              Kdy nás navštívit
            </h3>
            
            {activeDays.map((day) => (
              <div key={day.id} className={styles.dayRow}>
                <div className={styles.dayName}>{day.day}</div>
                <div className={styles.dayTimes}>
                  <span className={styles.timeText}>{formatHours(day)}</span>
                  {day.note && (
                    <span className={styles.dayNote}>{day.note}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Lékaři */}
          <div className={styles.doctorsCard}>
            <h3 className={styles.doctorsTitle}>
              <FaUserMd />
              Náš tým lékařů
            </h3>
            
            <div className={styles.doctorsGrid}>
              {doctors.map((doctor) => (
                <div key={doctor.id} className={styles.doctorItem}>
                  <div className={styles.doctorImage}>
                    <Image 
                      src={doctor.image} 
                      alt={doctor.name} 
                      fill
                      style={{objectFit: 'cover'}}
                    />
                  </div>
                  <div className={styles.doctorName}>{doctor.name}</div>
                  <div className={styles.doctorPosition}>{doctor.position}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className={styles.button}>
          <Link href="/ordinacni-doba" className={styles.buttonLink}>
            Ordinační doba podrobně
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OfficeHours;
