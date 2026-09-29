import type { Metadata } from "next";
import { Kicker } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | The Path: Transformative Living",
  description: "Get in touch with The Path about the book, the Founding Cohort, or Change A Destiny.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <Kicker>Get in touch</Kicker>
      <h1 className="font-display text-3xl uppercase text-cream sm:text-4xl">Contact Us</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
        Questions about the book, the Founding Cohort, or Change A Destiny&rsquo;s work in
        the field? Send a message and we&rsquo;ll get back to you.
      </p>

      <div className="mt-10">
        <ContactForm />
      </div>
    </main>
  );
}
