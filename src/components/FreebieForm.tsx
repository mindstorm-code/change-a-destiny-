"use client";

import { useId, useState } from "react";
import { Check, Download, Loader2 } from "lucide-react";
import { submitLead, submitSmsOptIn } from "@/lib/leads";

/**
 * Name, email and (optionally) mobile capture for the squeeze pages under /free.
 *
 * ## Two consents, two requests
 *
 * Same rule as OptInForm: email and texts are separate decisions with separate
 * wording, so each has its own checkbox and its own consent record.
 * `/api/leads` writes EMAIL consent only, even when a phone is sent beside it;
 * `/api/sms-optin` is the only place a text consent is recorded. One combined
 * box would make the SMS consent unverifiable, which is what got this
 * ministry's A2P campaign rejected once already.
 *
 * ## What unlocks the download
 *
 * Name, email and the email box. Texts are optional on purpose: carriers
 * require that SMS consent is never a condition of getting something, and the
 * disclosure below says so. The SMS wording is the same approved text as the
 * /sms page (OptInForm); its consent row is tagged `<disclosureRef>-sms`.
 *
 * ## Partial success
 *
 * If the email lands and the text opt-in fails, the download still appears
 * (the email was the exchange) and the screen says plainly that texts did not
 * go through, rather than claiming both.
 */

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "mt-1.5 w-full rounded-full border border-hairline bg-dusk px-5 py-3 text-base text-cream placeholder:text-muted/70 focus:border-gold/50 focus:outline-none disabled:opacity-60";
const labelClass = "block text-xs uppercase tracking-wide text-muted";

export function FreebieForm({
  disclosureRef,
  source,
  campaign,
  assetName,
  downloadHref,
  downloadFileName,
  ctaLabel,
  successNote,
}: {
  disclosureRef: string;
  source: string;
  campaign: string;
  /** With a download: the asset's name. Without: what they signed up for. */
  assetName: string;
  /** Omit both download props for an interest list (no file to hand over). */
  downloadHref?: string;
  downloadFileName?: string;
  ctaLabel: string;
  /** Shown on success when there is no download. */
  successNote?: string;
}) {
  const hasDownload = Boolean(downloadHref);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailConsent, setEmailConsent] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [smsResult, setSmsResult] = useState<"none" | "on" | "failed">("none");
  const id = useId();

  const trimmed = { name: name.trim(), email: email.trim(), phone: phone.trim() };
  const smsMissingPhone = smsConsent && !trimmed.phone;
  const canSubmit = Boolean(trimmed.name && trimmed.email && emailConsent && !smsMissingPhone);

  function hint(): string | null {
    if (canSubmit) return null;
    if (!trimmed.name) return "Add your name to continue.";
    if (!trimmed.email) return "Add your email address to continue.";
    if (!emailConsent)
      return hasDownload ? "Tick the email box to get the download." : "Tick the email box to continue.";
    if (smsMissingPhone) return "Add your mobile number, or untick the text box.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading" || status === "success" || !canSubmit) return;
    setStatus("loading");
    setError(null);

    const lead = await submitLead({
      email: trimmed.email,
      consent: true,
      disclosureRef,
      source,
      campaign,
      name: trimmed.name,
      ...(trimmed.phone ? { phone: trimmed.phone } : {}),
    });

    if (!lead.ok) {
      setError(lead.error);
      setStatus("error");
      return;
    }

    if (smsConsent && trimmed.phone) {
      const sms = await submitSmsOptIn({
        phone: trimmed.phone,
        consent: true,
        name: trimmed.name,
        disclosureRef: `${disclosureRef}-sms`,
      });
      setSmsResult(sms.ok ? "on" : "failed");
    }
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-gold/30 bg-gold/10 p-6" role="status">
        <p className="flex items-center gap-2 text-sm text-gold-bright">
          <Check size={16} /> You&rsquo;re in, {trimmed.name.split(" ")[0]}.
          {hasDownload ? <> Here&rsquo;s {assetName}.</> : <> You&rsquo;re on the {assetName} list.</>}
        </p>
        {hasDownload ? (
          <a
            href={downloadHref}
            download={downloadFileName}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold-bright"
          >
            <Download size={16} /> Download the PDF
          </a>
        ) : (
          successNote && <p className="mt-3 text-sm leading-relaxed text-cream/90">{successNote}</p>
        )}
        {smsResult === "on" && (
          <p className="mt-3 text-xs text-muted">
            Texts are on too. Reply STOP to any message to opt out, or HELP for help.
          </p>
        )}
        {smsResult === "failed" && (
          <p className="mt-3 text-xs text-ember-bright" role="alert">
            Your email is in, but the text sign-up didn&rsquo;t go through. You can try again on our{" "}
            <a href="/sms" className="underline">
              text updates page
            </a>
            .
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={labelClass}>
            Name
          </label>
          <input
            id={`${id}-name`}
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "loading"}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={labelClass}>
            Email
          </label>
          <input
            id={`${id}-email`}
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            disabled={status === "loading"}
            aria-invalid={status === "error"}
            aria-describedby={status === "error" ? `${id}-error` : undefined}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-phone`} className={labelClass}>
          Mobile number <span className="normal-case tracking-normal">(optional, for texts)</span>
        </label>
        <input
          id={`${id}-phone`}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(555) 123-4567"
          disabled={status === "loading"}
          className={inputClass}
        />
      </div>

      <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted">
        <input
          type="checkbox"
          required
          checked={emailConsent}
          onChange={(e) => setEmailConsent(e.target.checked)}
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

      <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted">
        <input
          type="checkbox"
          checked={smsConsent}
          onChange={(e) => setSmsConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-hairline bg-ink accent-gold"
        />
        <span>
          Optional: text me updates from <strong className="text-cream">The Path Updates</strong>{" "}
          by Change A Destiny at the number above. Message frequency varies, no
          more than a few messages per two weeks. Message and data rates may
          apply. Reply STOP to opt out, HELP for help. Consent is not a
          condition of {hasDownload ? "this download or " : ""}any donation or purchase.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "loading" || !canSubmit}
        aria-describedby={canSubmit ? undefined : `${id}-hint`}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold-bright disabled:cursor-not-allowed disabled:bg-hairline disabled:text-muted disabled:hover:bg-hairline"
      >
        {status === "loading" && <Loader2 size={15} className="animate-spin" />}
        {ctaLabel}
      </button>

      {!canSubmit && (
        <p id={`${id}-hint`} className="text-center text-xs text-muted">
          {hint()}
        </p>
      )}

      {status === "error" && (
        <p id={`${id}-error`} className="text-sm text-ember-bright" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
