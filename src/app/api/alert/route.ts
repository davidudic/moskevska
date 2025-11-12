import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';

// Explicitně nastavit runtime pro Vercel
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const COLLECTION_NAME = 'alerts';

// Výchozí data pro první inicializaci
const DEFAULT_ALERT_DATA = {
  type: 'main-alert',
  enabled: false,
  title: "POZOR - ZMĚNA ORDINAČNÍ DOBY",
  message: "V pátek 31.5. bude ordinace zavřená z důvodu školení.",
  lastUpdated: new Date().toISOString(),
  updatedBy: "system"
};

// GET - veřejné čtení dat
export async function GET() {
  try {
    console.log('API: Loading alert data from MongoDB');
    const db = await getDatabase();
    const collection = db.collection(COLLECTION_NAME);
    
    // Načti data z databáze
    let data = await collection.findOne({ type: 'main-alert' });
    
    // Pokud neexistují žádná data, vytvoř výchozí
    if (!data) {
      console.log('API: No alert data found, initializing with defaults');
      await collection.insertOne(DEFAULT_ALERT_DATA);
      data = DEFAULT_ALERT_DATA;
    }
    
    // Odstraň MongoDB _id před odesláním
    const { _id, ...responseData } = data as any;
    
    return NextResponse.json({
      success: true,
      data: responseData
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

    // Ulož do MongoDB databáze
    const db = await getDatabase();
    const collection = db.collection(COLLECTION_NAME);
    
    const dataToSave = {
      type: 'main-alert',
      enabled: requestData.enabled,
      title: requestData.title.trim(),
      message: requestData.message.trim(),
      lastUpdated: new Date().toISOString(),
      updatedBy: 'admin'
    };

    await collection.updateOne(
      { type: 'main-alert' },
      { $set: dataToSave },
      { upsert: true } // vytvoř dokument, pokud neexistuje
    );

    console.log('API: Alert data saved to MongoDB successfully');

    return NextResponse.json({
      success: true,
      message: 'Alert byl úspěšně aktualizován v databázi'
    });

  } catch (error) {
    console.error('Chyba při ukládání alert dat:', error);
    return NextResponse.json(
      { success: false, error: 'Nepodařilo se uložit data' },
      { status: 500 }
    );
  }
}