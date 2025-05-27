import { NextResponse } from 'next/server';

// Explicitně nastavit runtime pro Vercel
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Úspěšně odhlášen'
  });

  // Smaž auth cookie
  response.cookies.delete('admin-auth');

  return response;
}