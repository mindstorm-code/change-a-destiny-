import type { Metadata } from "next";
import { Kicker } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy | The Path: Transformative Living",
  description: "How Change A Destiny collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <Kicker>Legal</Kicker>
      <h1 className="font-display text-3xl uppercase text-cream sm:text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated: September 2026</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted sm:text-base">
        <section>
          <h2 className="font-display text-lg uppercase tracking-wide text-cream">
            Who we are
          </h2>
          <p className="mt-3">
            This policy covers changeadestiny.org and related services operated by
            Change A Destiny Inc., a 501(c)(3) nonprofit organization (EIN
            35-2380335), including the Path Assessment, the Founding Cohort
            course, and our email and SMS communications.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg uppercase tracking-wide text-cream">
            Information we collect
          </h2>
          <p className="mt-3">We collect information you give us directly, including:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Your name, email address, and (if provided) phone number</li>
            <li>Your answers to the Path Assessment</li>
            <li>Purchase and giving history for the book, course, or Change A Destiny</li>
            <li>
              Engagement data such as whether you opened an email, clicked a
              link, or replied to a text message
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg uppercase tracking-wide text-cream">
            How we use it
          </h2>
          <p className="mt-3">We use your information only to:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Deliver the content, assessment results, or purchases you requested</li>
            <li>Send you updates about the Founding Cohort, the book, or Change A Destiny's mission — by email or, only if you separately opt in, by text</li>
            <li>Respond to your questions and provide support</li>
            <li>Maintain accurate records for our own nonprofit compliance and giving history</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg uppercase tracking-wide text-cream">
            What we don&rsquo;t do
          </h2>
          <p className="mt-3">
            We do not sell your information. We do not share your name, email,
            phone number, or Path Assessment answers with third parties for
            their own marketing purposes. Your phone number is only ever added
            to our SMS list after you explicitly opt in — never automatically
            from an email or purchase.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg uppercase tracking-wide text-cream">
            SMS communications
          </h2>
          <p className="mt-3">
            If you opt in to text messages, message frequency varies (typically
            no more than a few messages over a two-week period, and periodically
            afterward). Message and data rates may apply. Reply{" "}
            <strong className="text-cream">HELP</strong> for help or{" "}
            <strong className="text-cream">STOP</strong> to cancel at any time —
            see our{" "}
            <a href="/terms" className="underline hover:text-cream">
              Terms and Conditions
            </a>{" "}
            for full program details.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg uppercase tracking-wide text-cream">
            Contact us
          </h2>
          <p className="mt-3">
            Questions about this policy or your information? Email{" "}
            <a
              href="mailto:changeadestiny.org@gmail.com"
              className="underline hover:text-cream"
            >
              changeadestiny.org@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
