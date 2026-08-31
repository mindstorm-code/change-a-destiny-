import {
  BookHeart,
  ClipboardList,
  Compass,
  Flame,
  HeartHandshake,
  Sprout,
} from "lucide-react";
import { Kicker, SectionHeading } from "@/components/ui";
import { ReserveSeatForm } from "@/components/ReserveSeatForm";

const MODULES = [
  {
    n: "01",
    pillar: "Purpose",
    icon: Sprout,
    title: "Roots — Your Identity in Yeshua & the Hebrew Foundations",
    desc: "Jesus, reframed in His Hebrew context, alongside the biblical feasts. The foundation everything else stands on.",
  },
  {
    n: "02",
    pillar: "The Path",
    icon: ClipboardList,
    title: "The Diagnosis — Naming Your Hurts, Hang-Ups & Habits",
    desc: "A licensed therapist's framework for naming the specific pattern running your life — without shame.",
  },
  {
    n: "03",
    pillar: "The Path",
    icon: Compass,
    title: "The Framework — Daily Disciplines for Resilience",
    desc: "The practices from the book, expanded into a rhythm you can actually sustain past week one.",
  },
  {
    n: "04",
    pillar: "The Path",
    icon: HeartHandshake,
    title: "Relational Repair — Boundaries, Marriage & Family",
    desc: "The same framework, applied outward — healthier boundaries and repaired relationships as proof the inner work is real.",
  },
  {
    n: "05",
    pillar: "Purpose → Passion",
    icon: BookHeart,
    title: "The Awakening — From Healing to Calling",
    desc: "Healing creates capacity. This module names what your restored life is actually for.",
  },
  {
    n: "06",
    pillar: "Passion",
    icon: Flame,
    title: "Passion in Action — Justice & Victorious Villages",
    desc: "An honest look at Change A Destiny's rescue model — for anyone whose restored generosity is looking for somewhere real to go.",
  },
];

export default function CoursePage() {
  return (
    <main>
      <section className="border-b border-hairline">
        <div className="mx-auto max-w-3xl px-6 pt-24 pb-16 text-center sm:pt-28">
          <Kicker>The curriculum</Kicker>
          <h1 className="font-display text-4xl leading-tight text-cream text-balance sm:text-5xl">
            Six modules. Every one either heals, or sends you outward.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted text-balance">
            The Founding Cohort of <em className="text-cream/90 not-italic">The Path:
            Transformative Living</em>, module by module.
          </p>
        </div>
      </section>

      <section className="border-b border-hairline bg-dusk">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <div className="space-y-3">
            {MODULES.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.n}
                  className="flex gap-5 rounded-2xl border border-hairline p-6 sm:gap-6"
                >
                  <div className="flex shrink-0 flex-col items-center gap-2">
                    <span className="font-display text-xl text-muted/50">{m.n}</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-cream">
                      <Icon size={16} />
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-bright">
                      {m.pillar}
                    </p>
                    <h3 className="mt-1.5 font-display text-lg text-cream">{m.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{m.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-hairline">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <SectionHeading kicker="What to expect" title="Built to fit around a life that's already full" align="left" />
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <div>
              <p className="font-display text-lg text-cream">15–20 min videos</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Short enough to finish one module per sitting.
              </p>
            </div>
            <div>
              <p className="font-display text-lg text-cream">A printable workbook</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                One worksheet per module, extending the book you already have.
              </p>
            </div>
            <div>
              <p className="font-display text-lg text-cream">One live call a week</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Small groups, direct access to Judah — not a course you disappear into alone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-dusk">
        <div className="mx-auto max-w-xl px-6 py-24 text-center sm:py-28">
          <h2 className="font-display text-3xl text-cream text-balance sm:text-4xl">
            Reserve your seat in the Founding Cohort
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Nothing is charged now — you&rsquo;ll get the enrollment link and start
            date by email once the cohort is scheduled.
          </p>
          <div className="mt-8 text-left">
            <ReserveSeatForm
              source="cohort"
              ctaLabel="Reserve a seat"
              successLabel="You're on the list — enrollment details are coming to your inbox."
            />
          </div>
        </div>
      </section>
    </main>
  );
}
