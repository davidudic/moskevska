import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './BlogCard.module.css';
import { FaCalendarAlt, FaUser, FaTag, FaArrowRight } from 'react-icons/fa';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  image?: string;
  author: string;
  category: 'vse' | 'laser' | 'chirurgie' | 'prevence' | 'obecne';
  dateCreated: string;
  dateUpdated: string;
  published: boolean;
  seo: {
    metaDescription: string;
    keywords: string;
  };
}

const CATEGORIES = {
  vse: 'Vše',
  laser: 'Laserová epilace',
  chirurgie: 'Chirurgické výkony',
  prevence: 'Prevence',
  obecne: 'Obecné'
};

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('cs-CZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryLabel = (category: string) => {
    return CATEGORIES[category as keyof typeof CATEGORIES] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      laser: '#ff6b6b',
      chirurgie: '#4ecdc4',
      prevence: '#45b7d1',
      obecne: '#96ceb4',
      vse: '#84d3d1'
    };
    return colors[category as keyof typeof colors] || '#84d3d1';
  };

  // Vytvoření excerpt z obsahu (odstranění HTML tagů)
  const createExcerpt = (content: string, maxLength: number = 150) => {
    const textContent = content.replace(/<[^>]*>/g, '');
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...'
      : textContent;
  };

  return (
    <article className={styles.blogCard}>
      <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
        {/* Obrázek článku */}
        {post.image && (
          <div className={styles.cardImage}>
            <Image
              src={post.image}
              alt={post.title}
              width={400}
              height={250}
              className={styles.image}
            />
            <div 
              className={styles.categoryBadge}
              style={{ backgroundColor: getCategoryColor(post.category) }}
            >
              <FaTag />
              {getCategoryLabel(post.category)}
            </div>
          </div>
        )}

        {/* Obsah karty */}
        <div className={styles.cardContent}>
          {/* Kategorie (pokud není obrázek) */}
          {!post.image && (
            <div className={styles.cardCategory}>
              <FaTag />
              {getCategoryLabel(post.category)}
            </div>
          )}

          {/* Název článku */}
          <h3 className={styles.cardTitle}>{post.title}</h3>

          {/* Meta informace */}
          <div className={styles.cardMeta}>
            <div className={styles.metaItem}>
              <FaUser />
              <span>{post.author}</span>
            </div>
            <div className={styles.metaItem}>
              <FaCalendarAlt />
              <span>{formatDate(post.dateCreated)}</span>
            </div>
          </div>

          {/* Excerpt */}
          <div className={styles.cardExcerpt}>
            {post.seo.metaDescription || createExcerpt(post.content)}
          </div>

          {/* Read more */}
          <div className={styles.readMore}>
            <span>Přečíst více</span>
            <FaArrowRight />
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;




