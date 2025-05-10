import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { prisma } from '@/lib/prisma';
import styles from './page.module.css';
import { Post, Category } from '@prisma/client';

export const metadata = {
  title: 'Blog | Chirurgická ambulance',
  description: 'Články a novinky z chirurgické ambulance Moskevská.',
};

// Definujeme typy pro blog post s rozšířenými informacemi
type PostWithAuthorAndCategories = Post & {
  author: {
    name: string | null;
  };
  categories: {
    name: string;
    slug: string;
  }[];
};

async function getPosts(): Promise<PostWithAuthorAndCategories[]> {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: {
        select: {
          name: true,
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
  
  return posts;
}

export default async function BlogPage() {
  const posts = await getPosts();
  
  return (
    <Layout>
      <div className={styles.blogContainer}>
        <div className="container">
          <h1 className={styles.blogTitle}>Blog</h1>
          <p className={styles.blogDescription}>
            Vítejte na blogu Chirurgické ambulance Moskevská. Zde najdete 
            zajímavé články, novinky a informace z oblasti zdraví a medicíny.
          </p>
          
          {posts.length === 0 ? (
            <div className={styles.noPosts}>
              <p>Zatím nebyly publikovány žádné články.</p>
            </div>
          ) : (
            <div className={styles.postsGrid}>
              {posts.map((post) => (
                <article key={post.id} className={styles.postCard}>
                  {post.coverImage && (
                    <div className={styles.postImageContainer}>
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        width={400}
                        height={225}
                        className={styles.postImage}
                      />
                    </div>
                  )}
                  <div className={styles.postContent}>
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
                    <h2 className={styles.postTitle}>
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    {post.excerpt && (
                      <p className={styles.postExcerpt}>{post.excerpt}</p>
                    )}
                    <div className={styles.postMeta}>
                      {post.author.name && (
                        <span className={styles.postAuthor}>{post.author.name}</span>
                      )}
                      <span className={styles.postDate}>
                        {new Date(post.createdAt).toLocaleDateString('cs-CZ', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                      Číst více
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 