"use client";

import { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

type Category = "purpose" | "path" | "passion";

const QUESTIONS: { prompt: string; options: { label: string; value: Category }[] }[] = [
  {
    prompt: "When you imagine being fully at peace, what's missing right now?",
    options: [
      { label: "A clear sense of who I actually am beneath the roles I play", value: "purpose" },
      { label: "A daily practice that actually changes how I react, not just how I feel", value: "path" },
      { label: "A way to act on what I already believe matters", value: "passion" },
    ],
  },
  {
    prompt: "What's kept you from a spiritual community lately?",
    options: [
      { label: "It felt like performance, not honesty about identity", value: "purpose" },
      { label: "It offered comfort, not real tools for the hard days", value: "path" },
      { label: "It talked about justice more than it practiced it", value: "passion" },
    ],
  },
  {
    prompt: "If one thing changed in the next 90 days, what would matter most?",
    options: [
      { label: "Feeling rooted in who I was made to be", value: "purpose" },
      { label: "Breaking a pattern that keeps costing me", value: "path" },
      { label: "Doing something that actually helps someone else", value: "passion" },
    ],
  },
];

const RESULTS: Record<Category, { title: string; body: string }> = {
  purpose: {
    title: "You're closest to Purpose.",
    body: "Start with the Hebrew-roots foundation in The Path — identity before discipline. The book is the fastest way in.",
  },
  path: {
    title: "You're closest to The Path.",
    body: "You already know something needs to change — you need the framework, not more encouragement. The Founding Cohort is built for exactly this.",
  },
  passion: {
    title: "You're closest to Passion.",
    body: "Your restlessness is pointed outward already. The course's final module connects that directly to Change A Destiny's work in the field.",
  },
};

export function PathAssessment() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Category[]>([]);

  function choose(value: Category) {
    const next = [...answers, value];
    setAnswers(next);
    setStep((s) => s + 1);
  }

  function reset() {
    setAnswers([]);
    setStep(0);
  }

  if (step >= QUESTIONS.length) {
    const tally: Record<Category, number> = { purpose: 0, path: 0, passion: 0 };
    answers.forEach((a) => (tally[a] += 1));
    const winner = (Object.keys(tally) as Category[]).sort((a, b) => tally[b] - tally[a])[0];
    const result = RESULTS[winner];

    return (
      <div className="rounded-3xl border border-hairline bg-dusk p-8 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-gold-bright">
          Your result
        </p>
        <h3 className="mt-3 font-serif-display text-2xl text-cream sm:text-3xl">{result.title}</h3>
        <p className="mt-3 max-w-lg text-base leading-relaxed text-muted">{result.body}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href="#cohort"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-gold-bright"
          >
            See the Founding Cohort <ArrowRight size={15} />
          </a>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-cream"
          >
            <RotateCcw size={14} /> Retake
          </button>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[step];

  return (
    <div className="rounded-3xl border border-hairline bg-dusk p-8 sm:p-10">
      <div className="flex items-center gap-2">
        {QUESTIONS.map((_, i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full ${i <= step ? "bg-gold" : "bg-hairline"}`}
          />
        ))}
      </div>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-gold-bright">
        Question {step + 1} of {QUESTIONS.length}
      </p>
      <h3 className="mt-3 font-serif-display text-xl text-cream sm:text-2xl">{q.prompt}</h3>
      <div className="mt-6 space-y-3">
        {q.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => choose(opt.value)}
            className="block w-full rounded-2xl border border-hairline px-5 py-4 text-left text-sm text-cream/90 transition-colors hover:border-gold/40 hover:bg-dusk-soft"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
