'use client';

import React, { useState, useEffect } from 'react';
import styles from './AlertModal.module.css';
import { FaTimes } from 'react-icons/fa';

interface AlertData {
  enabled: boolean;
  title: string;
  message: string;
  lastUpdated: string;
  updatedBy: string;
}

const AlertModal: React.FC = () => {
  const [alertData, setAlertData] = useState<AlertData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Načti data alertu při načtení komponenty
  useEffect(() => {
    const fetchAlertData = async () => {
      try {
        const response = await fetch('/api/alert', {
          cache: 'no-store'
        });
        const result = await response.json();
        
        if (result.success && result.data.enabled) {
          setAlertData(result.data);
          
          // Zkontroluj, zda uživatel alert již nezavřel (pomocí sessionStorage)
          const dismissedKey = `alert-dismissed-${result.data.lastUpdated}`;
          const wasDismissed = sessionStorage.getItem(dismissedKey);
          
          if (!wasDismissed) {
            setIsVisible(true);
            // Zamezí scrollování pozadí
            document.body.classList.add('modal-open');
          } else {
            setIsDismissed(true);
          }
        }
      } catch (error) {
        console.error('Chyba při načítání alert dat:', error);
      }
    };

    fetchAlertData();
  }, []);

  // Funkce pro zavření modálu
  const handleClose = () => {
    if (!alertData) return;
    
    setIsClosing(true);
    
    // Uložení do sessionStorage, aby se alert nezobrazoval znovu během této session
    const dismissedKey = `alert-dismissed-${alertData.lastUpdated}`;
    sessionStorage.setItem(dismissedKey, 'true');
    
    // Animace zavírání
    setTimeout(() => {
      setIsVisible(false);
      setIsDismissed(true);
      setIsClosing(false);
      document.body.classList.remove('modal-open');
    }, 200);
  };

  // Handler pro kliknutí na overlay (zavře modal)
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Handler pro klávesovou zkratku Escape
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible && !isClosing) {
        handleClose();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isVisible, isClosing]);

  // Cleanup při unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  // Pokud není alert aktivní, nebo byl zavřen, nezobrauj nic
  if (!alertData || !isVisible || isDismissed) {
    return null;
  }

  return (
    <div 
      className={`${styles.modalOverlay} ${isClosing ? styles.closing : ''}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="alert-title"
      aria-describedby="alert-message"
    >
      <div className={`${styles.modal} ${isClosing ? styles.closing : ''}`}>
        <div className={styles.modalHeader}>
          <h2 id="alert-title" className={styles.modalTitle}>
            {alertData.title}
          </h2>
          <button
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Zavřít upozornění"
            type="button"
          >
            <FaTimes />
          </button>
        </div>
        <div className={styles.modalBody}>
          <div 
            id="alert-message" 
            className={styles.modalMessage}
            dangerouslySetInnerHTML={{
              __html: alertData.message.replace(/\n/g, '<br>')
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AlertModal;