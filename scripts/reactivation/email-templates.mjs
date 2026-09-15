// Real copy for the 6 email touchpoints in playbook/reactivation-plan.md's
// 14-day sequence. Mirrors playbook/email-templates.md — edit both
// together. Segment key: past_donor | past_contact_no_giving | unknown (see
// reactivation-plan.md Segmentation section, matches contacts.example.json).
// A touchpoint with no entry for a given segment is intentionally skipped
// for that segment (e.g. day10 has no past_donor variant — donors aren't
// sold the cohort as the primary ask).

export { render } from "./templates.mjs";

const FOOTER =
  "\n\n---\nChange A Destiny Inc. · 1549 Northfield Road, Suite 18, " +
  "Cedar City, UT 84721 · Unsubscribe: {{unsubscribe_link}}";

const RECONNECTION_BODY =
  "Hi {{first_name}},\n\n" +
  "It's been a while, and I wanted to reach out — not to ask you for " +
  "anything, just to reconnect.\n\n" +
  "A few months ago, a young woman walked into one of our Victorious " +
  "Villages homes in Cambodia with nothing but the clothes she was " +
  "wearing. Today she runs the sewing co-op that helps keep that same " +
  "village self-sustaining. That's the kind of story that reminds me why " +
  "any of this matters — and why I'm glad you've been part of it, " +
  "however that looked for you.\n\n" +
  "No ask here. Just wanted you to know you're not forgotten.\n\nJudah" +
  FOOTER;

const ASSESSMENT_OPTIN_BODY =
  "Hi {{first_name}},\n\n" +
  "If you've got three minutes, I built a short, free assessment that " +
  "asks one real question: which hurt, hang-up, or habit is actually " +
  "running your calendar right now? No email gate beyond this, no sales " +
  "pitch at the end — just a clearer picture of where you actually " +
  "are.\n\n" +
  "Take the Path Assessment: {{assessment_link}}\n\n" +
  "One more thing — if you'd rather get a quick text than dig through " +
  "email, you can opt in to \"The Path Updates\" here: " +
  "{{sms_optin_link}}\n\n" +
  "That page asks for your mobile number and has you tick a consent box, " +
  "which is how we keep a record that you actually asked for the texts. " +
  "Occasional SMS from Change A Destiny about the Path Assessment, the " +
  "Founding Cohort, and our Victorious Villages mission. Message " +
  "frequency varies — no more than a few messages over a typical " +
  "two-week period. Msg & data rates may apply. This isn't required to " +
  "stay on our email list or to give. Reply STOP at any time to opt " +
  "out.\n\nJudah" +
  FOOTER;

const PROOF_DONOR_BODY =
  "Hi {{first_name}},\n\n" +
  "I don't say this enough: the giving that's already happened through " +
  "Change A Destiny built something real. The Victorious Villages model " +
  "in {{village_location}} isn't a one-time rescue — it's designed to " +
  "run itself once it's established, which means what you gave keeps " +
  "working long after the gift is made.\n\n" +
  "{{testimony_quote}}\n\n" +
  "That's not a fundraising line. That's just what happened.\n\nJudah" +
  FOOTER;

const PROOF_READER_BODY =
  "Hi {{first_name}},\n\n" +
  "{{testimony_quote}}\n\n" +
  "That's from someone who took the Path Assessment a few months back. " +
  "I share it not to prove a point, but because I think you'll " +
  "recognize some of it.\n\nJudah" +
  FOOTER;

const OFFER_COHORT_BODY =
  "Hi {{first_name}},\n\n" +
  "Here's the direct version: I'm opening a Founding Cohort of The Path: " +
  "Transformative Living — six weeks, built on the same clinical-and-" +
  "spiritual framework in the book, delivered live instead of just " +
  "read.\n\n" +
  "Seats are real and capped to what I can actually show up for " +
  "personally — not a manufactured countdown. {{cohort_price_line}}\n\n" +
  "Reserve your seat: {{cohort_link}}\n\n" +
  "If you've already read the book, this is the next step. If you " +
  "haven't, that's fine too — the book's still there first.\n\nJudah" +
  FOOTER;

const OFFER_PARTNERSHIP_BODY =
  "Hi {{first_name}},\n\n" +
  "I want to invite you into something more consistent than a one-time " +
  "gift, if it's ever felt right to you: an ongoing partnership with " +
  "Change A Destiny. It's the same Victorious Villages model, just a " +
  "steady presence instead of a single moment.\n\n" +
  "See the partnership details: {{partnership_link}}\n\n" +
  "No pressure either way — I just wanted you to know the door's " +
  "open.\n\nJudah" +
  FOOTER;

const COHORT_CLOSES_BODY =
  "Hi {{first_name}},\n\n" +
  "Quick, real update: the Founding Cohort closes {{close_date}}, and " +
  "there are {{seats_remaining}} seats left as of today — that number " +
  "is the actual count, not a marketing device.\n\n" +
  "Reserve your seat: {{cohort_link}}\n\nJudah" +
  FOOTER;

const LIST_HYGIENE_BODY =
  "Hi {{first_name}},\n\n" +
  "You haven't opened much from me lately, and that's completely fine — " +
  "I'd rather ask than assume. If you still want to hear from me, no " +
  "action needed, you'll stay on the list. If not, one click below " +
  "takes you off cleanly, no hard feelings.\n\n" +
  "Update my preferences: {{preferences_link}}\n\nJudah" +
  FOOTER;

const ALL_SEGMENTS = ["past_donor", "past_contact_no_giving", "unknown"];
const toVariants = (body, subject, requiredVars, segments = ALL_SEGMENTS) =>
  Object.fromEntries(
    segments.map((s) => [s, { subject, body, requiredVars: [...requiredVars, "unsubscribe_link"] }])
  );

export const EMAIL_TOUCHPOINTS = {
  day1: { variants: toVariants(RECONNECTION_BODY, "Still thinking about you", ["first_name"]) },
  day3: {
    variants: toVariants(ASSESSMENT_OPTIN_BODY, "A 3-minute question worth asking yourself", [
      "first_name",
      "assessment_link",
    ]),
  },
  day5: {
    variants: {
      past_donor: {
        subject: "What your last gift actually did",
        body: PROOF_DONOR_BODY,
        requiredVars: ["first_name", "village_location", "testimony_quote", "unsubscribe_link"],
      },
      past_contact_no_giving: {
        subject: "“I didn’t expect it to be this direct”",
        body: PROOF_READER_BODY,
        requiredVars: ["first_name", "testimony_quote", "unsubscribe_link"],
      },
      unknown: {
        subject: "“I didn’t expect it to be this direct”",
        body: PROOF_READER_BODY,
        requiredVars: ["first_name", "testimony_quote", "unsubscribe_link"],
      },
    },
  },
  day7: {
    variants: {
      past_donor: {
        subject: "An invitation, not an ask",
        body: OFFER_PARTNERSHIP_BODY,
        requiredVars: ["first_name", "partnership_link", "unsubscribe_link"],
      },
      past_contact_no_giving: {
        subject: "The Founding Cohort — six weeks, real framework",
        body: OFFER_COHORT_BODY,
        requiredVars: ["first_name", "cohort_price_line", "cohort_link", "unsubscribe_link"],
      },
      unknown: {
        subject: "The Founding Cohort — six weeks, real framework",
        body: OFFER_COHORT_BODY,
        requiredVars: ["first_name", "cohort_price_line", "cohort_link", "unsubscribe_link"],
      },
    },
  },
  day10: {
    // No donor variant: donors aren't sold the cohort as the primary ask.
    variants: {
      past_contact_no_giving: {
        subject: "Founding Cohort closes {{close_date}} — {{seats_remaining}} seats left",
        body: COHORT_CLOSES_BODY,
        requiredVars: ["first_name", "close_date", "seats_remaining", "cohort_link", "unsubscribe_link"],
      },
      unknown: {
        subject: "Founding Cohort closes {{close_date}} — {{seats_remaining}} seats left",
        body: COHORT_CLOSES_BODY,
        requiredVars: ["first_name", "close_date", "seats_remaining", "cohort_link", "unsubscribe_link"],
      },
    },
  },
  day14: {
    variants: toVariants(LIST_HYGIENE_BODY, "Still want to hear from Judah?", [
      "first_name",
      "preferences_link",
    ]),
  },
};
