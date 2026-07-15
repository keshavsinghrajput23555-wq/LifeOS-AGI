import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard', '/upload', '/verification', '/autofill', '/download', '/admin'];

export function middleware(req: NextRequest) {
  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    const hasSession = !!req.cookies.get('sb-access-token');
    if (!hasSession) return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ['/dashboard/:path*', '/upload/:path*', '/verification/:path*', '/autofill/:path*', '/download/:path*', '/admin/:path*'] };
