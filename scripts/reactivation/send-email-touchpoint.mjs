#!/usr/bin/env node
// Sends one email touchpoint (day1 | day3 | day5 | day7 | day10 | day14) to
// non-suppressed contacts, picking the variant that matches each contact's
// segment (a touchpoint with no variant for a segment is skipped for that
// contact — e.g. day10 has no past_donor variant). Defaults to a dry run —
// prints what would be sent without calling Resend. Pass --send to
// actually send, which additionally requires real Resend credentials.
//
// Usage:
//   node scripts/reactivation/send-email-touchpoint.mjs day1 --contacts scripts/reactivation/contacts.example.json
//   node scripts/reactivation/send-email-touchpoint.mjs day7 --contacts .data/contacts.json --send

import { readFile } from "node:fs/promises";
import { EMAIL_TOUCHPOINTS, render } from "./email-templates.mjs";
import { sendEmail, credentialsConfigured } from "./resend-client.mjs";

const args = process.argv.slice(2);
const touchpointKey = args[0];
const send = args.includes("--send");
const contactsFlagIndex = args.indexOf("--contacts");
const contactsPath =
  contactsFlagIndex >= 0 ? args[contactsFlagIndex + 1] : "scripts/reactivation/contacts.example.json";

const touchpoint = EMAIL_TOUCHPOINTS[touchpointKey];
if (!touchpoint) {
  console.error(`Unknown touchpoint "${touchpointKey}". Valid: ${Object.keys(EMAIL_TOUCHPOINTS).join(", ")}`);
  process.exit(1);
}

if (send && !credentialsConfigured()) {
  console.error(
    "--send was passed but Resend credentials aren't configured. " +
      "Set RESEND_API_KEY and RESEND_FROM_EMAIL in .env.local (see .env.example) first."
  );
  process.exit(1);
}

const contacts = JSON.parse(await readFile(contactsPath, "utf8"));
const eligible = contacts.filter((c) => c.suppressed !== true && c.email);

console.log(
  `${touchpointKey}: ${eligible.length}/${contacts.length} contacts eligible (suppressed=false, has email).`
);
if (!send) {
  console.log("Dry run (pass --send to actually send). Preview of first matched message:");
}

let previewed = false;
for (const contact of eligible) {
  const variant = touchpoint.variants[contact.segment];
  if (!variant) {
    console.warn(`Skipping ${contact.id}: no "${touchpointKey}" variant for segment "${contact.segment}".`);
    continue;
  }

  const vars = { first_name: contact.first_name, ...contact.templateVars };
  const missing = variant.requiredVars.filter((v) => !(v in vars));
  if (missing.length) {
    console.warn(`Skipping ${contact.id}: missing template vars: ${missing.join(", ")}`);
    continue;
  }

  const subject = render(variant.subject, vars);
  const body = render(variant.body, vars);

  if (!send) {
    if (!previewed) {
      console.log(`--- ${contact.id} (${contact.email}) ---\nSubject: ${subject}\n\n${body}\n---`);
      previewed = true;
    }
    continue;
  }

  try {
    await sendEmail({ to: contact.email, subject, text: body });
    console.log(`Sent to ${contact.id} (${contact.email}).`);
  } catch (err) {
    console.error(`Failed to send to ${contact.id}: ${err.message}`);
  }
}
