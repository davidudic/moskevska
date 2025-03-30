import React from 'react';
import styles from './GiftVouchers.module.css';

const GiftVouchers = () => {
  return (
    <section className={styles.vouchersSection}>
      <h2 className={styles.sectionTitle}>V prodeji jsou Dárkové poukazy!</h2>
      
      <div className={styles.voucherCard}>
        <div className={styles.voucherIcon}>
          <i className="fas fa-gift"></i>
        </div>
        <div className={styles.voucherInfo}>
          <p>Potěšte své blízké dárkovým poukazem na naše služby. Poukazy jsou k dispozici v libovolné hodnotě nebo na konkrétní služby dle vašeho výběru.</p>
          <p>Více informací vám rádi poskytneme na recepci nebo telefonicky.</p>
          <div className={styles.voucherCTA}>
            <a 
              href="https://v3.smartmedix.net/?reg=28530801" 
              className={styles.voucherButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              Objednat poukaz
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftVouchers;