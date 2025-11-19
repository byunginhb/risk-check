import createMiddleware from 'next-intl/middleware';
import { routing } from './src/shared/config/i18n';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(ko|en)/:path*'],
};

