import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import JsonLd from '@/components/layout/JsonLd';
import ShareButtons from '@/components/blog/ShareButtons';
import styles from './blog-detail.module.css';
import { FaCalendarAlt, FaUser, FaTag, FaArrowLeft } from 'react-icons/fa';
import { getBlogPostBySlug, CATEGORIES, type BlogPost } from '@/lib/blogData';

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Článek nenalezen - Chirurgická ambulance Moskevská',
      description: 'Požadovaný článek nebyl nalezen.',
    };
  }

  return {
    title: `${post.title} - Blog | Chirurgická ambulance Moskevská`,
    description: post.seo.metaDescription || post.title,
    keywords: post.seo.keywords || 'chirurgie, zdravotní péče, blog',
    alternates: {
      canonical: `https://chirurgie-moskevska.cz/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.seo.metaDescription || post.title,
      url: `https://chirurgie-moskevska.cz/blog/${post.slug}`,
      images: post.image ? [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : [
        {
          url: '/images/hero-background.webp',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.dateCreated,
      modifiedTime: post.dateUpdated,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.seo.metaDescription || post.title,
      images: post.image ? [post.image] : ['/images/hero-background.webp'],
    },
  };
}

export default async function BlogDetailPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

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

  // JSON-LD pro SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seo.metaDescription || post.title,
    image: post.image || '/images/hero-background.webp',
    datePublished: post.dateCreated,
    dateModified: post.dateUpdated,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Chirurgická ambulance Moskevská',
      logo: {
        '@type': 'ImageObject',
        url: 'https://chirurgie-moskevska.cz/images/logo.webp',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://chirurgie-moskevska.cz/blog/${post.slug}`,
    },
  };

  return (
    <Layout>
      <JsonLd data={jsonLd} />
      
      <div className={styles.blogDetailContainer}>
        <div className="container">
          {/* Breadcrumbs */}
          <nav className={styles.breadcrumbs}>
            <Link href="/" className={styles.breadcrumbLink}>Úvod</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link href="/blog" className={styles.breadcrumbLink}>Blog</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent}>{post.title}</span>
          </nav>

          {/* Navigace zpět */}
          <div className={styles.backNavigation}>
            <Link href="/blog" className={styles.backButton}>
              <FaArrowLeft />
              Zpět na blog
            </Link>
          </div>

          {/* Hlavní obsah článku */}
          <article className={styles.article}>
            {/* Header článku */}
            <header className={styles.articleHeader}>
              <div 
                className={styles.categoryBadge}
                style={{ backgroundColor: getCategoryColor(post.category) }}
              >
                <FaTag />
                {getCategoryLabel(post.category)}
              </div>
              
              <h1 className={styles.articleTitle}>{post.title}</h1>
              
              <div className={styles.articleMeta}>
                <div className={styles.metaItem}>
                  <FaUser />
                  <span>{post.author}</span>
                </div>
                <div className={styles.metaItem}>
                  <FaCalendarAlt />
                  <span>{formatDate(post.dateCreated)}</span>
                </div>
                {post.dateUpdated !== post.dateCreated && (
                  <div className={styles.metaItem}>
                    <FaCalendarAlt />
                    <span>Upraveno: {formatDate(post.dateUpdated)}</span>
                  </div>
                )}
              </div>
            </header>

            {/* Obrázek článku */}
            {post.image && (
              <div className={styles.articleImage}>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={800}
                  height={400}
                  className={styles.image}
                  priority
                />
              </div>
            )}

            {/* Obsah článku */}
            <div className={styles.articleContent}>
              <div 
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Sdílení */}
            <ShareButtons 
              url={`https://chirurgie-moskevska.cz/blog/${post.slug}`}
              title={post.title}
            />
          </article>

          {/* Call to action */}
          <div className={styles.ctaSection}>
            <div className={styles.ctaContent}>
              <h3>Potřebujete konzultaci?</h3>
              <p>Máte otázky k tomuto tématu? Rádi vám poskytneme odbornou konzultaci.</p>
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
        </div>
      </div>
    </Layout>
  );
}
