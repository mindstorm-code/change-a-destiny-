/**
 * The one place this site knows how to hand a lead to MSL Checkout.
 *
 * ## Why this is posted from the browser and not from a route handler
 *
 * `POST /api/leads` writes consent evidence: it records the caller's IP and
 * `Origin` alongside the address. Proxying through a route handler here would
 * replace both with the serverless function's own — the evidence would then
 * say a datacentre in Virginia agreed to be emailed, which is exactly the
 * unverifiable opt-in the A2P campaign was rejected for the first time.
 *
 * So the browser posts directly, cross-origin. The endpoint sets permissive
 * CORS deliberately for this.
 *
 * ## Why the endpoint is a full URL and not a path
 *
 * MSL Checkout resolves which tenant a lead belongs to from the hostname the
 * request arrives on — never from the body. So this must point at a hostname
 * aliased to the mslcheckout-customer project AND registered to Change A
 * Destiny in `organization_domains`. It is not a route in this repo, and it
 * cannot be made one.
 *
 * `NEXT_PUBLIC_MSLCHECKOUT_LEADS_URL` is set in Vercel (Production) to
 * `https://mslcheckout.vercel.app/api/leads`, which satisfies both conditions
 * today. The fallback below is the intended permanent hostname; it still has
 * no DNS record, so it is a placeholder, not a working default.
 */
export const LEADS_ENDPOINT =
  process.env.NEXT_PUBLIC_MSLCHECKOUT_LEADS_URL ??
  "https://caportal.mindstormlabs.dev/api/leads";

export type LeadSubmission = {
  readonly email: string;
  /** Must reflect a real affirmative action. The endpoint refuses anything
   *  but literal `true`, on purpose — see its own schema comment. */
  readonly consent: true;
  /** The tenant's tag for the exact wording shown beside the checkbox, so a
   *  consent row can be traced back to what the person actually read. */
  readonly disclosureRef: string;
  readonly source: string;
  readonly campaign?: string;
};

export type LeadResult = { ok: true } | { ok: false; error: string };

export async function submitLead(lead: LeadSubmission): Promise<LeadResult> {
  try {
    const res = await fetch(LEADS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });

    // A non-JSON body is what a proxy error page looks like; treat it as a
    // failure with the status rather than throwing on the parse.
    const data = (await res.json().catch(() => ({}))) as { error?: string };

    if (!res.ok) {
      return { ok: false, error: data.error ?? "Something went wrong. Try again." };
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Couldn't reach the server. Check your connection and try again.",
    };
  }
}
