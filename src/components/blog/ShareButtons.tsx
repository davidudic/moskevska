'use client';

import React from 'react';
import styles from './ShareButtons.module.css';
import { FaShareAlt } from 'react-icons/fa';

interface ShareButtonsProps {
  url: string;
  title: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title }) => {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('Odkaz byl zkopírován do schránky!');
    } catch (err) {
      // Fallback pro starší prohlížeče
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Odkaz byl zkopírován do schránky!');
    }
  };

  return (
    <div className={styles.shareSection}>
      <h3>Sdílet článek</h3>
      <div className={styles.shareButtons}>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.shareButton}
          title="Sdílet na Facebooku"
        >
          <FaShareAlt />
          Facebook
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.shareButton}
          title="Sdílet na Twitteru"
        >
          <FaShareAlt />
          Twitter
        </a>
        <button
          onClick={handleCopyLink}
          className={styles.shareButton}
          title="Kopírovat odkaz"
        >
          <FaShareAlt />
          Kopírovat odkaz
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;




