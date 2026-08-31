import type { ReactNode } from "react";

export function Ornament() {
  return (
    <div className="ornament" aria-hidden="true">
      <span className="ornament-mark" />
    </div>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-gold-bright">
      {children}
    </p>
  );
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "center",
}: {
  kicker?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      {kicker && <Kicker>{kicker}</Kicker>}
      <h2 className="font-display text-3xl leading-[1.15] text-cream text-balance sm:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-lg leading-relaxed text-muted text-balance">{subtitle}</p>
      )}
    </div>
  );
}

export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <p className="pull-quote mx-auto max-w-2xl pl-6 text-2xl text-cream sm:text-3xl">
      {children}
    </p>
  );
}

export function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="border-l border-hairline pl-5">
      <p className="font-display text-3xl text-gold-bright sm:text-4xl">{value}</p>
      <p className="mt-1.5 text-sm leading-snug text-muted">{label}</p>
    </div>
  );
}
