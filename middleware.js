// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('accessToken'); // Assuming the token is stored in cookies

  // If token is missing, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Optionally, validate the token here if needed (e.g., decode JWT)

  // Allow request to proceed
  return NextResponse.next();
}

// Define which routes to apply the middleware to
export const config = {
  matcher: ['/admin/streetfood', '/admin/dashboard', '/admin/contestants', '/admin/seasons'], // Apply to specific pages
};
