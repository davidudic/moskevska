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
              Jsme tým zkušených chirurgů a zdravotníků s mnohaletou
              praxí v oboru. Naše moderní chirurgická ambulance
              poskytuje široké spektrum služeb od konzultací, přes
              kosmetické zákroky, až po drobné operační výkony.
            </p>
            
            <p className={styles.paragraph}>
              Klademe důraz na individuální přístup ke každému
              pacientovi, používáme nejmodernější vybavení a postupy,
              které zajišťují bezpečnost a vysokou kvalitu poskytované
              péče.
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
                  <h3 className={styles.doctorName}>MUDr. Jaroslav Chaluš</h3>
                  <p className={styles.doctorPosition}>Hlavní lékař, chirurg</p>
                </div>
              </div>
              
              <div className={styles.signatureContainer}>
                <Image 
                  src="/images/podpis.png"
                  alt="Podpis MUDr. Chaluše"
                  width={100}
                  height={60}
                  style={{objectFit: 'contain'}}
                />
              </div>
            </div>
            
            <Link href="/o-nas" className={styles.moreButton}>
              Více o nás
            </Link>
          </div>
          
          <div className={styles.imageContent}>
            <Image 
              src="/images/budova.webp" 
              alt="Budova chirurgické ambulance" 
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