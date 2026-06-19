import { NextResponse } from 'next/server';
import { getUserSession } from './lib/api/getUserSession';

export async function proxy(request) {
    const { pathname } = request.nextUrl;
    const user = await getUserSession();

    if (pathname === '/choose-role') {
        // 1. Not logged in? Send to login.
        if (!user) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }

        // 2. Already picked a role? Kick them to the home page.
        if (user.role !== 'pending') {
            return NextResponse.redirect(new URL('/', request.url));
        }

        // 3. If they ARE pending, let them through! Do NOT redirect them.
        return NextResponse.next();
    }

    // If none of the above caught them, let the request continue normally.
    return NextResponse.next();
}

export const config = {
    // TODO: LATER INSIDE MATCHER
    // '/dashboard/:path*', 
    // '/profile/:path*',
    // '/cases/:path*'
    matcher: [
        '/choose-role',
    ],
}