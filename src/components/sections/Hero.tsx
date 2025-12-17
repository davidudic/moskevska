'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';
import { FaBolt, FaCalendarAlt, FaCheckCircle, FaChevronRight, FaClock, FaStethoscope, FaTint } from 'react-icons/fa';

const Hero = () => {
  const featuredLinks = [
    {
      href: '/laserova-epilace',
      title: 'Laserová epilace DOMINO',
      description: 'Trvalá redukce chloupků technologií 755 nm',
      icon: <FaBolt aria-hidden="true" />,
      accent: '#84d3d1',
    },
    {
      href: '/operacni-laser',
      title: 'Youlaser MT',
      description: 'Moderní laserové výkony s rychlou rekonvalescencí',
      icon: <FaStethoscope aria-hidden="true" />,
      accent: '#5fb9b7',
    },
    {
      href: '/stop-poceni',
      title: 'Stop pocení!',
      description: 'Aplikace botulotoxinu do oblasti podpaží',
      icon: <FaTint aria-hidden="true" />,
      accent: '#4ecdc4',
    },
  ];

  return (
    <section className={`hero-section ${styles.hero}`}>
      <Image 
        src="/images/hero-background.webp" 
        alt="Chirurgická ambulance Moskevská Liberec - moderní zdravotnické zařízení" 
        fill
        className={styles.backgroundImage}
        priority
      />
      <div className={styles.overlay} aria-hidden="true"></div>
      
      {/* Floating orbs */}
      <div className={styles.orb1} aria-hidden="true"></div>
      <div className={styles.orb2} aria-hidden="true"></div>
      
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.left}>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>
                <FaCheckCircle aria-hidden="true" />
              </span>
              <span>Smluvní zařízení pro všechny zdravotní pojišťovny</span>
            </div>

            <h1 className={styles.title}>
              <span className={styles.titleLine}>Chirurgická ambulance</span>
              <span className={styles.titleLine}>
                Moskevská <span className={styles.titleAccent}>Liberec</span>
              </span>
            </h1>

            <p className={styles.subtitle}>
              Chirurgie • Laserová epilace DOMINO • Youlaser MT • Estetické výkony
            </p>

            <div className={styles.cta}>
              <Link
                href="https://v3.smartmedix.net/?reg=28530801"
                className={styles.ctaPrimary}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Objednat se online do chirurgické ambulance"
              >
                <span className={styles.ctaGlow} aria-hidden="true"></span>
                <FaCalendarAlt aria-hidden="true" />
                <span>Objednat se</span>
              </Link>
              <Link
                href="/sluzby-a-cenik"
                className={styles.ctaSecondary}
                aria-label="Zobrazit služby a ceník ambulance"
              >
                <span>Naše služby</span>
                <FaChevronRight className={styles.ctaArrow} aria-hidden="true" />
              </Link>
            </div>

            <div className={styles.secondaryLinks} aria-label="Rychlé odkazy">
              <Link href="/ordinacni-doba" className={styles.textLink}>
                <FaClock className={styles.linkIcon} aria-hidden="true" />
                Ordinační doba
              </Link>
              <span className={styles.separator} aria-hidden="true"></span>
              <a href="tel:+420703611411" className={styles.textLink}>
                +420 703 611 411
              </a>
            </div>
          </div>

          <div className={styles.right} aria-label="Nejoblíbenější služby">
            {featuredLinks.map((item, index) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className={styles.card}
                style={{ 
                  animationDelay: `${0.3 + index * 0.15}s`,
                  '--card-accent': item.accent 
                } as React.CSSProperties}
              >
                <span className={styles.cardIcon}>{item.icon}</span>
                <div className={styles.cardContent}>
                  <span className={styles.cardTitle}>{item.title}</span>
                  <span className={styles.cardDescription}>{item.description}</span>
                </div>
                <div className={styles.cardArrowWrapper}>
                  <FaChevronRight className={styles.cardArrow} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
