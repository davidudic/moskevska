import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import BlogCard from '@/components/blog/BlogCard';
import CategoryFilter from '@/components/blog/CategoryFilter';
import styles from './blog.module.css';
import { FaNewspaper, FaCalendarAlt, FaUser, FaTag } from 'react-icons/fa';
import { getBlogPosts, CATEGORIES } from '@/lib/blogData';

export const metadata: Metadata = {
  title: 'Blog - Chirurgická ambulance Moskevská | MUDr. Chaluš',
  description: 'Přečtěte si nejnovější články o chirurgických výkonech, laserové epilaci, prevenci a zdravotní péči od MUDr. Jaroslava Chaluše.',
  keywords: 'blog, chirurgie, laserová epilace, zdravotní péče, prevence, MUDr. Chaluš, Liberec',
  alternates: {
    canonical: 'https://chirurgie-moskevska.cz/blog',
  },
  openGraph: {
    title: 'Blog - Chirurgická ambulance Moskevská',
    description: 'Přečtěte si nejnovější články o chirurgických výkonech, laserové epilaci a zdravotní péči.',
    url: 'https://chirurgie-moskevska.cz/blog',
    images: [
      {
        url: '/images/hero-background.webp',
        width: 1200,
        height: 630,
        alt: 'Blog - Chirurgická ambulance Moskevská',
      },
    ],
  },
};

export default async function BlogPage({ 
  searchParams 
}: { 
  searchParams: { category?: string } 
}) {
  const selectedCategory = searchParams.category || 'vse';
  const posts = await getBlogPosts({
    category: selectedCategory,
    published: true
  });

  return (
    <Layout>
      <div className={styles.blogContainer}>
        <div className="container">
          {/* Header sekce */}
          <div className={styles.blogHeader}>
            <div className={styles.headerContent}>
              <div className={styles.headerIcon}>
                <FaNewspaper />
              </div>
              <div>
                <h1 className={styles.title}>Blog</h1>
                <p className={styles.subtitle}>
                  Přečtěte si nejnovější články o chirurgických výkonech, laserové epilaci a zdravotní péči
                </p>
              </div>
            </div>
          </div>

          {/* Filtry kategorií */}
          <div className={styles.filtersSection}>
            <CategoryFilter 
              categories={CATEGORIES} 
              selectedCategory={selectedCategory}
            />
          </div>

          {/* Seznam článků */}
          <div className={styles.postsSection}>
            {posts.length === 0 ? (
              <div className={styles.emptyState}>
                <FaNewspaper className={styles.emptyIcon} />
                <h3>Žádné články</h3>
                <p>
                  {selectedCategory === 'vse' 
                    ? 'Zatím nejsou k dispozici žádné publikované články.' 
                    : `Zatím nejsou k dispozici žádné články v kategorii "${CATEGORIES[selectedCategory as keyof typeof CATEGORIES]}".`
                  }
                </p>
                <Link href="/" className={styles.backButton}>
                  Zpět na hlavní stránku
                </Link>
              </div>
            ) : (
              <>
                <div className={styles.postsHeader}>
                  <h2>
                    {selectedCategory === 'vse' 
                      ? `Všechny články (${posts.length})` 
                      : `${CATEGORIES[selectedCategory as keyof typeof CATEGORIES]} (${posts.length})`
                    }
                  </h2>
                </div>
                
                <div className={styles.postsGrid}>
                  {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Call to action */}
          {posts.length > 0 && (
            <div className={styles.ctaSection}>
              <div className={styles.ctaContent}>
                <h3>Potřebujete konzultaci?</h3>
                <p>Máte otázky k některému z témat? Rádi vám poskytneme odbornou konzultaci.</p>
                <div className={styles.ctaButtons}>
                  <Link 
                    href="https://v3.smartmedix.net/?reg=28530801" 
                    className={styles.ctaButton}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaCalendarAlt />
                    Objednat se
                  </Link>
                  <Link 
                    href="/kontakt" 
                    className={styles.ctaButtonSecondary}
                  >
                    Kontakt
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}


