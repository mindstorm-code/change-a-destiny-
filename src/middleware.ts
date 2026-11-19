import { NextResponse, type NextRequest } from "next/server";
import { MAIN_SITE, SHARED_PATHS, SISTER_SITES, sisterSiteForHost } from "@/lib/sites";

/**
 * Serves the sister subdomains from this app (see src/lib/sites.ts).
 *
 * On courses / faithcations / ministry .changeadestiny.org:
 * - `/` is rewritten to that site's route, so the URL stays clean.
 * - `/courses` (its own route, typed directly) redirects back to `/`.
 * - Privacy, Terms, SMS and Contact are served as-is.
 * - Anything else belongs to the main site, so it redirects there.
 *
 * Every other host (path.changeadestiny.org, previews, localhost) is untouched.
 */
export function middleware(req: NextRequest) {
  const site = sisterSiteForHost(req.headers.get("host"));
  if (!site) return NextResponse.next();

  const { pathname, search } = req.nextUrl;
  const route = SISTER_SITES[site].route;

  if (pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = route;
    return NextResponse.rewrite(url);
  }
  if (pathname === route) {
    const url = req.nextUrl.clone();
    url.host = req.headers.get("host") ?? url.host;
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  if (SHARED_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next();
  }
  return NextResponse.redirect(`${MAIN_SITE}${pathname}${search}`);
}

export const config = {
  // Skip Next internals, API routes and files with an extension (images, PDFs).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
