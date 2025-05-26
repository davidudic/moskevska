'use client';

import React, { useState } from 'react';
import styles from './ServicesSection.module.css';
import { FaChevronDown, FaChevronUp, FaClock, FaExclamationTriangle, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';

// Detailní data pro služby
const servicesDetails = {
  1: {
    title: 'Konzultace a diagnostika vašich zdravotních potíží',
    category: 'Konzultace a diagnostika',
    description: 'Lékařská konzultace zaměřená na zhodnocení aktuálního zdravotního stavu, určení diagnózy a návrh dalšího léčebného postupu.',
    indications: 'Pacienti s nejasnými příznaky, chronickými potížemi, nutností stanovení diagnózy nebo potřeba odborného vyšetření.',
    preparation: 'Pacient přijde s dostupnou zdravotní dokumentací, přehledem užívaných léků a případně s vyplněným dotazníkem o zdravotním stavu.',
    procedure: 'Lékař provede rozhovor, fyzikální vyšetření a podle potřeby doporučí další vyšetření (laboratorní, zobrazovací).',
    aftercare: 'Záleží na povaze zjištěných potíží; může být nutná další léčba nebo sledování.',
    risks: 'Konzultace a diagnostika jsou bezpečné, rizika se mohou týkat pouze dalších doporučených výkonů.',
    faq: [
      { question: 'Jak dlouho trvá konzultace?', answer: 'Konzultace obvykle trvá 20-30 minut, v závislosti na složitosti případu.' },
      { question: 'Potřebuji něco speciálního předem?', answer: 'Přineste si všechny dostupné lékařské zprávy a seznam užívaných léků.' },
      { question: 'Co když mám více zdravotních problémů?', answer: 'Můžeme projednat všechny vaše zdravotní problémy během jediné konzultace.' }
    ],
    notes: 'Doporučujeme mít připraveny všechny dosavadní lékařské zprávy.',
    price: 'od 500 Kč',
    icon: 'user-md'
  }
};

const medicalServices = [
  {
    id: 1,
    title: 'Konzultace a diagnostika vašich zdravotních potíží',
    icon: 'user-md',
    link: '/sluzby/konzultace',
    hasDetails: true
  },
  {
    id: 2,
    title: 'Odstranění kožních a podkožních útvarů',
    icon: 'cut',
    link: '/sluzby/kozni-utvary',
    hasDetails: false
  },
  {
    id: 3,
    title: 'Odstranění exostózy a plastika nehtového lůžka palce nohy',
    icon: 'shoe-prints',
    link: '/sluzby/nehtove-luzko',
    hasDetails: false
  },
  {
    id: 4,
    title: 'Ošetření úrazů',
    icon: 'first-aid',
    link: '/sluzby/urazy',
    hasDetails: false
  },
  {
    id: 5,
    title: 'Léčení kožních defektů dolních končetin',
    icon: 'bandage',
    link: '/sluzby/kozni-defekty',
    hasDetails: false
  },
  {
    id: 6,
    title: 'Laserové ošetření',
    icon: 'bolt',
    link: '/sluzby/laserove-osetreni',
    hasDetails: false
  },
  {
    id: 7,
    title: 'Diagnostika a konzultace závažných onemocnění',
    icon: 'stethoscope',
    link: '/sluzby/diagnostika',
    hasDetails: false
  },
  {
    id: 8,
    title: 'Předoperační konzultace',
    icon: 'clipboard-check',
    link: '/sluzby/predoperacni',
    hasDetails: false
  },
  {
    id: 9,
    title: 'Konzultace pooperačních stavů a řešení pooperačních komplikací',
    icon: 'comments',
    link: '/sluzby/pooperacni',
    hasDetails: false
  },
  {
    id: 10,
    title: 'Kontroly a převazy po operacích',
    icon: 'band-aid',
    link: '/sluzby/prevazy',
    hasDetails: false
  },
  {
    id: 11,
    title: 'Stomická poradna',
    icon: 'chart-pie',
    link: '/sluzby/stomicka-poradna',
    hasDetails: false
  },
  {
    id: 12,
    title: 'Laserová epilace',
    icon: 'bolt',
    link: '/sluzby/laserova-epilace',
    hasDetails: false
  },
  {
    id: 13,
    title: 'Kosmetické výkony',
    icon: 'magic',
    link: '/sluzby/kosmeticke-vykony',
    hasDetails: false
  }
];

const basicPrices = [
  { service: 'Kosmetický výkon (mimosmluvní) dle rozsahu', price: 'od 600 Kč' },
  { service: 'Odstranění keratoz, fibromů - plošně za 100 cm2', price: '1200 Kč' },
  { service: 'Kontrola po výkonu', price: '350 Kč' },
  { service: 'Preventivní prohlídky', price: '400 Kč' },
  { service: 'Konzultace zdravotního stavu dle dohody', price: 'od 500 Kč' },
  { service: 'Hygienické příslušenství k výkonu a místní anestezie', price: '130 Kč' },
  { service: 'Posudek - Hodnocení bolestného / trvalých následků', price: '800/1600 Kč' },
];

const ServicesSection = () => {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const toggleServiceDetails = (serviceId: number) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const renderServiceDetails = (serviceId: number) => {
    const details = servicesDetails[serviceId as keyof typeof servicesDetails];
    if (!details) return null;

    return (
      <div className={styles.serviceDetails}>
        <div className={styles.detailsContent}>
          {/* Kategorie */}
          <div className={styles.detailSection}>
            <div className={styles.categoryBadge}>
              <FaInfoCircle className={styles.categoryIcon} />
              <span>{details.category}</span>
            </div>
          </div>

          {/* Základní informace */}
          <div className={styles.detailSection}>
            <h4 className={styles.detailTitle}>
              <FaInfoCircle className={styles.detailIcon} />
              Popis výkonu
            </h4>
            <p className={styles.detailText}>{details.description}</p>
          </div>

          {/* Indikace */}
          <div className={styles.detailSection}>
            <h4 className={styles.detailTitle}>
              <FaCheckCircle className={styles.detailIcon} />
              Indikace
            </h4>
            <p className={styles.detailText}>{details.indications}</p>
          </div>

          {/* Příprava */}
          <div className={styles.detailSection}>
            <h4 className={styles.detailTitle}>
              <FaClock className={styles.detailIcon} />
              Příprava před výkonem
            </h4>
            <p className={styles.detailText}>{details.preparation}</p>
          </div>

          {/* Průběh */}
          <div className={styles.detailSection}>
            <h4 className={styles.detailTitle}>
              <FaInfoCircle className={styles.detailIcon} />
              Průběh výkonu
            </h4>
            <p className={styles.detailText}>{details.procedure}</p>
          </div>

          {/* Po výkonu */}
          <div className={styles.detailSection}>
            <h4 className={styles.detailTitle}>
              <FaCheckCircle className={styles.detailIcon} />
              Po výkonu / rekonvalescence
            </h4>
            <p className={styles.detailText}>{details.aftercare}</p>
          </div>

          {/* Rizika */}
          <div className={styles.detailSection}>
            <h4 className={styles.detailTitle}>
              <FaExclamationTriangle className={styles.detailIcon} />
              Možné komplikace / rizika
            </h4>
            <p className={styles.detailText}>{details.risks}</p>
          </div>

          {/* FAQ */}
          <div className={styles.detailSection}>
            <h4 className={styles.detailTitle}>
              <FaInfoCircle className={styles.detailIcon} />
              Časté otázky pacientů
            </h4>
            <div className={styles.faqList}>
              {details.faq.map((faq, index) => (
                <div key={index} className={styles.faqItem}>
                  <div className={styles.faqQuestion}>
                    <strong>Q: {faq.question}</strong>
                  </div>
                  <div className={styles.faqAnswer}>
                    A: {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Poznámky */}
          {details.notes && (
            <div className={styles.detailSection}>
              <h4 className={styles.detailTitle}>
                <FaInfoCircle className={styles.detailIcon} />
                Doplňující poznámky
              </h4>
              <p className={styles.detailText}>{details.notes}</p>
            </div>
          )}

          {/* Cena */}
          <div className={styles.priceSection}>
            <div className={styles.priceTag}>
              <span className={styles.priceLabel}>Cena:</span>
              <span className={styles.priceValue}>{details.price}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className={styles.servicesSection}>
      <h2 className={styles.sectionTitle}>Služby</h2>
      
      <div className={styles.servicesContainer}>
        <div className={styles.servicesList}>
          {medicalServices.map(service => (
            <div key={service.id} className={styles.serviceItemWrapper}>
              {service.hasDetails ? (
                <div 
                  className={`${styles.serviceItem} ${styles.expandableService} ${expandedService === service.id ? styles.expanded : ''}`}
                  onClick={() => toggleServiceDetails(service.id)}
                >
                  <div className={styles.serviceIcon}>
                    <i className={`fas fa-${service.icon}`}></i>
                  </div>
                  <div className={styles.serviceTitle}>{service.title}</div>
                  <div className={styles.expandIcon}>
                    {expandedService === service.id ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </div>
              ) : (
                <a 
                  href={service.link}
                  className={styles.serviceItem}
                >
                  <div className={styles.serviceIcon}>
                    <i className={`fas fa-${service.icon}`}></i>
                  </div>
                  <div className={styles.serviceTitle}>{service.title}</div>
                </a>
              )}
              
              {service.hasDetails && expandedService === service.id && renderServiceDetails(service.id)}
            </div>
          ))}
        </div>
        
        <div className={styles.priceListContainer}>
          <div className={styles.priceTable}>
            <h3 className={styles.tableTitle}>Základní ceník</h3>
            <table className={styles.table}>
              <tbody>
                {basicPrices.map((item, index) => (
                  <tr 
                    key={index} 
                    className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                  >
                    <td className={styles.serviceCell}>{item.service}</td>
                    <td className={styles.priceCell}>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;