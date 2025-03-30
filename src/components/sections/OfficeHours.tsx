import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './OfficeHours.module.css';

// Aktualizované dny - každý den samostatně
const days = [
  { id: 1, name: 'Pondělí', hours: '8:00 - 18:00', note: 'odpoledne jen pro objednané' },
  { id: 2, name: 'Úterý', hours: '8:00 - 17:00', note: 'odpoledne stomická poradna' },
  { id: 3, name: 'Středa', hours: '8:00 - 18:00', note: 'odpoledne jen pro objednané' },
  { id: 4, name: 'Čtvrtek', hours: '8:00 - 18:00', note: 'odpoledne jen pro objednané' },
  { id: 5, name: 'Pátek', hours: '8:00 - 12:00', note: '' },
];

// Aktualizovaní lékaři - každý lékař samostatně
const doctors = [
  { id: 1, name: 'MUDr. Jaroslav Chaluš', position: 'Chirurg', image: '/images/chalus.webp' },
  { id: 2, name: 'MUDr. Kristýna Žďárská', position: 'Chirurg', image: '/images/doctor2.jpg' },
  { id: 3, name: 'MUDr. Valentýna Nowá', position: 'Chirurg', image: '/images/doctor3.jpg' },
  { id: 4, name: 'MUDr. Tomáš Procházka', position: 'Chirurg', image: '/images/doctor4.jpg' },
  { id: 5, name: 'MUDr. Vojtěch Hrubý', position: 'Chirurg', image: '/images/doctor5.jpg' },
  { id: 6, name: 'MUDr. David Švrček', position: 'Chirurg', image: '/images/doctor6.jpg' },
];

const OfficeHours = () => {
  return (
    <section className={`section ${styles.officeHours}`}>
      <div className="container">
        <h2 className={styles.title}>Ordinační hodiny</h2>
        
        <div className={styles.grid}>
          <div className={styles.hours}>
            {days.map((day) => (
              <div key={day.id} className={styles.day}>
                <div className={styles.dayInfo}>
                  <div className={styles.dayName}>{day.name}</div>
                  <div className={styles.dayHours}>{day.hours}</div>
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
      </div>
    </section>
  );
};

export default OfficeHours;