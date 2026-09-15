import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-ink">
      <div className="mx-auto max-w-6xl px-6 py-12 text-sm text-muted">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-lg uppercase tracking-wide text-cream">The Path</p>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Judah Becker &mdash; Messianic minister, licensed counseling therapist, and
              founder of Change A Destiny.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
            <Link href="/#book" className="hover:text-cream">The Book</Link>
            <Link href="/#cohort" className="hover:text-cream">The Course</Link>
            <Link href="/#mission" className="hover:text-cream">The Mission</Link>
            <Link href="/course" className="hover:text-cream">Curriculum</Link>
            <a
              href="https://changeadestiny.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cream"
            >
              changeadestiny.org ↗
            </a>
          </nav>
        </div>
        <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted/70">
          <Link href="/privacy-policy" className="hover:text-cream">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-cream">Terms and Conditions</Link>
        </nav>
        <p className="mt-6 text-xs text-muted/60">
          Figures on this page are planning estimates for launch purposes, not guarantees.
        </p>
      </div>
    </footer>
  );
}
