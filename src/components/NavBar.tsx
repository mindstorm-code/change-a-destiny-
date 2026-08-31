"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const ANCHORS = [
  { href: "/#book", label: "The Book" },
  { href: "/#cohort", label: "The Course" },
  { href: "/#mission", label: "The Mission" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-display text-xl uppercase tracking-wide text-cream">The Path</span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {ANCHORS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-cream"
            >
              {l.label}
            </Link>
          ))}
          {pathname !== "/course" && (
            <Link
              href="/course"
              className="text-sm text-muted transition-colors hover:text-cream"
            >
              Curriculum
            </Link>
          )}
          <Link
            href="/#cohort"
            className="rounded-full border border-gold/40 px-5 py-2 text-sm font-medium text-gold-bright transition-colors hover:bg-gold hover:text-ink"
          >
            Reserve a seat
          </Link>
        </nav>

        <button
          className="text-cream md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 bg-ink px-6 pb-5 md:hidden">
          {ANCHORS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-sm text-muted hover:bg-dusk-soft hover:text-cream"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/course"
            onClick={() => setOpen(false)}
            className="rounded-lg px-2 py-3 text-sm text-muted hover:bg-dusk-soft hover:text-cream"
          >
            Curriculum
          </Link>
        </nav>
      )}
    </header>
  );
}
