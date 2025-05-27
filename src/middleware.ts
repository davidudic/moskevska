import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Vypnuto - ochrana pouze na API úrovni
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}