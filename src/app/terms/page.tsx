import type { Metadata } from "next";
import { Kicker } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms and Conditions | The Path: Transformative Living",
  description: "Terms and conditions, including our SMS messaging program details.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <Kicker>Legal</Kicker>
      <h1 className="font-display text-3xl uppercase text-cream sm:text-4xl">
        Terms and Conditions
      </h1>
      <p className="mt-2 text-sm text-muted">Last updated: September 2026</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted sm:text-base">
        <section>
          <h2 className="font-display text-lg uppercase tracking-wide text-cream">
            General
          </h2>
          <p className="mt-3">
            These terms govern your use of changeadestiny.org and related
            services operated by Change A Destiny Inc., a 501(c)(3) nonprofit
            organization (EIN 35-2380335), including the Path Assessment, the
            book, the Founding Cohort course, and our email/SMS
            communications. By using this site or opting in to our
            communications, you agree to these terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg uppercase tracking-wide text-cream">
            SMS Program: The Path Updates
          </h2>
          <p className="mt-3">
            <strong className="text-cream">Program description:</strong> By
            replying YES to an email from us, you opt in to receive text
            messages from Change A Destiny about the Path Assessment, the
            Founding Cohort course, and our Victorious Villages mission.
          </p>
          <p className="mt-3">
            <strong className="text-cream">Message frequency:</strong>{" "}
            Frequency varies. You should expect no more than a few messages
            over a typical two-week period, and occasional messages
            afterward.
          </p>
          <p className="mt-3">
            <strong className="text-cream">Message and data rates may apply.</strong>{" "}
            Carrier fees may apply depending on your mobile plan.
          </p>
          <p className="mt-3">
            <strong className="text-cream">Opt-out:</strong> Reply{" "}
            <strong className="text-cream">STOP</strong> at any time to a text
            message to immediately and permanently stop receiving texts from
            this program. You will not be re-added without opting in again.
          </p>
          <p className="mt-3">
            <strong className="text-cream">Help:</strong> Reply{" "}
            <strong className="text-cream">HELP</strong> to a text message for
            assistance, or contact us directly (see below).
          </p>
          <p className="mt-3">
            Carriers are not liable for delayed or undelivered messages.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg uppercase tracking-wide text-cream">
            Purchases
          </h2>
          <p className="mt-3">
            The book (&ldquo;The Path: Transformative Living&rdquo;) and the
            Founding Cohort course are sold as described on the site at time
            of purchase. Founding Cohort seats are limited to a real,
            currently-available count — we do not use manufactured urgency or
            fake countdowns.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg uppercase tracking-wide text-cream">
            Contact us
          </h2>
          <p className="mt-3">
            Questions about these terms, a purchase, or our SMS program? Email{" "}
            <a
              href="mailto:changeadestiny.org@gmail.com"
              className="underline hover:text-cream"
            >
              changeadestiny.org@gmail.com
            </a>{" "}
            or see our{" "}
            <a href="/privacy-policy" className="underline hover:text-cream">
              Privacy Policy
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
