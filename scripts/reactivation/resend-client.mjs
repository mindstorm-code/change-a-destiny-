import { Resend } from "resend";

const { RESEND_API_KEY, RESEND_FROM_EMAIL } = process.env;

export function credentialsConfigured() {
  return Boolean(RESEND_API_KEY && RESEND_FROM_EMAIL);
}

export async function sendEmail({ to, subject, text }) {
  if (!credentialsConfigured()) {
    throw new Error(
      "Missing Resend credentials — set RESEND_API_KEY and RESEND_FROM_EMAIL " +
        "in .env.local (see .env.example)."
    );
  }
  const resend = new Resend(RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: RESEND_FROM_EMAIL,
    to,
    subject,
    text,
  });
  if (error) {
    throw new Error(`Resend error: ${error.message ?? JSON.stringify(error)}`);
  }
  return data;
}
