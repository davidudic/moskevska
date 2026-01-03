'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import { FaPhone, FaCalendarAlt, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 2000); // 2 second delay
  };

  const isActive = (path: string) => pathname === path;
  const isDropdownActive = () => 
    pathname === '/laserova-epilace' || 
    pathname === '/operacni-laser';

  // Navbarové odkazy
  const navLinks = [
    { href: '/', label: 'Úvod' },
    { href: '/sluzby-a-cenik', label: 'Služby a ceník' },
    { href: '/ordinacni-doba', label: 'Ordinační doba' },
    { href: '/stop-poceni', label: 'Stop Pocení!' },
    { href: '/pro-sportovce', label: 'Pro sportovce' },
    { href: '/blog', label: 'Blog' },
    { href: '/kontakt', label: 'Kontakt' }
    // Laser dropdown will be added separately
  ];

  // Dropdown odkazy
  const laserLinks = [
    { href: '/laserova-epilace', label: 'Epilační laser' },
    { href: '/operacni-laser', label: 'Youlaser MT' }
  ];

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
          <Image 
            src="/images/logo.webp" 
            alt="Chirurgická ambulance Moskevská - logo" 
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
          
          {/* Laser dropdown */}
          <div 
            className={`${styles.dropdown} ${isDropdownActive() ? styles.active : ''}`}
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}
          >
            <button className={styles.dropdownButton}>
              Laser <FaChevronDown className={styles.dropdownIcon} />
            </button>
            <div className={`${styles.dropdownContent} ${isDropdownOpen ? styles.dropdownOpen : ''}`}>
              {laserLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.dropdownLink} ${isActive(link.href) ? styles.active : ''}`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
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
        
        {/* Flat laser links in mobile menu */}
        <Link
          href="#"
          className={`${styles.mobileNavLink} ${styles.mobileLaserHeader}`}
        >
          Laser
        </Link>
        {laserLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.mobileNavLink} ${styles.mobileLaserLink}`}
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