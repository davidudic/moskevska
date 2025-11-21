'use client';

import React from 'react';
import styles from './GiftVouchers.module.css';
import Link from 'next/link';
import { FaGift, FaStar, FaHeart, FaClock, FaPhoneAlt, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

const GiftVouchers = () => {
  return (
    <section className={styles.vouchersSection}>
      {/* Akční banner */}
      <div className={styles.promoBanner}>
        <div className={styles.promoContent}>
          <FaGift className={styles.promoIcon} />
          <div>
            <h2 className={styles.promoTitle}>AKCE -30% NA DÁRKOVÉ VOUCHERY</h2>
            <p className={styles.promoSubtitle}>Limitovaná nabídka - využijte výhodnou slevu!</p>
          </div>
        </div>
      </div>

      {/* Hlavní info sekce */}
      <div className={styles.mainContent}>
        <h2 className={styles.sectionTitle}>Darujte zážitek, který má smysl</h2>
        <p className={styles.leadText}>
          Hledáte dokonalý dárek, který potěší a zůstane v paměti? Dárkový poukaz na profesionální péči 
          je investice do zdraví, sebedůvěry a pohody vašich blízkých.
        </p>

        {/* Výhody */}
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitCard}>
            <FaHeart className={styles.benefitIcon} />
            <h3>Ukažte, že vám záleží</h3>
            <p>Dárek, který říká: "Chci, aby sis dopřál/a to nejlepší." Investujte do zdraví těch, které máte rádi.</p>
          </div>

          <div className={styles.benefitCard}>
            <FaStar className={styles.benefitIcon} />
            <h3>Dárek, který opravdu potěší</h3>
            <p>Žádné zbytečné věci. Voucher na profesionální péči je praktický a nezapomenutelný zážitek.</p>
          </div>

          <div className={styles.benefitCard}>
            <FaGift className={styles.benefitIcon} />
            <h3>Univerzální pro každého</h3>
            <p>Široká nabídka služeb - od laserové epilace až po chirurgické výkony. Každý si najde to své.</p>
          </div>

          <div className={styles.benefitCard}>
            <FaClock className={styles.benefitIcon} />
            <h3>Platnost bez stresu</h3>
            <p>Dostatek času na využití. Obdarovaný si může vybrat termín, který mu vyhovuje.</p>
          </div>
        </div>

        {/* Komu darovat */}
        <div className={styles.recipientsSection}>
          <h3 className={styles.subsectionTitle}>Komu voucher darovat?</h3>
          <div className={styles.recipientsList}>
            <div className={styles.recipientItem}><FaCheckCircle /> Mamince, která si zaslouží luxusní péči</div>
            <div className={styles.recipientItem}><FaCheckCircle /> Partnerce k narozeninám nebo výročí</div>
            <div className={styles.recipientItem}><FaCheckCircle /> Nejlepší kamarádce na oslavu</div>
            <div className={styles.recipientItem}><FaCheckCircle /> Absolventce jako odměna za úspěch</div>
            <div className={styles.recipientItem}><FaCheckCircle /> Sobě - protože si zasloužíte pečovat o sebe</div>
          </div>
        </div>

        {/* Na jaké služby */}
        <div className={styles.servicesSection}>
          <h3 className={styles.subsectionTitle}>Na jaké služby můžete voucher použít?</h3>
          <div className={styles.servicesList}>
            <div className={styles.serviceItem}><FaCheckCircle /> Laserová epilace - trvalé zbavení nežádoucího ochlupení</div>
            <div className={styles.serviceItem}><FaCheckCircle /> Odstranění kožních útvarů - bezpečně a profesionálně</div>
            <div className={styles.serviceItem}><FaCheckCircle /> Laserové ošetření - rejuvenace a omlazení pleti</div>
            <div className={styles.serviceItem}><FaCheckCircle /> Kosmetické výkony - pro zdravou a krásnou pleť</div>
            <div className={styles.serviceItem}><FaCheckCircle /> Stop pocení - konečně svoboda bez nepříjemného pocení</div>
            <div className={styles.serviceItem}><FaCheckCircle /> A mnoho dalších služeb dle výběru obdarovaného</div>
          </div>
        </div>

        {/* Jak to funguje */}
        <div className={styles.howItWorksSection}>
          <h3 className={styles.subsectionTitle}>Jak to funguje?</h3>
          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>1</div>
              <h4>Vyberte hodnotu</h4>
              <p>Zvolte libovolnou částku nebo konkrétní službu podle vašich představ a rozpočtu.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>2</div>
              <h4>Objednejte</h4>
              <p>Kontaktujte nás telefonicky nebo přes online rezervaci. Voucher připravíme ihned.</p>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>3</div>
              <h4>Předejte radost</h4>
              <p>Voucher můžete vyzvednout osobně nebo vám ho zašleme. Elegantní dárek je na světě!</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA sekce */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Neváhejte! Akce -30% je limitovaná</h2>
          <p className={styles.ctaText}>
            Využijte této jedinečné příležitosti a darujte svým blízkým něco výjimečného. 
            Voucher s 30% slevou je k dispozici jen omezenou dobu!
          </p>
          <div className={styles.ctaButtons}>
            <Link 
              href="https://v3.smartmedix.net/?reg=28530801" 
              className={styles.primaryButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaCalendarAlt />
              <span>Objednat voucher</span>
            </Link>
            <a 
              href="tel:+420703611411" 
              className={styles.secondaryButton}
            >
              <FaPhoneAlt />
              <span>+420 703 611 411</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftVouchers;
