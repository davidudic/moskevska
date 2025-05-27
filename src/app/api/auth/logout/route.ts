import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Úspěšně odhlášen'
  });

  // Smaž auth cookie
  response.cookies.delete('admin-auth');

  return response;
}