#!/usr/bin/env node
// Sends one SMS touchpoint (day8 | day11) to opted-in, non-suppressed
// contacts. Defaults to a dry run — prints what would be sent without
// calling Twilio. Pass --send to actually send, which additionally
// requires real Twilio credentials in the environment.
//
// Usage:
//   node scripts/reactivation/send-touchpoint.mjs day8 --contacts scripts/reactivation/contacts.example.json
//   node scripts/reactivation/send-touchpoint.mjs day11 --contacts .data/contacts.json --send

import { readFile } from "node:fs/promises";
import { TOUCHPOINTS, render } from "./templates.mjs";
import { sendSms, credentialsConfigured } from "./twilio-client.mjs";

const args = process.argv.slice(2);
const touchpointKey = args[0];
const send = args.includes("--send");
const contactsFlagIndex = args.indexOf("--contacts");
const contactsPath =
  contactsFlagIndex >= 0 ? args[contactsFlagIndex + 1] : "scripts/reactivation/contacts.example.json";

const touchpoint = TOUCHPOINTS[touchpointKey];
if (!touchpoint) {
  console.error(`Unknown touchpoint "${touchpointKey}". Valid: ${Object.keys(TOUCHPOINTS).join(", ")}`);
  process.exit(1);
}

if (send && !credentialsConfigured()) {
  console.error(
    "--send was passed but Twilio credentials aren't configured. " +
      "Set TWILIO_ACCOUNT_SID, TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET " +
      "in .env.local (see .env.example) first."
  );
  process.exit(1);
}

const contacts = JSON.parse(await readFile(contactsPath, "utf8"));
const eligible = contacts.filter((c) => c.sms_opt_in === true && c.suppressed !== true);

console.log(
  `${touchpointKey}: ${eligible.length}/${contacts.length} contacts eligible ` +
    `(sms_opt_in=true, suppressed=false).`
);

if (!send) {
  console.log("Dry run (pass --send to actually send). Preview of first message:");
}

for (const contact of eligible) {
  const vars = { first_name: contact.first_name, ...contact.templateVars };
  const missing = touchpoint.requiredVars.filter((v) => !(v in vars));
  if (missing.length) {
    console.warn(`Skipping ${contact.id}: missing template vars: ${missing.join(", ")}`);
    continue;
  }
  const body = render(touchpoint.template, vars);

  if (!send) {
    if (contact === eligible[0]) {
      console.log(`--- ${contact.id} (${contact.phone}) ---\n${body}\n---`);
    }
    continue;
  }

  try {
    await sendSms({ to: contact.phone, body });
    console.log(`Sent to ${contact.id} (${contact.phone}).`);
  } catch (err) {
    console.error(`Failed to send to ${contact.id}: ${err.message}`);
  }
}
