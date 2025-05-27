import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, createAuthToken } from '@/lib/auth';

// Explicitně nastavit runtime pro Vercel
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Heslo je povinné' },
        { status: 400 }
      );
    }

    if (!verifyPassword(password)) {
      return NextResponse.json(
        { success: false, error: 'Nesprávné heslo' },
        { status: 401 }
      );
    }

    // Vytvoř auth token
    const authToken = createAuthToken();

    // Nastav cookie
    const response = NextResponse.json({
      success: true,
      message: 'Úspěšně přihlášen'
    });

    response.cookies.set('admin-auth', authToken, {
      httpOnly: true,
      secure: true, // Vždy true pro HTTPS
      sameSite: 'lax', // Místo 'strict' pro lepší kompatibilitu
      maxAge: 24 * 60 * 60, // 24 hodin
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Chyba při přihlašování:', error);
    return NextResponse.json(
      { success: false, error: 'Nepodařilo se přihlásit' },
      { status: 500 }
    );
  }
}