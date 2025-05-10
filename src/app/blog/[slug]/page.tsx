import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { prisma } from '@/lib/prisma';
import styles from './page.module.css';
import { notFound } from 'next/navigation';

type BlogPostParams = {
  params: {
    slug: string;
  };
};

// Generování metadat pro stránku
export async function generateMetadata({ params }: BlogPostParams) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Článek nenalezen | Blog',
      description: 'Požadovaný článek nebyl nalezen',
    };
  }
  
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt || `Přečtěte si článek ${post.title}`,
  };
}

// Načtení dat blogového příspěvku podle slugu
async function getPostBySlug(slug: string) {
  const post = await prisma.post.findUnique({
    where: {
      slug: slug,
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
      categories: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });
  
  return post;
}

export default async function BlogPostPage({ params }: BlogPostParams) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <Layout>
      <article className={styles.blogPost}>
        <div className="container">
          {/* Hlavička článku */}
          <header className={styles.postHeader}>
            <div className={styles.postCategories}>
              {post.categories.map((category) => (
                <Link 
                  key={category.slug} 
                  href={`/blog/kategorie/${category.slug}`}
                  className={styles.categoryTag}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <h1 className={styles.postTitle}>{post.title}</h1>
            <div className={styles.postMeta}>
              {post.author.name && (
                <div className={styles.authorInfo}>
                  {post.author.image && (
                    <Image 
                      src={post.author.image} 
                      alt={post.author.name} 
                      width={40} 
                      height={40}
                      className={styles.authorImage}
                    />
                  )}
                  <span className={styles.authorName}>{post.author.name}</span>
                </div>
              )}
              <time className={styles.postDate}>
                {new Date(post.createdAt).toLocaleDateString('cs-CZ', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </div>
          </header>
          
          {/* Hlavní obrázek článku */}
          {post.coverImage && (
            <div className={styles.postImageContainer}>
              <Image
                src={post.coverImage}
                alt={post.title}
                width={1200}
                height={675}
                className={styles.postImage}
              />
            </div>
          )}
          
          {/* Obsah článku */}
          <div 
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* Patička článku */}
          <footer className={styles.postFooter}>
            <Link href="/blog" className={styles.backToList}>
              ← Zpět na seznam článků
            </Link>
          </footer>
        </div>
      </article>
    </Layout>
  );
} 