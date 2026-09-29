import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Where a contact-page message lands. Overridable per-environment; falls
// back to the same inbox already published as the contact address on the
// Privacy Policy and Terms pages.
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "changeadestiny.org@gmail.com";

const MAX_LEN = { name: 200, email: 254, phone: 40, message: 5000 };

type ContactBody = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  privacyAcknowledged?: unknown;
  termsAgreed?: unknown;
  smsConsent?: unknown;
  company?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function badRequest(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

export async function POST(req: NextRequest) {
  let body: ContactBody;
  try {
    body = (await req.json()) as ContactBody;
  } catch {
    return badRequest("Invalid request body.");
  }

  // Honeypot: a real visitor never sees or fills this field. A bot that
  // fills every field will fill this one too. Report success without
  // sending anything, so the bot has no signal to iterate against.
  if (typeof body.company === "string" && body.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const privacyAcknowledged = body.privacyAcknowledged === true;
  const termsAgreed = body.termsAgreed === true;
  const smsConsent = body.smsConsent === true;

  if (!name || name.length > MAX_LEN.name) {
    return badRequest("Enter your name.");
  }
  if (!email || email.length > MAX_LEN.email || !EMAIL_RE.test(email)) {
    return badRequest("Enter a valid email address.");
  }
  if (phone.length > MAX_LEN.phone) {
    return badRequest("Phone number is too long.");
  }
  if (!message || message.length > MAX_LEN.message) {
    return badRequest("Enter a message.");
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !fromEmail) {
    // Fail closed with a clear signal rather than silently dropping the
    // message — matches the fail-closed pattern in the SMS inbound webhook.
    return NextResponse.json(
      { error: "Contact form isn't configured yet. Try emailing us directly." },
      { status: 503 }
    );
  }

  const consentLines = [
    `Privacy Policy acknowledged: ${privacyAcknowledged ? "Yes" : "No"}`,
    `Terms and Conditions agreed: ${termsAgreed ? "Yes" : "No"}`,
    `SMS marketing consent (this message): ${smsConsent ? "Yes" : "No"}`,
  ];
  if (smsConsent && !phone) {
    consentLines.push(
      "Note: SMS consent was checked but no phone number was provided, so no SMS opt-in was recorded."
    );
  } else if (smsConsent) {
    consentLines.push(
      "SMS consent is recorded separately in the SMS opt-in system, not just in this email."
    );
  }

  const text = [
    `New message from the Contact page at path.changeadestiny.org`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "(not provided)"}`,
    ``,
    `Message:`,
    message,
    ``,
    ...consentLines,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `The Path — Contact form: ${name}`,
      text,
    });
    if (error) {
      // Don't leak provider error detail (may include account/config info)
      // to the client, and don't log the message body.
      console.error("Contact form: Resend error", error.message ?? error);
      return NextResponse.json(
        { error: "Couldn't send your message. Try again in a moment." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Contact form: send failed", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "Couldn't send your message. Try again in a moment." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
