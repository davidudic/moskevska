import React from 'react';
import Layout from '@/components/layout/Layout';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { FaExclamationCircle, FaChevronRight, FaCalendarAlt, FaCheckCircle, FaClock, FaShieldAlt } from 'react-icons/fa';

export const metadata = {
  title: 'Stop pocení botoxem | Chirurgická ambulance Moskevská',
  description: 'Stop pocení v Liberci - aplikace botulotoxinu do podpaží. Efektivní řešení nadměrného pocení (hyperhidrózy) v ambulanci na Moskevské. Dlouhodobé výsledky.',
  keywords: 'stop pocení Liberec, botox pocení, hyperhidróza, nadměrné pocení, botulotoxin, Moskevská ambulance',
  alternates: {
    canonical: 'https://chirurgie-moskevska.cz/stop-poceni',
  },
  openGraph: {
    title: 'Stop pocení botoxem | Chirurgická ambulance Moskevská',
    description: 'Řešení nadměrného pocení v Liberci. Aplikace botulotoxinu do podpaží pro dlouhodobé výsledky.',
    url: 'https://chirurgie-moskevska.cz/stop-poceni',
    images: [
      {
        url: '/images/hero-background.webp',
        width: 1200,
        height: 630,
        alt: 'Stop pocení botoxem - efektivní řešení hyperhidrózy',
      },
    ],
  },
};

export default function StopPoceniPage() {
  return (
    <Layout>
      <div className={styles.stopPoceniPage}>
        {/* Hero sekce */}
        <div className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Stop Pocení!</h1>
              <p className={styles.heroSubtitle}>
                Efektivní řešení nadměrného pocení pomocí aplikace botulotoxinu do oblasti podpaží
              </p>
            </div>
          </div>
        </div>

        {/* Obsah */}
        <div className="container">
          {/* Hlavní popis */}
          <section className={styles.infoSection}>
            <div className={styles.infoContent}>
              <h2 className={styles.sectionTitle}>O ošetření nadměrného pocení</h2>
              <p>
                Nadměrné pocení v oblasti podpaží (hyperhidróza) může významně ovlivnit kvalitu života. 
                Aplikace botulotoxinu do oblasti podpaží je moderní, bezpečná a vysoce efektivní metoda 
                řešení tohoto problému s dlouhotrvajícím účinkem.
              </p>
              <p>
                Botulotoxin blokuje nervové signály, které stimulují potní žlázy, čímž výrazně snižuje 
                produkci potu v ošetřované oblasti. Výsledek je viditelný již po několika dnech a 
                účinek trvá 6-12 měsíců.
              </p>

              <div className={styles.benefitsList}>
                <h3>Výhody ošetření:</h3>
                <ul>
                  <li>Výrazné snížení pocení až o 90%</li>
                  <li>Účinek trvá 6-12 měsíců</li>
                  <li>Bezpečná a prověřená metoda</li>
                  <li>Rychlé ošetření (30-60 minut)</li>
                  <li>Minimální diskomfort</li>
                  <li>Návrat k běžným aktivitám ihned</li>
                  <li>Výrazné zlepšení kvality života</li>
                </ul>
              </div>
            </div>
            <div className={styles.infoImage}>
              <div className={styles.imageWrapper}>
                <div className={styles.placeholderImage}>
                  <FaShieldAlt className={styles.placeholderIcon} />
                  <span>Bezpečné ošetření</span>
                </div>
              </div>
            </div>
          </section>

          {/* Průběh ošetření */}
          <section className={styles.processSection}>
            <h2 className={styles.sectionTitle}>Průběh ošetření</h2>
            
            <div className={styles.processSteps}>
              <div className={styles.processStep}>
                <div className={styles.processNumber}>1</div>
                <h3>Úvodní konzultace</h3>
                <p>Konzultace s lékařem, vyhodnocení stavu a stanovení vhodnosti ošetření. Zjistíte vše o postupu a výsledcích.</p>
              </div>
              
              <div className={styles.processStep}>
                <div className={styles.processNumber}>2</div>
                <h3>Příprava</h3>
                <p>Označení ošetřované oblasti a aplikace lokální anestezie pro maximální komfort během výkonu.</p>
              </div>
              
              <div className={styles.processStep}>
                <div className={styles.processNumber}>3</div>
                <h3>Aplikace botulotoxinu</h3>
                <p>Přesná aplikace botulotoxinu do označených bodů v oblasti podpaží pomocí velmi jemných jehel.</p>
              </div>
              
              <div className={styles.processStep}>
                <div className={styles.processNumber}>4</div>
                <h3>Po ošetření</h3>
                <p>Krátké pozorování a pokyny pro péči. Můžete se vrátit k běžným aktivitám prakticky ihned.</p>
              </div>
            </div>

            <div className={styles.noteBox}>
              <div className={styles.noteIcon}>
                <FaExclamationCircle />
              </div>
              <div className={styles.noteText}>
                <h4>Důležité informace</h4>
                <p>Účinek se projeví během 3-7 dnů po ošetření a dosáhne maxima po 2 týdnech. Pro udržení efektu je ošetření nutné opakovat každých 6-12 měsíců dle individuálních potřeb.</p>
              </div>
            </div>
          </section>

          {/* Ceník */}
          <section className={styles.priceSection}>
            <h2 className={styles.sectionTitle}>Ceník Stop Pocení!</h2>
            
            <div className={styles.priceCards}>
              <div className={styles.priceCard}>
                <div className={styles.priceHeader}>
                  <h3>Úvodní konzultace</h3>
                  <div className={styles.priceAmount}>1 000 Kč</div>
                </div>
                <div className={styles.priceContent}>
                  <ul className={styles.priceFeatures}>
                    <li><FaCheckCircle /> Konzultace s lékařem</li>
                    <li><FaCheckCircle /> Vyhodnocení stavu</li>
                    <li><FaCheckCircle /> Plánovník ošetření</li>
                    <li><FaCheckCircle /> Zodpovězení všech otázek</li>
                  </ul>
                </div>
              </div>

              <div className={styles.priceCard + ' ' + styles.featured}>
                <div className={styles.featuredBadge}>Kompletní ošetření</div>
                <div className={styles.priceHeader}>
                  <h3>Aplikace botulotoxinu</h3>
                  <div className={styles.priceAmount}>12 000 Kč</div>
                </div>
                <div className={styles.priceContent}>
                  <ul className={styles.priceFeatures}>
                    <li><FaCheckCircle /> Aplikace botulotoxinu</li>
                    <li><FaCheckCircle /> Lokální anestezie</li>
                    <li><FaCheckCircle /> Kontrolní vyšetření</li>
                    <li><FaCheckCircle /> Účinek 6-12 měsíců</li>
                  </ul>
                  <p className={styles.totalPrice}>
                    <strong>Celková cena: 13 000 Kč</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.priceNotes}>
              <div className={styles.noteItem}>
                <FaClock className={styles.noteIcon} />
                <p>Konzultace trvá 15-20 minut, samotné ošetření 30-60 minut.</p>
              </div>
              <div className={styles.noteItem}>
                <FaShieldAlt className={styles.noteIcon} />
                <p>Používáme pouze certifikované preparáty nejvyšší kvality.</p>
              </div>
            </div>
          </section>

          {/* Časté otázky */}
          <section className={styles.faqSection}>
            <h2 className={styles.sectionTitle}>Časté otázky</h2>
            
            <div className={styles.faqGrid}>
              <div className={styles.faqItem}>
                <h3>Jak dlouho trvá účinek?</h3>
                <p>Účinek botulotoxinu trvá obvykle 6-12 měsíců. Závisí na individuálních faktorech každého pacienta.</p>
              </div>
              
              <div className={styles.faqItem}>
                <h3>Je ošetření bolestivé?</h3>
                <p>Aplikujeme lokální anestezii, takže je ošetření prakticky bezbolestné. Můžete pócítit pouze mírný diskomfort.</p>
              </div>
              
              <div className={styles.faqItem}>
                <h3>Kdy se projeví účinek?</h3>
                <p>První účinky jsou viditelné již po 3-7 dnech, maximální efekt se dostaví po 2 týdnech.</p>
              </div>
              
              <div className={styles.faqItem}>
                <h3>Mohu se vrátit k běžným aktivitám?</h3>
                <p>Ano, můžete se vrátit k běžným aktivitám prakticky ihned po ošetření. Doporučujeme pouze vyhnout se saunám a intenzivnímu sportu první 24 hodin.</p>
              </div>
            </div>
          </section>

          {/* CTA sekce */}
          <section className={styles.ctaSection}>
            <div className={styles.ctaCard}>
              <h2 className={styles.ctaTitle}>Zbavte se nadměrného pocení</h2>
              <p className={styles.ctaText}>
                Netrpěte již zbytečně nadměrným pocením. Objednejte se na konzultaci a zjistěte, jak vám můžeme pomoci.
              </p>
              <div className={styles.ctaButtons}>
                <Link 
                  href="https://v3.smartmedix.net/?reg=28530801" 
                  className={styles.primaryButton}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaCalendarAlt className={styles.buttonIcon} />
                  <span>Objednat konzultaci</span>
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