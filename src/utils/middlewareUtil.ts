import { COOKIE_KEY } from '@/constant/cookie';
import { NextRequest, NextResponse } from 'next/server';
import { getSlugsFromPathName } from '.';
import { defaultLocale, locales } from '@/i18n';

export const checkLocal = (request: NextRequest, response: NextResponse) => {
  const referer = request.headers.get('referer');
  let langInReferer: string | undefined = undefined;
  const { lang } = getSlugsFromPathName(request.nextUrl.pathname);
  const queryParams = request.nextUrl.search;

  // Check if the path starts with a valid locale
  const hasValidLocale = locales.some(locale => request.nextUrl.pathname.startsWith(`/${locale}`));

  if (!hasValidLocale && !request.nextUrl.pathname.startsWith('/_next')) {
    // If no valid locale, redirect to the default locale
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${request.nextUrl.pathname}${queryParams ?? ''}`, request.url)
    );
  }

  if (referer) {
    const refererUrl = new URL(referer);
    langInReferer = locales.find(locale => refererUrl.pathname.startsWith(`/${locale}`));
  }

  if (langInReferer) {
    response.cookies.set(COOKIE_KEY.I18NEXT, langInReferer);
  } else {
    response.cookies.set(COOKIE_KEY.I18NEXT, lang);
  }

  return response;
};
