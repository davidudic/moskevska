'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Reviews.module.css';
import { FaStar } from 'react-icons/fa';

// Reálné recenze z vašeho podniku
const reviews = [
  {
    id: 1,
    author_name: "Lucia Kucianová",
    rating: 5,
    text: "I came to see Doctor Chaluš from Luxembourg as he was recommended as number 1 in his field and he did not disappoint. Very professional and kind, both the doctor and his assistant.",
    author_initial: "L",
    time: "5 months ago"
  },
  {
    id: 2,
    author_name: "Lilith Carleoni",
    rating: 5,
    text: "Pan doktor je nesmírně šikovný a skutečný profesionál! Moc mi pomohl. On i sestra jsou velice vstřícní, milí a empatičtí. Doporučuji každému.",
    author_initial: "L",
    time: "a week ago"
  },
  {
    id: 3,
    author_name: "Eva Kozakova",
    rating: 5,
    text: "Pan doktor Chaluš byl velice vstřícný a nabídl mi i osobní konzultaci před samotným zákrokem. Měla jsem obavy z velké jizvy, ale vše se vydařilo na jedničku. V ordinaci jsou i ochotné a milé sestry. Děkuji za váš přístup i odvedený výkon.",
    author_initial: "E",
    time: "3 months ago"
  },
  {
    id: 4,
    author_name: "Daniela Jansíková",
    rating: 5,
    text: "Žádné odkládání, rychlé jednání. Moc děkuji sestřičce za vstřícné přijetí do ordinace a panu doktorovi za opravdu bezbolestné ošetření. Maximální spokojenost!",
    author_initial: "D",
    time: "2 months ago"
  },
  {
    id: 5,
    author_name: "Jakub Novák",
    rating: 5,
    text: "Jsem maximálně spokojený s výkonem Pana Doktora a velmi milé sestřičky. Byl jsem zde zatím kvůli 3 malým zákrokům a vše dopadlo výtečně. A navíc nemusíte čekat tak dlouho jako na ambulantní chirurgii v KNL.",
    author_initial: "J",
    time: "6 months ago"
  },
  {
    id: 6,
    author_name: "Iveta Kohoutova",
    rating: 5,
    text: "Jsem velice spokojena s přístupem a péčí pana doktora Chaluše a jeho sestřičky. Pan doktor má zlaté ruce. Určitě všem moc doporučuji.",
    author_initial: "I",
    time: "6 months ago"
  },
  {
    id: 7,
    author_name: "Kristýna Tůmová",
    rating: 5,
    text: "S přístupem pana doktora i sestřičky jsem byla velmi spokojená. Velmi profesionální, vstřícné a milé chování. Z plánovaného zákroku jsem měla lehké obavy, ale nakonec jsem ani nic necítila. Výsledek skvělý, jizva skoro neviditelná.",
    author_initial: "K",
    time: "7 months ago"
  },
  {
    id: 8,
    author_name: "Klára Maryšková",
    rating: 5,
    text: "Pan doktor je naprostá špička. Jsem velice spokojená s jeho péčí. Vše vysvětlí, poradí, snaží se aby se člověk nebál a i sestřička je velmi milá a vstřícná. Doporučuji všem.",
    author_initial: "K",
    time: "9 months ago"
  },
  {
    id: 9,
    author_name: "Lenka Pospíchalová",
    rating: 5,
    text: "Dobrý den, dnes jsem byla u pana doktora na operaci palce. Hned po vstupu do ordinace jsem byla mile překvapena příjemnou sestřičkou i panem doktorem. Oba dva jednali velice citlivě a s pochopením. Zákrok proběhl rychle a bez problémů, vlastně jsem ani necítila bolest.",
    author_initial: "L",
    time: "9 months ago"
  },
  {
    id: 10, 
    author_name: "Leonka Vladařová",
    rating: 5,
    text: "Pan doktor i sestřička jsou velice milí a vstřícní. Pan doktor odvedl profesionální zákrok. Po pár týdnech není vidět ani jizva po odstranění. Moc děkuji za skvěle odvedenou práci.",
    author_initial: "L",
    time: "7 months ago"
  }
];

// Funkce pro generování barvy avataru podle iniciály
const getAvatarColor = (initial: string) => {
  const colorMap: {[key: string]: string} = {
    'L': '#673AB7', // fialová
    'E': '#009688', // tyrkysová
    'D': '#D32F2F', // červená
    'J': '#FFA000', // oranžová
    'K': '#1976D2', // modrá
    'I': '#388E3C', // zelená
  };
  
  return colorMap[initial] || '#84d3d1'; // defaultní barva je primární tyrkysová
};

const Reviews = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Funkce pro automatické posouvání slideru
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 7000); // posun každých 7 sekund
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeSlide, visibleReviews]);

  // Funkce pro nastavení počtu viditelných recenzí podle šířky okna
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setVisibleReviews(1);
    } else if (window.innerWidth < 1024) {
      setVisibleReviews(2);
    } else {
      setVisibleReviews(3);
    }
  };

  useEffect(() => {
    // Nastavení počtu viditelných recenzí při načtení
    handleResize();
    
    // Přidání event listeneru pro změnu velikosti okna
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Posun na předchozí sadu recenzí
  const prevSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    setActiveSlide((prev) => {
      const total = Math.ceil(reviews.length / visibleReviews);
      return (prev === 0) ? total - 1 : prev - 1;
    });
    
    // Restart automatického posouvání
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 7000);
  };

  // Posun na další sadu recenzí
  const nextSlide = () => {
    setActiveSlide((prev) => {
      const total = Math.ceil(reviews.length / visibleReviews);
      return (prev === total - 1) ? 0 : prev + 1;
    });
  };

  // Nastavení aktivního slidu
  const goToSlide = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    setActiveSlide(index);
    
    // Restart automatického posouvání
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 7000);
  };

  // Zpracování dotykových událostí pro swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe doleva
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe doprava
      prevSlide();
    }
  };

  // Výpočet celkového počtu stránek
  const totalSlides = Math.ceil(reviews.length / visibleReviews);

  // Výběr recenzí pro aktuální slide
  const currentReviews = reviews.slice(
    activeSlide * visibleReviews,
    activeSlide * visibleReviews + visibleReviews
  );

  return (
    <section className={styles.reviews}>
      <div className="container">
        <h2 className={styles.title}>Jak nás hodnotí naši klienti</h2>
        
        <div 
          className={styles.reviewsContainer}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {currentReviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.reviewer}>
                  <div 
                    className={styles.avatar} 
                    style={{ backgroundColor: getAvatarColor(review.author_initial) }}
                  >
                    {review.author_initial}
                  </div>
                  <div className={styles.reviewerInfo}>
                    <div className={styles.reviewerName}>{review.author_name}</div>
                    <div className={styles.reviewTime}>{review.time}</div>
                  </div>
                </div>
                <div className={styles.googleLogo}>
                  <Image 
                    src="/images/google-logo.png" 
                    alt="Google" 
                    width={20} 
                    height={20} 
                  />
                </div>
              </div>
              
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={i < review.rating ? styles.star : styles.starEmpty} 
                  />
                ))}
              </div>
              
              <p className={styles.reviewText}>{review.text}</p>
            </div>
          ))}
        </div>
        
        <div className={styles.navigation}>
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              className={`${styles.navDot} ${activeSlide === index ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Stránka ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;