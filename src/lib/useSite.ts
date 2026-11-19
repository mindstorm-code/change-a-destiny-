"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { MAIN_SITE, sisterSiteForHost, sisterSiteForPath, type SisterSite } from "@/lib/sites";

/**
 * Which site the visitor is on, for the shared NavBar, Footer and popup.
 *
 * On a sister subdomain the browser path is `/` (the middleware rewrites it),
 * so the host decides; on the main host and previews the route decides.
 * The server snapshot is `null`, so the first render matches the server's and
 * the host is applied on hydration.
 */
const noSubscribe = () => () => {};

export function useSite(): {
  site: SisterSite | null;
  /** A main-site link that still works when clicked from a sister subdomain. */
  mainHref: (path: string) => string;
} {
  const pathname = usePathname();
  const hostSite = useSyncExternalStore(
    noSubscribe,
    () => sisterSiteForHost(window.location.host),
    () => null,
  );

  return {
    site: hostSite ?? sisterSiteForPath(pathname),
    mainHref: (path) => (hostSite ? `${MAIN_SITE}${path}` : path),
  };
}
