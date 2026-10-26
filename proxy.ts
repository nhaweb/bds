import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Next.js 16 renamed middleware → proxy. next-intl still exports createMiddleware.
 * Excludes /api and /studio from locale routing.
 */
export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|studio|trpc|_next|_vercel|.*\\..*).*)",
};
