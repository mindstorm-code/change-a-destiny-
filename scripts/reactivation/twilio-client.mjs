import twilio from "twilio";

// Twilio API Key auth (not the master Auth Token) — scoped, revocable
// credentials. Create one in the Twilio Console under the Change A
// Destiny subaccount: Account > API keys & tokens > Create API key.
const {
  TWILIO_ACCOUNT_SID,
  TWILIO_API_KEY_SID,
  TWILIO_API_KEY_SECRET,
  TWILIO_MESSAGING_SERVICE_SID,
  TWILIO_PHONE_NUMBER,
} = process.env;

export function credentialsConfigured() {
  return Boolean(TWILIO_ACCOUNT_SID && TWILIO_API_KEY_SID && TWILIO_API_KEY_SECRET);
}

function getClient() {
  if (!credentialsConfigured()) {
    throw new Error(
      "Missing Twilio credentials — set TWILIO_ACCOUNT_SID, TWILIO_API_KEY_SID, " +
        "and TWILIO_API_KEY_SECRET in .env.local (see .env.example)."
    );
  }
  return twilio(TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET, {
    accountSid: TWILIO_ACCOUNT_SID,
  });
}

export async function sendSms({ to, body }) {
  const client = getClient();
  if (!TWILIO_MESSAGING_SERVICE_SID && !TWILIO_PHONE_NUMBER) {
    throw new Error(
      "Set TWILIO_MESSAGING_SERVICE_SID or TWILIO_PHONE_NUMBER in .env.local."
    );
  }
  const from = TWILIO_MESSAGING_SERVICE_SID
    ? { messagingServiceSid: TWILIO_MESSAGING_SERVICE_SID }
    : { from: TWILIO_PHONE_NUMBER };
  return client.messages.create({ to, body, ...from });
}
