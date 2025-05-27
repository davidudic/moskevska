import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'defaultpassword';
const SECRET_KEY = process.env.AUTH_SECRET || 'fallback-secret-key';

// Debug pro produkci
console.log('Auth initialized:', {
  hasAdminPassword: !!process.env.ADMIN_PASSWORD,
  hasAuthSecret: !!process.env.AUTH_SECRET,
  passwordLength: ADMIN_PASSWORD.length,
  secretLength: SECRET_KEY.length
});

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
    console.log('verifyAuth: Starting verification...');
    console.log('verifyAuth: Token exists:', !!token);
    
    if (!token) {
      console.log('verifyAuth: No token provided');
      return false;
    }
    
    const [timestampStr, hash] = token.split(':');
    console.log('verifyAuth: Token parts:', { hasTimestamp: !!timestampStr, hasHash: !!hash });
    
    if (!timestampStr || !hash) {
      console.log('verifyAuth: Invalid token format');
      return false;
    }
    
    const timestamp = parseInt(timestampStr);
    console.log('verifyAuth: Timestamp:', timestamp, 'Current:', Date.now());
    
    // Token musí být mladší než 24 hodin
    const maxAge = 24 * 60 * 60 * 1000; // 24 hodin v ms
    const age = Date.now() - timestamp;
    console.log('verifyAuth: Token age (ms):', age, 'Max age:', maxAge);
    
    if (age > maxAge) {
      console.log('verifyAuth: Token expired');
      return false;
    }
    
    // Ověř hash
    const data = `${ADMIN_PASSWORD}:${timestamp}`;
    const expectedHash = crypto.createHmac('sha256', SECRET_KEY).update(data).digest('hex');
    console.log('verifyAuth: Hash comparison:', { 
      provided: hash.substring(0, 10) + '...', 
      expected: expectedHash.substring(0, 10) + '...',
      match: hash === expectedHash 
    });
    
    const isValid = hash === expectedHash;
    console.log('verifyAuth: Final result:', isValid);
    return isValid;
  } catch (error) {
    console.error('verifyAuth: Error:', error);
    return false;
  }
}

// Ověří heslo
export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}