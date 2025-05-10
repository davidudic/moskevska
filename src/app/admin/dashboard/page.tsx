import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import styles from './page.module.css';

// Metadata pro stránku
export const metadata = {
  title: 'Admin Dashboard | Chirurgická ambulance',
};

// Získání statistik pro dashboard
async function getDashboardStats() {
  const [
    totalPosts,
    publishedPosts,
    draftPosts,
    totalCategories
  ] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.post.count({ where: { published: false } }),
    prisma.category.count()
  ]);
  
  // Získání posledních 5 článků
  const recentPosts = await prisma.post.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    take: 5,
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  
  return {
    totalPosts,
    publishedPosts,
    draftPosts,
    totalCategories,
    recentPosts,
  };
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.description}>
          Vítejte v administraci webu Chirurgické ambulance Moskevská
        </p>
      </header>
      
      {/* Statistiky */}
      <section className={styles.statsSection}>
        <h2 className={styles.sectionTitle}>Přehled</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.totalPosts}</div>
            <div className={styles.statLabel}>Celkem článků</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.publishedPosts}</div>
            <div className={styles.statLabel}>Publikovaných</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.draftPosts}</div>
            <div className={styles.statLabel}>Konceptů</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.totalCategories}</div>
            <div className={styles.statLabel}>Kategorií</div>
          </div>
        </div>
      </section>
      
      {/* Rychlé akce */}
      <section className={styles.actionsSection}>
        <h2 className={styles.sectionTitle}>Rychlé akce</h2>
        <div className={styles.actionsGrid}>
          <Link href="/admin/blog/new" className={styles.actionCard}>
            <div className={styles.actionTitle}>Nový článek</div>
            <div className={styles.actionDescription}>Vytvořit nový blogový příspěvek</div>
          </Link>
          <Link href="/admin/blog" className={styles.actionCard}>
            <div className={styles.actionTitle}>Správa blogu</div>
            <div className={styles.actionDescription}>Upravit nebo smazat existující články</div>
          </Link>
          <Link href="/admin/categories" className={styles.actionCard}>
            <div className={styles.actionTitle}>Kategorie</div>
            <div className={styles.actionDescription}>Spravovat kategorie článků</div>
          </Link>
          <Link href="/blog" className={styles.actionCard}>
            <div className={styles.actionTitle}>Zobrazit blog</div>
            <div className={styles.actionDescription}>Přejít na veřejnou stránku blogu</div>
          </Link>
        </div>
      </section>
      
      {/* Nedávné články */}
      <section className={styles.recentSection}>
        <h2 className={styles.sectionTitle}>Nedávné články</h2>
        {stats.recentPosts.length === 0 ? (
          <p className={styles.emptyMessage}>Zatím nebyly vytvořeny žádné články</p>
        ) : (
          <div className={styles.recentPostsList}>
            {stats.recentPosts.map((post) => (
              <div key={post.id} className={styles.recentPostItem}>
                <div className={styles.postInfo}>
                  <h3 className={styles.postTitle}>
                    <Link href={`/admin/blog/edit/${post.id}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <div className={styles.postMeta}>
                    <span className={styles.postStatus}>
                      {post.published ? 'Publikováno' : 'Koncept'}
                    </span>
                    <span className={styles.postDate}>
                      {new Date(post.updatedAt).toLocaleDateString('cs-CZ')}
                    </span>
                    {post.author?.name && (
                      <span className={styles.postAuthor}>
                        {post.author.name}
                      </span>
                    )}
                  </div>
                </div>
                <div className={styles.postActions}>
                  <Link href={`/admin/blog/edit/${post.id}`} className={styles.editButton}>
                    Upravit
                  </Link>
                  <Link href={`/blog/${post.slug}`} className={styles.viewButton}>
                    Zobrazit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
} 