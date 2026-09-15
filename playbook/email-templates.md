# Email Templates — 1,000-Name List Reactivation

Real copy for all 6 email touchpoints in the 14-day sequence
(`reactivation-plan.md`). Mirrors `scripts/reactivation/email-templates.mjs`
— edit both if wording changes. Every email carries a CAN-SPAM-required
unsubscribe link and physical address footer (rendered once, shared across
all templates — see the code file).

Segment key: **donor** = past donor, **reader** = past book/event contact
with no giving history, **unknown** = no history either way. Emails 1, 2,
and 6 are segment-agnostic; Emails 3 and 4 branch by segment; Email 5
targets reader/unknown only (donors aren't being sold the cohort as the
primary ask — see `offer-stack.md`'s "one funnel, one job" rule).

## Email 1 — Day 1 — Reconnection (all segments)

**Subject:** Still thinking about you

> Hi {{first_name}},
>
> It's been a while, and I wanted to reach out — not to ask you for
> anything, just to reconnect.
>
> A few months ago, a young woman walked into one of our Victorious
> Villages homes in Cambodia with nothing but the clothes she was wearing.
> Today she runs the sewing co-op that helps keep that same village
> self-sustaining. That's the kind of story that reminds me why any of
> this matters — and why I'm glad you've been part of it, however that
> looked for you.
>
> No ask here. Just wanted you to know you're not forgotten.
>
> Judah

## Email 2 — Day 3 — Path Assessment + SMS opt-in ask (all segments)

**Subject:** A 3-minute question worth asking yourself

> Hi {{first_name}},
>
> If you've got three minutes, I built a short, free assessment that asks
> one real question: which hurt, hang-up, or habit is actually running
> your calendar right now? No email gate beyond this, no sales pitch at
> the end — just a clearer picture of where you actually are.
>
> [Take the Path Assessment]({{assessment_link}})
>
> One more thing — if you'd rather get a quick text than dig through
> email, you can opt in to "The Path Updates" here:
> {{sms_optin_link}}
>
> That page asks for your mobile number and has you tick a consent box,
> which is how we keep a record that you actually asked for the texts.
> Occasional SMS from Change A Destiny about the Path Assessment, the
> Founding Cohort, and our Victorious Villages mission. Message frequency
> varies — no more than a few messages over a typical two-week period.
> Msg & data rates may apply. This isn't required to stay on our email
> list or to give. Reply **STOP** at any time to opt out.
>
> Judah

*(Twilio A2P compliance note, REVISED 2026-09-15. The previous version of
this email asked people to reply YES, and said that was "the exact opt-in
disclosure text registered with Twilio's Campaign review". That campaign
was REJECTED on 2026-09-10, error 30898, for exactly this: a reviewer
cannot audit an inbox, so an email-reply opt-in cannot be verified. The
mechanism is now a hosted page with a consent box, which is what the
resubmission points at. Keep this paragraph's substance intact if the copy
is revised —
program name, message frequency, rate disclosure, and no-purchase-
condition language all included per TCR's opt-in requirements. Keep this
paragraph's substance intact if the copy is ever revised — a mismatch
between what's registered and what's actually sent risks a future
Campaign suspension, not just a rejection.)

## Email 3 — Day 5 — Proof (segment-matched)

**donor variant**

**Subject:** What your last gift actually did

> Hi {{first_name}},
>
> I don't say this enough: the giving that's already happened through
> Change A Destiny built something real. The Victorious Villages model in
> {{village_location}} isn't a one-time rescue — it's designed to run
> itself once it's established, which means what you gave keeps working
> long after the gift is made.
>
> {{testimony_quote}}
>
> That's not a fundraising line. That's just what happened.
>
> Judah

**reader variant**

**Subject:** "I didn't expect it to be this direct"

> Hi {{first_name}},
>
> {{testimony_quote}}
>
> That's from someone who took the Path Assessment a few months back. I
> share it not to prove a point, but because I think you'll recognize
> some of it.
>
> Judah

## Email 4 — Day 7 — Direct offer (segment-matched)

**reader/unknown variant — Founding Cohort**

**Subject:** The Founding Cohort — six weeks, real framework

> Hi {{first_name}},
>
> Here's the direct version: I'm opening a Founding Cohort of *The Path:
> Transformative Living* — six weeks, built on the same clinical-and-
> spiritual framework in the book, delivered live instead of just read.
>
> Seats are real and capped to what I can actually show up for personally
> — not a manufactured countdown. {{cohort_price_line}}
>
> [Reserve your seat]({{cohort_link}})
>
> If you've already read the book, this is the next step. If you haven't,
> that's fine too — the book's still there first.
>
> Judah

**donor variant — partnership invite**

**Subject:** An invitation, not an ask

> Hi {{first_name}},
>
> I want to invite you into something more consistent than a one-time
> gift, if it's ever felt right to you: an ongoing partnership with
> Change A Destiny. It's the same Victorious Villages model, just a
> steady presence instead of a single moment.
>
> [See the partnership details]({{partnership_link}})
>
> No pressure either way — I just wanted you to know the door's open.
>
> Judah

## Email 5 — Day 10 — Cohort closes (reader/unknown only)

**Subject:** Founding Cohort closes {{close_date}} — {{seats_remaining}} seats left

> Hi {{first_name}},
>
> Quick, real update: the Founding Cohort closes {{close_date}}, and
> there are {{seats_remaining}} seats left as of today — that number is
> the actual count, not a marketing device.
>
> [Reserve your seat]({{cohort_link}})
>
> Judah

## Email 6 — Day 14 — List hygiene (non-engagers)

**Subject:** Still want to hear from Judah?

> Hi {{first_name}},
>
> You haven't opened much from me lately, and that's completely fine — I'd
> rather ask than assume. If you still want to hear from me, no action
> needed, you'll stay on the list. If not, one click below takes you off
> cleanly, no hard feelings.
>
> [Update my preferences]({{preferences_link}})
>
> Judah

## Footer (every email, CAN-SPAM required)

> Change A Destiny Inc. · 1549 Northfield Road, Suite 18, Cedar City, UT
> 84721 · [Unsubscribe]({{unsubscribe_link}})
