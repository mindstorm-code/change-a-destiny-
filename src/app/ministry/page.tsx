import type { Metadata } from "next";
import Image from "next/image";
import { FreebieForm } from "@/components/FreebieForm";
import { Kicker, SectionHeading } from "@/components/ui";

/**
 * ministry.changeadestiny.org (served at /ministry on other hosts).
 *
 * "Set up your own Change A Destiny": a full local chapter with its own leader
 * (Jeff, 2026-11-19). The chapter model, requirements and support aren't
 * written down yet, so this page invites people to start a conversation with
 * Judah and states nothing about terms, fees or licensing.
 */

const title = "Start a Change A Destiny chapter | Change A Destiny";
const description =
  "Called to the mission? Start a conversation with Judah Becker about leading a Change A Destiny chapter where you live.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: [{ url: "/images/bonus-path.jpg" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/images/bonus-path.jpg"] },
};

const FIT = [
  {
    head: "You carry the mission",
    body: "Rescue, education and a future for children at risk of trafficking and poverty is something you already pray about.",
  },
  {
    head: "You can gather people",
    body: "A church, a small group, a circle of friends or a community you already lead.",
  },
  {
    head: "You want to build something lasting",
    body: "Not a one-time event, but a local work that keeps going under your leadership.",
  },
];

const STEPS = [
  { n: "1", head: "Tell us about you", body: "Leave your name and email below." },
  { n: "2", head: "A conversation with Judah", body: "He or his team reaches out to talk about your calling and your community." },
  { n: "3", head: "Decide together", body: "If it's the right fit, you'll get the details of how a chapter is set up." },
];

export default function MinistryPage() {
  return (
    <main className="bg-grain overflow-x-clip">
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-8 lg:grid-cols-[1.1fr_1fr] md:pt-14">
        <div>
          <Kicker>Start a chapter</Kicker>
          <h1 className="font-display text-4xl leading-[1.08] text-cream text-balance sm:text-6xl">
            Bring Change A Destiny to where you live.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Since 2008, Change A Destiny has worked alongside indigenous ministers in India,
            Cambodia and Thailand, building Victorious Villages that rescue children from
            trafficking and poverty. A <span className="text-cream">chapter</span> carries that
            mission into your own city, with you leading it.
          </p>
          <a
            href="#join"
            className="mt-8 inline-flex rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold-bright"
          >
            Start the conversation
          </a>
        </div>
        <div className="relative mx-auto w-full max-w-xl">
          <div className="glow-gold absolute -inset-10 -z-10 rounded-full" aria-hidden="true" />
          <Image
            src="/images/bonus-path.jpg"
            alt="A field path beneath an olive tree as light breaks through clouds"
            width={1600}
            height={893}
            priority
            className="w-full rounded-lg shadow-2xl shadow-black/60 ring-1 ring-hairline"
          />
        </div>
      </section>

      <section className="border-y border-hairline bg-dusk">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading kicker="Is this you?" title="Who leads a chapter" />
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {FIT.map((f) => (
              <div key={f.head} className="border-l border-hairline pl-5">
                <p className="font-display text-lg text-cream">{f.head}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading kicker="How it starts" title="Three steps, no pressure" />
        <ol className="mt-12 grid gap-6 sm:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="rounded-2xl border border-hairline p-6">
              <span className="font-display text-2xl text-gold-bright">{s.n}</span>
              <p className="mt-2 font-display text-lg text-cream">{s.head}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="join" className="scroll-mt-24 border-t border-hairline bg-dusk">
        <div className="mx-auto max-w-xl px-6 py-24">
          <h2 className="text-center font-display text-3xl text-cream text-balance sm:text-4xl">
            Start the conversation
          </h2>
          <p className="mt-4 text-center leading-relaxed text-muted">
            Signing up isn&rsquo;t a commitment. It just lets Judah know you&rsquo;re interested.
          </p>
          <div className="mt-8">
            <FreebieForm
              disclosureRef="cad-ministry-v1"
              source="ministry-site"
              campaign="chapter-interest"
              assetName="chapter interest"
              successNote="Judah or his team will be in touch by email to set up a conversation."
              ctaLabel="I'm interested"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
