import React from 'react';
import Image from 'next/image';
import styles from './TeamCard.module.css';
import { FaGraduationCap, FaHistory } from 'react-icons/fa';

interface TeamCardProps {
  name: string;
  position: string;
  description: string;
  image?: string;
  education?: string;
  experience?: string;
  withImage: boolean;
}

const TeamCard: React.FC<TeamCardProps>

= ({
  name,
  position,
  description,
  image,
  education,
  experience,
  withImage
}) => {
  return (
    <div className={`${styles.card} ${withImage ? styles.withImage : styles.withoutImage}`}>
      {withImage && image && (
        <div className={styles.imageContainer}>
          <Image
            src={image}
            alt={name}
            width={withImage ? 300 : 0}
            height={withImage ? 300 : 0}
            className={styles.image}
          />
        </div>
      )}
      
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.position}>{position}</div>
        
        <p className={styles.description}>{description}</p>
        
        {withImage && education && (
          <div className={styles.detail}>
            <FaGraduationCap className={styles.detailIcon} />
            <span>{education}</span>
          </div>
        )}
        
        {withImage && experience && (
          <div className={styles.detail}>
            <FaHistory className={styles.detailIcon} />
            <span>{experience}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamCard;