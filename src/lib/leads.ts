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

/**
 * Where a visitor opts in to SMS — now a page on this site.
 *
 * It used to point at MSL Checkout's own hosted `/sms`. That page works, but
 * it sits on the platform's hostname, and a carrier reviewing an A2P Campaign
 * checks that the opt-in page belongs to the brand being registered. A form on
 * a software vendor's domain reads as an unrelated vendor's form — on a Brand
 * at 16/100 already rejected once over opt-in information, that was the
 * largest remaining risk in the filing.
 *
 * So the page lives here instead, beside this site's own privacy policy and
 * terms, and posts to `SMS_OPTIN_ENDPOINT` below. Relative on purpose: the
 * footer and the terms page link to it, and it should follow whatever domain
 * this site is served from rather than hardcoding one.
 */
export const SMS_OPTIN_URL = "/sms";

/**
 * Where that form POSTs. Not a route in this repo, and it cannot be.
 *
 * MSL Checkout resolves which tenant a consent record belongs to from the
 * hostname the request arrives on, and the SMS consent ledger lives there. It
 * is a different endpoint from `LEADS_ENDPOINT` on purpose: `/api/leads`
 * writes EMAIL consent and deliberately refuses to read a phone beside an
 * email checkbox as permission to text. `/api/sms-optin` is the other case —
 * a dedicated SMS form showing the SMS disclosure — and writes `channel: sms`.
 *
 * The consent evidence records the Origin this request came from, which is why
 * hosting the form here improves the filing rather than merely moving it.
 */
export const SMS_OPTIN_ENDPOINT =
  process.env.NEXT_PUBLIC_MSLCHECKOUT_SMS_OPTIN_URL ??
  "https://mslcheckout.vercel.app/api/sms-optin";

export type SmsOptInSubmission = {
  readonly phone: string;
  /** Must reflect a real tick of a box whose only meaning is "text me". The
   *  endpoint refuses anything but literal `true`. */
  readonly consent: true;
  readonly name?: string;
  readonly disclosureRef: string;
};

export async function submitSmsOptIn(optIn: SmsOptInSubmission): Promise<LeadResult> {
  try {
    const res = await fetch(SMS_OPTIN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(optIn),
    });
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
