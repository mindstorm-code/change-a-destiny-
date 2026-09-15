# SMS Templates — 1,000-Name List Reactivation

Real copy for the two SMS touchpoints in `reactivation-plan.md`'s 14-day
sequence, plus the opt-in ask that has to run inside Email 2 before either
can legally send. Mirrors `scripts/reactivation/templates.mjs` — edit both
if wording changes.

## Opt-in ask (inside Email 2, Day 3)

Required before any contact can receive Day 8/11 SMS — TCPA doesn't treat
"we emailed 1,000 people once" as consent for texting them.

> Prefer a text over digging through email? Reply **YES** to this email
> and I'll send you a short nudge only when it's actually relevant — no
> spam, unsubscribe anytime.

Reply-YES parsing and consent-flag writing now live at
`src/app/api/sms/inbound/route.ts` — verifies Twilio's request signature,
flips `sms_opt_in` on YES, sets `suppressed` on STOP. Point the Messaging
Service's inbound-message webhook at this route once one exists.

## SMS 1 — Day 8 (opted-in, clicked but didn't convert)

```
Hi {{first_name}}, it's Judah Becker. Saw you checked out the Path
Assessment — any questions I can answer? {{assessment_link}}
Reply STOP to opt out.
```

~155 characters with a typical first name and shortened link — fits one
SMS segment. No fake urgency, matches the "lead with directness, avoid
manufactured pressure" messaging rule from `offer-stack.md`.

## SMS 2 — Day 11 (opted-in, last call before cohort closes)

```
Hi {{first_name}}, the Founding Cohort closes {{close_date}} —
{{seats_remaining}} seats left. Details: {{cohort_link}}
Reply STOP to opt out.
```

`{{seats_remaining}}` must come from the real reserve-a-seat count, never
a hardcoded number — same non-negotiable the validation-funnel section of
`offer-stack.md` already establishes for the web page itself.

## Compliance line (repeated from `reactivation-plan.md`, load-bearing)

SMS only ever goes to a contact whose `sms_opt_in` field is `true` from a
real reply-YES event. Every message includes an opt-out instruction.
`suppressed` contacts are skipped regardless of opt-in status.
