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
            <li>Send you updates about the Founding Cohort, the book, or Change A Destiny&rsquo;s mission — by email or, only if you separately opt in, by text</li>
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
            Children&rsquo;s Privacy
          </h2>
          <p className="mt-3">
            Our Services do not target children under 13. We do not knowingly
            collect information from children under this age. We will
            investigate any notification and if appropriate, delete the
            Personal Information from our systems. If you are 13 or older,
            but under 18, you must have permission from your parent or
            guardian to use our Services.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg uppercase tracking-wide text-cream">
            SMS Messaging Terms &ndash; THE PATH
          </h2>
          <p className="mt-3">
            This section describes the SMS marketing consent offered on our{" "}
            <a href="/contact" className="underline hover:text-cream">
              Contact page
            </a>
            , separate from the Path Updates program described above. By
            providing your phone number and opting in to SMS communications
            there, you expressly consent to receive marketing and
            promotional text messages from The Path at the mobile number you
            provided. Messages may include, but are not limited to:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Promotional offers, discounts, and special deals</li>
            <li>Upcoming events, experiences, and announcements</li>
            <li>New services, products, and availability updates</li>
            <li>Marketing campaigns and other promotional communications</li>
          </ul>
          <p className="mt-3">
            <strong className="text-cream">Message Frequency:</strong>{" "}
            Message frequency varies. You may receive up to 10 messages per
            month.
          </p>
          <p className="mt-3">
            <strong className="text-cream">Message and Data Rates:</strong>{" "}
            Message and data rates may apply depending on your mobile
            carrier and service plan.
          </p>
          <p className="mt-3">
            <strong className="text-cream">Consent:</strong> Consent to
            receive marketing text messages is not a condition of purchase.
          </p>
          <p className="mt-3">
            <strong className="text-cream">Opt-Out Instructions:</strong> You
            may opt out of SMS communications at any time by replying{" "}
            <strong className="text-cream">STOP</strong> to any text message
            from THE PATH. After opting out, you will no longer receive
            marketing text messages unless you opt in again.
          </p>
          <p className="mt-3">
            <strong className="text-cream">Support:</strong> For assistance,
            reply <strong className="text-cream">HELP</strong> to any message
            or contact THE PATH through the contact information provided on
            our website.
          </p>
          <p className="mt-3">
            <strong className="text-cream">Privacy:</strong> Mobile
            information, SMS opt-in data, and messaging consent will not be
            shared with third parties or affiliates for marketing or
            promotional purposes.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg uppercase tracking-wide text-cream">
            Third-Party Websites
          </h2>
          <p className="mt-3">
            Our website may contain links to websites or services operated
            by third parties. We are not responsible for the privacy
            practices, content, availability, or security of third-party
            websites. We encourage users to review the privacy policies of
            any third-party websites they visit.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg uppercase tracking-wide text-cream">
            Third-Party Service Providers
          </h2>
          <p className="mt-3">
            We may use third-party service providers to support our website
            and business operations, including hosting, email delivery, SMS
            delivery, customer relationship management, analytics, payment
            processing, and security. These providers may access personal
            information only as necessary to perform authorized services on
            our behalf. SMS opt-in data and consent are excluded from
            marketing-related sharing and will not be provided to third
            parties or affiliates for their marketing or promotional
            purposes.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg uppercase tracking-wide text-cream">
            Changes to This Privacy Policy
          </h2>
          <p className="mt-3">
            We may update this Privacy Policy periodically to reflect
            changes in our business practices, services, technology, or
            legal requirements. Any updates will be posted on this page with
            a revised Last Updated date. We encourage you to review this
            Privacy Policy periodically.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg uppercase tracking-wide text-cream">
            Contact us
          </h2>
          <p className="mt-3">
            If you have questions about this Privacy Policy, our privacy
            practices, or your personal information, please contact:
          </p>
          <p className="mt-3">
            Change A Destiny Inc.
            <br />
            1549 Northfield Road, Suite 18
            <br />
            Cedar City, UT 84721
            <br />
            Phone:{" "}
            <a href="tel:+12538615715" className="underline hover:text-cream">
              (253) 861-5715
            </a>
            <br />
            Email:{" "}
            <a
              href="mailto:changeadestiny.org@gmail.com"
              className="underline hover:text-cream"
            >
              changeadestiny.org@gmail.com
            </a>
            <br />
            Website:{" "}
            <a
              href="https://path.changeadestiny.org"
              className="underline hover:text-cream"
            >
              path.changeadestiny.org
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
