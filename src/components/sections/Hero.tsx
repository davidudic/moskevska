import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={`hero-section ${styles.hero}`}>
      <Image 
        src="/images/hero-background.webp" 
        alt="Chirurgická ambulance" 
        fill
        className={styles.backgroundImage}
        priority
      />
      <div className={styles.overlay}></div>
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.title}>Staráme se o vaše zdraví</h1>
          <p className={styles.subtitle}>
            Krása vaší pleti je cílem našeho umění
          </p>
          <div className={styles.cta}>
            <Link 
              href="https://v3.smartmedix.net/?reg=28530801" 
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Objednejte se
            </Link>
            <Link href="/sluzby-a-cenik" className="btn btn-outline">
              Naše služby
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;