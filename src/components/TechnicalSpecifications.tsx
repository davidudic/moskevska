'use client';

import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaCog } from 'react-icons/fa';
import styles from './TechnicalSpecifications.module.css';

interface TechnicalSpecificationsProps {
  className?: string;
}

const TechnicalSpecifications: React.FC<TechnicalSpecificationsProps> = ({ className }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const specifications = [
    { category: "LASER", label: "Vlnové délky (nm)", value: "10600 a 1540" },
    { category: "LASER", label: "Výkon", value: "Až 30 W při 10600 nm; až 8 W při 1540 nm" },
    { 
      category: "LASER",
      label: "Režimy pulzů", 
      value: "CO₂ (10600 nm) pouze CW (spojený vlnový) a pulzní\nGaAs (1540 nm) pouze CW a pulzní\nCO₂ a GaAs současně, CW a pulzní\nCO₂ a GaAs sekvenčně pulzní" 
    },
    { category: "LASER", label: "Délka pulzu (ms)", value: "Až 20 (frakční režim); až 100 (chirurgický režim); CW (chirurgický režim)" },
    { 
      category: "LASER",
      label: "Velikost stopy (frakční)", 
      value: "300 μm při 10,6 μm – 350 μm při 1540 nm s použitím Optiscan a Shelase vulvární sondy\n600 μm při 10,6 μm – 800 μm při 1540 nm s vaginální sondou" 
    },
    { category: "LASER", label: "Velikost stopy (chirurgická)", value: "200 μm; 400 μm; 1000 μm" },
    { category: "LASER", label: "Režim naškládání pulzů (frakční)", value: "Až 5 pulzů" },
    { category: "LASER", label: "Oblast skenování (frakční)", value: "Až 1,8 × 1,8 cm" },
    { category: "LASER", label: "Frekvence repetice (chirurgická)", value: "Až 2000 Hz při 10,6 μm; až 1000 Hz při 1540 nm" },
    { category: "LASER", label: "Zaměřovací paprsek", value: "650 nm < 4 mW; třída 3R" },
    { category: "LASER", label: "Třída laseru", value: "Třída 4 dle normy IEC 60825-1" },
    { category: "LASER", label: "Požadavky na napájení", value: "115 Vac; 50/60 Hz; 1000 VA\nnebo 230 Vac; 50/60 Hz; 1000 VA" },
    { category: "LASER", label: "Rozměry a hmotnost", value: "580 mm (Š) × 460 mm (H) × 1330 mm (V); 55 kg" }
  ];

  return (
    <div className={`${styles.specificationsSection} ${className || ''}`}>
      <div className={styles.specificationsHeader}>
        <h2 className={styles.sectionTitle}>Technické specifikace</h2>
        <button 
          className={styles.toggleButton}
          onClick={toggleExpanded}
          aria-expanded={isExpanded}
          aria-label="Zobrazit/skrýt technické specifikace"
        >
          <FaCog className={styles.buttonIcon} />
          <span>Více o přístroji</span>
          {isExpanded ? (
            <FaChevronUp className={styles.chevronIcon} />
          ) : (
            <FaChevronDown className={styles.chevronIcon} />
          )}
        </button>
      </div>

      <div 
        className={`${styles.specificationsContent} ${isExpanded ? styles.expanded : ''}`}
        style={{ maxHeight: isExpanded ? '2000px' : '0' }}
      >
        <div className={styles.specificationsTable}>
          <div className={styles.specCategory}>
            <h3 className={styles.categoryTitle}>CO₂ a GaAs</h3>
            <div className={styles.specTable}>
              {specifications.map((spec, specIndex) => (
                <div key={specIndex} className={styles.specRow}>
                  <div className={styles.specLabel}>{spec.label}</div>
                  <div className={styles.specValue}>
                    {spec.value.split('\n').map((line: string, lineIndex: number) => (
                      <div key={lineIndex} className={styles.specLine}>
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSpecifications; 