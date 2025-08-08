import React from 'react';
// Odstraníme nepoužívaný import Image
import styles from './Contact.module.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Contact = () => {
  return (
    <section className={`section ${styles.contact}`}>
      <div className="container">
        <h2 className={styles.title}>Kde nás najdete</h2>
        
        <div className={styles.grid}>
          <div className={styles.info}>
            <h3>Kontaktní informace</h3>
            
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <FaMapMarkerAlt size={20} />
              </div>
              <div className={styles.contactText}>
                <h4>Adresa</h4>
                <p>Chirurgická ambulance</p>
                <p>Moskevská 658/41, Liberec</p>
                <p>Patro 2A</p>
              </div>
            </div>
            
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <FaPhone size={20} />
              </div>
              <div className={styles.contactText}>
                <h4>Telefon</h4>
                <p>+420 703 611 411</p>
              </div>
            </div>
            
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <FaEnvelope size={20} />
              </div>
              <div className={styles.contactText}>
                <h4>Email</h4>
                <p>
                  lekar@chirurgie-moskevska.cz<br/>
                  <span className={styles.emailNote}>(Jen pro individuální kontakt s konkrétním lékařem!)</span>
                </p>
              </div>
            </div>
            
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <FaClock size={20} />
              </div>
              <div className={styles.contactText}>
                <h4>Ordinační hodiny</h4>
                <p>Po: 8:00 - 18:00</p>
                <p>Út: 8:00 - 17:00</p>
                <p>St: 8:00 - 18:00</p>
                <p>Čt: 8:00 - 18:00</p>
                <p>Pá: 8:00 - 12:00</p>
              </div>
            </div>
          </div>
          
          <div className={styles.map}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2523.952083616062!2d15.052410677320068!3d50.77065637170386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470936d02ff9e1cf%3A0x85c642a7f0f1f1c4!2sMoskevsk%C3%A1%20658%2F41%2C%20460%2001%20Liberec!5e0!3m2!1scs!2scz!4v1711729418493!5m2!1scs!2scz" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;