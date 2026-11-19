"use client";

import { useId, useState } from "react";
import { Check, Download, Loader2 } from "lucide-react";
import { submitLead } from "@/lib/leads";

/**
 * Email capture for the free-asset squeeze pages under /free.
 *
 * Same consent rules as ReserveSeatForm: `/api/leads` only accepts literal
 * `consent: true` and records it as evidence, so the box must really be
 * ticked and its wording must say exactly what the email will be used for.
 * Each freebie passes its own `disclosureRef`, so a consent row traces back
 * to the page the person actually read.
 *
 * Delivery is instant: the download appears as soon as the lead is stored.
 * Nothing here promises an email with the file, because no email sequence
 * for these freebies exists yet.
 */

type Status = "idle" | "loading" | "success" | "error";

export function FreebieForm({
  disclosureRef,
  source,
  campaign,
  assetName,
  downloadHref,
  downloadFileName,
  ctaLabel,
}: {
  disclosureRef: string;
  source: string;
  campaign: string;
  assetName: string;
  downloadHref: string;
  downloadFileName: string;
  ctaLabel: string;
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const inputId = useId();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading" || status === "success" || !consent) return;
    setStatus("loading");
    setError(null);

    const result = await submitLead({
      email,
      consent: true,
      disclosureRef,
      source,
      campaign,
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
      <div className="rounded-2xl border border-gold/30 bg-gold/10 p-6" role="status">
        <p className="flex items-center gap-2 text-sm text-gold-bright">
          <Check size={16} /> You&rsquo;re in. Here&rsquo;s {assetName}.
        </p>
        <a
          href={downloadHref}
          download={downloadFileName}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold-bright"
        >
          <Download size={16} /> Download the PDF
        </a>
        <p className="mt-3 text-xs text-muted">
          Print it, or open it on your phone and use a notebook beside it.
        </p>
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
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          disabled={status === "loading"}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? `${inputId}-error` : undefined}
          className="w-full rounded-full border border-hairline bg-dusk px-5 py-3.5 text-base text-cream placeholder:text-muted/70 focus:border-gold/50 focus:outline-none disabled:opacity-60 sm:flex-1"
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
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-hairline bg-ink accent-gold"
        />
        <span>
          Yes, send me occasional emails from Change A Destiny about The Path
          and the mission. No spam, unsubscribe anytime. See our{" "}
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
