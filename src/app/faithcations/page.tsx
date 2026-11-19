import type { Metadata } from "next";
import Image from "next/image";
import { FreebieForm } from "@/components/FreebieForm";
import { Kicker, SectionHeading } from "@/components/ui";

/**
 * faithcations.changeadestiny.org (served at /faithcations on other hosts).
 *
 * An interest list, not a booking page: no trip has dates, a price, a leader
 * or an itinerary yet (Jeff, 2026-11-19). So nothing here states one. Every
 * "what we're planning" line is framed as planned, and the FAQ says plainly
 * what isn't decided. No children are pictured, per the ministry's
 * child-protection rule for the villages.
 */

const title = "Faithcations: travel with purpose in Thailand and Cambodia | Change A Destiny";
const description =
  "A Faithcation pairs travel with the mission. Join the list to hear first when Change A Destiny's trips to Thailand and Cambodia are scheduled.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: [{ url: "/images/village-mission.jpg" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/images/village-mission.jpg"] },
};

const PLANNED = [
  {
    head: "See the mission for yourself",
    body: "Since 2008, Change A Destiny has worked with indigenous ministers in Thailand and Cambodia. A Faithcation is a chance to understand that work up close, not from a newsletter.",
  },
  {
    head: "Rest and reflection",
    body: "It's a vacation too. Time to slow down, pray and take in two beautiful countries.",
  },
  {
    head: "Travel with people who share your faith",
    body: "Travel alongside other believers, with time to talk and pray about what you're seeing.",
  },
];

const FAQ = [
  {
    q: "When is the first trip?",
    a: "The dates aren't set yet. Everyone on the list hears first, before anything is announced publicly.",
  },
  {
    q: "What does it cost?",
    a: "Costs depend on the final itinerary, which is still being planned. Join the list and we'll share full details, with no obligation.",
  },
  {
    q: "Who is it for?",
    a: "Anyone who wants to travel with purpose: supporters of the mission, readers of The Path, churches and small groups.",
  },
  {
    q: "Is signing up a commitment?",
    a: "No. Joining the list only means we'll email you when a trip is scheduled.",
  },
];

export default function FaithcationsPage() {
  return (
    <main className="bg-grain overflow-x-clip">
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-8 lg:grid-cols-[1.1fr_1fr] md:pt-14">
        <div>
          <Kicker>Faithcations · Thailand &amp; Cambodia</Kicker>
          <h1 className="font-display text-4xl leading-[1.08] text-cream text-balance sm:text-6xl">
            A vacation that changes more than your view.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            A <span className="text-cream">Faithcation</span> pairs travel with the mission:
            time in Thailand and Cambodia, prayer, rest, and a first-hand look at the work
            Change A Destiny has supported there since 2008.
          </p>
          <p className="mt-4 max-w-xl text-sm text-muted">
            The first trips are being planned now. Join the list to hear first.
          </p>
          <a
            href="#join"
            className="mt-8 inline-flex rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold-bright"
          >
            Join the Faithcation list
          </a>
        </div>
        <div className="relative mx-auto w-full max-w-xl">
          <div className="glow-gold absolute -inset-10 -z-10 rounded-full" aria-hidden="true" />
          <Image
            src="/images/village-mission.jpg"
            alt="A painted path through golden rice fields toward a village at dawn"
            width={1600}
            height={893}
            priority
            className="w-full rounded-lg shadow-2xl shadow-black/60 ring-1 ring-hairline"
          />
        </div>
      </section>

      <section className="border-y border-hairline bg-dusk">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading kicker="What we're planning" title="Travel, faith and the mission, in one trip" />
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {PLANNED.map((p) => (
              <div key={p.head} className="border-l border-hairline pl-5">
                <p className="font-display text-lg text-cream">{p.head}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="font-display text-2xl text-cream">Honest answers</h2>
        <dl className="mt-6 space-y-5 text-sm leading-relaxed">
          {FAQ.map((f) => (
            <div key={f.q}>
              <dt className="text-cream">{f.q}</dt>
              <dd className="mt-1 text-muted">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="join" className="scroll-mt-24 border-t border-hairline bg-dusk">
        <div className="mx-auto max-w-xl px-6 py-24">
          <h2 className="text-center font-display text-3xl text-cream text-balance sm:text-4xl">
            Hear first when a trip is scheduled
          </h2>
          <p className="mt-4 text-center leading-relaxed text-muted">
            No commitment and no payment. Just the details, as soon as they&rsquo;re set.
          </p>
          <div className="mt-8">
            <FreebieForm
              disclosureRef="cad-faithcations-v1"
              source="faithcations-site"
              campaign="faithcations-interest"
              assetName="Faithcation"
              successNote="We'll email you the dates and details as soon as the first trip is scheduled."
              ctaLabel="Join the list"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
