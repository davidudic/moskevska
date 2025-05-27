import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

// Explicitně nastavit runtime pro Vercel
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    console.log('Auth check: Starting...');
    
    // Zkus cookies i headers
    const authCookie = request.cookies.get('admin-auth');
    const authHeader = request.headers.get('authorization');
    
    console.log('Auth check: Cookie exists:', !!authCookie);
    console.log('Auth check: Header exists:', !!authHeader);
    
    let token = '';
    if (authCookie) {
      token = authCookie.value;
      console.log('Auth check: Using cookie token');
    } else if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
      console.log('Auth check: Using header token');
    }
    
    if (token) {
      console.log('Auth check: Token length:', token.length);
      console.log('Auth check: Token preview:', token.substring(0, 20) + '...');
    }
    
    const isAuthenticated = token && verifyAuth(token);
    console.log('Auth check: verifyAuth result:', isAuthenticated);
    
    return NextResponse.json({
      success: true,
      authenticated: !!isAuthenticated,
      debug: {
        hasCookie: !!authCookie,
        hasHeader: !!authHeader,
        tokenLength: token.length || 0
      }
    });
  } catch (error) {
    console.error('Auth check: Error:', error);
    return NextResponse.json({
      success: false,
      authenticated: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}