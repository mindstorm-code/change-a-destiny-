# List Reactivation Plan — 1,000-name list

Internal strategy reference. Not customer-facing. Vendor-agnostic on
purpose: pick a CRM/ESP platform separately, don't bake a vendor name into
customer-facing copy or into this plan.

## Segmentation (do this before sending anything)

Three lists, not one: past donors, past book/event contacts with no giving
history, and unknowns. Each gets a different first message.

## The 14-day sequence

| Day | Channel | Job |
|---|---|---|
| 0 | Segment | Split the list before any send |
| 1 | Email 1 | Reconnection — a rescue story, no ask |
| 3 | Email 2 | Free Path Assessment click + explicit SMS opt-in request |
| 5 | Email 3 | Proof — a testimony or case study, matched to segment |
| 7 | Email 4 | The direct offer — Founding Cohort for readers, partnership invite for past donors |
| 8 | SMS 1 | Opted-in contacts only — short check-in to clickers who didn't convert |
| 10 | Email 5 | Cohort closes — real deadline, real seat count |
| 11 | SMS 2 | Opted-in contacts only — last call |
| 14 | Email 6 | List hygiene — "still want to hear from Judah?" for non-engagers |

## Compliance line (non-negotiable)

Under the TCPA, a list of 1,000 emails is not automatically 1,000 valid SMS
opt-ins, even where Judah has met most of them in person. SMS only ever
goes to contacts who explicitly opt in on the hosted opt-in page linked from
Email 2 — a page with a mobile-number field and a consent box, which is what
produces a record a carrier can verify. Reply-YES was the original mechanism
and it is why the A2P Campaign was rejected on 2026-09-10 (error 30898): a
reviewer cannot audit an inbox. Everyone else stays on email. Build consent
capture and suppression into whichever platform is chosen *before* the
first send goes out.

## Platform note

**Chosen:** Twilio for SMS, Resend for email (2026-09-08) — see
`scripts/reactivation/`. Neither vendor name appears in any
customer-facing copy or email/SMS content; that principle still holds,
this note just records the actual procurement decision. Opt-in/
suppression fields and pipeline stages (reader → student → partner) live
in the shared contacts store (`scripts/reactivation/contacts.example.json`
shows the schema), not in either vendor's own UI.
