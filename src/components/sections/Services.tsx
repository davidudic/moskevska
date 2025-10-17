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
  FaArrowRight,
  FaTimes
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
        title: 'První ošetření úrazu',
        description: 'Ošetření drobných poranění a úrazů s minimální čekací dobou. Pokud se jedná o čerstvý úraz, ošetříme vás ihned.',
        detail: 'Poskytujeme rychlé a efektivní ošetření drobných úrazů včetně tržných ran, odřenin a popálenin prvního a druhého stupně s kratší čekací dobou než na pohotovosti.',
        icon: <FaUserInjured />,
        price: ''
      },
      {
        id: 6,
        title: 'Převazy ran',
        description: 'Profesionální péče o rány, včetně chronických a pooperačních.',
        detail: 'Specializujeme se na profesionální převazy akutních i chronických ran.',
        icon: <FaBandAid />,
        price: ''
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
        detail: 'Specializujeme se na šetrné odstranění různých typů kožních útvarů včetně mateřských znamének, bradavic a lipomů.',
        icon: <FaCut />,
        price: 'od 900 Kč'
      },
      {
        id: 2,
        title: 'Operace nehtového lůžka',
        description: 'Profesionální řešení zarůstajících nehtů a dalších potíží s nehty.',
        detail: 'Trvalé řešení zarůstajících nehtů pomocí plastiky nehtového lůžka. Tento výkon zabraňuje opakovaným zánětům a eliminuje chronické problémy.',
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
        price: 'dle rozsahu'
      },
      {
        id: 4,
        title: 'Předoperační vyšetření',
        description: 'Komplexní vyšetření pro zajištění bezpečnosti a úspěchu výkonů.',
        detail: 'Naše komplexní předoperační vyšetření zahrnuje fyzikální vyšetření, kontrolu zdravotního stavu a případně laboratorní testy pro maximální bezpečnost během výkonu.',
        icon: <FaStethoscope />,
        price: 'dle rozsahu'
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
        detail: 'Nabízíme laserové ošetření nejmodernějšími přístroji pro širokou škálu indikací. Tato postupy jsou minimálně invazivní, mají krátkou rekonvalescenci a poskytují vynikající výsledky.',
        icon: <FaStethoscope />,
        price: 'od 900 Kč'
      },
      {
        id: 8,
        title: 'Kosmetické výkony',
        description: 'Estetické výkony pro vylepšení vzhledu a zvýšení sebevědomí.',
        detail: 'Provádíme různé kosmetické výkony zaměřené na zlepšení vzhledu a odstranění estetických nedokonalostí. Vždy s důrazem na přirozený výsledek a bezpečnost.',
        icon: <FaClinicMedical />,
        price: 'Dle rozsahu výkonu'
      }
    ]
  }
];

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('akutni');
  const [activeService, setActiveService] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showWoundModal, setShowWoundModal] = useState(false);
  const [showSkinModal, setShowSkinModal] = useState(false);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setActiveService(null);
  };

  const toggleService = (serviceId: number) => {
    setActiveService(activeService === serviceId ? null : serviceId);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openWoundModal = () => {
    setShowWoundModal(true);
  };

  const closeWoundModal = () => {
    setShowWoundModal(false);
  };

  const openSkinModal = () => {
    setShowSkinModal(true);
  };

  const closeSkinModal = () => {
    setShowSkinModal(false);
  };

  const activeServices = serviceCategories.find(cat => cat.id === activeCategory)?.services || [];

  return (
    <>
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
                    {service.id === 5 ? (
                      <button 
                        onClick={openModal}
                        className={styles.serviceLink}
                      >
                        Více informací
                      </button>
                    ) : service.id === 6 ? (
                      <button 
                        onClick={openWoundModal}
                        className={styles.serviceLink}
                      >
                        Více informací
                      </button>
                    ) : service.id === 1 ? (
                      <>
                        <Link 
                          href="https://v3.smartmedix.net/?reg=28530801" 
                          className={styles.serviceButton}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Objednat se
                        </Link>
                        <button 
                          onClick={openSkinModal}
                          className={styles.serviceLink}
                        >
                          Více informací
                        </button>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
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

      {/* Modal for emergency care information */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>
              <FaTimes />
            </button>
            <h3 className={styles.modalTitle}>První ošetření úrazu</h3>
            <div className={styles.modalBody}>
              <p>
                Ošetříme každé akutní poranění bez objednání. V čekárně vyčkejte na příchod sestry, ale ihned ji informujte, že přicházíte s čerstvým poraněním. Budete ošetřeni přednostně.
              </p>
              <h4>Co je třeba vědět:</h4>
              <p>
                Každé krvavé poranění ošetříme hned, jak to bude možné. Jen dokončíme ošetření pacienta přítomného v ambulanci. Ostatním poraněním se budeme věnovat ve velmi krátké době.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal for wound dressing information */}
      {showWoundModal && (
        <div className={styles.modalOverlay} onClick={closeWoundModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeWoundModal}>
              <FaTimes />
            </button>
            <h3 className={styles.modalTitle}>Převazy ran</h3>
            <div className={styles.modalBody}>
              <p>
                Pokud převaz v naší chirurgické ambulanci doporučí lékař již při prvním ošetření úrazu, převážeme vám rány a event. odstraníme stehy. Jestli váš stav dovolí převaz v domácích podmínkách, dostavte se k nám jen při podezření na komplikace nebo k odstranění stehů.
              </p>
              <p>
                Dbejte vždy doporučení lékaře, který ošetřuje ránu jako první.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal for skin formations removal information */}
      {showSkinModal && (
        <div className={styles.modalOverlay} onClick={closeSkinModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeSkinModal}>
              <FaTimes />
            </button>
            <h3 className={styles.modalTitle}>Odstranění kožních útvarů</h3>
            <div className={styles.modalBody}>
              <p>
                Odstranění každého kožního útvaru věnujeme tu nejvyšší pozornost. Vždy nejprve hodnotíme biologickou povahu a závažnost procesu. Vycházíme pokud možno ze závěrů vyšetření kožního specialisty. Následná konzultace vyjádří předpokládaný rozsah ošetření a očekávaný kosmetický výsledek. Naším cílem je kromě léčebného efektu také dosažení vysoké estetické hodnoty finálního stavu, tedy stavu po dokončení léčení. K tomu dochází po zhojení rány, vytvoření pevné jizvy a prohojení a vyzrání měkkých tkání v oblasti jizvy. Celý proces trvá vždy několik měsíců.
              </p>
              <h4>Co je třeba vědět:</h4>
              <p>
                Trvání místní anestézie se liší od velikosti rány a množství použitého anestetika. V průměru trvá 30 až 90 minut. Již při odeznívání anestezie je vhodné užít lék proti bolesti.
              </p>
              <p>
                Po každém výkonu může obvaz prosakovat krví. Rychlé prosakování znamená uvolnění některé, třeba i drobné cévy mezi stehy. Kontaktování lékaře je lepší variantou, pokud to není možné, pak zbývá návštěva pohotovostního chirurgického zařízení. Pomalejší prosakování je pravidelným průvodním jevem, do prvního převazu je možné navázat další vrstvu odsávacího obvazu.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Services;