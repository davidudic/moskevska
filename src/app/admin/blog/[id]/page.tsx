'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import styles from '../admin-blog-form.module.css';
import RichTextEditor from '@/components/blog/RichTextEditor';
import { 
  FaNewspaper, 
  FaSave, 
  FaTimes, 
  FaSpinner, 
  FaCheck, 
  FaExclamationTriangle,
  FaSignOutAlt,
  FaHome,
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaTag,
  FaImage,
  FaSearch
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

export default function AdminBlogEdit() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    author: '',
    category: 'obecne' as keyof typeof CATEGORIES,
    published: false,
    seo: {
      metaDescription: '',
      keywords: ''
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [post, setPost] = useState<BlogPost | null>(null);

  // Zkontroluj přihlášení při načtení
  useEffect(() => {
    console.log('Admin blog edit: Starting auth check...');
    const checkAuth = async () => {
      try {
        console.log('Admin blog edit: Fetching /api/auth/check...');
        const response = await fetch('/api/auth/check', {
          cache: 'no-store'
        });
        console.log('Admin blog edit: Auth check response status:', response.status);
        const result = await response.json();
        console.log('Admin blog edit: Auth check result:', result);
        
        if (!result.authenticated) {
          console.log('Admin blog edit: Not authenticated, redirecting to login...');
          router.push(`/admin/login?returnUrl=/admin/blog/${postId}`);
          return;
        }
        
        console.log('Admin blog edit: Authenticated, setting state...');
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Admin blog edit: Auth check error:', error);
        router.push(`/admin/login?returnUrl=/admin/blog/${postId}`);
      }
    };
    
    checkAuth();
  }, [router, postId]);

  // Načti článek při načtení komponenty - pouze pokud je přihlášen
  useEffect(() => {
    if (isAuthenticated) {
      loadPost();
    }
  }, [isAuthenticated, postId]);

  const loadPost = async () => {
    console.log('Admin blog edit: Loading blog post with ID:', postId);
    try {
      const response = await fetch(`/api/blog/${postId}`, {
        cache: 'no-store'
      });
      console.log('Admin blog edit: Blog API response status:', response.status);
      const result = await response.json();
      console.log('Admin blog edit: Blog API result:', result);
      
      if (result.success) {
        console.log('Admin blog edit: Setting blog post data...');
        const postData = result.data;
        setPost(postData);
        setFormData({
          title: postData.title,
          content: postData.content,
          image: postData.image || '',
          author: postData.author,
          category: postData.category,
          published: postData.published,
          seo: {
            metaDescription: postData.seo.metaDescription,
            keywords: postData.seo.keywords
          }
        });
      } else {
        console.error('Admin blog edit: Failed to load blog post:', result.error);
        setMessage({ type: 'error', text: 'Nepodařilo se načíst článek' });
      }
    } catch (error) {
      console.error('Admin blog edit: Blog API error:', error);
      setMessage({ type: 'error', text: 'Chyba při načítání článku' });
    } finally {
      console.log('Admin blog edit: Setting loading to false...');
      setLoadingPost(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('seo.')) {
      const seoField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          [seoField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setMessage({ type: 'error', text: 'Název a obsah jsou povinné' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/blog/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        cache: 'no-store',
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: 'success', text: 'Článek byl úspěšně aktualizován' });
        setTimeout(() => {
          router.push('/admin/blog');
        }, 1500);
      } else {
        setMessage({ type: 'error', text: result.error || 'Nepodařilo se aktualizovat článek' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Chyba při aktualizaci článku' });
    } finally {
      setLoading(false);
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

  if (!isAuthenticated || loadingPost) {
    return (
      <div className={styles.loadingContainer}>
        <FaSpinner className={styles.spinner} />
        <p>{!isAuthenticated ? 'Ověřuji přihlášení...' : 'Načítám článek...'}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.loadingContainer}>
        <FaExclamationTriangle className={styles.errorIcon} />
        <p>Článek nebyl nalezen</p>
        <Link href="/admin/blog" className={styles.retryButton}>
          Zpět na seznam
        </Link>
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
              <h1 className={styles.title}>Upravit článek</h1>
              <p className={styles.subtitle}>
                {post.title} | Vytvořeno: {new Date(post.dateCreated).toLocaleDateString('cs-CZ')}
              </p>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={styles.previewButton}
              title={showPreview ? 'Skrýt náhled' : 'Zobrazit náhled'}
            >
              {showPreview ? <FaEyeSlash /> : <FaEye />}
              {showPreview ? 'Skrýt náhled' : 'Náhled'}
            </button>
            <Link
              href="/admin/blog"
              className={styles.backButton}
              title="Zpět na seznam"
            >
              <FaArrowLeft />
              Zpět
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

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.blogForm}>
            <div className={styles.formGrid}>
              {/* Hlavní formulář */}
              <div className={styles.mainForm}>
                <div className={styles.inputGroup}>
                  <label htmlFor="title">
                    <FaNewspaper />
                    Název článku *
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Zadejte název článku..."
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="content">
                    <FaNewspaper />
                    Obsah článku *
                  </label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(value) => handleInputChange('content', value)}
                    placeholder="Napište obsah článku..."
                    height={400}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="image">
                    <FaImage />
                    URL obrázku (nepovinné)
                  </label>
                  <input
                    type="url"
                    id="image"
                    value={formData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              {/* Sidebar s dalšími nastaveními */}
              <div className={styles.sidebar}>
                <div className={styles.sidebarCard}>
                  <h3>Publikování</h3>
                  <div className={styles.inputGroup}>
                    <label className={styles.toggleLabel}>
                      <input
                        type="checkbox"
                        checked={formData.published}
                        onChange={(e) => handleInputChange('published', e.target.checked)}
                      />
                      <span className={styles.toggleSlider}></span>
                      Publikovat článek
                    </label>
                    <p className={styles.helpText}>
                      {formData.published 
                        ? 'Článek je viditelný na webu' 
                        : 'Článek je uložen jako koncept'
                      }
                    </p>
                  </div>
                </div>

                <div className={styles.sidebarCard}>
                  <h3>Kategorie</h3>
                  <div className={styles.inputGroup}>
                    <label htmlFor="category">
                      <FaTag />
                      Kategorie
                    </label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                    >
                      {Object.entries(CATEGORIES).map(([key, label]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.sidebarCard}>
                  <h3>Autor</h3>
                  <div className={styles.inputGroup}>
                    <label htmlFor="author">
                      <FaUser />
                      Autor
                    </label>
                    <input
                      type="text"
                      id="author"
                      value={formData.author}
                      onChange={(e) => handleInputChange('author', e.target.value)}
                      placeholder="Jméno autora"
                    />
                  </div>
                </div>

                <div className={styles.sidebarCard}>
                  <h3>SEO</h3>
                  <div className={styles.inputGroup}>
                    <label htmlFor="metaDescription">
                      <FaSearch />
                      Meta popis
                    </label>
                    <textarea
                      id="metaDescription"
                      value={formData.seo.metaDescription}
                      onChange={(e) => handleInputChange('seo.metaDescription', e.target.value)}
                      placeholder="Krátký popis pro vyhledávače (150-160 znaků)"
                      rows={3}
                    />
                    <div className={styles.charCount}>
                      {formData.seo.metaDescription.length}/160
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="keywords">
                      <FaSearch />
                      Klíčová slova
                    </label>
                    <input
                      type="text"
                      id="keywords"
                      value={formData.seo.keywords}
                      onChange={(e) => handleInputChange('seo.keywords', e.target.value)}
                      placeholder="klíčová, slova, oddělená, čárkami"
                    />
                  </div>
                </div>

                <div className={styles.sidebarCard}>
                  <h3>Informace o článku</h3>
                  <div className={styles.postInfo}>
                    <div className={styles.postInfoItem}>
                      <strong>ID:</strong> {post.id}
                    </div>
                    <div className={styles.postInfoItem}>
                      <strong>Slug:</strong> {post.slug}
                    </div>
                    <div className={styles.postInfoItem}>
                      <strong>Vytvořeno:</strong> {new Date(post.dateCreated).toLocaleString('cs-CZ')}
                    </div>
                    <div className={styles.postInfoItem}>
                      <strong>Naposledy upraveno:</strong> {new Date(post.dateUpdated).toLocaleString('cs-CZ')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.formActions}>
              <button
                type="submit"
                disabled={loading}
                className={styles.saveButton}
              >
                {loading ? (
                  <>
                    <FaSpinner className={styles.spinner} />
                    Ukládám...
                  </>
                ) : (
                  <>
                    <FaSave />
                    {formData.published ? 'Aktualizovat publikovaný článek' : 'Uložit jako koncept'}
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Náhled článku */}
          {showPreview && (
            <div className={styles.previewContainer}>
              <h3>Náhled článku</h3>
              <div className={styles.previewContent}>
                <h1>{formData.title || 'Název článku'}</h1>
                <div className={styles.previewMeta}>
                  <span>Autor: {formData.author}</span>
                  <span>Kategorie: {CATEGORIES[formData.category]}</span>
                  <span>Status: {formData.published ? 'Publikováno' : 'Koncept'}</span>
                </div>
                {formData.image && (
                  <div className={styles.previewImage}>
                    <img src={formData.image} alt={formData.title} />
                  </div>
                )}
                <div 
                  className={styles.previewText}
                  dangerouslySetInnerHTML={{ __html: formData.content || '<p>Obsah článku...</p>' }}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
