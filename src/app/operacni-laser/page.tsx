import React from 'react';
import Layout from '@/components/layout/Layout';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { FaExclamationCircle, FaChevronRight, FaCalendarAlt, FaHeartbeat, FaHospital, FaEye, FaStethoscope } from 'react-icons/fa';

export const metadata = {
  title: 'Operační laser | Chirurgická ambulance',
  description: 'Operační laserové zákroky s použitím nejmodernějších technologií. Bezpečné a efektivní řešení různých chirurgických zákroků s minimální invazivitou.',
};

export default function OperacniLaserPage() {
  // Případy použití operačního laseru
  const useCases = [
    { 
      title: "Dermatologické zákroky", 
      description: "Odstranění kožních lézí, jizev, vrásek a pigmentových skvrn pomocí přesného laserového paprsku.",
      icon: <FaStethoscope />
    },
    { 
      title: "Oční chirurgie", 
      description: "Korekce zraku, léčba glaukomu a další oční zákroky prováděné s vysokou přesností.",
      icon: <FaEye /> 
    },
    { 
      title: "Cévní problémy", 
      description: "Léčba křečových žil, rozšířených žilek a dalších cévních onemocnění s minimálním poškozením okolní tkáně.",
      icon: <FaHeartbeat /> 
    },
    { 
      title: "Dýchací cesty", 
      description: "Odstranění polypu, léčba chronické rýmy a další zákroky v oblasti dýchacích cest s minimální invazivitou.",
      icon: <FaHospital />
    }
  ];

  return (
    <Layout>
      <div className={styles.laserPage}>
        {/* Hero sekce */}
        <div className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Operační laser</h1>
              <p className={styles.heroSubtitle}>
                Moderní a přesná chirurgická léčba s využitím pokročilých laserových technologií
              </p>
            </div>
          </div>
        </div>

        {/* Obsah */}
        <div className="container">
          {/* Hlavní popis */}
          <section className={styles.infoSection}>
            <div className={styles.infoContent}>
              <h2 className={styles.sectionTitle}>O operačním laseru</h2>
              <p>
                Operační laser představuje revoluci v moderní chirurgii. Díky své přesnosti, minimální invazivitě a rychlé
                rekonvalescenci přináší pacientům řadu výhod oproti tradičním chirurgickým metodám.
              </p>
              <p>
                V naší chirurgické ambulanci využíváme nejmodernější laserové technologie, které umožňují provádět
                širokou škálu zákroků s maximální přesností a minimálním poškozením okolních tkání.
              </p>

              <div className={styles.benefitsList}>
                <h3>Výhody operačního laseru:</h3>
                <ul>
                  <li>Vyšší přesnost zákroku</li>
                  <li>Minimální krvácení</li>
                  <li>Méně bolesti během i po zákroku</li>
                  <li>Rychlejší hojení</li>
                  <li>Nižší riziko infekce</li>
                  <li>Minimální jizvy a rychlá rekonvalescence</li>
                </ul>
              </div>
            </div>
            <div className={styles.infoImage}>
              <Image 
                src="/images/laser.jpg" 
                alt="Operační laser" 
                width={500} 
                height={400} 
                className={styles.sectionImage}
              />
            </div>
          </section>

          {/* Proces ošetření */}
          <section className={styles.processSection}>
            <h2 className={styles.sectionTitle}>Průběh laserového zákroku</h2>
            
            <div className={styles.processSteps}>
              <div className={styles.processStep}>
                <div className={styles.processNumber}>1</div>
                <h3>Konzultace</h3>
                <p>Před zákrokem proběhne důkladná konzultace, během které lékař posoudí váš zdravotní stav a navrhne nejvhodnější postup.</p>
              </div>
              
              <div className={styles.processStep}>
                <div className={styles.processNumber}>2</div>
                <h3>Příprava</h3>
                <p>V závislosti na typu zákroku můžete obdržet specifické instrukce ohledně přípravy. Některé zákroky vyžadují pouze lokální anestezii.</p>
              </div>
              
              <div className={styles.processStep}>
                <div className={styles.processNumber}>3</div>
                <h3>Zákrok</h3>
                <p>Samotný laserový zákrok je obvykle rychlý a přesný. Laser cíleně působí pouze na požadovanou oblast bez poškození okolních tkání.</p>
              </div>
              
              <div className={styles.processStep}>
                <div className={styles.processNumber}>4</div>
                <h3>Rekonvalescence</h3>
                <p>Díky minimální invazivitě laseru je doba zotavení výrazně kratší než u klasických chirurgických metod. Obdržíte podrobné instrukce pro domácí péči.</p>
              </div>
            </div>

            <div className={styles.noteBox}>
              <div className={styles.noteIcon}>
                <FaExclamationCircle />
              </div>
              <div className={styles.noteText}>
                <h4>Důležité informace</h4>
                <p>Konkrétní průběh a délka rekonvalescence se liší podle typu zákroku. Všechny detaily vám sdělí lékař během úvodní konzultace. Pro dosažení optimálních výsledků je důležité dodržovat všechna doporučení ohledně předoperační přípravy a pooperační péče.</p>
              </div>
            </div>
          </section>

          {/* Případy použití */}
          <section className={styles.useCasesSection}>
            <h2 className={styles.sectionTitle}>Využití operačního laseru</h2>
            <p>Operační laser má široké využití v různých oblastech medicíny. Mezi nejčastější zákroky, které v naší ambulanci provádíme, patří:</p>
            
            <div className={styles.useCasesList}>
              {useCases.map((useCase, index) => (
                <div key={index} className={styles.useCaseItem}>
                  <div className={styles.useCaseIcon}>
                    {useCase.icon}
                  </div>
                  <h3>{useCase.title}</h3>
                  <p>{useCase.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA sekce */}
          <section className={styles.ctaSection}>
            <div className={styles.ctaCard}>
              <h2 className={styles.ctaTitle}>Máte zájem o laserový zákrok?</h2>
              <p className={styles.ctaText}>
                Kontaktujte nás pro více informací nebo si sjednejte konzultaci s našimi specialisty. Rádi vám odpovíme na všechny dotazy a doporučíme nejvhodnější řešení pro váš specifický případ.
              </p>
              <div className={styles.ctaButtons}>
                <Link 
                  href="https://v3.smartmedix.net/?reg=28530801" 
                  className={styles.primaryButton}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaCalendarAlt className={styles.buttonIcon} />
                  <span>Objednat se</span>
                </Link>
                <Link href="/kontakt" className={styles.secondaryButton}>
                  <span>Kontaktovat nás</span>
                  <FaChevronRight className={styles.buttonIcon} />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
} 