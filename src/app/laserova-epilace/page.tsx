import React from 'react';
import Layout from '@/components/layout/Layout';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { FaClock, FaExclamationCircle, FaChevronRight, FaCalendarAlt, FaFire, FaStar, FaGift } from 'react-icons/fa';

export const metadata = {
  title: 'Epilační laser | Chirurgická ambulance',
  description: 'Epilační laserové ošetření s použitím nejmodernějších technologií. Bezpečné a efektivní odstranění nežádoucích chloupků ve všech oblastech těla.',
};

export default function LaserEpilacePage() {
  // Výhodné balíčky s 30% slevou
  const laserPackages = [
    {
      id: 1,
      name: 'Kompletní nohy',
      description: 'Stehna + bérce + kolena + nárty',
      originalPrice: 12600, // 5000 + 5100 + 1600 + 1000
      discountPrice: 8820,
      popular: true,
      icon: '🦵',
      areas: ['Stehna', 'Bérce – lýtka', 'Kolena', 'Nárty']
    },
    {
      id: 2,
      name: 'Intimní balíček',
      description: 'Třísla + intimní partie + okolí konečníku',
      originalPrice: 8200, // 2200 + 3200 + 3000 - už obsahuje třísla + intimní
      discountPrice: 5740,
      popular: false,
      icon: '🌸',
      areas: ['Třísla + intimní partie oboustr.', 'Okolí konečníku']
    },
    {
      id: 3,
      name: 'Horní tělo muži',
      description: 'Hrudník + záda + ramena + břicho',
      originalPrice: 14100, // 4000 + 5100 + 2500 + 2600
      discountPrice: 9870,
      popular: true,
      icon: '💪',
      areas: ['Hrudník muži', 'Záda muži', 'Ramena muži', 'Břicho muži']
    },
    {
      id: 4,
      name: 'Kompletní obličej ženy',
      description: 'Brada + horní ret + okolí obočí + čelo',
      originalPrice: 6200, // 2300 + 1500 + 700
      discountPrice: 4340,
      popular: false,
      icon: '👸',
      areas: ['Brada a horní ret ženy', 'Okolí obočí', 'Čelo mezi obočím']
    },
    {
      id: 5,
      name: 'Kompletní ruce',
      description: 'Horní končetiny + hřbet ruky + prsty',
      originalPrice: 6100, // 5100 + 1000
      discountPrice: 4270,
      popular: false,
      icon: '🙌',
      areas: ['Horní končetiny celé oboustr.', 'Hřbet ruky', 'Prsty ruce']
    },
    {
      id: 6,
      name: 'Celé tělo ženy',
      description: 'Kompletní epilace celého těla',
      originalPrice: 25000, // odhadovaná cena za všechny partie
      discountPrice: 17500,
      popular: true,
      icon: '✨',
      areas: ['Všechny partie těla', 'Nejvýhodnější řešení']
    }
  ];

  // Původní ceny pro jednotlivé oblasti
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
              <h1 className={styles.heroTitle}>Epilační laser DOMINO 755 nm</h1>
              <p className={styles.heroSubtitle}>
                Moderní a bezpečné odstranění nežádoucích chloupků s&nbsp;dlouhotrvajícím efektem
              </p>
            </div>
          </div>
        </div>

        {/* Obsah */}
        <div className="container">
          {/* Hlavní popis */}
          <section className={styles.infoSection}>
            <div className={styles.infoContent}>
              <h2 className={styles.sectionTitle}>O epilačním laseru</h2>
              <p>
                Epilační laser je moderní, bezpečná a efektivní metoda dlouhodobého odstranění nežádoucího ochlupení. 
                Využíváme špičkový laser DOMINO 755 nm, který je vhodný pro všechny typy pleti a poskytuje vynikající 
                výsledky s minimálním rizikem vedlejších účinků.
              </p>
              <p>
                Náš laser cílí přímo na pigment (melanin) v chloupku, aniž by poškodil okolní tkáň. Energie laseru 
                je absorbována chloupkem a přeměněna na teplo, které poškodí folikul a zabrání dalšímu růstu chloupků.
              </p>

              <div className={styles.benefitsList}>
                <h3>Výhody epilačního laseru:</h3>
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
                alt="Epilační laser" 
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

          {/* NOVÉ: Výhodné balíčky */}
          <section className={styles.packagesSection}>
            <div className={styles.packagesHeader}>
              <h2 className={styles.sectionTitle}>
                <FaGift className={styles.giftIcon} />
                Výhodné balíčky se slevou 30%
              </h2>
              <p className={styles.packagesSubtitle}>
                Ušetřete až tisíce korun s našimi speciálními balíčky pro epilaci více oblastí najednou
              </p>
            </div>

            <div className={styles.packagesGrid}>
              {laserPackages.map((pkg) => (
                <div 
                  key={pkg.id} 
                  className={`${styles.packageCard} ${pkg.popular ? styles.popular : ''}`}
                >
                  {pkg.popular && (
                    <div className={styles.popularBadge}>
                      <FaStar />
                      <span>Nejoblíbenější</span>
                    </div>
                  )}
                  
                  <div className={styles.packageIcon}>
                    <span>{pkg.icon}</span>
                  </div>
                  
                  <h3 className={styles.packageName}>{pkg.name}</h3>
                  <p className={styles.packageDescription}>{pkg.description}</p>
                  
                  <div className={styles.packageAreas}>
                    {pkg.areas.map((area, index) => (
                      <span key={index} className={styles.areaTag}>{area}</span>
                    ))}
                  </div>
                  
                  <div className={styles.packagePricing}>
                    <div className={styles.originalPrice}>
                      <span className={styles.originalLabel}>Běžná cena:</span>
                      <span className={styles.originalAmount}>{pkg.originalPrice.toLocaleString()} Kč</span>
                    </div>
                    <div className={styles.discountPrice}>
                      <span className={styles.discountLabel}>Vaše cena:</span>
                      <span className={styles.discountAmount}>{pkg.discountPrice.toLocaleString()} Kč</span>
                    </div>
                    <div className={styles.savings}>
                      <FaFire className={styles.savingsIcon} />
                      <span>Ušetříte {(pkg.originalPrice - pkg.discountPrice).toLocaleString()} Kč</span>
                    </div>
                  </div>
                  
                  <Link 
                    href="https://v3.smartmedix.net/?reg=28530801" 
                    className={styles.packageButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaCalendarAlt />
                    <span>Objednat balíček</span>
                  </Link>
                </div>
              ))}
            </div>

            <div className={styles.packagesNote}>
              <FaExclamationCircle className={styles.noteIcon} />
              <p>
                Balíčky lze kombinovat a rozložit do více termínů. Sleva platí pouze při objednání celého balíčku. 
                Jednotlivé oblasti z balíčku nelze měnit.
              </p>
            </div>
          </section>

          {/* Původní ceník */}
          <section className={styles.priceSection}>
            <h2 className={styles.sectionTitle}>Ceník jednotlivých oblastí</h2>
            <p className={styles.priceSectionSubtitle}>
              Pokud preferujete ošetření pouze konkrétních oblastí, vyberte si z našeho kompletního ceníku
            </p>
            
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