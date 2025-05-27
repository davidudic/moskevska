import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAuth } from '@/lib/auth';

export async function GET() {
  try {
    const cookieStore = cookies();
    const authCookie = cookieStore.get('admin-auth');
    
    const isAuthenticated = authCookie && verifyAuth(authCookie.value);
    
    return NextResponse.json({
      success: true,
      authenticated: !!isAuthenticated
    });
  } catch (error) {
    console.error('Chyba při ověřování stavu přihlášení:', error);
    return NextResponse.json({
      success: false,
      authenticated: false
    });
  }
}