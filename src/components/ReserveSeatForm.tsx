"use client";

import { useId, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { submitLead } from "@/lib/leads";

/**
 * The email capture under the cohort and assessment CTAs.
 *
 * ## Why this form gained a consent checkbox
 *
 * It used to post an address alone to `/api/waitlist`, which wrote a local
 * JSON file — on a read-only serverless filesystem, so every submission
 * returned 500 and nothing was ever stored. Repointing it at MSL Checkout's
 * `/api/leads` is the fix, but that endpoint accepts `consent` only as
 * literal `true` and records the result as evidence that a person agreed to
 * be emailed.
 *
 * Sending `true` for a form that never asked would manufacture that evidence.
 * The A2P campaign was rejected the first time over opt-in that could not be
 * verified, so the honest fix is for the form to actually ask. The wording
 * matches `LeadCapturePopup` because both now feed the same consent ledger and
 * a reviewer comparing them should find one promise, not two.
 */

const DISCLOSURE_REF = "cad-reserve-seat-v1";

type Status = "idle" | "loading" | "success" | "error";

export function ReserveSeatForm({
  source,
  ctaLabel,
  successLabel,
  placeholder = "you@email.com",
}: {
  source: "cohort" | "assessment";
  ctaLabel: string;
  successLabel: string;
  placeholder?: string;
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const inputId = useId();
  const consentId = useId();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading" || status === "success" || !consent) return;
    setStatus("loading");
    setError(null);

    const result = await submitLead({
      email,
      consent: true,
      disclosureRef: DISCLOSURE_REF,
      source: `reserve-seat-${source}`,
      campaign: "founding-cohort",
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
      <div className="flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold/10 px-5 py-3.5 text-sm text-gold-bright">
        <Check size={16} />
        {successLabel}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          disabled={status === "loading"}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? `${inputId}-error` : undefined}
          className="w-full rounded-full border border-hairline bg-dusk px-5 py-3.5 text-sm text-cream placeholder:text-muted/70 focus:border-gold/50 focus:outline-none disabled:opacity-60 sm:flex-1"
        />
        <button
          type="submit"
          disabled={status === "loading" || !consent}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold-bright disabled:opacity-50"
        >
          {status === "loading" && <Loader2 size={15} className="animate-spin" />}
          {ctaLabel}
        </button>
      </div>

      <label className="mt-3 flex items-start gap-2.5 text-xs leading-relaxed text-muted">
        <input
          id={consentId}
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-hairline bg-ink accent-gold"
        />
        <span>
          I&rsquo;d like to receive email updates from Change A Destiny.
          We&rsquo;ll only use this for Path Assessment results and occasional
          mission updates — no spam, unsubscribe anytime. See our{" "}
          <a href="/privacy-policy" className="underline hover:text-cream">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="/terms" className="underline hover:text-cream">
            Terms
          </a>
          .
        </span>
      </label>

      {status === "error" && (
        <p id={`${inputId}-error`} className="mt-2 text-sm text-ember-bright" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
