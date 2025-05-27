import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAuth } from '@/lib/auth';

export async function GET() {
  try {
    console.log('Auth check: Starting...');
    const cookieStore = cookies();
    const authCookie = cookieStore.get('admin-auth');
    
    console.log('Auth check: Cookie exists:', !!authCookie);
    if (authCookie) {
      console.log('Auth check: Cookie value length:', authCookie.value.length);
      console.log('Auth check: Cookie value preview:', authCookie.value.substring(0, 20) + '...');
    }
    
    const isAuthenticated = authCookie && verifyAuth(authCookie.value);
    console.log('Auth check: verifyAuth result:', isAuthenticated);
    
    return NextResponse.json({
      success: true,
      authenticated: !!isAuthenticated,
      debug: {
        hasCookie: !!authCookie,
        cookieLength: authCookie?.value.length || 0
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