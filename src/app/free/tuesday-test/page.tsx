import type { Metadata } from "next";
import Image from "next/image";
import { FreebieForm } from "@/components/FreebieForm";
import { Kicker } from "@/components/ui";

/**
 * Squeeze page 4 of 4 (War Room 2026-11-18): The Tuesday Test, a free
 * 7-day printable tracker built on Level One of the book's Prayer Path.
 *
 * Written for Casey (avatars/change-a-destiny-casey.md), whose own line is
 * "a framework, not a feeling. Feelings wear off by Tuesday." Bounded promise
 * (5 minutes, 7 days), self-scored, no giving ask on this screen.
 */

const title = "The Tuesday Test: a free 7-day prayer tracker | Judah Becker";
const description =
  "Five minutes a day for seven days, scored by you. A free printable tracker from The Path: Transformative Living by Judah Becker, minister and counselor.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [{ url: "/images/tuesday-test-cover.jpg", width: 1100, height: 1424 }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/images/tuesday-test-cover.jpg"] },
};

const DAYS = [
  { d: "1", t: "An ancient prayer", n: "Psalm 23, read slowly twice." },
  { d: "2", t: "The serenity line", n: "One thing to accept, one to change." },
  { d: "3", t: "Read it three times", n: "Wait for the phrase that lifts." },
  { d: "4", t: "The resolve", n: "One sentence to carry through the day." },
  { d: "5", t: "Five names", n: "One plain prayer for each person." },
  { d: "6", t: "Listen and act once", n: "Write what comes, then send one text." },
  { d: "7", t: "The verdict", n: "Read your own numbers back." },
];

export default function TuesdayTestPage() {
  return (
    <main className="bg-grain overflow-x-clip">
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-8 md:grid-cols-[1.15fr_0.85fr] md:pt-14">
        <div>
          <Kicker>Free 7-day tracker · 8 pages</Kicker>
          <h1 className="font-display text-4xl leading-[1.08] text-cream text-balance sm:text-6xl">
            Feelings fade by Tuesday. Find out what&rsquo;s still standing.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            <span className="text-cream">The Tuesday Test</span> is five minutes a day for seven days,
            from the first level of Judah Becker&rsquo;s Prayer Path. You rate each day yourself, 1 to
            5, and on day seven you read your own numbers.
          </p>

          <div className="mt-8 max-w-xl">
            <FreebieForm
              disclosureRef="cad-tuesday-test-v1"
              source="free-tuesday-test"
              campaign="tuesday-test-freebie"
              assetName="The Tuesday Test"
              downloadHref="/downloads/the-tuesday-test.pdf"
              downloadFileName="The-Tuesday-Test-Judah-Becker.pdf"
              ctaLabel="Send me the tracker"
            />
            <p className="mt-4 text-xs text-muted">
              Free. No card, no course pitch on the next screen. The download appears right away.
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="glow-gold absolute -inset-10 -z-10 rounded-full" aria-hidden="true" />
          <Image
            src="/images/tuesday-test-cover.jpg"
            alt="Cover of The Tuesday Test tracker: a man and a figure of light walking a field path at dusk"
            width={1100}
            height={1424}
            priority
            className="w-full rounded-lg shadow-2xl shadow-black/60 ring-1 ring-hairline"
          />
        </div>
      </section>

      <section className="border-y border-hairline bg-dusk">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-3xl text-cream">The week</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            One minute still, three minutes on the day&rsquo;s practice, one minute to write a line and
            score yourself. Miss a day and you just pick up the next page.
          </p>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DAYS.map((day) => (
              <li key={day.d} className="border-l border-hairline pl-5">
                <p className="font-display text-3xl text-gold-bright">{day.d}</p>
                <p className="mt-1 font-display text-lg text-cream">{day.t}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{day.n}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-cream">Who it&rsquo;s from</h2>
          <p className="mt-4 leading-relaxed text-muted">
            Judah Becker has spent more than 50 years as a minister, missionary, counselor and advocate
            for justice, across the US, Southeast Asia and two dozen other countries. He holds a
            Master&rsquo;s degree in Counseling and founded Change A Destiny in 2008.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-cream">Honest answers</h2>
          <dl className="mt-4 space-y-4 text-sm leading-relaxed">
            <div>
              <dt className="text-cream">What if I feel nothing?</dt>
              <dd className="text-muted">
                Write that down. &ldquo;Nothing happened&rdquo; is a real answer, and the tracker is
                built to show you a pattern, not a mood.
              </dd>
            </div>
            <div>
              <dt className="text-cream">Do I need a church background?</dt>
              <dd className="text-muted">
                No. Judah is a Messianic Jew, a Jewish follower of Jesus. The tracker explains that in
                one line and uses short, plain Scripture readings.
              </dd>
            </div>
            <div>
              <dt className="text-cream">Is this therapy?</dt>
              <dd className="text-muted">
                No. It&rsquo;s a faith-based reflection practice, not a substitute for counseling or
                crisis care.
              </dd>
            </div>
            <div>
              <dt className="text-cream">What happens to my email?</dt>
              <dd className="text-muted">
                Occasional emails about The Path and the mission. Unsubscribe anytime.
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
}
