import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const refreshToken = request.cookies.get('RefreshToken')?.value;
    const { pathname } = request.nextUrl;
    const userAgent = request.headers.get('user-agent') || '';


    const isCrawler = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot/i.test(userAgent);

    if (pathname === '/robots.txt') {
        return NextResponse.next();
    }

    if (isCrawler) {
        return NextResponse.next();
    }

    if (refreshToken && (pathname === '/login' || pathname === '/register' || pathname === '/otp' || pathname === '/otp/password')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (!refreshToken && (pathname !== '/login' && pathname !== '/register' && pathname !== '/otp' && pathname !== '/otp/password')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next|static|favicon.ico|robots.txt).*)',
    ],
};
