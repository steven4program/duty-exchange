import { NextResponse, NextRequest } from 'next/server';
import { checkLocal } from '@/utils/middlewareUtil';
import acceptLanguage from 'accept-language';
import { defaultLocale, locales } from './i18n';

acceptLanguage.languages(locales);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|static).*)'],
};

export async function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set('x-current-path', request.nextUrl.pathname);
  let response: NextResponse = NextResponse.next({ headers });

  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there's no locale
  if (pathnameIsMissingLocale) {
    const locale = defaultLocale;
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}${request.nextUrl.search}`, request.url)
    );
  }

  response = checkLocal(request, response);

  return response;
}