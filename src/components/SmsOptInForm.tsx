"use client";

import { useId, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { submitSmsOptIn } from "@/lib/leads";

/**
 * The SMS opt-in form, hosted on this site rather than on MSL Checkout.
 *
 * ## Why the checkbox text is written out in full here
 *
 * This is the page a carrier reviewer opens from the A2P Campaign filing. They
 * are checking for specific clauses beside the box that grants consent —
 * program name, frequency, that message and data rates may apply, STOP and
 * HELP, and that consent is not a condition of anything. Putting them in a
 * paragraph elsewhere on the page is not the same thing: the disclosure has to
 * be what the person reads as they tick.
 *
 * `DISCLOSURE_REF` travels with the submission so a consent row can be traced
 * back to this exact wording. If the wording changes materially, bump it — the
 * platform records its own disclosure version separately, and a caller cannot
 * assert that one.
 *
 * ## Why the button stays disabled
 *
 * Not decoration. The endpoint refuses anything but `consent: true`, so a form
 * that could submit without the tick would only produce a rejected request and
 * a confusing error. Disabling it makes the requirement visible instead.
 */

const DISCLOSURE_REF = "cad-sms-optin-page-v1";

type Status = "idle" | "loading" | "success" | "error";

export function SmsOptInForm() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const phoneId = useId();
  const nameId = useId();
  const consentId = useId();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading" || status === "success" || !consent) return;
    setStatus("loading");
    setError(null);

    const result = await submitSmsOptIn({
      phone,
      consent: true,
      disclosureRef: DISCLOSURE_REF,
      ...(name.trim() ? { name: name.trim() } : {}),
    });

    if (result.ok) {
      setStatus("success");
      return;
    }
    setError(result.error);
    setStatus("error");
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-gold/30 bg-gold/10 p-6">
        <p className="flex items-center gap-2.5 text-sm text-gold-bright">
          <Check size={16} />
          You&rsquo;re subscribed to The Path Updates.
        </p>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          Reply STOP to any message to opt out, or HELP for help. You can
          unsubscribe at any time and it takes effect immediately.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-hairline bg-dusk/50 p-6">
      <label htmlFor={phoneId} className="block text-xs uppercase tracking-wide text-muted">
        Mobile number
      </label>
      <input
        id={phoneId}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        required
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="(555) 123-4567"
        disabled={status === "loading"}
        aria-invalid={status === "error"}
        aria-describedby={status === "error" ? `${phoneId}-error` : undefined}
        className="mt-2 w-full rounded-full border border-hairline bg-ink px-5 py-3.5 text-sm text-cream placeholder:text-muted/70 focus:border-gold/50 focus:outline-none disabled:opacity-60"
      />

      <label htmlFor={nameId} className="mt-5 block text-xs uppercase tracking-wide text-muted">
        Name (optional)
      </label>
      <input
        id={nameId}
        type="text"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={status === "loading"}
        className="mt-2 w-full rounded-full border border-hairline bg-ink px-5 py-3.5 text-sm text-cream placeholder:text-muted/70 focus:border-gold/50 focus:outline-none disabled:opacity-60"
      />

      <label className="mt-6 flex items-start gap-2.5 text-xs leading-relaxed text-muted">
        <input
          id={consentId}
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-hairline bg-ink accent-gold"
        />
        <span>
          Yes, text me updates from <strong className="text-cream">The Path Updates</strong>{" "}
          by Change A Destiny at the number above. Message frequency varies, no
          more than a few messages per two weeks. Message and data rates may
          apply. Reply STOP to opt out, HELP for help. Consent is not a
          condition of any donation or purchase. See our{" "}
          <a href="/terms" className="underline hover:text-cream">
            Terms
          </a>{" "}
          and{" "}
          <a href="/privacy-policy" className="underline hover:text-cream">
            Privacy Policy
          </a>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "loading" || !consent}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold-bright disabled:opacity-50"
      >
        {status === "loading" && <Loader2 size={15} className="animate-spin" />}
        Text me updates
      </button>

      {status === "error" && (
        <p id={`${phoneId}-error`} className="mt-3 text-sm text-ember-bright" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
