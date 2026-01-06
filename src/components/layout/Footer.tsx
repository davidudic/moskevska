import React from 'react';
import styles from './Footer.module.css';
import { FaPhone, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerColumns}>
          <div className={styles.footerColumn}>
            <h3>Kontakt</h3>
            <a href="tel:+420703611411" className={styles.contactItem}>
              <FaPhone className={styles.icon} />
              <span>+420 703 611 411</span>
            </a>
            <div className={styles.socialLinks}>
              <a 
                href="https://www.facebook.com/p/Chirurgie-Moskevsk%C3%A1-61554879399726/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialIcon}
                aria-label="Facebook - Chirurgická ambulance Moskevská"
              >
                <FaFacebook aria-hidden="true" />
              </a>
              <a 
                href="https://www.instagram.com/chirurgie.moskevska/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialIcon}
                aria-label="Instagram - Chirurgická ambulance Moskevská"
              >
                <FaInstagram aria-hidden="true" />
              </a>
            </div>
          </div>
          
          <div className={styles.footerColumn}>
            <h3>Adresa</h3>
            <a 
              href="https://maps.google.com/?q=Moskevská+658/41+Liberec" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.contactItem}
            >
              <FaMapMarkerAlt className={styles.icon} />
              <div className={styles.addressWrapper}>
                <span>Chirurgická ambulance</span>
                <span>Moskevská 658/41</span>
                <span>Liberec, 460 01</span>
                <span>Patro 2A</span>
              </div>
            </a>
          </div>
          
          <div className={styles.footerColumn}>
            <h3>Ordinační hodiny</h3>
            <div className={styles.contactItem}>
              <FaClock className={styles.icon} />
              <div className={styles.hoursWrapper}>
                <div className={styles.hourRow}>
                  <span className={styles.dayLabel}>Po:</span>
                  <span>8:00 - 18:00</span>
                </div>
                <div className={styles.hourRow}>
                  <span className={styles.dayLabel}>Út:</span>
                  <span>8:00 - 17:00</span>
                </div>
                <div className={styles.hourRow}>
                  <span className={styles.dayLabel}>St:</span>
                  <span>8:00 - 18:00</span>
                </div>
                <div className={styles.hourRow}>
                  <span className={styles.dayLabel}>Čt:</span>
                  <span>8:00 - 18:00</span>
                </div>
                <div className={styles.hourRow}>
                  <span className={styles.dayLabel}>Pá:</span>
                  <span>8:00 - 12:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <div className={styles.copyright}>
          &copy; {currentYear} Chirurgická ambulance Moskevská. Všechna práva vyhrazena.
        </div>
        <div className={styles.footerLinks}>
          <a href="/kontakt/o-nas" className={styles.footerLink}>
            O nás
          </a>
          <a href="/kontakt/darkove-vouchery" className={styles.footerLink}>
            Dárkové vouchery
          </a>
          <a href="/kontakt/formulare" className={styles.footerLink}>
            Formuláře
          </a>
          <a href="/kontakt/gdpr" className={styles.footerLink}>
            GDPR
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;