import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './AboutUs.module.css';

const AboutUs = () => {
  return (
    <section className={styles.aboutSection}>
      <div className="container">
        <div className={styles.aboutContainer}>
          <div className={styles.textContent}>
            <h2 className={styles.sectionTitle}>O nás</h2>
            
            <p className={styles.paragraph}>
              Od svého založení v roce 2021 se náš tým snaží poskytovat tu nejlepší péči všem našim pacientům. Nabízíme široké spektrum služeb od konzultací přes malé chirurgické výkony až po finální péči estetického zaměření.
            </p>
            
            <div className={styles.doctorSection}>
              <div className={styles.doctorProfile}>
                <div className={styles.doctorImageContainer}>
                  <Image 
                    src="/images/chalus.webp" 
                    alt="MUDr. Jaroslav Chaluš" 
                    fill
                    style={{objectFit: 'cover'}}
                  />
                </div>
                
                <div className={styles.doctorDetails}>
                  <span className={styles.doctorName}>MUDr. Jaroslav Chaluš</span>
                  <span className={styles.doctorPosition}>Hlavní lékař, chirurg</span>
                </div>
              </div>
            </div>
            
            <Link href="/kontakt/o-nas" className={styles.moreButton}>
              Více o nás
            </Link>
          </div>
          
          <div className={styles.imageContent}>
            <Image 
              src="/images/budova.webp" 
              alt="Budova chirurgické ambulance Moskevská v Liberci" 
              fill
              style={{objectFit: 'cover'}}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
