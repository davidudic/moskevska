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
  },
  2: {
    title: 'Odstranění kožních a podkožních útvarů',
    category: 'Chirurgie / Dermatologie',
    description: 'Chirurgické nebo dermatologické odstranění kožních výrůstků, cyst, fibromů a dalších benigních útvarů.',
    indications: 'Nezhoubné kožní útvary, které způsobují estetické nebo funkční potíže.',
    preparation: 'Pacient by měl být informován o průběhu zákroku, případně podstoupit předoperační vyšetření.',
    procedure: 'Zákrok probíhá většinou ambulantně, pod lokální anestezií, odstranění útvaru pomocí skalpelu, laseru nebo jiných metod.',
    aftercare: 'Rána je ošetřována, doporučuje se klidový režim, hygienická opatření a kontrola hojení.',
    risks: 'Infekce, krvácení, jizvení nebo recidiva útvaru.',
    faq: [
      { question: 'Bude zákrok bolestivý?', answer: 'Zákrok se provádí v lokální anestezii, takže nebudete cítit bolest během výkonu.' },
      { question: 'Jak dlouho trvá hojení?', answer: 'Hojení obvykle trvá 1-2 týdny, závisi na velikosti a umístění útvaru.' },
      { question: 'Zůstane jizva?', answer: 'Snažíme se minimalizovat vznik jizev, jejich velikost závisí na typu a velikosti útvaru.' }
    ],
    notes: 'Vždy je nutné histologické vyšetření odstraněného materiálu.',
    price: 'od 1500 Kč',
    icon: 'cut'
  },
  3: {
    title: 'Odstranění exostózy a plastika nehtového lůžka palce nohy',
    category: 'Ortopedie / Chirurgie',
    description: 'Plastika nehtového lůžka je výkon, ke kterému přistupujeme po vyčerpání všech ostatních možností ovlivnění tkání a kožních valů bránících zdravému růstu nehtu.',
    indications: 'Růstem exostózy dochází k deformaci nehtového lůžka a tím celého nehtu. Přítomnost exostózy skeletu posledního článku prstu.',
    preparation: 'Nejprve je nutné zjistit pravou příčinu zarůstání nehtů, dále velmi důkladně vyšetřit anatomické poměry a stav nehtové ploténky. V tuto chvíli bývá vhodné dohodnout případnou spolupráci s podologickým specialistou nebo alespoň s aktivním pedikúristou.',
    procedure: 'Odstranění exostózy je invazivní výkon založený na odstranění vazivového či chrupavčitého valu na nehtové drsnatině posledního článku prstu vzniklé většinou úrazem, ale také dlouhodobým drážděním. Samotný výkon je prováděn v místní anestezii s použitím turniketu k dokonalejšímu znecitlivění. Řez je veden po obvodu prstu, po odstranění příčiny potíží je provedena sutura jednotlivými stehy a rána sterilně zakryta.',
    aftercare: 'Doporučujeme v prvních 14 dnech po výkonu zachovávat přísný klid na lůžku s elevací končetiny, v žádném případě na končetinu nedošlapovat, k přesunu na hygienu, jídlo a po bytě používat oporu berlí. Extrakce stehů se provádí nejčastěji 14. - 16. den po výkonu. Za 4-6 týdnů po extrakci stehů doporučujeme zahájení konečné fáze léčení se specialistou podologické poradny.',
    risks: 'O případné profylaxi antibiotiky rozhodne operatér na základě stavu končetiny a pacienta s přihlédnutím k možné infekční komplikaci. Stejně tak je nutné zvážit ponechání často ne zcela zdravého nehtu, často napadeného mykozou.',
    faq: [
      { question: 'Co si mám přinést k výkonu?', answer: 'K samotnému výkonu je vhodné přinést s sebou francouzské hole, extrémně volnou obuv (dopor. Crocs), analgetikum k užití na cestu domů.' },
      { question: 'Jak dlouho výkon trvá?', answer: 'Výkon trvá průměrně 45 minut.' },
      { question: 'Jak dlouho trvá hojení?', answer: 'Extrakce stehů se provádí nejčastěji 14. - 16. den po výkonu, vždy po zhodnocení hojení tkání operatérem nebo určeným lékařem se zkušeností v oboru.' },
      { question: 'Co je cílem léčby?', answer: 'Výsledkem dobré spolupráce je zdravě rostoucí nehet v klidném nehtovém lůžku.' }
    ],
    notes: 'Pacient opouští ambulanci v době plně účinné místní anestezie, poučen o užívání analgetik a režimu ošetřování vč. převazů. Další péče o měkké tkáně končetiny se soustředí na obnovení vitality kožního krytu posledního článku operovaného prstu.',
    price: 'od 8000 Kč',
    icon: 'shoe-prints'
  },
  4: {
    title: 'Ošetření úrazů',
    category: 'Chirurgie / Traumatologie',
    description: 'Ošetření poranění měkkých tkání, pohmožděnin, tržných ran či zlomenin.',
    indications: 'Akutní úraz, otevřené nebo uzavřené poranění.',
    preparation: 'Není nutná, akutní výkony.',
    procedure: 'Vyšetření, ošetření rány, fixace, případně RTG nebo sutura.',
    aftercare: 'Dle typu úrazu – převazy, klidový režim, kontrola.',
    risks: 'Infekce, krvácení, komplikované hojení.',
    faq: [
      { question: 'Kdy se můžu vrátit do práce/sportu?', answer: 'Závisí na typu a rozsahu úrazu, obvykle od několika dní do několika týdnů.' },
      { question: 'Musím na kontrolu?', answer: 'Ano, kontrola je důležitá pro sledování hojení a předcházení komplikacím.' }
    ],
    notes: 'Vhodné přijít co nejdříve po úrazu.',
    price: 'dle rozsahu',
    icon: 'first-aid'
  },
  5: {
    title: 'Léčení kožních defektů dolních končetin',
    category: 'Dermatologie / Chirurgie',
    description: 'Léčba chronických ran, bércových vředů a jiných defektů kůže.',
    indications: 'Špatně se hojící rány, kožní defekty u diabetiků, bércové vředy.',
    preparation: 'Základní vyšetření, někdy doppler, mikrobiologický stěr.',
    procedure: 'Pravidelné převazy, aplikace léčebných krytí, kontrola hojení.',
    aftercare: 'Zlepšení stavu dle pravidelné péče a celkové léčby.',
    risks: 'Chronické nehojení, infekce.',
    faq: [
      { question: 'Jak často musím chodit?', answer: 'Obvykle 1-2x týdně, závisí na stavu rány a typu léčby.' },
      { question: 'Dá se to úplně vyléčit?', answer: 'Při správné léčbě a spolupráci pacienta ano, ale může to trvat dlouho.' }
    ],
    notes: 'Důležitá spolupráce pacienta na celkové terapii.',
    price: 'od 300 Kč',
    icon: 'bandage'
  },
  6: {
    title: 'Laserové ošetření',
    category: 'Dermatologie / Estetická medicína',
    description: 'Odstranění kožních útvarů, cévek, pigmentací či rejuvenace pleti pomocí laseru.',
    indications: 'Pigmentace, žilky, jizvy, znaménka, estetické důvody.',
    preparation: 'Vyšetření kožního problému, zákaz opalování.',
    procedure: 'Rychlý ambulantní zákrok s laserovým paprskem.',
    aftercare: 'Citlivost v místě ošetření, dočasné zarudnutí, ochrana před sluncem.',
    risks: 'Podráždění kůže, pigmentové změny, vzácně jizva.',
    faq: [
      { question: 'Bolí to?', answer: 'Můžete cítit mírné štípání, ale výkon je dobře snášen.' },
      { question: 'Kolik ošetření je potřeba?', answer: 'Obvykle 1-3 ošetření podle typu problému.' }
    ],
    notes: 'Některé výkony nejsou hrazeny pojišťovnou.',
    price: 'od 2500 Kč',
    icon: 'bolt'
  },
  7: {
    title: 'Diagnostika a konzultace závažných onemocnění',
    category: 'Interní medicína / Diagnostika',
    description: 'Komplexní zhodnocení zdravotního stavu při podezření na vážné onemocnění.',
    indications: 'Chronické příznaky, úbytek na váze, podezřelé nálezy, výsledky z jiného pracoviště.',
    preparation: 'Vyšetření, laboratorní a zobrazovací testy.',
    procedure: 'Důkladná konzultace, analýza nálezů, návrh další péče.',
    aftercare: 'Následuje další vyšetření nebo léčba dle výsledků.',
    risks: 'Rizika se týkají pouze navržené další léčby.',
    faq: [
      { question: 'Můžete mi potvrdit diagnózu z jiné kliniky?', answer: 'Ano, můžeme posoudit nálezy a poskytnout druhý názor.' },
      { question: 'Co když to bude vážné?', answer: 'Zajistíme vám odpovídající péči a předáme do specializovaného centra.' }
    ],
    notes: 'Možnost mezioborové konzultace.',
    price: 'od 800 Kč',
    icon: 'stethoscope'
  },
  8: {
    title: 'Předoperační konzultace',
    category: 'Předoperační příprava',
    description: 'Posouzení zdravotního stavu a příprava na plánovaný chirurgický zákrok.',
    indications: 'Pacienti s plánovaným výkonem pod anestezií.',
    preparation: 'Zdravotní dokumentace, seznam léků, laboratorní vyšetření.',
    procedure: 'Vyšetření lékařem, posouzení rizik, vydání předoperačního stanoviska.',
    aftercare: 'Nevyžaduje rekonvalescenci.',
    risks: 'Není riziková.',
    faq: [
      { question: 'Mohu brát své léky před operací?', answer: 'Některé léky je nutné vysadit, jiné pokračovat - řekneme vám přesně co.' },
      { question: 'Co když mám horečku?', answer: 'Operace se obvykle odkládá do vyléčení akutního onemocnění.' }
    ],
    notes: 'Nutné absolvovat nejpozději 7 dní před výkonem.',
    price: 'od 800 Kč',
    icon: 'clipboard-check'
  },
  9: {
    title: 'Konzultace pooperačních stavů a řešení pooperačních komplikací',
    category: 'Pooperační péče',
    description: 'Vyhodnocení hojení a řešení případných komplikací po chirurgickém výkonu.',
    indications: 'Nejasnosti po operaci, zhoršené hojení, bolest, výtok.',
    preparation: 'Není nutná.',
    procedure: 'Kontrola rány, pohovor, případně doplňující vyšetření.',
    aftercare: 'Doporučení pro další léčbu, převazy.',
    risks: 'Závažné komplikace je nutné řešit ihned.',
    faq: [
      { question: 'Je toto hojení normální?', answer: 'Posoudíme stav rány a vysvětlíme, zda hojení probíhá správně.' },
      { question: 'Musím na další zákrok?', answer: 'Závisí na typu komplikace, některé se řeší konzervativně.' }
    ],
    notes: 'Kontroly neodkládejte.',
    price: 'od 500 Kč',
    icon: 'comments'
  },
  10: {
    title: 'Kontroly a převazy po operacích',
    category: 'Pooperační péče',
    description: 'Pravidelné sledování hojení operační rány a převazování dle potřeby.',
    indications: 'Každý pacient po chirurgickém výkonu.',
    preparation: 'Není nutná.',
    procedure: 'Odstranění krytí, kontrola rány, dezinfekce a nový obvaz.',
    aftercare: 'Dle stavu rány, často více návštěv.',
    risks: 'Infekce, rozpad rány, opožděné hojení.',
    faq: [
      { question: 'Jak často mám chodit?', answer: 'Obvykle každé 2-3 dny na začátku, pak dle potřeby.' },
      { question: 'Kdy mi vytáhnete stehy?', answer: 'Obvykle za 7-14 dní, závisí na místě a typu operace.' }
    ],
    notes: 'Důslednost v kontrole je klíčová.',
    price: 'od 350 Kč',
    icon: 'band-aid'
  },
  11: {
    title: 'Stomická poradna',
    category: 'Specializovaná péče',
    description: 'Individuální poradenství pro pacienty se stomií (vývodem).',
    indications: 'Péče o novou či dlouhodobou stomii, problémy s těsněním, podrážděním kůže.',
    preparation: 'Doporučuje se přinést používané pomůcky.',
    procedure: 'Vyšetření, edukace, návrh vhodných pomůcek a technik ošetření.',
    aftercare: 'Pravidelné kontroly dle potřeby.',
    risks: 'Podráždění, záněty, špatné hojení okolo stomie.',
    faq: [
      { question: 'Jak často měnit pomůcky?', answer: 'Závisí na typu stomie, obvykle každé 3-7 dní.' },
      { question: 'Co dělat při podráždění?', answer: 'Kontaktujte nás okamžitě, poradíme s řešením.' }
    ],
    notes: 'Poradna pomáhá zvýšit kvalitu života se stomií.',
    price: 'dle dohody',
    icon: 'chart-pie'
  },
  12: {
    title: 'Laserová epilace',
    category: 'Estetická dermatologie',
    description: 'Trvalá redukce chloupků pomocí cíleného laserového paprsku.',
    indications: 'Nežádoucí ochlupení, folikulitida, podráždění po holení.',
    preparation: 'Oholení oblasti, bez opalování 4 týdny před výkonem.',
    procedure: 'Ambulantní ošetření, lehké štípání, bez nutnosti anestezie.',
    aftercare: 'Mírné zarudnutí, nutná ochrana před sluncem.',
    risks: 'Pigmentové změny, podráždění.',
    faq: [
      { question: 'Kolik sezení je potřeba?', answer: 'Obvykle 6-8 sezení s odstupem 4-6 týdnů.' },
      { question: 'Bolí to?', answer: 'Cítíte lehké štípání, ale výkon je dobře snášen.' }
    ],
    notes: 'Nejlepší efekt při světlé kůži a tmavých chloupcích.',
    price: 'od 700 Kč',
    icon: 'bolt'
  },
  13: {
    title: 'Kosmetické výkony',
    category: 'Estetická medicína',
    description: 'Zákroky zaměřené na zlepšení vzhledu kůže, redukci vrásek a omlazení.',
    indications: 'Stárnutí kůže, vrásky, pigmentace, akné, jizvy.',
    preparation: 'Konzultace, vyšetření stavu pleti.',
    procedure: 'Individuálně dle výkonu – chemický peeling, aplikace výplní, mezoterapie aj.',
    aftercare: 'Krátkodobé zarudnutí, doporučená ochrana pokožky.',
    risks: 'Podráždění, otoky, modřiny, velmi vzácně alergická reakce.',
    faq: [
      { question: 'Jak rychle uvidím výsledky?', answer: 'Závisí na typu výkonu, obvykle během několika dní až týdnů.' },
      { question: 'Musím něco dodržovat po výkonu?', answer: 'Ano, dostanete přesné pokyny pro domácí péči.' }
    ],
    notes: 'Výkony nejsou hrazeny pojišťovnou.',
    price: 'od 600 Kč',
    icon: 'magic'
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
    hasDetails: true
  },
  {
    id: 3,
    title: 'Odstranění exostózy a plastika nehtového lůžka palce nohy',
    icon: 'shoe-prints',
    link: '/sluzby/nehtove-luzko',
    hasDetails: true
  },
  {
    id: 4,
    title: 'Ošetření úrazů',
    icon: 'first-aid',
    link: '/sluzby/urazy',
    hasDetails: true
  },
  {
    id: 5,
    title: 'Léčení kožních defektů dolních končetin',
    icon: 'bandage',
    link: '/sluzby/kozni-defekty',
    hasDetails: true
  },
  {
    id: 6,
    title: 'Laserové ošetření',
    icon: 'bolt',
    link: '/sluzby/laserove-osetreni',
    hasDetails: true
  },
  {
    id: 7,
    title: 'Diagnostika a konzultace závažných onemocnění',
    icon: 'stethoscope',
    link: '/sluzby/diagnostika',
    hasDetails: true
  },
  {
    id: 8,
    title: 'Předoperační konzultace',
    icon: 'clipboard-check',
    link: '/sluzby/predoperacni',
    hasDetails: true
  },
  {
    id: 9,
    title: 'Konzultace pooperačních stavů a řešení pooperačních komplikací',
    icon: 'comments',
    link: '/sluzby/pooperacni',
    hasDetails: true
  },
  {
    id: 10,
    title: 'Kontroly a převazy po operacích',
    icon: 'band-aid',
    link: '/sluzby/prevazy',
    hasDetails: true
  },
  {
    id: 11,
    title: 'Stomická poradna',
    icon: 'chart-pie',
    link: '/sluzby/stomicka-poradna',
    hasDetails: true
  },
  {
    id: 12,
    title: 'Laserová epilace',
    icon: 'bolt',
    link: '/sluzby/laserova-epilace',
    hasDetails: true
  },
  {
    id: 13,
    title: 'Kosmetické výkony',
    icon: 'magic',
    link: '/sluzby/kosmeticke-vykony',
    hasDetails: true
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