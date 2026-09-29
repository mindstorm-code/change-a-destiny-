import type { Metadata } from "next";
import { Kicker } from "@/components/ui";
import { OptInForm } from "@/components/OptInForm";

/**
 * The opt-in page named in the A2P 10DLC Campaign filing.
 *
 * A TCR reviewer opens this URL and looks for a small, specific set of things:
 * that the page belongs to the brand being registered, that a real disclosure
 * sits beside the box granting consent, and that the program described here
 * matches the one described in the Terms. All three failed before this page
 * existed — the only working form was on the platform's own hostname, and the
 * Terms page still described an email-reply opt-in, which is what the Campaign
 * was rejected for on 2026-09-10 (error 30898).
 *
 * The program description below is deliberately the same set of subjects the
 * Terms page names. If one changes, change both — a reviewer reads them in the
 * same sitting, and a mismatch is the cheapest possible reason to reject.
 */

export const metadata: Metadata = {
  title: "Text updates | The Path: Transformative Living",
  description:
    "Opt in to The Path Updates — occasional text messages from Change A Destiny about the Path Assessment, the Founding Cohort, and the Victorious Villages mission.",
};

export default function SmsOptInPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20 sm:py-28">
      <Kicker>Text updates</Kicker>
      <h1 className="font-display text-3xl uppercase text-cream sm:text-4xl">
        The Path Updates
      </h1>

      <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
        Updates from Change A Destiny about the Path Assessment, the Founding
        Cohort course, and our Victorious Villages mission. Choose email,
        texts, or both — they are separate choices, and you can take either one
        without the other. A few messages at most over a two-week period, and
        never a number or address we bought or guessed.
      </p>

      <div className="mt-10">
        <OptInForm />
      </div>

      <section className="mt-12 space-y-4 text-xs leading-relaxed text-muted/80">
        <h2 className="font-display text-sm uppercase tracking-wide text-muted">
          Program details
        </h2>
        <p>
          <strong className="text-cream">Program name:</strong> The Path Updates,
          operated by Change A Destiny Inc., a 501(c)(3) nonprofit organization
          (EIN 35-2380335).
        </p>
        <p>
          <strong className="text-cream">Message frequency:</strong> Varies. No
          more than a few messages over a typical two-week period, and
          occasional messages afterward.
        </p>
        <p>
          <strong className="text-cream">Cost:</strong> Message and data rates
          may apply, depending on your mobile plan. Change A Destiny does not
          charge for these messages.
        </p>
        <p>
          <strong className="text-cream">Opt out:</strong> Reply{" "}
          <strong className="text-cream">STOP</strong> to any message to stop
          receiving texts immediately and permanently. You will not be re-added
          without opting in again.
        </p>
        <p>
          <strong className="text-cream">Help:</strong> Reply{" "}
          <strong className="text-cream">HELP</strong> to any message, or email{" "}
          <a
            href="mailto:changeadestiny.org@gmail.com"
            className="underline hover:text-cream"
          >
            changeadestiny.org@gmail.com
          </a>
          .
        </p>
        <p>
          <strong className="text-cream">Consent is not a condition</strong> of
          any donation, purchase, or participation. We do not sell or share your
          mobile number with anyone for their own marketing. Carriers are not
          liable for delayed or undelivered messages.
        </p>
        <p>
          See our{" "}
          <a href="/terms" className="underline hover:text-cream">
            Terms and Conditions
          </a>{" "}
          and{" "}
          <a href="/privacy-policy" className="underline hover:text-cream">
            Privacy Policy
          </a>
          .
        </p>
      </section>
    </main>
  );
}
