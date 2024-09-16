import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const refreshToken = request.cookies.get('RefreshToken')?.value;

    const { pathname } = request.nextUrl;

    if (refreshToken && (pathname === '/login' || pathname === '/register')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (!refreshToken && pathname !== '/login' && pathname !== '/register') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next|static|favicon.ico).*)',
    ],
};
