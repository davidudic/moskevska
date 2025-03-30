import React from 'react';
import Layout from '@/components/layout/Layout';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { FaClock, FaExclamationCircle, FaChevronRight, FaCalendarAlt } from 'react-icons/fa';

export const metadata = {
  title: 'Laserová epilace | Chirurgická ambulance',
  description: 'Laserová epilace s použitím nejmodernějších technologií. Bezpečné a efektivní odstranění nežádoucích chloupků ve všech oblastech těla.',
};

export default function LaserEpilacePage() {
  // Ceny laserové epilace
  const laserPrices = [
    { area: 'Brada a horní ret ženy', price: '2300' },
    { area: 'Kotlety oboustr. muži', price: '1100' },
    { area: 'Čelo mezi obočím', price: '700' },
    { area: 'Okolí obočí', price: '1500' },
    { area: 'Obličej - ženy', price: '2200' },
    { area: 'Vousy - muži', price: '6000' },
    { area: 'Úprava vousů podle časové náročnosti', price: '4000' },
    { area: 'Krk v zátylku, šíje', price: '1500' },
    { area: 'Záda muži', price: '5100' },
    { area: 'Hrudník muži', price: '4000' },
    { area: 'Okolí dvorců ženy', price: '700' },
    { area: 'Hrudník + břicho akce', price: '6000' },
    { area: 'Břicho muži', price: '2600' },
    { area: 'Podpaží oboustr.', price: '2200' },
    { area: 'Ramena muži', price: '2500' },
    { area: 'Horní končetiny celé oboustr.', price: '5100' },
    { area: 'Předloktí ženy', price: '2100' },
    { area: 'Předloktí muži', price: '2500' },
    { area: 'Hřbet ruky', price: '1000' },
    { area: 'Prsty ruce + nohy', price: '1000' },
    { area: 'Pupík ženy', price: '1000' },
    { area: 'Podbřišek ženy', price: '1500' },
    { area: 'Třísla oboustr.', price: '2200' },
    { area: 'Třísla + intimní partie oboustr.', price: '3200' },
    { area: 'Okolí konečníku', price: '3000' },
    { area: 'Hýždě muži', price: '2800' },
    { area: 'Stehna', price: '5000' },
    { area: 'Kolena', price: '1600' },
    { area: 'Bérce – lýtka', price: '5100' },
    { area: 'Nárty', price: '1000' },
    { area: 'Dolní končetiny celé oboustr.', price: '6500' },
  ];

  return (
    <Layout>
      <div className={styles.laserPage}>
        {/* Hero sekce */}
        <div className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Laserová epilace DOMINO 755 nm</h1>
              <p className={styles.heroSubtitle}>
                Moderní a bezpečné odstranění nežádoucích chloupků s dlouhotrvajícím efektem
              </p>
            </div>
          </div>
        </div>

        {/* Obsah */}
        <div className="container">
          {/* Hlavní popis */}
          <section className={styles.infoSection}>
            <div className={styles.infoContent}>
              <h2 className={styles.sectionTitle}>O laserové epilaci</h2>
              <p>
                Laserová epilace je moderní, bezpečná a efektivní metoda dlouhodobého odstranění nežádoucího ochlupení. 
                Využíváme špičkový laser DOMINO 755 nm, který je vhodný pro všechny typy pleti a poskytuje vynikající 
                výsledky s minimálním rizikem vedlejších účinků.
              </p>
              <p>
                Náš laser cílí přímo na pigment (melanin) v chloupku, aniž by poškodil okolní tkáň. Energie laseru 
                je absorbována chloupkem a přeměněna na teplo, které poškodí folikul a zabrání dalšímu růstu chloupků.
              </p>

              <div className={styles.benefitsList}>
                <h3>Výhody laserové epilace:</h3>
                <ul>
                  <li>Dlouhodobé až trvalé odstranění chloupků</li>
                  <li>Rychlé a bezbolestné ošetření</li>
                  <li>Vhodné pro všechny části těla</li>
                  <li>Zabraňuje zarůstání chloupků</li>
                  <li>Minimální vedlejší účinky</li>
                  <li>Šetrné k pokožce</li>
                </ul>
              </div>
            </div>
            <div className={styles.infoImage}>
              <Image 
                src="/images/laser.jpg" 
                alt="Laserová epilace" 
                width={500} 
                height={400} 
                className={styles.sectionImage}
              />
            </div>
          </section>

          {/* Průběh ošetření */}
          <section className={styles.processSection}>
            <h2 className={styles.sectionTitle}>Průběh ošetření</h2>
            
            <div className={styles.processSteps}>
              <div className={styles.processStep}>
                <div className={styles.processNumber}>1</div>
                <h3>Konzultace</h3>
                <p>Nejprve proběhne osobní konzultace, během které vám vysvětlíme celý postup a odpovíme na vaše otázky.</p>
              </div>
              
              <div className={styles.processStep}>
                <div className={styles.processNumber}>2</div>
                <h3>Příprava</h3>
                <p>Před zákrokem je nutné oholit ošetřovanou oblast 1-2 dny předem. Pokožka musí být čistá, bez make-upu a krémů.</p>
              </div>
              
              <div className={styles.processStep}>
                <div className={styles.processNumber}>3</div>
                <h3>Ošetření</h3>
                <p>Samotné ošetření je rychlé a téměř bezbolestné. Délka závisí na velikosti ošetřované oblasti.</p>
              </div>
              
              <div className={styles.processStep}>
                <div className={styles.processNumber}>4</div>
                <h3>Po ošetření</h3>
                <p>Po zákroku se může objevit mírné zarudnutí, které zpravidla odezní během několika hodin. Doporučujeme vyhýbat se slunci.</p>
              </div>
            </div>

            <div className={styles.noteBox}>
              <div className={styles.noteIcon}>
                <FaExclamationCircle />
              </div>
              <div className={styles.noteText}>
                <h4>Důležité informace</h4>
                <p>Pro dosažení optimálních výsledků je obvykle potřeba 6-8 ošetření s odstupem 4-6 týdnů. Počet potřebných ošetření závisí na typu pokožky, barvě a hustotě chloupků.</p>
              </div>
            </div>
          </section>

          {/* Ceník */}
          <section className={styles.priceSection}>
            <h2 className={styles.sectionTitle}>Ceník laserové epilace</h2>
            
            <div className={styles.priceGrid}>
              {laserPrices.map((item, index) => (
                <div key={index} className={styles.priceItem}>
                  <div className={styles.areaName}>{item.area}</div>
                  <div className={styles.areaPrice}>{item.price} Kč</div>
                </div>
              ))}
            </div>

            <div className={styles.priceNotes}>
              <div className={styles.noteItem}>
                <FaClock className={styles.noteIcon} />
                <p>Ceny jsou stanoveny pro 1 ošetření a následnou 1 korekci v době do 3 – 4 týdnů od ošetření.</p>
              </div>
              <div className={styles.noteItem}>
                <FaExclamationCircle className={styles.noteIcon} />
                <p>Nutné je oholení všech požadovaných partií 1 – 2 dny před výkonem.</p>
              </div>
              <div className={styles.noteItem}>
                <FaExclamationCircle className={styles.noteIcon} />
                <p>V den ošetření: Čistá neporaněná pokožka bez make-upu, parfémů a krémů.</p>
              </div>
            </div>
          </section>

          {/* CTA sekce */}
<section className={styles.ctaSection}>
  <div className={styles.ctaCard}>
    <h2 className={styles.ctaTitle}>Objednejte se na laserovou epilaci</h2>
    <p className={styles.ctaText}>
      Chcete se zbavit nežádoucího ochlupení trvale a bezbolestně? Kontaktujte nás a objednejte se na osobní konzultaci nebo rovnou na ošetření.
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