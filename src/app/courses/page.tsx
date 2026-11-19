import type { Metadata } from "next";
import Image from "next/image";
import { FreebieForm } from "@/components/FreebieForm";
import { Kicker, SectionHeading } from "@/components/ui";
import { MODULES } from "@/lib/curriculum";

/**
 * courses.changeadestiny.org (served at /courses on every other host).
 *
 * The Path course, taught from Judah Becker's book. Jeff's rules: never call it
 * a "cohort", no public price (drive to the list and a conversation), and the
 * same name/email/optional-text form as the /free pages.
 */

const title = "The Path Course | Judah Becker";
const description =
  "Six modules taught from The Path: Transformative Living by Judah Becker. Short videos, a printable workbook and a weekly live call.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: [{ url: "/images/hero-walking.jpg" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/images/hero-walking.jpg"] },
};

const EXPECT = [
  { head: "15 to 20 minute videos", body: "Short enough to finish one module in a sitting." },
  { head: "A printable workbook", body: "One worksheet per module, building on the book." },
  { head: "One live call a week", body: "Small groups with Judah, so you never work through it alone." },
];

export default function CoursesPage() {
  return (
    <main className="bg-grain overflow-x-clip">
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-8 lg:grid-cols-[1.1fr_1fr] md:pt-14">
        <div>
          <Kicker>Courses from The Path</Kicker>
          <h1 className="font-display text-4xl leading-[1.08] text-cream text-balance sm:text-6xl">
            The book showed you the path. The course walks it with you.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Six modules taught by Judah Becker from{" "}
            <i className="text-cream">The Path: Transformative Living</i>. Each one either heals
            something in you or sends you outward.
          </p>
          <a
            href="#join"
            className="mt-8 inline-flex rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold-bright"
          >
            Get the start date
          </a>
        </div>
        <div className="relative mx-auto w-full max-w-xl">
          <div className="glow-gold absolute -inset-10 -z-10 rounded-full" aria-hidden="true" />
          <Image
            src="/images/hero-walking.jpg"
            alt="Two figures walking a wheat-field path at sunset"
            width={1600}
            height={893}
            priority
            className="w-full rounded-lg shadow-2xl shadow-black/60 ring-1 ring-hairline"
          />
        </div>
      </section>

      <section className="border-y border-hairline bg-dusk">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <SectionHeading kicker="The modules" title="Six steps, in order" align="left" />
          <ol className="mt-10 space-y-3">
            {MODULES.map((m) => {
              const Icon = m.icon;
              return (
                <li key={m.n} className="flex gap-5 rounded-2xl border border-hairline p-6 sm:gap-6">
                  <div className="flex shrink-0 flex-col items-center gap-2">
                    <span className="font-display text-xl text-muted/50">{m.n}</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-cream">
                      <Icon size={16} aria-hidden="true" />
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-bright">
                      {m.pillar}
                    </p>
                    <h3 className="mt-1.5 font-display text-lg text-cream">{m.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{m.desc}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading kicker="How it works" title="Built to fit around a life that's already full" />
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {EXPECT.map((e) => (
            <div key={e.head} className="border-l border-hairline pl-5">
              <p className="font-display text-lg text-cream">{e.head}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{e.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="join" className="scroll-mt-24 border-t border-hairline bg-dusk">
        <div className="mx-auto max-w-xl px-6 py-24">
          <h2 className="text-center font-display text-3xl text-cream text-balance sm:text-4xl">
            Be first to hear when the course opens
          </h2>
          <p className="mt-4 text-center leading-relaxed text-muted">
            Nothing is charged now. You&rsquo;ll get the start date and how to join by email.
          </p>
          <div className="mt-8">
            <FreebieForm
              disclosureRef="cad-courses-v1"
              source="courses-site"
              campaign="path-course"
              assetName="Path Course"
              successNote="We'll email you the start date and how to join as soon as it's set."
              ctaLabel="Tell me when it opens"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
