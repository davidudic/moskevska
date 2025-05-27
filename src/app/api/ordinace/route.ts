import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

// Explicitně nastavit runtime pro Vercel
export const runtime = 'nodejs';

// In-memory storage pro Vercel (resetuje se při restart)
let inMemoryData = {
  ordinacniHodiny: [
    {
      id: 1,
      day: "Pondělí",
      morning: "8:00 - 12:00",
      afternoon: "13:00 - 18:00",
      note: "Odpoledne pouze pro objednané pacienty",
      active: true
    },
    {
      id: 2,
      day: "Úterý",
      morning: "8:00 - 12:00",
      afternoon: "13:00 - 17:00",
      note: "Odpoledne stomická poradna (nutné objednání)",
      active: true
    },
    {
      id: 3,
      day: "Středa",
      morning: "8:00 - 12:00",
      afternoon: "13:00 - 18:00",
      note: "Odpoledne pouze pro objednané pacienty",
      active: true
    },
    {
      id: 4,
      day: "Čtvrtek",
      morning: "8:00 - 12:00",
      afternoon: "13:00 - 18:00",
      note: "Odpoledne pouze pro objednané pacienty",
      active: true
    },
    {
      id: 5,
      day: "Pátek",
      morning: "8:00 - 12:00",
      afternoon: "Zavřeno",
      note: "Odpoledne není ordinační doba",
      active: true
    },
    {
      id: 6,
      day: "Sobota",
      morning: "Zavřeno",
      afternoon: "Zavřeno",
      note: "",
      active: false
    },
    {
      id: 7,
      day: "Neděle",
      morning: "Zavřeno",
      afternoon: "Zavřeno",
      note: "",
      active: false
    }
  ],
  lastUpdated: new Date().toISOString(),
  updatedBy: "system"
};

// GET - veřejné čtení dat
export async function GET() {
  try {
    console.log('API: Loading ordinace data from memory');
    
    return NextResponse.json({
      success: true,
      data: inMemoryData
    });
  } catch (error) {
    console.error('Chyba při načítání ordinační doby:', error);
    return NextResponse.json(
      { success: false, error: 'Nepodařilo se načíst data' },
      { status: 500 }
    );
  }
}

// POST - chráněný zápis dat (pouze pro admin)
export async function POST(request: NextRequest) {
  try {
    console.log('API: Attempting to save ordinace data');
    
    // Ověř autentifikaci - použij request.cookies místo cookies()
    const authCookie = request.cookies.get('admin-auth');
    
    if (!authCookie || !verifyAuth(authCookie.value)) {
      console.log('API: Unauthorized access attempt');
      return NextResponse.json(
        { success: false, error: 'Neautorizovaný přístup' },
        { status: 401 }
      );
    }

    const requestData = await request.json();
    console.log('API: Received data:', requestData);
    
    // Validace dat
    if (!requestData.ordinacniHodiny || !Array.isArray(requestData.ordinacniHodiny)) {
      return NextResponse.json(
        { success: false, error: 'Neplatný formát dat' },
        { status: 400 }
      );
    }

    // Validace každého záznamu
    for (const item of requestData.ordinacniHodiny) {
      if (!item.day || !item.morning || !item.afternoon || typeof item.active !== 'boolean') {
        return NextResponse.json(
          { success: false, error: 'Neplatný formát záznamu ordinační doby' },
          { status: 400 }
        );
      }
    }

    // Ulož do paměti (resetuje se při restart serveru)
    inMemoryData = {
      ...requestData,
      lastUpdated: new Date().toISOString(),
      updatedBy: 'admin'
    };

    console.log('API: Data saved to memory successfully');

    return NextResponse.json({
      success: true,
      message: 'Ordinační doba byla úspěšně aktualizována (v paměti - resetuje se při restartu)'
    });

  } catch (error) {
    console.error('Chyba při ukládání ordinační doby:', error);
    return NextResponse.json(
      { success: false, error: 'Nepodařilo se uložit data' },
      { status: 500 }
    );
  }
}