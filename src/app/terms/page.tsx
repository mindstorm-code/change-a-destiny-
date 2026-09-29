import type { Metadata } from "next";
import { Kicker } from "@/components/ui";
import { SMS_OPTIN_URL } from "@/lib/leads";

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
            Eligibility
          </h2>
          <p className="mt-3">
            You must be at least 18 years of age and a resident of the
            United States to use our website and submit information through
            our forms. By using this website, you represent and warrant
            that you meet these eligibility requirements.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg uppercase tracking-wide text-cream">
            SMS Program: The Path Updates
          </h2>
          <p className="mt-3">
            <strong className="text-cream">Program description:</strong> You
            opt in on our{" "}
            <a href={SMS_OPTIN_URL} className="underline hover:text-cream">
              text updates page
            </a>
            , by entering your mobile number and ticking the consent box
            shown there. You will then receive text messages from Change A
            Destiny about the Path Assessment, the Founding Cohort course,
            and our Victorious Villages mission. We never add a number to
            this program from an email, a donation, or a purchase.
          </p>
          <p className="mt-3">
            <strong className="text-cream">Message frequency:</strong>{" "}
            Frequency varies. You may receive up to one message per day.
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
            Third-Party Links
          </h2>
          <p className="mt-3">
            Our website may contain links to third-party websites that are
            not owned or controlled by THE PATH. We are not responsible for
            the content, privacy policies, or practices of any third-party
            websites. We encourage you to review the terms and privacy
            policies of any third-party website you visit.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg uppercase tracking-wide text-cream">
            Limitation of Liability
          </h2>
          <p className="mt-3">
            To the fullest extent permitted by applicable law, THE PATH, its
            officers, directors, employees, agents, and affiliates shall not
            be liable for any indirect, incidental, special, consequential,
            or punitive damages, or any loss of profits, revenue, data, or
            goodwill, arising out of or in connection with your use of or
            inability to use this website, regardless of the theory of
            liability.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg uppercase tracking-wide text-cream">
            Indemnification
          </h2>
          <p className="mt-3">
            You agree to indemnify, defend, and hold harmless THE PATH, its
            officers, directors, employees, agents, and affiliates from and
            against any and all claims, damages, losses, liabilities, costs,
            and expenses (including reasonable attorneys&rsquo; fees) arising
            out of or related to your use of the website, your violation of
            these Terms, or your violation of any rights of a third party.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg uppercase tracking-wide text-cream">
            Privacy
          </h2>
          <p className="mt-3">
            Your use of this website is also governed by our{" "}
            <a href="/privacy-policy" className="underline hover:text-cream">
              Privacy Policy
            </a>
            , which is incorporated into these Terms by reference. Please
            review our Privacy Policy to understand how we collect, use, and
            protect your information.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg uppercase tracking-wide text-cream">
            Changes to These Terms
          </h2>
          <p className="mt-3">
            We reserve the right to update or modify these Terms at any time
            without prior notice. Any changes will be effective immediately
            upon posting on this page with an updated &ldquo;Last
            updated&rdquo; date. Your continued use of the website after any
            changes constitutes your acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg uppercase tracking-wide text-cream">
            Governing Law and Dispute Resolution
          </h2>
          <p className="mt-3">
            These Terms shall be governed by and construed in accordance
            with the laws of the State of Wyoming, without regard to its
            conflict of laws principles. Any dispute arising out of or
            relating to these Terms or your use of the website shall be
            resolved exclusively in the state or federal courts located in
            Sheridan County, Wyoming, and you consent to the personal
            jurisdiction of such courts.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg uppercase tracking-wide text-cream">
            Severability
          </h2>
          <p className="mt-3">
            If any provision of these Terms is found to be invalid, illegal,
            or unenforceable by a court of competent jurisdiction, the
            remaining provisions shall continue in full force and effect.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg uppercase tracking-wide text-cream">
            SMS Messaging Terms &ndash; The Path
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
            Message frequency varies. You may receive up to one message per
            day.
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
            or contact The PATH through the contact information provided on
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
            Contact us
          </h2>
          <p className="mt-3">
            Questions about these terms, a purchase, or our SMS program?
            Contact:
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
              href="mailto:judah@changeadestiny.org"
              className="underline hover:text-cream"
            >
              judah@changeadestiny.org
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
          <p className="mt-3">
            Or see our{" "}
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
