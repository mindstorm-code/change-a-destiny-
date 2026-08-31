"use client";

import { useId, useState } from "react";
import { Check, Loader2 } from "lucide-react";

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
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const inputId = useId();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading" || status === "success") return;
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
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
          disabled={status === "loading"}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold-bright disabled:opacity-70"
        >
          {status === "loading" && <Loader2 size={15} className="animate-spin" />}
          {ctaLabel}
        </button>
      </div>
      {status === "error" && (
        <p id={`${inputId}-error`} className="mt-2 text-sm text-ember-bright" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
