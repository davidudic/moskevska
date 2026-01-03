import React from 'react';
import Layout from '@/components/layout/Layout';
import styles from './page.module.css';
import Link from 'next/link';
import { 
  FaExclamationCircle, 
  FaChevronRight, 
  FaCalendarAlt, 
  FaBiking, 
  FaRunning, 
  FaSwimmer, 
  FaEnvelope,
  FaCheckCircle,
  FaShieldAlt,
  FaBolt,
  FaClock,
  FaBandAid,
  FaHandHoldingMedical,
  FaUsers,
  FaPercentage
} from 'react-icons/fa';

export const metadata = {
  title: 'Laserová epilace pro sportovce | Chirurgická ambulance Moskevská',
  description: 'Laserová epilace pro cyklisty, biatlonisty a sportovce v Liberci. Zbavte se každodenního holení žiletkou. Komfort bez bolesti, bez podráždění, lepší aerodynamika.',
  keywords: 'laserová epilace sportovci, epilace cyklisté, epilace biatlonisté, laser epilace Liberec, epilace pro muže, sportovní epilace',
  alternates: {
    canonical: 'https://chirurgie-moskevska.cz/pro-sportovce',
  },
  openGraph: {
    title: 'Laserová epilace pro sportovce | Chirurgická ambulance Moskevská',
    description: 'Profesionální laserová epilace pro sportovce v Liberci. Zbavte se každodenního holení a získejte komfort při tréninku i závodech.',
    url: 'https://chirurgie-moskevska.cz/pro-sportovce',
    images: [
      {
        url: '/images/domino.webp',
        width: 1200,
        height: 630,
        alt: 'Laserová epilace pro sportovce - DOMINO 755nm',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laserová epilace pro sportovce | Chirurgická ambulance Moskevská',
    description: 'Zbavte se každodenního holení žiletkou. Komfort bez bolesti, lepší aerodynamika, úspora času před závody.',
    images: ['/images/domino.webp'],
  },
};

export default function ProSportovcePage() {
  return (
    <Layout>
      <div className={styles.athletePage}>
        {/* Hero sekce */}
        <div className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Laserová epilace pro sportovce</h1>
              <p className={styles.heroSubtitle}>
                Cyklisté, biatlonisté, plavci a triatlonisté – zbavte se každodenního holení žiletkou a získejte výhodu na trati
              </p>
            </div>
          </div>
        </div>

        {/* Obsah */}
        <div className="container">
          {/* Benefity pro sportovce */}
          <section className={styles.benefitsSection}>
            <h2 className={styles.sectionTitle}>Proč sportovci volí laserovou epilaci?</h2>
            <p className={styles.benefitsIntro}>
              Profesionální i amatérští sportovci po celém světě přecházejí na laserovou epilaci. 
              Už žádné podráždění před závodem, žádné ztracené minuty holením – jen hladká pokožka a maximální výkon.
            </p>
            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIconWrapper}>
                  <FaCheckCircle className={styles.benefitIcon} />
                </div>
                <div className={styles.benefitContent}>
                  <h3>Komfort bez bolesti</h3>
                  <p>Šetrné ošetření s minimálním diskomfortem. Žádné pořezání, žádné bolestivé zarostlé chloupky.</p>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIconWrapper}>
                  <FaShieldAlt className={styles.benefitIcon} />
                </div>
                <div className={styles.benefitContent}>
                  <h3>Bez podráždění</h3>
                  <p>Žádné zarudnutí ani svědění po holení. Vaše pokožka bude připravená na trénink i závod.</p>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIconWrapper}>
                  <FaBolt className={styles.benefitIcon} />
                </div>
                <div className={styles.benefitContent}>
                  <h3>Lepší aerodynamika</h3>
                  <p>Hladká pokožka snižuje odpor vzduchu – každá vteřina se počítá.</p>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIconWrapper}>
                  <FaClock className={styles.benefitIcon} />
                </div>
                <div className={styles.benefitContent}>
                  <h3>Úspora času</h3>
                  <p>Zapomeňte na každodenní holení před závodem. Více času na trénink a regeneraci.</p>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIconWrapper}>
                  <FaBandAid className={styles.benefitIcon} />
                </div>
                <div className={styles.benefitContent}>
                  <h3>Snazší ošetření ran</h3>
                  <p>Bez chloupků se lépe čistí odřeniny a rány po pádech. Rychlejší hojení.</p>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIconWrapper}>
                  <FaHandHoldingMedical className={styles.benefitIcon} />
                </div>
                <div className={styles.benefitContent}>
                  <h3>Lepší přilnavost tejpů</h3>
                  <p>Kinesio tejpy a bandáže drží lépe na hladké pokožce bez chloupků.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Proč laser místo žiletky */}
          <section className={styles.comparisonSection}>
            <h2 className={styles.sectionTitle}>Proč laser místo žiletky?</h2>
            
            <div className={styles.comparisonGrid}>
              <div className={styles.comparisonCard + ' ' + styles.razorCard}>
                <h3>Žiletka</h3>
                <ul className={styles.comparisonList}>
                  <li className={styles.negative}>Nutnost holit každý den nebo ob den</li>
                  <li className={styles.negative}>Riziko pořezání před důležitým závodem</li>
                  <li className={styles.negative}>Podráždění a zarostlé chloupky</li>
                  <li className={styles.negative}>Nerovnoměrný výsledek</li>
                  <li className={styles.negative}>Časová ztráta každý den</li>
                </ul>
              </div>
              
              <div className={styles.comparisonCard + ' ' + styles.laserCard}>
                <h3>Laserová epilace</h3>
                <ul className={styles.comparisonList}>
                  <li className={styles.positive}>Dlouhodobě hladká pokožka</li>
                  <li className={styles.positive}>Žádné riziko pořezání</li>
                  <li className={styles.positive}>Bez podráždění a zarostlých chloupků</li>
                  <li className={styles.positive}>Rovnoměrný a profesionální výsledek</li>
                  <li className={styles.positive}>Investice, která se vrátí v čase</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Pro koho je to vhodné */}
          <section className={styles.sportsSection}>
            <h2 className={styles.sectionTitle}>Pro jaké sporty je epilace ideální?</h2>
            
            <div className={styles.sportsGrid}>
              <div className={styles.sportCard}>
                <FaBiking className={styles.sportIcon} />
                <h3>Cyklistika</h3>
                <p>Silniční i horská kola. Lepší aerodynamika, snazší masáže a ošetření po pádech.</p>
              </div>
              <div className={styles.sportCard}>
                <FaRunning className={styles.sportIcon} />
                <h3>Biatlon & Běh</h3>
                <p>Menší tření, lepší odvod potu a profesionální vzhled na závodech.</p>
              </div>
              <div className={styles.sportCard}>
                <FaSwimmer className={styles.sportIcon} />
                <h3>Plavání & Triatlon</h3>
                <p>Nižší odpor ve vodě, rychlejší časy a komfort v neoprenu.</p>
              </div>
            </div>
          </section>

          {/* Klubové balíčky - placeholder */}
          <section className={styles.clubSection}>
            <div className={styles.clubCard}>
              <h2 className={styles.clubTitle}>Speciální nabídky pro sportovní kluby</h2>
              <p className={styles.clubText}>
                Připravujeme zvýhodněné balíčky pro sportovní kluby a týmy. 
                Kontaktujte nás pro individuální nabídku pro váš klub.
              </p>
              
              <div className={styles.clubFeatures}>
                <div className={styles.clubFeature}>
                  <FaUsers className={styles.clubFeatureIcon} />
                  <span>Skupinové slevy pro týmy</span>
                </div>
                <div className={styles.clubFeature}>
                  <FaCalendarAlt className={styles.clubFeatureIcon} />
                  <span>Flexibilní termíny ošetření</span>
                </div>
                <div className={styles.clubFeature}>
                  <FaPercentage className={styles.clubFeatureIcon} />
                  <span>Výhodné ceny pro kluby</span>
                </div>
              </div>

              <div className={styles.clubCta}>
                <Link href="/kontakt" className={styles.clubButton}>
                  <FaEnvelope />
                  <span>Kontaktujte nás pro nabídku</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Informace o procesu */}
          <section className={styles.processSection}>
            <h2 className={styles.sectionTitle}>Jak to probíhá?</h2>
            
            <div className={styles.processSteps}>
              <div className={styles.processStep}>
                <div className={styles.processNumber}>1</div>
                <h3>Konzultace</h3>
                <p>Probereme vaše potřeby a navrhneme optimální plán ošetření podle vašeho tréninkového plánu.</p>
              </div>
              
              <div className={styles.processStep}>
                <div className={styles.processNumber}>2</div>
                <h3>Série ošetření</h3>
                <p>Obvykle 6-8 ošetření s rozestupy 4-6 týdnů. Načasujeme mimo hlavní závodní sezónu.</p>
              </div>
              
              <div className={styles.processStep}>
                <div className={styles.processNumber}>3</div>
                <h3>Výsledek</h3>
                <p>Dlouhodobě hladká pokožka bez nutnosti holení. Občasná udržovací ošetření.</p>
              </div>
            </div>

            <div className={styles.noteBox}>
              <div className={styles.noteIcon}>
                <FaExclamationCircle />
              </div>
              <div className={styles.noteText}>
                <h4>Tip pro sportovce</h4>
                <p>Doporučujeme naplánovat ošetření do přípravného období, kdy máte méně závodů. Po ošetření se vyhněte intenzivnímu pocení 24-48 hodin.</p>
              </div>
            </div>
          </section>

          {/* CTA sekce */}
          <section className={styles.ctaSection}>
            <div className={styles.ctaCard}>
              <h2 className={styles.ctaTitle}>Připraveni na změnu?</h2>
              <p className={styles.ctaText}>
                Přidejte se k tisícům sportovců, kteří už neřeší každodenní holení. 
                Objednejte se na konzultaci a zjistěte, jak vám laserová epilace může pomoci.
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
                <Link href="/laserova-epilace" className={styles.secondaryButton}>
                  <span>Více o laserové epilaci</span>
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

