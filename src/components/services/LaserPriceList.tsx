import React from 'react';
import styles from './LaserPriceList.module.css';

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

const LaserPriceList = () => {
  return (
    <section className={styles.laserSection}>
      <h2 className={styles.sectionTitle}>Ceník laserové epilace DOMINO 755 nm</h2>
      
      <div className={styles.priceListContainer}>
        <div className={styles.priceGrid}>
          {laserPrices.map((item, index) => (
            <div key={index} className={styles.priceItem}>
              <div className={styles.areaName}>{item.area}</div>
              <div className={styles.areaPrice}>{item.price} Kč</div>
            </div>
          ))}
        </div>
        
        <div className={styles.priceNotes}>
          <p>Ceny jsou stanoveny pro 1 ošetření a následnou 1 korekci v době do 3 – 4 týdnů od ošetření.</p>
          <p>Nutné je oholení všech požadovaných partií 1 – 2 dny před výkonem.</p>
          <p>V den ošetření: Čistá neporaněná pokožka bez make-upu, parfémů a krémů</p>
        </div>
      </div>
    </section>
  );
};

export default LaserPriceList;