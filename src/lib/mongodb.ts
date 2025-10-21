import { MongoClient, Db } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

if (!process.env.MONGODB_DB) {
  throw new Error('Please add your MongoDB database name to .env.local');
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  // Pokud už máme připojení, použijeme ho
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Vytvoříme nové připojení
  const client = new MongoClient(uri);

  await client.connect();
  const db = client.db(dbName);

  // Uložíme do cache pro příští použití
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function getDatabase(): Promise<Db> {
  const { db } = await connectToDatabase();
  return db;
}

