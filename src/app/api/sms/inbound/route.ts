import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import twilio from "twilio";

// Twilio's inbound-message webhook. Configure this URL on the Messaging
// Service (once it exists) as the "when a message comes in" handler.
// Processes the two consent-relevant keywords the reactivation sequence
// depends on: YES (opts a contact into SMS, per playbook/sms-templates.md's
// Email 2 ask) and STOP (suppresses — required regardless of what Twilio's
// own carrier-level STOP handling also does, since our own send-touchpoint
// script checks the `suppressed` flag directly).

const DATA_FILE = path.join(process.cwd(), ".data", "reactivation-contacts.json");

type Contact = {
  id: string;
  first_name: string;
  phone: string;
  email?: string;
  segment?: string;
  sms_opt_in: boolean;
  suppressed: boolean;
};

async function readContacts(): Promise<Contact[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Contact[];
  } catch {
    return [];
  }
}

async function writeContacts(contacts: Contact[]) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(contacts, null, 2), "utf-8");
}

function normalizePhone(raw: string): string {
  // Twilio sends E.164 (+1XXXXXXXXXX); contacts.json is expected to match.
  return raw.trim();
}

function twiml(message?: string) {
  const body = message
    ? `<Response><Message>${escapeXml(message)}</Message></Response>`
    : "<Response></Response>";
  return new NextResponse(body, {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function POST(req: NextRequest) {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!authToken) {
    // Fail closed — never process an unverifiable inbound message as if
    // it were a real consent signal.
    return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  }

  const rawBody = await req.text();
  const params = Object.fromEntries(new URLSearchParams(rawBody));

  const signature = req.headers.get("x-twilio-signature") ?? "";
  const url = req.nextUrl.toString();
  const valid = twilio.validateRequest(authToken, signature, url, params);
  if (!valid) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 403 });
  }

  const from = typeof params.From === "string" ? normalizePhone(params.From) : "";
  const text = typeof params.Body === "string" ? params.Body.trim().toUpperCase() : "";

  if (!from) {
    return twiml();
  }

  const contacts = await readContacts();
  const contact = contacts.find((c) => c.phone === from);
  if (!contact) {
    // Unknown number texting in — don't guess, don't auto-create a record.
    return twiml();
  }

  if (text === "YES") {
    contact.sms_opt_in = true;
    await writeContacts(contacts);
    return twiml("Got it — you're set to get texts. Reply STOP anytime to opt out.");
  }

  if (text === "STOP" || text === "STOPALL" || text === "UNSUBSCRIBE") {
    contact.suppressed = true;
    await writeContacts(contacts);
    // Twilio's carrier-level STOP handling also sends its own confirmation
    // when Advanced Opt-Out is enabled on the Messaging Service — avoid a
    // duplicate reply if that's on. Empty TwiML either way is safe.
    return twiml();
  }

  return twiml();
}
