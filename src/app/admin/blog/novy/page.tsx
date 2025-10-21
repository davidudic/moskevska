'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

export default function AdminBlogNew() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    author: 'MUDr. Jaroslav Chaluš',
    category: 'obecne' as keyof typeof CATEGORIES,
    published: false,
    seo: {
      metaDescription: '',
      keywords: ''
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const router = useRouter();

  // Zkontroluj přihlášení při načtení
  useEffect(() => {
    console.log('Admin blog new: Starting auth check...');
    const checkAuth = async () => {
      try {
        console.log('Admin blog new: Fetching /api/auth/check...');
        const response = await fetch('/api/auth/check', {
          cache: 'no-store'
        });
        console.log('Admin blog new: Auth check response status:', response.status);
        const result = await response.json();
        console.log('Admin blog new: Auth check result:', result);
        
        if (!result.authenticated) {
          console.log('Admin blog new: Not authenticated, redirecting to login...');
          router.push('/admin/login?returnUrl=/admin/blog/novy');
          return;
        }
        
        console.log('Admin blog new: Authenticated, setting state...');
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Admin blog new: Auth check error:', error);
        router.push('/admin/login?returnUrl=/admin/blog/novy');
      }
    };
    
    checkAuth();
  }, [router]);

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
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        cache: 'no-store',
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: 'success', text: 'Článek byl úspěšně vytvořen' });
        setTimeout(() => {
          router.push('/admin/blog');
        }, 1500);
      } else {
        setMessage({ type: 'error', text: result.error || 'Nepodařilo se vytvořit článek' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Chyba při vytváření článku' });
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

  if (!isAuthenticated) {
    return (
      <div className={styles.loadingContainer}>
        <FaSpinner className={styles.spinner} />
        <p>Ověřuji přihlášení...</p>
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
              <h1 className={styles.title}>Nový článek</h1>
              <p className={styles.subtitle}>Vytvořte nový článek pro blog</p>
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
                        ? 'Článek bude viditelný na webu' 
                        : 'Článek bude uložen jako koncept'
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
                    {formData.published ? 'Publikovat článek' : 'Uložit jako koncept'}
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
