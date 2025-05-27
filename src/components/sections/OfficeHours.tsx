'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './OfficeHours.module.css';

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

// Lékaři - statická data (nezměněno)
const doctors = [
  { id: 1, name: 'MUDr. Jaroslav Chaluš', position: 'Chirurg', image: '/images/chalus.webp' },
  { id: 2, name: 'MUDr. Kristýna Žďárská', position: 'Chirurg', image: '/images/doctor2.jpg' },
  { id: 3, name: 'MUDr. Valentýna Nowá', position: 'Chirurg', image: '/images/doctor3.jpg' },
  { id: 4, name: 'MUDr. Tomáš Procházka', position: 'Chirurg', image: '/images/doctor4.jpg' },
  { id: 5, name: 'MUDr. Vojtěch Hrubý', position: 'Chirurg', image: '/images/doctor5.jpg' },
  { id: 6, name: 'MUDr. David Švrček', position: 'Chirurg', image: '/images/doctor6.jpg' },
];

const OfficeHours = () => {
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
        setError('Nepodařilo se načíst ordinační dobu');
        
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
      <section className={`section ${styles.officeHours}`}>
        <div className="container">
          <h2 className={styles.title}>Ordinační hodiny</h2>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Načítám ordinační dobu...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!ordinaceData) {
    return (
      <section className={`section ${styles.officeHours}`}>
        <div className="container">
          <h2 className={styles.title}>Ordinační hodiny</h2>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Nepodařilo se načíst ordinační dobu</p>
          </div>
        </div>
      </section>
    );
  }

  // Filtruj pouze aktivní dny
  const activeDays = ordinaceData.ordinacniHodiny.filter(day => day.active);

  return (
    <section className={`section ${styles.officeHours}`}>
      <div className="container">
        <h2 className={styles.title}>Ordinační hodiny</h2>
        
        <div className={styles.grid}>
          <div className={styles.hours}>
            {activeDays.map((day) => (
              <div key={day.id} className={styles.day}>
                <div className={styles.dayInfo}>
                  <div className={styles.dayName}>{day.day}</div>
                  <div className={styles.dayHours}>
                    {day.morning}
                    {day.afternoon && day.afternoon !== 'Zavřeno' && (
                      <>, {day.afternoon}</>
                    )}
                  </div>
                </div>
                {day.note && (
                  <div className={styles.dayNote}>
                    ({day.note})
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className={styles.doctors}>
            {doctors.map((doctor) => (
              <div key={doctor.id} className={styles.doctor}>
                <div className={styles.doctorImage}>
                  <Image 
                    src={doctor.image} 
                    alt={doctor.name} 
                    fill
                    style={{objectFit: 'cover'}}
                  />
                </div>
                <div className={styles.doctorInfo}>
                  <h3>{doctor.name}</h3>
                  <p>{doctor.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.button}>
          <Link href="/ordinacni-doba" className="btn btn-primary">
            Ordinační doba podrobně
          </Link>
        </div>
        
        {error && (
          <div style={{ 
            fontSize: '0.8rem', 
            color: '#666', 
            textAlign: 'center', 
            marginTop: '1rem' 
          }}>
            <small>Zobrazeny jsou záložní údaje</small>
          </div>
        )}
      </div>
    </section>
  );
};

export default OfficeHours;