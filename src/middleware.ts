import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

const protectedRoutes = ['/profile', '/admin/dashboard']; // 미들웨어로 보호할 라우트 선언

export async function middleware(req: NextRequest) {
    const { nextUrl } = req; // nextUrl 라우트 객체 생성
    const sessionCookie = getSessionCookie(req); // session과 cookie를 가져옴
    const res = NextResponse.next(); // 응답객체 생성

    const isLoggedIn = !!sessionCookie; // sessionCookie가 있다면.. 로그인 유지함
    // 보호할 라우트에 현재 라우트가 포함되어 있는지 체크
    const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
    // /auth로 시작하는 라우트에 현재 라우트가 포함되어 있는지 체크
    const isOnAuthRoute = nextUrl.pathname.startsWith('/auth');

    // 만일 보호할 라우트이지만, 세션이 유지되지 않는다면...
    if (isOnProtectedRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL('/auth/login', req.url)); // 로그인 페이지로 이동
    }

    // 만일 보호할 라우트이고 세션이 유지되고 있다면....
    if (isOnAuthRoute && isLoggedIn) {
        return NextResponse.redirect(new URL('/profile', req.url)); // prifile 페이지로 이동
    }

    return res;
}

// 특정경로 요청만 미들웨어를 실행하도록 필터링하는 함수
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};
