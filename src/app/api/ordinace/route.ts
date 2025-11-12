import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';

// Explicitně nastavit runtime pro Vercel
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const COLLECTION_NAME = 'ordinacni-hodiny';

// Výchozí data pro první inicializaci
const DEFAULT_DATA = {
  type: 'ordinace',
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
    console.log('API: Loading ordinace data from MongoDB');
    const db = await getDatabase();
    const collection = db.collection(COLLECTION_NAME);
    
    // Načti data z databáze
    let data = await collection.findOne({ type: 'ordinace' });
    
    // Pokud neexistují žádná data, vytvoř výchozí
    if (!data) {
      console.log('API: No data found, initializing with defaults');
      await collection.insertOne(DEFAULT_DATA);
      data = DEFAULT_DATA;
    }
    
    // Odstraň MongoDB _id před odesláním
    const { _id, ...responseData } = data as any;
    
    return NextResponse.json({
      success: true,
      data: responseData
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

    // Ulož do MongoDB databáze
    const db = await getDatabase();
    const collection = db.collection(COLLECTION_NAME);
    
    const dataToSave = {
      type: 'ordinace',
      ...requestData,
      lastUpdated: new Date().toISOString(),
      updatedBy: 'admin'
    };

    await collection.updateOne(
      { type: 'ordinace' },
      { $set: dataToSave },
      { upsert: true } // vytvoř dokument, pokud neexistuje
    );

    console.log('API: Data saved to MongoDB successfully');

    return NextResponse.json({
      success: true,
      message: 'Ordinační doba byla úspěšně aktualizována v databázi'
    });

  } catch (error) {
    console.error('Chyba při ukládání ordinační doby:', error);
    return NextResponse.json(
      { success: false, error: 'Nepodařilo se uložit data' },
      { status: 500 }
    );
  }
}