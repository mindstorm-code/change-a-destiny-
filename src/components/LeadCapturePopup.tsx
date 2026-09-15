"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Check, Loader2, X } from "lucide-react";
import { submitLead } from "@/lib/leads";

const DISCLOSURE_REF = "cad-lead-popup-v1";
const DISMISS_KEY = "cad-lead-popup-dismissed-at";
const SHOWN_KEY = "cad-lead-popup-shown";
const DISMISS_SNOOZE_DAYS = 14;
const SHOW_DELAY_MS = 15000;

type Status = "idle" | "loading" | "success" | "error";

function shouldOffer(): boolean {
  if (typeof window === "undefined") return false;
  if (sessionStorage.getItem(SHOWN_KEY)) return false;
  const dismissedAt = localStorage.getItem(DISMISS_KEY);
  if (!dismissedAt) return true;
  const elapsedDays = (Date.now() - Number(dismissedAt)) / (1000 * 60 * 60 * 24);
  return elapsedDays >= DISMISS_SNOOZE_DAYS;
}

export function LeadCapturePopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const inputId = useId();
  const consentId = useId();
  const titleId = useId();

  useEffect(() => {
    if (!shouldOffer()) return;
    const timer = window.setTimeout(() => {
      sessionStorage.setItem(SHOWN_KEY, "1");
      setOpen(true);
    }, SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  }, []);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const focusable = dialog?.querySelectorAll<HTMLElement>(
      'input, button, a[href], [tabindex]:not([tabindex="-1"])'
    );
    focusable?.[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [open, close]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading" || status === "success" || !consent) return;
    setStatus("loading");
    setError(null);

    const result = await submitLead({
      email,
      consent: true,
      disclosureRef: DISCLOSURE_REF,
      source: "book-landing-popup",
      campaign: "book-launch",
    });

    if (!result.ok) {
      setError(result.error);
      setStatus("error");
      return;
    }

    setStatus("success");
    // Snoozes the popup on success as well as on dismissal, so somebody who
    // subscribed is not asked again a fortnight later.
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    window.setTimeout(close, 3000);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 motion-safe:animate-[fadeIn_0.2s_ease-out]"
      onClick={close}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl border border-hairline bg-dusk p-8 shadow-2xl motion-safe:animate-[popIn_0.25s_ease-out]"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-5 top-5 text-muted transition-colors hover:text-cream"
        >
          <X size={18} />
        </button>

        {status === "success" ? (
          <div className="flex items-center gap-2.5 text-sm text-gold-bright">
            <Check size={16} /> You&rsquo;re on the list — check your inbox soon.
          </div>
        ) : (
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-gold-bright">
              Free
            </p>
            <h3 id={titleId} className="mt-3 font-display text-2xl text-cream">
              Take the Path Assessment
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              One honest question, three minutes: which hurt, hang-up, or habit is
              actually running your life right now? Get your result, plus
              occasional updates about the book, the Founding Cohort, and Change
              A Destiny&rsquo;s mission.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6">
              <label htmlFor={inputId} className="sr-only">
                Email address
              </label>
              <input
                id={inputId}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                disabled={status === "loading"}
                aria-invalid={status === "error"}
                aria-describedby={status === "error" ? `${inputId}-error` : undefined}
                className="w-full rounded-full border border-hairline bg-ink px-5 py-3.5 text-sm text-cream placeholder:text-muted/70 focus:border-gold/50 focus:outline-none disabled:opacity-60"
              />

              <label className="mt-4 flex items-start gap-2.5 text-xs leading-relaxed text-muted">
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
                  We&rsquo;ll only use this for Path Assessment results and
                  occasional mission updates — no spam, unsubscribe anytime. See
                  our{" "}
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

              <button
                type="submit"
                disabled={status === "loading" || !consent}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold-bright disabled:opacity-50"
              >
                {status === "loading" && <Loader2 size={15} className="animate-spin" />}
                Send Me Updates
              </button>
              {status === "error" && (
                <p id={`${inputId}-error`} className="mt-2 text-sm text-ember-bright" role="alert">
                  {error}
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
