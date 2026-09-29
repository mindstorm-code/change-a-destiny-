/**
 * Client-side helper for the Contact page's message form.
 *
 * This is deliberately separate from `submitLead`/`submitSmsOptIn` in
 * `leads.ts`. Those two exist to write verifiable consent evidence into MSL
 * Checkout's tenant CRM — the caller's real IP/Origin has to reach that
 * endpoint directly from the browser for the record to mean anything (see
 * the comment at the top of leads.ts). A "send us a message" contact form
 * isn't consent evidence for anything; it's mail to a human. So it's fine
 * for this one to go through this app's own route handler, which is what
 * lets it use Resend without exposing an API key to the client.
 */

export type ContactSubmission = {
  readonly name: string;
  readonly email: string;
  readonly phone?: string;
  readonly message: string;
  readonly privacyAcknowledged: boolean;
  readonly termsAgreed: boolean;
  readonly smsConsent: boolean;
  /** Honeypot — must stay empty. A human never sees or fills this field. */
  readonly company?: string;
};

export type ContactResult = { ok: true } | { ok: false; error: string };

export async function submitContactMessage(
  submission: ContactSubmission
): Promise<ContactResult> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
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
