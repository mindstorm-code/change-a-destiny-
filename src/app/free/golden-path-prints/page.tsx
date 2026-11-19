import type { Metadata } from "next";
import Image from "next/image";
import { FreebieForm } from "@/components/FreebieForm";
import { Kicker } from "@/components/ui";

/**
 * Squeeze page 2 of 4 (War Room 2026-11-18): Golden Path Prints, a free art
 * PDF in the site's own painterly style with one line from the book on each.
 *
 * Rules from the War Room: labeled AI-made, no children's faces, captions
 * taken from the book. Written for Casey: no giving ask on this screen.
 */

const title = "Golden Path Prints: free printable art | Judah Becker";
const description =
  "Four free printable pieces for your wall, desk or journal, each with one line from The Path: Transformative Living by Judah Becker.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [{ url: "/images/golden-prints-cover.jpg", width: 1210, height: 935 }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/images/golden-prints-cover.jpg"] },
};

const PIECES = [
  { src: "/images/hero-walking.jpg", line: "One prayer at a time. One step at a time.", alt: "Two figures walking a wheat-field path at sunset" },
  { src: "/images/bonus-path.jpg", line: "Stay in prayer over distraction. Stay in faith over fear.", alt: "A field path beneath an olive tree as light breaks through clouds" },
  { src: "/images/village-mission.jpg", line: "This is where prayer becomes mission.", alt: "A painted path through golden rice fields toward a village at dawn" },
  { src: "/images/passion.jpg", line: "Lord, wherever the Path leads tomorrow, I will walk it with You.", alt: "Two figures walking a field path at dusk" },
];

export default function GoldenPathPrintsPage() {
  return (
    <main className="bg-grain overflow-x-clip">
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-8 lg:grid-cols-[1fr_1fr] md:pt-14">
        <div>
          <Kicker>Free art prints · 4 pieces</Kicker>
          <h1 className="font-display text-4xl leading-[1.08] text-cream text-balance sm:text-6xl">
            Something good to look at on an ordinary morning.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            <span className="text-cream">Golden Path Prints</span> are four printable pieces, each
            carrying one line from Judah Becker&rsquo;s book. Every piece comes twice: once with its
            words, once as art alone for a frame.
          </p>

          <div className="mt-8 max-w-xl">
            <FreebieForm
              disclosureRef="cad-golden-prints-v1"
              source="free-golden-path-prints"
              campaign="golden-prints-freebie"
              assetName="Golden Path Prints"
              downloadHref="/downloads/golden-path-prints.pdf"
              downloadFileName="Golden-Path-Prints-Judah-Becker.pdf"
              ctaLabel="Send me the prints"
            />
            <p className="mt-4 text-xs text-muted">
              Free. No card, no course pitch on the next screen. The download appears right away.
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="glow-gold absolute -inset-10 -z-10 rounded-full" aria-hidden="true" />
          <Image
            src="/images/golden-prints-cover.jpg"
            alt="Cover of Golden Path Prints: two figures walking a golden wheat-field path at sunset"
            width={1210}
            height={935}
            priority
            className="w-full rounded-lg shadow-2xl shadow-black/60 ring-1 ring-hairline"
          />
        </div>
      </section>

      <section className="border-y border-hairline bg-dusk">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-3xl text-cream">The four pieces</h2>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2">
            {PIECES.map((p) => (
              <li key={p.src}>
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={1600}
                  height={893}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="aspect-video w-full rounded-md object-cover ring-1 ring-hairline"
                />
                <p className="mt-3 font-display text-lg leading-snug text-cream">&ldquo;{p.line}&rdquo;</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-cream">Where the words come from</h2>
          <p className="mt-4 leading-relaxed text-muted">
            Every line is from <i>The Path: Transformative Living</i> by Judah Becker, a minister and
            counselor with more than 50 years of ministry and a Master&rsquo;s degree in Counseling, who
            founded Change A Destiny in 2008.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-cream">Honest answers</h2>
          <dl className="mt-4 space-y-4 text-sm leading-relaxed">
            <div>
              <dt className="text-cream">Who made the art?</dt>
              <dd className="text-muted">
                They&rsquo;re AI-generated illustrations, and the PDF says so. No real people are
                pictured.
              </dd>
            </div>
            <div>
              <dt className="text-cream">Will they print well at home?</dt>
              <dd className="text-muted">
                Yes. They&rsquo;re Letter landscape and fit a standard 8.5 &times; 11 frame. Heavier
                matte paper makes them look finished.
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
