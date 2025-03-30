'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import { FaPhone, FaCalendarAlt, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  const isActive = (path: string) => pathname === path;

  // Odstraněn věrnostní program z navbaru
  const navLinks = [
    { href: '/', label: 'Úvod' },
    { href: '/o-nas', label: 'O nás' },
    { href: '/sluzby-a-cenik', label: 'Služby a ceník' },
    { href: '/ordinacni-doba', label: 'Ordinační doba' },
    { href: '/laserova-epilace', label: 'Laserová epilace' },
    { href: '/kontakt', label: 'Kontakt' }
  ];

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
          <Image 
            src="/images/logo.webp" 
            alt="Chirurgická ambulance" 
            width={160}
            height={50}
            className={styles.logoImage}
            priority
          />
        </Link>

        <nav className={styles.navItems}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${isActive(link.href) ? styles.active : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <FaPhone size={16} />
            <span>+420 703 611 411</span>
          </div>
        </div>

        <Link 
          href="https://v3.smartmedix.net/?reg=28530801" 
          className={styles.actionButton}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaCalendarAlt size={16} />
          <span>Objednat se</span>
        </Link>

        <button className={styles.mobileMenuButton} onClick={toggleMobileMenu} aria-label="Menu">
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div 
        className={`${styles.overlay} ${isMobileMenuOpen ? styles.overlayVisible : ''}`}
        onClick={closeMobileMenu}
      ></div>

      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={styles.mobileNavLink}
            onClick={closeMobileMenu}
          >
            {link.label}
          </Link>
        ))}

        <div className={styles.mobileContactInfo}>
          <div className={styles.mobileContactItem}>
            <FaPhone size={16} />
            <span>+420 703 611 411</span>
          </div>
        </div>

        <Link 
          href="https://v3.smartmedix.net/?reg=28530801" 
          className={`${styles.actionButton} ${styles.mobileActionButton}`} 
          onClick={closeMobileMenu}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaCalendarAlt size={16} />
          <span>Objednat se</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;