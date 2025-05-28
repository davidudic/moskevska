import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

// Explicitně nastavit runtime pro Vercel
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// In-memory storage pro alert (resetuje se při restart)
let inMemoryAlertData = {
  enabled: false,
  title: "POZOR - ZMĚNA ORDINAČNÍ DOBY",
  message: "V pátek 31.5. bude ordinace zavřená z důvodu školení.",
  lastUpdated: new Date().toISOString(),
  updatedBy: "system"
};

// GET - veřejné čtení dat
export async function GET() {
  try {
    console.log('API: Loading alert data from memory');
    
    return NextResponse.json({
      success: true,
      data: inMemoryAlertData
    });
  } catch (error) {
    console.error('Chyba při načítání alert dat:', error);
    return NextResponse.json(
      { success: false, error: 'Nepodařilo se načíst data' },
      { status: 500 }
    );
  }
}

// POST - chráněný zápis dat (pouze pro admin)
export async function POST(request: NextRequest) {
  try {
    console.log('API: Attempting to save alert data');
    
    // Ověř autentifikaci - zkus cookies i headers
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
    console.log('API: Received alert data:', requestData);
    
    // Validace dat
    if (typeof requestData.enabled !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'Neplatný formát dat - enabled musí být boolean' },
        { status: 400 }
      );
    }

    if (typeof requestData.title !== 'string' || typeof requestData.message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Neplatný formát dat - title a message musí být stringy' },
        { status: 400 }
      );
    }

    // Ulož do paměti (resetuje se při restart serveru)
    inMemoryAlertData = {
      enabled: requestData.enabled,
      title: requestData.title.trim(),
      message: requestData.message.trim(),
      lastUpdated: new Date().toISOString(),
      updatedBy: 'admin'
    };

    console.log('API: Alert data saved to memory successfully');

    return NextResponse.json({
      success: true,
      message: 'Alert byl úspěšně aktualizován (v paměti - resetuje se při restartu)'
    });

  } catch (error) {
    console.error('Chyba při ukládání alert dat:', error);
    return NextResponse.json(
      { success: false, error: 'Nepodařilo se uložit data' },
      { status: 500 }
    );
  }
}