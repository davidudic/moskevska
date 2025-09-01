import React from 'react';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import TeamCard from '@/components/contact/TeamCard';
import styles from './page.module.css';
import { FaPhone, FaMapMarkerAlt, FaClock, FaArrowRight, FaCalendarAlt } from 'react-icons/fa';

export const metadata = {
  title: 'Kontakt a náš tým | Chirurgická ambulance',
  description: 'Kontaktní informace a představení našeho lékařského týmu. Poznejte naše zkušené lékaře a zdravotní sestry.',
};

// Data lékařů
const doctors = [
  {
    id: 1,
    name: 'MUDr. Jaroslav Chaluš',
    position: 'Chirurg, hlavní lékař',
    image: '/images/chalus.webp',
    description: 'MUDr. Jaroslav Chaluš je zkušený chirurg s dlouholetou praxí. Specializuje se na komplexní chirurgické zákroky.',
    education: 'Lékařská fakulta UK v Praze',
    experience: '35+ let praxe'
  },
  {
    id: 2,
    name: 'MUDr. Kristýna Žďárská',
    position: 'Chirurg',
    image: '/images/doctor2.jpg',
    description: 'MUDr. Kristýna Žďárská je specialistka v oblasti chirurgie s fokusem na moderní minimálně invazivní postupy.',
    education: 'Lékařská fakulta',
    experience: '10+ let praxe'
  },
  {
    id: 3,
    name: 'MUDr. Valentýna Nowá',
    position: 'Kožní lékař',
    image: '/images/doctor3.jpg',
    description: 'MUDr. Valentýna Nowá se specializuje na dermatologii a léčbu kožních defektů. Ve své praxi klade důraz na šetrné postupy a minimalizaci jizev.',
    education: 'Lékařská fakulta',
    experience: '5+ let praxe'
  },
  {
    id: 4,
    name: 'MUDr. Tomáš Procházka',
    position: 'Chirurg',
    image: '/images/doctor4.jpg',
    description: 'MUDr. Tomáš Procházka je odborníkem na všeobecnou chirurgii.',
    education: 'Lékařská fakulta',
    experience: '5+ let praxe'
  },
  {
    id: 5,
    name: 'MUDr. Vojtěch Hrubý',
    position: 'Chirurg',
    image: '/images/doctor5.jpg',
    description: 'MUDr. Vojtěch Hrubý je odborníkem na všeobecnou chirurgii.',
    education: 'Lékařská fakulta',
    experience: '5 let praxe'
  },
  {
    id: 6,
    name: 'MUDr. David Švrček',
    position: 'Chirurg',
    image: '/images/doctor6.jpg',
    description: 'MUDr. David Švrček je odborníkem na všeobecnou chirurgii.',
    education: 'Lékařská fakulta',
    experience: '5 let praxe'
  }
];

// Data sester
const nurses = [
  {
    id: 1,
    name: 'Leona Gharazi',
    position: 'Hlavní sestra',
    description: 'Zkušená zdravotní sestra s pečlivým přístupem k pacientům. Specializuje se na asistenci při chirurgických výkonech a pooperační péči.'
  },
  {
    id: 2,
    name: 'Šárka Jindrová',
    position: 'Zdravotní sestra',
    description: 'Zdravotní sestra s bohatou praxí v chirurgické ambulanci. Zaměřuje se na komunikaci s pacienty a zajištění jejich maximálního komfortu během ošetření.'
  },
  {
    id: 3,
    name: 'Kateřina Šigutová',
    position: 'Zdravotní sestra',
    description: 'Zkušená zdravotní sestra s rozsáhlými zkušenostmi s laserovým ošetřením. Má bohaté zkušenosti s péčí o chirurgické pacienty a asistencí při různých typech výkonů.'
  }
];

export default function ContactPage() {
  return (
    <Layout>
      <div className={styles.contactPage}>
        {/* Hero sekce */}
        <div className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Kontakt a náš tým</h1>
              <p className={styles.heroSubtitle}>
                Poznejte náš tým profesionálů a zjistěte, jak nás můžete kontaktovat
              </p>
            </div>
          </div>
        </div>

        {/* Obsah */}
        <div className="container">
          <div className={styles.pageContent}>
            {/* Kontaktní informace a mapa */}
            <section className={styles.contactSection}>
              <div className={styles.contactInfo}>
                <h2 className={styles.sectionTitle}>Kontaktní informace</h2>
                
                <div className={styles.infoCards}>
                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>
                      <FaPhone />
                    </div>
                    <div className={styles.infoContent}>
                      <h3>Telefon</h3>
                      <a href="tel:+420703611411">+420 703 611 411</a>
                    </div>
                  </div>
                  
                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>
                      <FaClock />
                    </div>
                    <div className={styles.infoContent}>
                      <h3>Ordinační hodiny</h3>
                      <p>Po+Čt: 8:00 - 18:00</p>
                      <p>Út: 8:00 - 17:00</p>
                      <p>St: 8:00 - 18:00</p>
                      <p>Pá: 8:00 - 12:00</p>
                      <Link href="/ordinacni-doba" className={styles.moreLink}>
                        Podrobnosti <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                  
                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>
                      <FaMapMarkerAlt />
                    </div>
                    <div className={styles.infoContent}>
                      <h3>Adresa</h3>
                      <p>Chirurgická ambulance</p>
                      <p>Moskevská 658/41</p>
                      <p>Liberec, 460 01</p>
                      <p>Patro 2A</p>
                    </div>
                  </div>
                </div>

                <div className={styles.ctaBox}>
                  <h3>Potřebujete se objednat?</h3>
                  <p>Rezervujte si termín online nebo nás kontaktujte telefonicky.</p>
                  <Link 
                    href="https://v3.smartmedix.net/?reg=28530801" 
                    className={styles.ctaButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaCalendarAlt />
                    <span>Online rezervace</span>
                  </Link>
                </div>
              </div>
              
              <div className={styles.mapContainer}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2523.952083616062!2d15.052410677320068!3d50.77065637170386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470936d02ff9e1cf%3A0x85c642a7f0f1f1c4!2sMoskevsk%C3%A1%20658%2F41%2C%20460%2001%20Liberec!5e0!3m2!1scs!2scz!4v1711729418493!5m2!1scs!2scz" 
                  width="100%" 
                  height="450" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa - Chirurgická ambulance"
                  className={styles.map}
                ></iframe>
              </div>
            </section>

            {/* Lékaři */}
            <section className={styles.teamSection}>
              <h2 className={styles.sectionTitle}>Náš lékařský tým</h2>
              <p className={styles.teamSubtitle}>
                Naši lékaři jsou zkušení specialisté ve svém oboru a poskytují špičkovou péči s důrazem na kvalitu a profesionalitu
              </p>
              
              <div className={styles.teamGrid}>
                {doctors.map(doctor => (
                  <TeamCard
                    key={doctor.id}
                    name={doctor.name}
                    position={doctor.position}
                    image={doctor.image}
                    description={doctor.description}
                    education={doctor.education}
                    experience={doctor.experience}
                    withImage={true}
                  />
                ))}
              </div>
            </section>

            {/* Sestry */}
            <section className={styles.teamSection}>
              <h2 className={styles.sectionTitle}>Náš sesterský tým</h2>
              <p className={styles.teamSubtitle}>
                Naše zdravotní sestry jsou nedílnou součástí týmu a zajišťují profesionální a citlivou péči o pacienty
              </p>
              
              <div className={styles.nursesGrid}>
                {nurses.map(nurse => (
                  <TeamCard
                    key={nurse.id}
                    name={nurse.name}
                    position={nurse.position}
                    description={nurse.description}
                    withImage={false}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}