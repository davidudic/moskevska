import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { cookies } from 'next/headers';
import { verifyAuth } from '../../../lib/auth';

const DATA_FILE = path.join(process.cwd(), 'data', 'ordinacni-doba.json');

// Zajistí, že data složka existuje
async function ensureDataDirectory() {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Načte data ze souboru
async function loadOrdinaceData() {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Pokud soubor neexistuje, vytvoříme výchozí data
    const defaultData = {
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
    
    await fs.writeFile(DATA_FILE, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
}

// Uloží data do souboru
async function saveOrdinaceData(data: any) {
  await ensureDataDirectory();
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET - veřejné čtení dat
export async function GET() {
  try {
    const data = await loadOrdinaceData();
    
    return NextResponse.json({
      success: true,
      data: data
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
    // Ověř autentifikaci
    const cookieStore = cookies();
    const authCookie = cookieStore.get('admin-auth');
    
    if (!authCookie || !verifyAuth(authCookie.value)) {
      return NextResponse.json(
        { success: false, error: 'Neautorizovaný přístup' },
        { status: 401 }
      );
    }

    const requestData = await request.json();
    
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

    // Přidej metadata
    const dataToSave = {
      ...requestData,
      lastUpdated: new Date().toISOString(),
      updatedBy: 'admin'
    };

    await saveOrdinaceData(dataToSave);

    return NextResponse.json({
      success: true,
      message: 'Ordinační doba byla úspěšně aktualizována'
    });

  } catch (error) {
    console.error('Chyba při ukládání ordinační doby:', error);
    return NextResponse.json(
      { success: false, error: 'Nepodařilo se uložit data' },
      { status: 500 }
    );
  }
}