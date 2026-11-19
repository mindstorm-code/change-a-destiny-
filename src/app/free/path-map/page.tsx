import type { Metadata } from "next";
import Image from "next/image";
import { FreebieForm } from "@/components/FreebieForm";
import { Kicker } from "@/components/ui";

/**
 * Squeeze page 1 of 4 (War Room 2026-11-18): the free Path Map workbook.
 *
 * Written for Casey (avatars/change-a-destiny-casey.md): dual credential up
 * front, "Messianic" explained in plain words, a bounded time promise, no
 * giving ask and no course pitch on this screen. One page, one job: the email.
 */

const title = "The Path Map: a free 10-page workbook | Judah Becker";
const description =
  "Find your Meaning And Purpose in about 15 minutes. A free printable workbook from The Path: Transformative Living by Judah Becker, minister and counselor.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [{ url: "/images/path-map-cover.jpg", width: 1100, height: 1424 }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/images/path-map-cover.jpg"] },
};

const INSIDE = [
  { t: "Your name", d: "Who you are beneath the roles, and the hurtful names you're ready to trade in." },
  { t: "Four questions", d: "What you do, who you do it for, and what each side really receives." },
  { t: "Your one-sentence M.A.P.", d: "Your Meaning And Purpose, written down where you can see it." },
  { t: "Your R.E.M.", d: "A Relationship Enrichment Map of the people already in your life." },
  { t: "The Five by Five", d: "Five people who shape you, five you can shape, and one small step this week." },
];

export default function PathMapPage() {
  return (
    <main className="bg-grain overflow-x-clip">
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-8 md:grid-cols-[1.15fr_0.85fr] md:pt-14">
        <div>
          <Kicker>Free workbook · 10 pages</Kicker>
          <h1 className="font-display text-4xl leading-[1.08] text-cream text-balance sm:text-6xl">
            Find your Meaning and Purpose in 15 minutes, with a pen.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            <span className="text-cream">The Path Map</span> is a printable workbook built from Judah
            Becker&rsquo;s book. Five honest questions, then the names of the people already in your
            life. A framework, not a feeling.
          </p>

          <div className="mt-8 max-w-xl">
            <FreebieForm
              disclosureRef="cad-path-map-v1"
              source="free-path-map"
              campaign="path-map-freebie"
              assetName="The Path Map"
              downloadHref="/downloads/the-path-map.pdf"
              downloadFileName="The-Path-Map-Judah-Becker.pdf"
              ctaLabel="Send me the Map"
            />
            <p className="mt-4 text-xs text-muted">
              Free. No card, no course pitch on the next screen. The download appears right away.
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="glow-gold absolute -inset-10 -z-10 rounded-full" aria-hidden="true" />
          <Image
            src="/images/path-map-cover.jpg"
            alt="Cover of The Path Map workbook: a man and a figure of light walking a golden path"
            width={1100}
            height={1424}
            priority
            className="w-full rounded-lg shadow-2xl shadow-black/60 ring-1 ring-hairline"
          />
        </div>
      </section>

      <section className="border-y border-hairline bg-dusk">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-3xl text-cream">What&rsquo;s inside</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {INSIDE.map((item, i) => (
              <li key={item.t} className="border-l border-hairline pl-5">
                <p className="font-display text-3xl text-gold-bright">{i + 1}</p>
                <p className="mt-1 font-display text-lg text-cream">{item.t}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.d}</p>
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
              <dt className="text-cream">Do I need a church background?</dt>
              <dd className="text-muted">
                No. Judah is a Messianic Jew, a Jewish follower of Jesus, and sometimes uses
                Jesus&rsquo; Hebrew name, Yeshua. The workbook explains that in one line and assumes
                nothing else.
              </dd>
            </div>
            <div>
              <dt className="text-cream">Is this therapy?</dt>
              <dd className="text-muted">
                No. It&rsquo;s a faith-based reflection exercise, not a substitute for counseling or
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
