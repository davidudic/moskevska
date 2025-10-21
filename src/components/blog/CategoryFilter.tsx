'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from './CategoryFilter.module.css';
import { FaTag } from 'react-icons/fa';

interface CategoryFilterProps {
  categories: Record<string, string>;
  selectedCategory: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  selectedCategory 
}) => {
  const searchParams = useSearchParams();

  const createCategoryUrl = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'vse') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    return `/blog${params.toString() ? `?${params.toString()}` : ''}`;
  };

  return (
    <div className={styles.categoryFilter}>
      <div className={styles.filterHeader}>
        <FaTag />
        <span>Filtrovat podle kategorie:</span>
      </div>
      
      <div className={styles.filterButtons}>
        {Object.entries(categories).map(([key, label]) => (
          <Link
            key={key}
            href={createCategoryUrl(key)}
            className={`${styles.filterButton} ${
              selectedCategory === key ? styles.active : ''
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;




