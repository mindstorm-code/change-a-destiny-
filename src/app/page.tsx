import Image from "next/image";
import { BookOpen, Check } from "lucide-react";
import { Kicker, Ornament, PullQuote, SectionHeading, Stat } from "@/components/ui";
import { PathAssessment } from "@/components/PathAssessment";
import { ReserveSeatForm } from "@/components/ReserveSeatForm";
import { CinematicHero } from "@/components/hero/CinematicHero";

const TIERS = [
  {
    name: "Self-Study",
    price: "$497",
    tagline: "The full framework, on your own schedule.",
    features: ["All 6 video modules, lifetime access", "Companion workbook", "Private course community"],
  },
  {
    name: "Founding Cohort",
    price: "$997",
    core: true,
    tagline: "Live weekly calls with Judah. Where the real change happens.",
    features: ["Everything in Self-Study", "6 live weekly group calls", "Small accountability groups (4–6 people)"],
  },
  {
    name: "Mentorship",
    price: "$1,497",
    tagline: "Direct, individual pastoral care.",
    features: ["Everything in Founding Cohort", "3 private 1:1 sessions with Judah", "Priority Change A Destiny partner invite"],
  },
];

const FAQ = [
  {
    q: "Is this therapy?",
    a: "No. Judah is a licensed counseling therapist, and that clinical training shapes the framework — but the course is spiritual formation and education, not a substitute for individual therapy or crisis care.",
  },
  {
    q: "What if I've never heard of Yeshua or the biblical feasts?",
    a: "The course starts there deliberately. No prior background in Hebrew roots or Messianic theology is assumed — Module 1 builds the foundation from the ground up.",
  },
  {
    q: "Why is the cohort limited?",
    a: "The live calls are genuinely small-group — that's the point. Seats are capped to what Judah can personally show up for, not an artificial scarcity tactic.",
  },
  {
    q: "How does this connect to Change A Destiny?",
    a: "It doesn't have to. The course stands on its own. But Module 6 introduces the Victorious Villages model for anyone who wants their own restoration to turn outward.",
  },
];

export default function HomePage() {
  return (
    <main>
      <CinematicHero />

      {/* BELIEF / AUTHORITY */}
      <section className="bg-grain relative border-b border-hairline">
        <div className="glow-royal pointer-events-none absolute -top-32 left-1/2 h-96 w-[640px] -translate-x-1/2 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-24 sm:py-28 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Kicker>Before the pitch</Kicker>
            <h1 className="font-display text-3xl leading-[1.15] text-cream text-balance sm:text-5xl">
              If church gave you truth without tools, and therapy gave you tools
              without truth &mdash; this is the place those two finally meet.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted text-balance">
              Judah Becker is a Messianic Jew, an ordained minister, and a licensed
              counseling therapist &mdash; not a motivational speaker borrowing
              clinical language. <em className="text-cream/90 not-italic">The Path</em>{" "}
              is what fifty years of both practices actually looks like, distilled
              into a book and a course.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 self-start sm:gap-x-10">
            <Stat value="50 yrs" label="Combined counseling &amp; ministry practice" />
            <Stat value="24+" label="Countries in active ministry" />
            <Stat value="2008" label="Change A Destiny founded" />
            <Stat value="3" label="Nations running Victorious Villages" />
          </div>
        </div>
      </section>

      {/* ASSESSMENT */}
      <section className="border-b border-hairline">
        <div className="mx-auto max-w-3xl px-6 py-24 sm:py-28">
          <SectionHeading
            kicker="Start here"
            title="Which part of the framework do you actually need first?"
            subtitle="Three quick questions, an honest answer — not a lead-gen quiz dressed up as insight."
          />
          <div className="mt-12">
            <PathAssessment />
          </div>
        </div>
      </section>

      {/* BOOK */}
      <section id="book" className="relative scroll-mt-24 overflow-hidden border-b border-hairline bg-dusk">
        <Image
          src="/images/parchment.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.06] mix-blend-overlay"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative mx-auto w-full max-w-[280px]">
            <div className="glow-royal pointer-events-none absolute h-72 w-72 -translate-x-6 -translate-y-6 blur-3xl" />
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-2xl shadow-black/40">
              <Image
                src="/images/book-cover.jpg"
                alt="The Path: Transformative Living, by Judah Becker — book cover"
                fill
                sizes="280px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div>
            <Kicker>Step one · $9.10</Kicker>
            <h2 className="font-display text-3xl leading-tight text-cream text-balance sm:text-4xl">
              77 pages. Two hours. Enough to know if this framework is for you.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
              <em className="text-cream/90 not-italic">The Path: Transformative Living</em>{" "}
              is the concentrated version &mdash; the same clinical-and-spiritual
              framework taught in the course, written short and dense enough to
              finish in one sitting. No obligation past the ten dollars.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-cream/85">
              {["Kindle & paperback", "Read in one sitting", "The same framework the course builds on"].map(
                (f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check size={15} className="text-gold-bright" />
                    {f}
                  </li>
                )
              )}
            </ul>
            <a
              href="https://www.amazon.com/dp/B0HCFBDL13"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold-bright"
            >
              <BookOpen size={16} /> Get the book on Amazon
            </a>
          </div>
        </div>
      </section>

      {/* COHORT / CORE OFFER */}
      <section id="cohort" className="scroll-mt-24 border-b border-hairline">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <SectionHeading
            kicker="Step two · The Founding Cohort"
            title="The Path: Transformative Living — the course"
            subtitle="Six modules built on Purpose, The Path, and Passion. The first cohort is intentionally small — capped at 40 seats so the live calls stay real."
          />

          <div className="mx-auto mt-12 max-w-2xl">
            <PullQuote>
              Healing was never meant to be private. It&rsquo;s meant to change what
              you do next.
            </PullQuote>
          </div>

          <div className="mt-16 overflow-hidden rounded-3xl border border-hairline">
            {TIERS.map((tier, i) => (
              <div
                key={tier.name}
                className={`flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between ${
                  i > 0 ? "border-t border-hairline" : ""
                } ${tier.core ? "bg-gold/[0.06]" : ""}`}
              >
                <div className="sm:w-64">
                  {tier.core && (
                    <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-gold-bright">
                      Core offer
                    </p>
                  )}
                  <h3 className="font-display text-xl text-cream">{tier.name}</h3>
                  <p className="mt-1 text-sm text-muted">{tier.tagline}</p>
                </div>
                <ul className="flex-1 space-y-1.5 text-sm text-cream/85">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check size={14} className="mt-1 shrink-0 text-gold-bright" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="font-display text-2xl text-gold-bright sm:w-32 sm:text-right">
                  {tier.price}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-lg">
            <p className="mb-4 text-sm text-muted">
              Cohort dates are set once the founding group fills. Reserve a seat and
              you&rsquo;ll get the enrollment link and start date by email &mdash; nothing
              is charged now.
            </p>
            <ReserveSeatForm
              source="cohort"
              ctaLabel="Reserve a seat"
              successLabel="You're on the list — enrollment details are coming to your inbox."
            />
          </div>

          <p className="mt-10 text-sm text-muted">
            Want the full module-by-module breakdown first?{" "}
            <a href="/course" className="text-gold-bright underline underline-offset-4">
              See the curriculum
            </a>
            .
          </p>
        </div>
      </section>

      {/* MISSION / PROOF */}
      <section id="mission" className="relative scroll-mt-24 overflow-hidden border-b border-hairline bg-dusk">
        <Image
          src="/images/village-mission.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-dusk via-dusk/80 to-dusk" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center sm:py-28">
          <Ornament />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.32em] text-gold-bright">
            Passion, in the field
          </p>
          <PullQuote>
            A restored life turns outward. Change A Destiny exists so that turning
            outward has somewhere real to go.
          </PullQuote>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted">
            Since 2008, Change A Destiny has worked alongside indigenous ministers in
            India, Cambodia, and Thailand &mdash; building self-sustaining &ldquo;Victorious
            Villages&rdquo; that rescue children from trafficking and poverty, then give
            them an education, a trade, and a future that doesn&rsquo;t depend on
            outside aid forever.
          </p>
          <div className="mx-auto mt-12 grid max-w-md grid-cols-3 gap-6">
            <Stat value="India" label="" />
            <Stat value="Cambodia" label="" />
            <Stat value="Thailand" label="" />
          </div>
          <a
            href="https://changeadestiny.org"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-block rounded-full border border-gold/40 px-7 py-3.5 text-sm font-medium text-gold-bright transition-colors hover:bg-gold hover:text-ink"
          >
            Learn about Victorious Villages ↗
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-hairline">
        <div className="mx-auto max-w-3xl px-6 py-24 sm:py-28">
          <SectionHeading kicker="Before you go" title="A few honest questions" align="left" />
          <div className="mt-10 divide-y divide-hairline">
            {FAQ.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-cream marker:content-none">
                  {item.q}
                  <span className="text-muted transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-grain relative">
        <div className="glow-ember pointer-events-none absolute bottom-0 left-1/2 h-80 w-[520px] -translate-x-1/2 blur-3xl" />
        <div className="relative mx-auto max-w-2xl px-6 py-24 text-center sm:py-28">
          <h2 className="font-display text-3xl text-cream text-balance sm:text-4xl">
            The path doesn&rsquo;t get easier by waiting.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted text-balance">
            Start with the book if you&rsquo;re not sure yet. Reserve a cohort seat if
            you already know.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#cohort"
              className="w-full rounded-full bg-gold px-7 py-3.5 text-center font-medium text-ink transition-colors hover:bg-gold-bright sm:w-auto"
            >
              Reserve a cohort seat
            </a>
            <a
              href="#book"
              className="w-full rounded-full border border-hairline px-7 py-3.5 text-center font-medium text-cream transition-colors hover:border-gold/40 sm:w-auto"
            >
              Start with the book — $9.10
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
