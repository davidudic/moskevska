import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={`hero-section ${styles.hero}`}>
      <Image 
        src="/images/hero-background.webp" 
        alt="Chirurgická ambulance Moskevská Liberec - moderní zdravotnické zařízení" 
        fill
        className={styles.backgroundImage}
        priority
      />
      <div className={styles.overlay}></div>
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.title}>
            Chirurgická ambulance Moskevská Liberec
          </h1>
          <p className={styles.subtitle}>
            Moderní chirurgické služby • Laserová epilace • Estetická medicína
          </p>
          <div className={styles.cta}>
            <Link 
              href="https://v3.smartmedix.net/?reg=28530801" 
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Objednat se online do chirurgické ambulance"
            >
              Objednejte se online
            </Link>
            <Link 
              href="/sluzby-a-cenik" 
              className="btn btn-outline"
              aria-label="Zobrazit služby a ceník ambulance"
            >
              Naše služby
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;