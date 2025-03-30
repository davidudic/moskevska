import React from 'react';
import styles from './ServicesSection.module.css';

const medicalServices = [
  {
    id: 1,
    title: 'Konzultace a diagnostika vašich zdravotních potíží',
    icon: 'user-md',
    link: '/sluzby/konzultace'
  },
  {
    id: 2,
    title: 'Odstranění kožních a podkožních útvarů',
    icon: 'cut',
    link: '/sluzby/kozni-utvary'
  },
  {
    id: 3,
    title: 'Odstranění exostózy a plastika nehtového lůžka palce nohy',
    icon: 'shoe-prints',
    link: '/sluzby/nehtove-luzko'
  },
  {
    id: 4,
    title: 'Ošetření úrazů',
    icon: 'first-aid',
    link: '/sluzby/urazy'
  },
  {
    id: 5,
    title: 'Léčení kožních defektů dolních končetin',
    icon: 'bandage',
    link: '/sluzby/kozni-defekty'
  },
  {
    id: 6,
    title: 'Laserové ošetření',
    icon: 'bolt',
    link: '/sluzby/laserove-osetreni'
  },
  {
    id: 7,
    title: 'Diagnostika a konzultace závažných onemocnění',
    icon: 'stethoscope',
    link: '/sluzby/diagnostika'
  },
  {
    id: 8,
    title: 'Předoperační konzultace',
    icon: 'clipboard-check',
    link: '/sluzby/predoperacni'
  },
  {
    id: 9,
    title: 'Konzultace pooperačních stavů a řešení pooperačních komplikací',
    icon: 'comments',
    link: '/sluzby/pooperacni'
  },
  {
    id: 10,
    title: 'Kontroly a převazy po operacích',
    icon: 'band-aid',
    link: '/sluzby/prevazy'
  },
  {
    id: 11,
    title: 'Stomická poradna',
    icon: 'chart-pie',
    link: '/sluzby/stomicka-poradna'
  },
  {
    id: 12,
    title: 'Laserová epilace',
    icon: 'bolt',
    link: '/sluzby/laserova-epilace'
  },
  {
    id: 13,
    title: 'Kosmetické výkony',
    icon: 'magic',
    link: '/sluzby/kosmeticke-vykony'
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
  return (
    <section className={styles.servicesSection}>
      <h2 className={styles.sectionTitle}>Služby</h2>
      
      <div className={styles.servicesContainer}>
        <div className={styles.servicesList}>
          {medicalServices.map(service => (
            <a 
              key={service.id} 
              href={service.link}
              className={styles.serviceItem}
            >
              <div className={styles.serviceIcon}>
                <i className={`fas fa-${service.icon}`}></i>
              </div>
              <div className={styles.serviceTitle}>{service.title}</div>
            </a>
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