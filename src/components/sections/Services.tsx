'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Services.module.css';
import { 
  FaUserMd, 
  FaBandAid, 
  FaClinicMedical, 
  FaStethoscope, 
  FaCut, 
  FaUserInjured,
  FaMedkit,
  FaArrowRight
} from 'react-icons/fa';

// Data služeb
const serviceCategories = [
  {
    id: 'akutni',
    name: 'Akutní péče',
    icon: <FaUserInjured />,
    services: [
      {
        id: 5,
        title: 'Ošetření úrazů',
        description: 'Ošetření drobných poranění a úrazů s minimální čekací dobou.',
        detail: 'Poskytujeme rychlé a efektivní ošetření drobných úrazů včetně tržných ran, odřenin a popálenin prvního a druhého stupně s kratší čekací dobou než na pohotovosti.',
        icon: <FaUserInjured />,
        price: 'dle rozsahu'
      },
      {
        id: 6,
        title: 'Převazy ran',
        description: 'Profesionální péče o rány, včetně chronických a pooperačních.',
        detail: 'Specializujeme se na profesionální převazy akutních i chronických ran. Používáme moderní materiály, které podporují hojení a snižují riziko infekce.',
        icon: <FaBandAid />,
        price: 'od 300 Kč'
      }
    ]
  },
  {
    id: 'chirurgicke',
    name: 'Chirurgické výkony',
    icon: <FaCut />,
    services: [
      {
        id: 1,
        title: 'Odstranění kožních útvarů',
        description: 'Bezpečné odstranění bradavic, mateřských znamének a jiných kožních útvarů.',
        detail: 'Specializujeme se na šetrné odstranění různých typů kožních útvarů včetně mateřských znamének, bradavic a lipomů. Používáme moderní techniky minimalizující jizvy.',
        icon: <FaCut />,
        price: 'od 1500 Kč'
      },
      {
        id: 2,
        title: 'Operace nehtového lůžka',
        description: 'Profesionální řešení zarůstajících nehtů a dalších potíží s nehty.',
        detail: 'Trvalé řešení zarůstajících nehtů pomocí plastiky nehtového lůžka. Tento zákrok zabraňuje opakovaným zánětům a eliminuje chronické problémy.',
        icon: <FaClinicMedical />,
        price: ''
      }
    ]
  },
  {
    id: 'konzultace',
    name: 'Konzultace a vyšetření',
    icon: <FaUserMd />,
    services: [
      {
        id: 3,
        title: 'Konzultace',
        description: 'Konzultace s našimi specialisty pro všechny vaše zdravotní potřeby.',
        detail: 'Během osobní konzultace s našimi zkušenými lékaři probereme vaše zdravotní problémy, vysvětlíme všechny možnosti léčby a vytvoříme individuální plán péče.',
        icon: <FaUserMd />,
        price: 'od 500 Kč'
      },
      {
        id: 4,
        title: 'Předoperační vyšetření',
        description: 'Komplexní vyšetření pro zajištění bezpečnosti a úspěchu zákroků.',
        detail: 'Naše komplexní předoperační vyšetření zahrnuje fyzické vyšetření, kontrolu zdravotního stavu a případně laboratorní testy pro maximální bezpečnost během zákroku.',
        icon: <FaStethoscope />,
        price: 'od 800 Kč'
      }
    ]
  },
  {
    id: 'specialni',
    name: 'Speciální péče',
    icon: <FaMedkit />,
    services: [
      {
        id: 7,
        title: 'Laserové ošetření',
        description: 'Moderní laserové procedury s minimální invazivitou.',
        detail: 'Nabízíme nejmodernější laserové ošetření pro širokou škálu indikací. Tyto procedury jsou minimálně invazivní, mají krátkou rekonvalescenci a poskytují vynikající výsledky.',
        icon: <FaStethoscope />,
        price: 'od 2500 Kč'
      },
      {
        id: 8,
        title: 'Kosmetické výkony',
        description: 'Estetické zákroky pro vylepšení vzhledu a zvýšení sebevědomí.',
        detail: 'Provádíme různé kosmetické zákroky zaměřené na zlepšení vzhledu a odstranění estetických nedokonalostí. Vždy s důrazem na přirozený výsledek a bezpečnost.',
        icon: <FaClinicMedical />,
        price: 'dle typu zákroku'
      }
    ]
  }
];

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('akutni');
  const [activeService, setActiveService] = useState<number | null>(null);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setActiveService(null);
  };

  const toggleService = (serviceId: number) => {
    setActiveService(activeService === serviceId ? null : serviceId);
  };

  const activeServices = serviceCategories.find(cat => cat.id === activeCategory)?.services || [];

  return (
    <section className={styles.services}>
      <div className="container">
        <h2 className={styles.title}>Naše služby</h2>
        <p className={styles.subtitle}>
          Poskytujeme komplexní chirurgickou péči s důrazem na kvalitu, bezpečnost a individuální přístup
        </p>
        
        <div className={styles.categoriesContainer}>
          <div className={styles.categories}>
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                className={`${styles.category} ${activeCategory === category.id ? styles.activeCategory : ''}`}
                onClick={() => handleCategoryChange(category.id)}
              >
                <div className={styles.categoryIcon}>
                  {category.icon}
                </div>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className={styles.servicesContainer}>
          {activeServices.map((service) => (
            <div 
              key={service.id} 
              className={`${styles.serviceCard} ${activeService === service.id ? styles.activeService : ''}`}
            >
              <div className={styles.serviceMain} onClick={() => toggleService(service.id)}>
                <div className={styles.serviceHeader}>
                  <div className={styles.serviceIcon}>
                    {service.icon}
                  </div>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                </div>
                <p className={styles.serviceDescription}>{service.description}</p>
                {service.price && (
                  <div className={styles.servicePrice}>
                    <span>{service.price}</span>
                  </div>
                )}
                <div className={styles.serviceArrow}>
                  <FaArrowRight />
                </div>
              </div>
              
              <div className={styles.serviceDetails}>
                <p>{service.detail}</p>
                <div className={styles.serviceActions}>
                  <Link 
                    href="https://v3.smartmedix.net/?reg=28530801" 
                    className={styles.serviceButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Objednat se
                  </Link>
                  <Link 
                    href={service.id === 2 ? `/prilohy/Plastika_neht._lůžka.odt` : `/sluzby-a-cenik`} 
                    className={styles.serviceLink}
                    target={service.id === 2 ? "_blank" : "_self"}
                    rel={service.id === 2 ? "noopener noreferrer" : undefined}
                  >
                    Více informací
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.servicesFooter}>
          <Link href="/sluzby-a-cenik" className={styles.allServicesButton}>
            Kompletní ceník služeb
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;