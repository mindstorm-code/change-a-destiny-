/**
 * The Path's sister sites, all served by this one Next.js app.
 *
 * Each subdomain's home page is a normal route here (/courses, /faithcations,
 * /ministry). `src/middleware.ts` rewrites `courses.changeadestiny.org/` to
 * `/courses`, and so on, so the visitor sees the subdomain while the app keeps
 * one codebase, one form, one consent wording and one deploy.
 *
 * The routes also work on the main host (path.changeadestiny.org/courses), so
 * Vercel previews, which have no subdomains, can show every page.
 */

export const MAIN_SITE = "https://path.changeadestiny.org";

export const SISTER_SITES = {
  courses: { route: "/courses", label: "Courses" },
  faithcations: { route: "/faithcations", label: "Faithcations" },
  ministry: { route: "/ministry", label: "Start a chapter" },
} as const;

export type SisterSite = keyof typeof SISTER_SITES;

/** The sister site a hostname belongs to, if any (`courses.localhost:3234` counts). */
export function sisterSiteForHost(host: string | null | undefined): SisterSite | null {
  const sub = (host ?? "").split(".")[0]?.toLowerCase();
  return sub && sub in SISTER_SITES ? (sub as SisterSite) : null;
}

/** The sister site a route belongs to, if any (`/courses`, `/faithcations/...`). */
export function sisterSiteForPath(pathname: string | null | undefined): SisterSite | null {
  for (const [key, site] of Object.entries(SISTER_SITES)) {
    if (pathname === site.route || pathname?.startsWith(`${site.route}/`)) return key as SisterSite;
  }
  return null;
}

/**
 * Pages every sister subdomain serves as-is, because forms on those sites link
 * to them (the consent text links Privacy and Terms; the SMS fallback links
 * /sms). Everything else on a subdomain redirects to the main site.
 */
export const SHARED_PATHS = ["/privacy-policy", "/terms", "/sms", "/contact"];
