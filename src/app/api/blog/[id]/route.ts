import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { 
  getBlogPostById, 
  updateBlogPost, 
  deleteBlogPost 
} from '@/lib/blogData';

// Explicitně nastavit runtime pro Vercel
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET - veřejné čtení jednoho článku
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Neplatné ID článku' },
        { status: 400 }
      );
    }

    console.log('API: Loading blog post with ID:', id);
    
    const post = await getBlogPostById(id);
    
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Článek nebyl nalezen' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Chyba při načítání blog článku:', error);
    return NextResponse.json(
      { success: false, error: 'Nepodařilo se načíst článek' },
      { status: 500 }
    );
  }
}

// PUT - chráněná editace článku (pouze pro admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Neplatné ID článku' },
        { status: 400 }
      );
    }

    console.log('API: Attempting to update blog post with ID:', id);
    
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
    console.log('API: Received update data:', requestData);
    
    // Validace dat
    if (!requestData.title || !requestData.content || !requestData.author || !requestData.category) {
      return NextResponse.json(
        { success: false, error: 'Chybí povinné údaje (název, obsah, autor, kategorie)' },
        { status: 400 }
      );
    }

    // Validace kategorie
    const validCategories = ['vse', 'laser', 'chirurgie', 'prevence', 'obecne'];
    if (!validCategories.includes(requestData.category)) {
      return NextResponse.json(
        { success: false, error: 'Neplatná kategorie' },
        { status: 400 }
      );
    }

    // Aktualizace článku pomocí sdílené funkce
    const updatedPost = await updateBlogPost(id, {
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

    if (!updatedPost) {
      return NextResponse.json(
        { success: false, error: 'Článek nebyl nalezen' },
        { status: 404 }
      );
    }

    console.log('API: Blog post updated successfully:', id);

    return NextResponse.json({
      success: true,
      data: updatedPost,
      message: 'Článek byl úspěšně aktualizován'
    });

  } catch (error) {
    console.error('Chyba při aktualizaci blog článku:', error);
    return NextResponse.json(
      { success: false, error: 'Nepodařilo se aktualizovat článek' },
      { status: 500 }
    );
  }
}

// DELETE - chráněné smazání článku (pouze pro admin)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'Neplatné ID článku' },
        { status: 400 }
      );
    }

    console.log('API: Attempting to delete blog post with ID:', id);
    
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

    // Smazání pomocí sdílené funkce
    const deleted = await deleteBlogPost(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Článek nebyl nalezen' },
        { status: 404 }
      );
    }

    console.log('API: Blog post deleted successfully:', id);

    return NextResponse.json({
      success: true,
      message: 'Článek byl úspěšně smazán'
    });

  } catch (error) {
    console.error('Chyba při mazání blog článku:', error);
    return NextResponse.json(
      { success: false, error: 'Nepodařilo se smazat článek' },
      { status: 500 }
    );
  }
}




