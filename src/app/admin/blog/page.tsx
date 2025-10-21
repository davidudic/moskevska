'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './admin-blog.module.css';
import { 
  FaNewspaper, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaEyeSlash,
  FaSpinner, 
  FaCheck, 
  FaExclamationTriangle,
  FaSignOutAlt,
  FaHome,
  FaCalendarAlt,
  FaUser,
  FaTag
} from 'react-icons/fa';

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

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const router = useRouter();

  // Zkontroluj přihlášení při načtení
  useEffect(() => {
    console.log('Admin blog: Starting auth check...');
    const checkAuth = async () => {
      try {
        console.log('Admin blog: Fetching /api/auth/check...');
        const response = await fetch('/api/auth/check', {
          cache: 'no-store'
        });
        console.log('Admin blog: Auth check response status:', response.status);
        const result = await response.json();
        console.log('Admin blog: Auth check result:', result);
        
        if (!result.authenticated) {
          console.log('Admin blog: Not authenticated, redirecting to login...');
          router.push('/admin/login?returnUrl=/admin/blog');
          return;
        }
        
        console.log('Admin blog: Authenticated, setting state...');
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Admin blog: Auth check error:', error);
        router.push('/admin/login?returnUrl=/admin/blog');
      }
    };
    
    checkAuth();
  }, [router]);

  // Načti data při načtení komponenty - pouze pokud je přihlášen
  useEffect(() => {
    if (isAuthenticated) {
      loadPosts();
    }
  }, [isAuthenticated]);

  const loadPosts = async () => {
    console.log('Admin blog: Loading blog posts...');
    try {
      const response = await fetch('/api/blog', {
        cache: 'no-store'
      });
      console.log('Admin blog: Blog API response status:', response.status);
      const result = await response.json();
      console.log('Admin blog: Blog API result:', result);
      
      if (result.success && Array.isArray(result.data)) {
        console.log('Admin blog: Setting blog posts...');
        setPosts(result.data);
      } else {
        console.error('Admin blog: Failed to load blog posts:', result.error);
        setMessage({ type: 'error', text: 'Nepodařilo se načíst články' });
        setPosts([]); // Ensure posts is always an array
      }
    } catch (error) {
      console.error('Admin blog: Blog API error:', error);
      setMessage({ type: 'error', text: 'Chyba při načítání článků' });
      setPosts([]); // Ensure posts is always an array
    } finally {
      console.log('Admin blog: Setting loading to false...');
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Opravdu chcete smazat článek "${title}"? Tato akce je nevratná.`)) {
      return;
    }

    setDeletingId(id);
    setMessage(null);

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
        cache: 'no-store',
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: 'success', text: 'Článek byl úspěšně smazán' });
        await loadPosts(); // Znovu načti seznam
      } else {
        setMessage({ type: 'error', text: result.error || 'Nepodařilo se smazat článek' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Chyba při mazání článku' });
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Chyba při odhlašování:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('cs-CZ');
  };

  const getCategoryLabel = (category: string) => {
    return CATEGORIES[category as keyof typeof CATEGORIES] || category;
  };

  if (!isAuthenticated || loading) {
    return (
      <div className={styles.loadingContainer}>
        <FaSpinner className={styles.spinner} />
        <p>{!isAuthenticated ? 'Ověřuji přihlášení...' : 'Načítám články...'}</p>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <header className={styles.adminHeader}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <FaNewspaper className={styles.headerIcon} />
            <div>
              <h1 className={styles.title}>Správa blogu</h1>
              <p className={styles.subtitle}>
                Celkem článků: {posts.length} | Publikováno: {posts.filter(p => p.published).length}
              </p>
            </div>
          </div>
          <div className={styles.headerActions}>
            <Link
              href="/admin/blog/novy"
              className={styles.newButton}
              title="Nový článek"
            >
              <FaPlus />
              Nový článek
            </Link>
            <Link
              href="/admin/ordinace"
              className={styles.backButton}
              title="Zpět na ordinaci"
            >
              <FaCalendarAlt />
              Ordinace
            </Link>
            <Link
              href="/"
              className={styles.homeButton}
              title="Přejít na web"
            >
              <FaHome />
              Web
            </Link>
            <button
              onClick={handleLogout}
              className={styles.logoutButton}
              title="Odhlásit se"
            >
              <FaSignOutAlt />
              Odhlásit
            </button>
          </div>
        </div>
      </header>

      <main className={styles.adminMain}>
        {message && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.type === 'success' ? <FaCheck /> : <FaExclamationTriangle />}
            {message.text}
          </div>
        )}

        <div className={styles.postsContainer}>
          {posts.length === 0 ? (
            <div className={styles.emptyState}>
              <FaNewspaper className={styles.emptyIcon} />
              <h3>Žádné články</h3>
              <p>Zatím nemáte žádné články. Vytvořte první článek kliknutím na tlačítko "Nový článek".</p>
              <Link href="/admin/blog/novy" className={styles.emptyButton}>
                <FaPlus />
                Vytvořit první článek
              </Link>
            </div>
          ) : (
            <div className={styles.postsGrid}>
              {posts.map((post) => (
                <div key={post.id} className={styles.postCard}>
                  <div className={styles.postHeader}>
                    <div className={styles.postTitle}>
                      <h3>{post.title}</h3>
                      <div className={styles.postMeta}>
                        <span className={`${styles.status} ${post.published ? styles.published : styles.draft}`}>
                          {post.published ? <FaEye /> : <FaEyeSlash />}
                          {post.published ? 'Publikováno' : 'Koncept'}
                        </span>
                        <span className={styles.category}>
                          <FaTag />
                          {getCategoryLabel(post.category)}
                        </span>
                      </div>
                    </div>
                    <div className={styles.postActions}>
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className={styles.editButton}
                        title="Upravit článek"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        className={styles.deleteButton}
                        title="Smazat článek"
                        disabled={deletingId === post.id}
                      >
                        {deletingId === post.id ? <FaSpinner className={styles.spinner} /> : <FaTrash />}
                      </button>
                    </div>
                  </div>

                  <div className={styles.postContent}>
                    <div className={styles.postInfo}>
                      <div className={styles.postInfoItem}>
                        <FaUser />
                        <span>{post.author}</span>
                      </div>
                      <div className={styles.postInfoItem}>
                        <FaCalendarAlt />
                        <span>Vytvořeno: {formatDate(post.dateCreated)}</span>
                      </div>
                      {post.dateUpdated !== post.dateCreated && (
                        <div className={styles.postInfoItem}>
                          <FaCalendarAlt />
                          <span>Upraveno: {formatDate(post.dateUpdated)}</span>
                        </div>
                      )}
                    </div>

                    {post.image && (
                      <div className={styles.postImage}>
                        <img src={post.image} alt={post.title} />
                      </div>
                    )}

                    <div className={styles.postExcerpt}>
                      <div dangerouslySetInnerHTML={{ 
                        __html: post.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...' 
                      }} />
                    </div>

                    {post.seo.metaDescription && (
                      <div className={styles.postSeo}>
                        <strong>SEO popis:</strong> {post.seo.metaDescription}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}




