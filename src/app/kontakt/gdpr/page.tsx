import React from 'react';
import Layout from '@/components/layout/Layout';
import { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'GDPR - Ochrana osobních údajů | Chirurgická ambulance Moskevská',
  description: 'Informace o zpracování osobních údajů v souladu s nařízením GDPR. Chirurgická ambulance Moskevská, Liberec.',
  keywords: 'GDPR, ochrana osobních údajů, zpracování údajů, soukromí, ambulance Liberec',
  alternates: {
    canonical: 'https://chirurgie-moskevska.cz/kontakt/gdpr',
  },
  openGraph: {
    title: 'GDPR - Ochrana osobních údajů | Chirurgická ambulance Moskevská',
    description: 'Informace o zpracování osobních údajů v souladu s GDPR.',
    url: 'https://chirurgie-moskevska.cz/kontakt/gdpr',
  },
};

export default function GDPRPage() {
  return (
    <Layout>
      <div className={styles.gdprPage}>
        <div className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>GDPR - Ochrana osobních údajů</h1>
              <p className={styles.heroSubtitle}>
                Informace o zpracování a ochraně vašich osobních údajů
              </p>
            </div>
          </div>
        </div>
        
        <div className="container">
          <div className={styles.contentWrapper}>
              
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>I. Základní ustanovení</h2>
                <ol className={styles.numberedList}>
                  <li>
                    Správcem osobních údajů podle čl. 4 bod 7 nařízení Evropského parlamentu a Rady (EU) 2016/679 
                    o ochraně fyzických osob v souvislosti se zpracováním osobních údajů a o volném pohybu těchto 
                    údajů (dále jen „GDPR") je <strong>Adimon s.r.o. IČ 28530845</strong> se sídlem K Lesíku 711, 25091 Zeleneč 
                    (dále jen "správce").
                  </li>
                  <li>
                    <strong>Kontaktní údaje správce jsou:</strong>
                    <ul className={styles.contactList}>
                      <li>Adresa sídla firmy: K Lesíku 711, 25091 Zeleneč</li>
                      <li>Adresa provozovny: Moskevská 658/41, 46001 Liberec</li>
                      <li>Telefon: 604264406, 703611411</li>
                    </ul>
                  </li>
                  <li>
                    Osobními údaji se rozumí veškeré informace o identifikované nebo identifikovatelné fyzické osobě; 
                    identifikovatelnou fyzickou osobou je fyzická osoba, kterou lze přímo či nepřímo identifikovat, 
                    zejména odkazem na určitý identifikátor, například jméno, identifikační číslo, lokační údaje, 
                    síťový identifikátor nebo jeden či více zvláštních prvků fyzické, fyziologické, genetické, 
                    psychické, ekonomické, kulturní nebo společenské identity této fyzické osoby.
                  </li>
                </ol>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>II. Zdroje a kategorie zpracovávaných osobních údajů</h2>
                <ol className={styles.numberedList}>
                  <li>
                    Správce zpracovává osobní údaje, které jste mu poskytl/a nebo osobní údaje, které správce 
                    získal na základě plnění Vaší objednávky.
                  </li>
                  <li>
                    Správce zpracovává Vaše identifikační a kontaktní údaje a údaje nezbytné pro plnění smlouvy.
                  </li>
                </ol>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>III. Zákonný důvod a účel zpracování osobních údajů</h2>
                <div className={styles.subsection}>
                  <h3 className={styles.subsectionTitle}>1. Zákonným důvodem zpracování osobních údajů je</h3>
                  <ul className={styles.bulletList}>
                    <li>
                      Plnění smlouvy mezi Vámi a správcem podle čl. 6 odst. 1 písm. b) GDPR,
                    </li>
                    <li>
                      Oprávněný zájem správce na poskytování přímého marketingu (zejména pro zasílání obchodních 
                      sdělení a newsletterů) podle čl. 6 odst. 1 písm. f) GDPR
                    </li>
                    <li>
                      Váš souhlas se zpracováním pro účely poskytování přímého marketingu (zejména pro zasílání 
                      obchodních sdělení a newsletterů) podle čl. 6 odst. 1 písm. a) GDPR ve spojení s § 7 odst. 2 
                      zákona č. 480/2004 Sb. o některých službách informační společnosti v případě, že nedošlo 
                      k objednávce zboží nebo služby.
                    </li>
                  </ul>
                </div>
                
                <div className={styles.subsection}>
                  <h3 className={styles.subsectionTitle}>2. Účelem zpracování osobních údajů je</h3>
                  <ul className={styles.bulletList}>
                    <li>
                      Vyřízení Vaší objednávky a výkon práv a povinností vyplývajících ze smluvního vztahu mezi 
                      Vámi a správcem; při objednávce jsou vyžadovány osobní údaje, které jsou nutné pro úspěšné 
                      vyřízení objednávky (jméno a adresa, kontakt), poskytnutí osobních údajů je nutným požadavkem 
                      pro uzavření a plnění smlouvy; bez poskytnutí osobních údajů není možné smlouvu uzavřít 
                      či ji ze strany správce plnit
                    </li>
                    <li>
                      Zasílání obchodních sdělení a činění dalších marketingových aktivit
                    </li>
                  </ul>
                </div>
                
                <ol className={styles.numberedList} start={3}>
                  <li>
                    Ze strany správce nedochází / dochází k automatickému individuálnímu rozhodování ve smyslu 
                    čl. 22 GDPR. S takovým zpracováním jste poskytl/a svůj výslovný souhlas.
                  </li>
                </ol>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>IV. Doba uchovávání údajů</h2>
                <div className={styles.subsection}>
                  <h3 className={styles.subsectionTitle}>1. Správce uchovává osobní údaje</h3>
                  <ul className={styles.bulletList}>
                    <li>
                      Po dobu nezbytnou k výkonu práv a povinností vyplývajících ze smluvního vztahu mezi Vámi 
                      a správcem a uplatňování nároků z těchto smluvních vztahů (po dobu 15 let od ukončení 
                      smluvního vztahu)
                    </li>
                    <li>
                      Po dobu, než je odvolán souhlas se zpracováním osobních údajů pro účely marketingu, 
                      nejdéle 10 let, jsou-li údaje zpracovávány na základě souhlasu.
                    </li>
                  </ul>
                </div>
                <ol className={styles.numberedList} start={2}>
                  <li>
                    Po uplynutí doby uchovávání osobních údajů správce osobní údaje vymaže.
                  </li>
                </ol>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>V. Příjemci osobních údajů (subdodavatelé správce)</h2>
                <div className={styles.subsection}>
                  <h3 className={styles.subsectionTitle}>1. Příjemci osobních údajů jsou osoby</h3>
                  <ul className={styles.bulletList}>
                    <li>Podílející se na dodání zboží, služeb nebo realizaci plateb na základě smlouvy</li>
                    <li>Podílející se na zajištění provozu služeb</li>
                    <li>Zajišťující marketingové služby</li>
                  </ul>
                </div>
                <ol className={styles.numberedList} start={2}>
                  <li>
                    Správce nemá v úmyslu předat osobní údaje do třetí země (do země mimo EU) nebo mezinárodní 
                    organizaci. Příjemci osobních údajů ve třetích zemích jsou poskytovatelé mailingových nebo 
                    cloudových služeb.
                  </li>
                </ol>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>VI. Vaše práva</h2>
                <div className={styles.subsection}>
                  <h3 className={styles.subsectionTitle}>1. Za podmínek stanovených v GDPR máte</h3>
                  <ul className={styles.bulletList}>
                    <li>Právo na přístup ke svým osobním údajům dle čl. 15 GDPR</li>
                    <li>Právo na opravu osobních údajů dle čl. 16 GDPR, popřípadě omezení zpracování dle čl. 18 GDPR</li>
                    <li>Právo na výmaz osobních údajů dle čl. 17 GDPR</li>
                    <li>Právo vznést námitku proti zpracování dle čl. 21 GDPR</li>
                    <li>Právo na přenositelnost údajů dle čl. 20 GDPR</li>
                    <li>
                      Právo odvolat souhlas se zpracováním písemně nebo elektronicky na adresu nebo email 
                      správce uvedený v čl. III těchto podmínek.
                    </li>
                  </ul>
                </div>
                <ol className={styles.numberedList} start={2}>
                  <li>
                    Dále máte právo podat stížnost u Úřadu pro ochranu osobních údajů v případě, že se domníváte, 
                    že bylo porušeno Vaše právo na ochranu osobních údajů.
                  </li>
                </ol>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>VII. Podmínky zabezpečení osobních údajů</h2>
                <ol className={styles.numberedList}>
                  <li>
                    Správce prohlašuje, že přijal veškerá vhodná technická a organizační opatření k zabezpečení 
                    osobních údajů.
                  </li>
                  <li>
                    Správce přijal technická opatření k zabezpečení datových úložišť a úložišť osobních údajů 
                    v listinné podobě, zejména použití antivirových programů, bezpečné uložení záloh, bezpečná 
                    přístupová hesla.
                  </li>
                  <li>
                    Správce prohlašuje, že k osobním údajům mají přístup pouze jím pověřené osoby.
                  </li>
                </ol>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>VIII. Závěrečná ustanovení</h2>
                <ol className={styles.numberedList}>
                  <li>
                    Odesláním objednávky z internetového objednávkového formuláře potvrzujete, že jste seznámen/a 
                    s podmínkami ochrany osobních údajů a že je v celém rozsahu přijímáte.
                  </li>
                  <li>
                    S těmito podmínkami souhlasíte zaškrtnutím souhlasu prostřednictvím internetového formuláře. 
                    Zaškrtnutím souhlasu potvrzujete, že jste seznámen/a s podmínkami ochrany osobních údajů 
                    a že je v celém rozsahu přijímáte.
                  </li>
                  <li>
                    Správce je oprávněn tyto podmínky změnit. Novou verzi podmínek ochrany osobních údajů zveřejní 
                    na svých internetových stránkách, případně Vám zašle novou verzi těchto podmínek na emailovou 
                    adresu, kterou jste správci poskytl/a.
                  </li>
                </ol>
              </section>

              <div className={styles.effectiveDate}>
                <p><strong>Tyto podmínky nabývají účinnosti dnem 1. 10. 2021</strong></p>
              </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}

