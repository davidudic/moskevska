import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'defaultpassword';
const SECRET_KEY = process.env.AUTH_SECRET || 'fallback-secret-key';

// Vytvoří hash z hesla a času pro lepší bezpečnost
export function createAuthToken(): string {
  const timestamp = Date.now();
  const data = `${ADMIN_PASSWORD}:${timestamp}`;
  const hash = crypto.createHmac('sha256', SECRET_KEY).update(data).digest('hex');
  
  return `${timestamp}:${hash}`;
}

// Ověří platnost auth tokenu
export function verifyAuth(token: string): boolean {
  try {
    if (!token) return false;
    
    const [timestampStr, hash] = token.split(':');
    const timestamp = parseInt(timestampStr);
    
    // Token musí být mladší než 24 hodin
    const maxAge = 24 * 60 * 60 * 1000; // 24 hodin v ms
    if (Date.now() - timestamp > maxAge) {
      return false;
    }
    
    // Ověř hash
    const data = `${ADMIN_PASSWORD}:${timestamp}`;
    const expectedHash = crypto.createHmac('sha256', SECRET_KEY).update(data).digest('hex');
    
    return hash === expectedHash;
  } catch (error) {
    console.error('Chyba při ověřování auth tokenu:', error);
    return false;
  }
}

// Ověří heslo
export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}