import { NextResponse } from 'next/server';
import { auth } from './lib/auth/auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isLoginPage = req.nextUrl.pathname === '/admin/login';
  const isAdminPath = req.nextUrl.pathname.startsWith('/admin') && !isLoginPage;

  if (isAdminPath && !isLoggedIn) {
    // Redirect to login page if trying to access admin pages without being logged in
    const loginUrl = new URL('/admin/login', req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginPage && isLoggedIn) {
    // Redirect to dashboard if logged in and trying to access login page
    const dashboardUrl = new URL('/admin', req.nextUrl.origin);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*'],
};
