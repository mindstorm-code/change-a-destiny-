"use client";

import { useId, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { submitLead, submitSmsOptIn } from "@/lib/leads";

/**
 * Opting in to email, texts, or both.
 *
 * ## Why there are two checkboxes and not one
 *
 * A single tick covering both channels is the conflation that makes SMS
 * consent unverifiable — it is why MSL Checkout's `/api/leads` refuses to read
 * a phone number beside an email checkbox as permission to text, and why the
 * SMS opt-in has its own endpoint at all. Each channel carries its own
 * disclosure, its own consent record and its own disclosure version, so each
 * box has to be its own decision.
 *
 * That means up to two requests on submit. Deliberate: one combined write
 * would have to pick one disclosure version to stamp on both, and the record
 * would then claim someone read wording they never saw.
 *
 * ## Partial success is reported, not swallowed
 *
 * If the email lands and the text does not, saying "subscribed" would be a
 * lie about the half that failed, and saying "failed" would invite a retry
 * that double-writes the half that worked. So the result names exactly which
 * channel is on and which needs another go.
 *
 * ## Why the button explains itself
 *
 * It was disabled whenever nothing was consented to, with nothing on screen
 * saying why — so filling in a number, clicking, and having nothing happen
 * looked like a broken page. It cost a real opt-in. The hint below the button
 * is the fix, and the disabled styling is now clearly disabled rather than a
 * slightly duller shade of the live button.
 */

const EMAIL_DISCLOSURE_REF = "cad-optin-page-email-v1";
const SMS_DISCLOSURE_REF = "cad-optin-page-sms-v1";

type Status = "idle" | "loading" | "done" | "error";

type Outcome = { readonly email: boolean; readonly sms: boolean };

export function OptInForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [emailConsent, setEmailConsent] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [outcome, setOutcome] = useState<Outcome>({ email: false, sms: false });
  const [error, setError] = useState<string | null>(null);

  const emailId = useId();
  const phoneId = useId();
  const nameId = useId();

  const wantsEmail = emailConsent && email.trim().length > 0;
  const wantsSms = smsConsent && phone.trim().length > 0;
  const canSubmit = wantsEmail || wantsSms;

  function hint(): string | null {
    if (canSubmit) return null;
    if (emailConsent && !email.trim()) return "Add your email address to continue.";
    if (smsConsent && !phone.trim()) return "Add your mobile number to continue.";
    if (email.trim() && !emailConsent) return "Tick the email box above to continue.";
    if (phone.trim() && !smsConsent) return "Tick the text-messages box above to continue.";
    return "Fill in an email or a mobile number, and tick its box.";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading" || !canSubmit) return;
    setStatus("loading");
    setError(null);

    const trimmedName = name.trim();
    const failures: string[] = [];
    const landed: Outcome = { email: outcome.email, sms: outcome.sms };

    // Already-succeeded channels are skipped, so a retry after a partial
    // failure cannot write the working half a second time.
    if (wantsEmail && !landed.email) {
      const result = await submitLead({
        email: email.trim(),
        consent: true,
        disclosureRef: EMAIL_DISCLOSURE_REF,
        source: "optin-page",
        campaign: "the-path",
        ...(trimmedName ? { name: trimmedName } : {}),
      });
      if (result.ok) Object.assign(landed, { email: true });
      else failures.push(`Email: ${result.error}`);
    }

    if (wantsSms && !landed.sms) {
      const result = await submitSmsOptIn({
        phone: phone.trim(),
        consent: true,
        disclosureRef: SMS_DISCLOSURE_REF,
        ...(trimmedName ? { name: trimmedName } : {}),
      });
      if (result.ok) Object.assign(landed, { sms: true });
      else failures.push(`Texts: ${result.error}`);
    }

    setOutcome(landed);

    if (failures.length === 0) {
      setStatus("done");
      return;
    }
    setError(failures.join(" "));
    setStatus(landed.email || landed.sms ? "done" : "error");
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-gold/30 bg-gold/10 p-6">
        <p className="flex items-center gap-2.5 text-sm text-gold-bright">
          <Check size={16} />
          {outcome.email && outcome.sms
            ? "You're subscribed to email and text updates."
            : outcome.email
              ? "You're subscribed to email updates."
              : "You're subscribed to The Path Updates by text."}
        </p>
        {error && (
          <p className="mt-3 text-xs leading-relaxed text-ember-bright" role="alert">
            One part didn&rsquo;t go through — {error} You can try that one again below.
          </p>
        )}
        <p className="mt-3 text-xs leading-relaxed text-muted">
          {outcome.sms && "Reply STOP to any message to opt out, or HELP for help. "}
          You can unsubscribe at any time and it takes effect immediately.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-hairline bg-dusk/50 p-6">
      <label htmlFor={emailId} className="block text-xs uppercase tracking-wide text-muted">
        Email address
      </label>
      <input
        id={emailId}
        type="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@email.com"
        disabled={status === "loading"}
        className="mt-2 w-full rounded-full border border-hairline bg-ink px-5 py-3.5 text-sm text-cream placeholder:text-muted/70 focus:border-gold/50 focus:outline-none disabled:opacity-60"
      />

      <label className="mt-3 flex items-start gap-2.5 text-xs leading-relaxed text-muted">
        <input
          type="checkbox"
          checked={emailConsent}
          onChange={(event) => setEmailConsent(event.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-hairline bg-ink accent-gold"
        />
        <span>
          Email me updates from Change A Destiny about the Path Assessment, the
          Founding Cohort, and our Victorious Villages mission. Unsubscribe any
          time.
        </span>
      </label>

      <div className="my-6 border-t border-hairline" />

      <label htmlFor={phoneId} className="block text-xs uppercase tracking-wide text-muted">
        Mobile number
      </label>
      <input
        id={phoneId}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        placeholder="(555) 123-4567"
        disabled={status === "loading"}
        className="mt-2 w-full rounded-full border border-hairline bg-ink px-5 py-3.5 text-sm text-cream placeholder:text-muted/70 focus:border-gold/50 focus:outline-none disabled:opacity-60"
      />

      <label className="mt-3 flex items-start gap-2.5 text-xs leading-relaxed text-muted">
        <input
          type="checkbox"
          checked={smsConsent}
          onChange={(event) => setSmsConsent(event.target.checked)}
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

      <label htmlFor={nameId} className="mt-6 block text-xs uppercase tracking-wide text-muted">
        Name (optional)
      </label>
      <input
        id={nameId}
        type="text"
        autoComplete="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        disabled={status === "loading"}
        className="mt-2 w-full rounded-full border border-hairline bg-ink px-5 py-3.5 text-sm text-cream placeholder:text-muted/70 focus:border-gold/50 focus:outline-none disabled:opacity-60"
      />

      <button
        type="submit"
        disabled={status === "loading" || !canSubmit}
        aria-describedby={canSubmit ? undefined : `${emailId}-hint`}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold-bright disabled:cursor-not-allowed disabled:bg-hairline disabled:text-muted disabled:hover:bg-hairline"
      >
        {status === "loading" && <Loader2 size={15} className="animate-spin" />}
        Sign me up
      </button>

      {!canSubmit && (
        <p id={`${emailId}-hint`} className="mt-2 text-center text-xs text-muted">
          {hint()}
        </p>
      )}

      {status === "error" && (
        <p className="mt-3 text-sm text-ember-bright" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
