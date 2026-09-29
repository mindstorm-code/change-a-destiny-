"use client";

import { useId, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { submitContactMessage } from "@/lib/contact";
import { submitSmsOptIn } from "@/lib/leads";

/**
 * The Contact page form.
 *
 * ## Why the three checkboxes never gate the submit button
 *
 * The site's other forms (OptInForm, ReserveSeatForm, LeadCapturePopup)
 * disable submit until their single consent box is checked, because that box
 * *is* the thing being recorded — "email me" has to be a real yes. These
 * three boxes are different: two are plain acknowledgements ("I've seen the
 * Privacy Policy / Terms"), and the third is marketing consent that is, by
 * its own wording, "not a condition of any purchase or service." Requiring
 * any of them to send a message would contradict that sentence on the same
 * page. So all three stay optional, unchecked by default, and never block
 * the button.
 *
 * ## Why SMS consent is a second, independent request
 *
 * Ticking "text me" here must produce the same kind of consent record the
 * dedicated SMS opt-in page produces — not a mention buried in an email body
 * a human may or may not act on. So when the box is checked and a phone
 * number was given, this form calls `submitSmsOptIn` directly (same helper
 * OptInForm uses, same consent ledger, its own disclosure ref for this page)
 * in addition to, not instead of, sending the message itself. The two
 * outcomes are tracked and reported separately, and a retry only replays the
 * half that failed — resending the message a second time would duplicate it
 * in the inbox; re-recording SMS consent is harmless either way.
 */

const SMS_DISCLOSURE_REF = "cad-contact-page-sms-v1";

type Status = "idle" | "loading" | "done" | "error";

type Landed = { message: boolean; sms: boolean };

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  const [company, setCompany] = useState(""); // honeypot — left empty by real visitors

  const [status, setStatus] = useState<Status>("idle");
  const [landed, setLanded] = useState<Landed>({ message: false, sms: false });
  const [error, setError] = useState<string | null>(null);

  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const messageId = useId();
  const companyId = useId();

  const wantsSms = smsConsent && phone.trim().length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError(null);

    const failures: string[] = [];
    const result: Landed = { message: landed.message, sms: landed.sms };

    if (!result.message) {
      const res = await submitContactMessage({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        message: message.trim(),
        privacyAcknowledged,
        termsAgreed,
        smsConsent,
        company,
      });
      if (res.ok) result.message = true;
      else failures.push(res.error);
    }

    if (wantsSms && !result.sms) {
      const res = await submitSmsOptIn({
        phone: phone.trim(),
        consent: true,
        disclosureRef: SMS_DISCLOSURE_REF,
        ...(name.trim() ? { name: name.trim() } : {}),
      });
      if (res.ok) result.sms = true;
      else failures.push(`Text signup: ${res.error}`);
    }

    setLanded(result);

    if (failures.length === 0) {
      setStatus("done");
      return;
    }
    setError(failures.join(" "));
    setStatus(result.message ? "done" : "error");
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-gold/30 bg-gold/10 p-6">
        <p className="flex items-center gap-2.5 text-sm text-gold-bright">
          <Check size={16} />
          {landed.message ? "Your message is on its way." : "Something didn't go through."}
        </p>
        {wantsSms && (
          <p className="mt-3 text-xs leading-relaxed text-muted">
            {landed.sms
              ? "You're also signed up for text updates. Reply STOP anytime to opt out, HELP for help."
              : "Text signup didn't go through — you can retry below without resending your message."}
          </p>
        )}
        {error && (
          <p className="mt-3 text-xs leading-relaxed text-ember-bright" role="alert">
            {error}
          </p>
        )}
        {(!landed.message || (wantsSms && !landed.sms)) && (
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setError(null);
            }}
            className="mt-4 text-sm text-gold-bright underline hover:text-cream"
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-hairline bg-dusk/50 p-6 sm:p-8"
    >
      {/* Honeypot — hidden from sighted and keyboard users, never a tab stop. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={companyId}>Leave this field blank</label>
        <input
          id={companyId}
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <label htmlFor={nameId} className="block text-xs uppercase tracking-wide text-muted">
        Name
      </label>
      <input
        id={nameId}
        type="text"
        required
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={status === "loading"}
        className="mt-2 w-full rounded-full border border-hairline bg-ink px-5 py-3.5 text-sm text-cream placeholder:text-muted/70 focus:border-gold/50 focus:outline-none disabled:opacity-60"
      />

      <label htmlFor={emailId} className="mt-5 block text-xs uppercase tracking-wide text-muted">
        Email address
      </label>
      <input
        id={emailId}
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        disabled={status === "loading"}
        className="mt-2 w-full rounded-full border border-hairline bg-ink px-5 py-3.5 text-sm text-cream placeholder:text-muted/70 focus:border-gold/50 focus:outline-none disabled:opacity-60"
      />

      <label htmlFor={phoneId} className="mt-5 block text-xs uppercase tracking-wide text-muted">
        Phone number (optional)
      </label>
      <input
        id={phoneId}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="(555) 123-4567"
        disabled={status === "loading"}
        className="mt-2 w-full rounded-full border border-hairline bg-ink px-5 py-3.5 text-sm text-cream placeholder:text-muted/70 focus:border-gold/50 focus:outline-none disabled:opacity-60"
      />

      <label htmlFor={messageId} className="mt-5 block text-xs uppercase tracking-wide text-muted">
        Message
      </label>
      <textarea
        id={messageId}
        required
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="How can we help?"
        disabled={status === "loading"}
        className="mt-2 w-full rounded-2xl border border-hairline bg-ink px-5 py-3.5 text-sm text-cream placeholder:text-muted/70 focus:border-gold/50 focus:outline-none disabled:opacity-60"
      />

      <div className="mt-6 space-y-3 border-t border-hairline pt-6">
        <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted">
          <input
            type="checkbox"
            checked={privacyAcknowledged}
            onChange={(e) => setPrivacyAcknowledged(e.target.checked)}
            disabled={status === "loading"}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-hairline bg-ink accent-gold"
          />
          <span>
            By submitting this form you agree to the{" "}
            <a href="/privacy-policy" className="underline hover:text-cream">
              Privacy Policy
            </a>
            .
          </span>
        </label>

        <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted">
          <input
            type="checkbox"
            checked={termsAgreed}
            onChange={(e) => setTermsAgreed(e.target.checked)}
            disabled={status === "loading"}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-hairline bg-ink accent-gold"
          />
          <span>
            I agree to the{" "}
            <a href="/terms" className="underline hover:text-cream">
              Terms and Conditions
            </a>
            .
          </span>
        </label>

        <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted">
          <input
            type="checkbox"
            checked={smsConsent}
            onChange={(e) => setSmsConsent(e.target.checked)}
            disabled={status === "loading"}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-hairline bg-ink accent-gold"
          />
          <span>
            Yes, I agree to receive marketing and promotional text messages from The Path
            at the phone number provided above. I understand that message frequency
            varies based on my account activity and inquiries, and that message and
            data rates may apply. I acknowledge that my consent is not a condition of
            any purchase or service. I can reply STOP to unsubscribe at any time and
            HELP for assistance.
          </span>
        </label>
        {smsConsent && !phone.trim() && (
          <p className="pl-[1.625rem] text-xs text-muted/80">
            Add your phone number above so we know where to text.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" && <Loader2 size={15} className="animate-spin" />}
        Send message
      </button>

      {status === "error" && (
        <p className="mt-3 text-sm text-ember-bright" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
