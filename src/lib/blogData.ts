import { getDatabase } from './mongodb';
import { ObjectId } from 'mongodb';

// Blog post interface
export interface BlogPost {
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

// MongoDB document interface (internal use)
interface BlogPostDocument extends Omit<BlogPost, 'id'> {
  _id?: ObjectId;
  id: number;
}

// Kategorie
export const CATEGORIES = {
  vse: 'Vše',
  laser: 'Laserová epilace',
  chirurgie: 'Chirurgické výkony',
  prevence: 'Prevence',
  obecne: 'Obecné'
};

const COLLECTION_NAME = 'blogPosts';

// Helper funkce pro vytvoření slug z názvu
export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // odstraní diakritiku
    .replace(/[^a-z0-9\s-]/g, '') // odstraní speciální znaky
    .replace(/\s+/g, '-') // mezery na pomlčky
    .replace(/-+/g, '-') // více pomlček na jednu
    .trim();
}

// Helper pro získání dalšího ID
async function getNextId(): Promise<number> {
  const db = await getDatabase();
  const collection = db.collection<BlogPostDocument>(COLLECTION_NAME);
  
  // Najdi nejvyšší ID
  const lastPost = await collection
    .find({})
    .sort({ id: -1 })
    .limit(1)
    .toArray();
  
  return lastPost.length > 0 ? lastPost[0].id + 1 : 1;
}

// Načtení článků s filtrováním
export async function getBlogPosts(options?: {
  category?: string;
  published?: boolean;
  slug?: string;
  id?: number;
}): Promise<BlogPost[]> {
  try {
    const db = await getDatabase();
    const collection = db.collection<BlogPostDocument>(COLLECTION_NAME);
    
    // Vytvoření filtru
    const filter: any = {};
    
    if (options?.category && options.category !== 'vse') {
      filter.category = options.category;
    }
    
    if (options?.published !== undefined) {
      filter.published = options.published;
    }
    
    if (options?.slug) {
      filter.slug = options.slug;
    }
    
    if (options?.id !== undefined) {
      filter.id = options.id;
    }
    
    // Načtení dat
    const posts = await collection
      .find(filter)
      .sort({ dateCreated: -1 })
      .toArray();
    
    // Konverze MongoDB dokumentů na BlogPost interface
    return posts.map(post => {
      const { _id, ...rest } = post;
      return rest as BlogPost;
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Získání jednoho článku podle slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts({ slug });
  return posts[0];
}

// Získání jednoho článku podle ID
export async function getBlogPostById(id: number): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts({ id });
  return posts[0];
}

// Vytvoření nového článku
export async function createBlogPost(data: Omit<BlogPost, 'id' | 'slug' | 'dateCreated' | 'dateUpdated'>): Promise<BlogPost> {
  try {
    const db = await getDatabase();
    const collection = db.collection<BlogPostDocument>(COLLECTION_NAME);
    
    const nextId = await getNextId();
    const slug = createSlug(data.title);
    
    // Kontrola unikátnosti slug
    const existingSlug = await collection.findOne({ slug });
    const finalSlug = existingSlug ? `${slug}-${nextId}` : slug;
    
    const newPost: BlogPostDocument = {
      id: nextId,
      title: data.title.trim(),
      slug: finalSlug,
      content: data.content,
      image: data.image,
      author: data.author.trim(),
      category: data.category,
      dateCreated: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
      published: data.published,
      seo: {
        metaDescription: data.seo?.metaDescription?.trim() || '',
        keywords: data.seo?.keywords?.trim() || ''
      }
    };
    
    await collection.insertOne(newPost);
    
    const { _id, ...rest } = newPost;
    return rest as BlogPost;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw new Error('Failed to create blog post');
  }
}

// Aktualizace článku
export async function updateBlogPost(id: number, data: Partial<Omit<BlogPost, 'id' | 'dateCreated'>>): Promise<BlogPost | null> {
  try {
    const db = await getDatabase();
    const collection = db.collection<BlogPostDocument>(COLLECTION_NAME);
    
    // Najdi existující článek
    const existingPost = await collection.findOne({ id });
    
    if (!existingPost) {
      return null;
    }
    
    // Připrav aktualizovaná data
    const updateData: Partial<BlogPostDocument> = {
      ...data,
      dateUpdated: new Date().toISOString(),
    };
    
    // Pokud se změnil název, aktualizuj slug
    if (data.title && data.title !== existingPost.title) {
      const newSlug = createSlug(data.title);
      
      // Kontrola unikátnosti slug
      const existingSlug = await collection.findOne({ 
        slug: newSlug, 
        id: { $ne: id } 
      });
      
      updateData.slug = existingSlug ? `${newSlug}-${id}` : newSlug;
    }
    
    // Aktualizuj v databázi
    await collection.updateOne(
      { id },
      { $set: updateData }
    );
    
    // Načti a vrať aktualizovaný článek
    const updatedPost = await collection.findOne({ id });
    
    if (!updatedPost) {
      return null;
    }
    
    const { _id, ...rest } = updatedPost;
    return rest as BlogPost;
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw new Error('Failed to update blog post');
  }
}

// Smazání článku
export async function deleteBlogPost(id: number): Promise<boolean> {
  try {
    const db = await getDatabase();
    const collection = db.collection<BlogPostDocument>(COLLECTION_NAME);
    
    const result = await collection.deleteOne({ id });
    
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw new Error('Failed to delete blog post');
  }
}
