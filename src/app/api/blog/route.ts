import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { 
  getBlogPosts, 
  createBlogPost, 
  CATEGORIES,
  type BlogPost 
} from '@/lib/blogData';

// Explicitně nastavit runtime pro Vercel
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET - veřejné čtení dat (pouze publikované články)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const publishedParam = searchParams.get('published');
    
    console.log('API: Loading blog posts from MongoDB');
    
    const filteredPosts = await getBlogPosts({
      category: category,
      published: publishedParam === 'true' ? true : undefined
    });
    
    console.log('API: Loaded', filteredPosts.length, 'posts');
    
    return NextResponse.json({
      success: true,
      data: filteredPosts,
      categories: CATEGORIES
    });
  } catch (error) {
    console.error('Chyba při načítání blog článků:', error);
    return NextResponse.json(
      { success: false, error: 'Nepodařilo se načíst články' },
      { status: 500 }
    );
  }
}

// POST - chráněný zápis dat (pouze pro admin)
export async function POST(request: NextRequest) {
  try {
    console.log('API: Attempting to create new blog post');
    
    // Ověř autentifikaci
    const authCookie = request.cookies.get('admin-auth');
    const authHeader = request.headers.get('authorization');
    
    let token = '';
    if (authCookie) {
      token = authCookie.value;
    } else if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
    
    if (!token || !verifyAuth(token)) {
      console.log('API: Unauthorized access attempt');
      return NextResponse.json(
        { success: false, error: 'Neautorizovaný přístup' },
        { status: 401 }
      );
    }

    const requestData = await request.json();
    console.log('API: Received data:', requestData);
    
    // Validace dat
    if (!requestData.title || !requestData.content || !requestData.author || !requestData.category) {
      return NextResponse.json(
        { success: false, error: 'Chybí povinné údaje (název, obsah, autor, kategorie)' },
        { status: 400 }
      );
    }

    // Validace kategorie
    if (!Object.keys(CATEGORIES).includes(requestData.category)) {
      return NextResponse.json(
        { success: false, error: 'Neplatná kategorie' },
        { status: 400 }
      );
    }

    // Vytvoření nového článku pomocí sdílené funkce
    const newPost = await createBlogPost({
      title: requestData.title,
      content: requestData.content,
      image: requestData.image || undefined,
      author: requestData.author,
      category: requestData.category,
      published: requestData.published === true,
      seo: {
        metaDescription: requestData.seo?.metaDescription || '',
        keywords: requestData.seo?.keywords || ''
      }
    });

    console.log('API: Blog post created successfully:', newPost.id);

    return NextResponse.json({
      success: true,
      data: newPost,
      message: 'Článek byl úspěšně vytvořen'
    });

  } catch (error) {
    console.error('Chyba při vytváření blog článku:', error);
    return NextResponse.json(
      { success: false, error: 'Nepodařilo se vytvořit článek' },
      { status: 500 }
    );
  }
}
