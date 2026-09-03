# UX review, 3 September 2026

Independent review of the built site against one question: does it get a worried
homeowner in rural west Wales to ring Will? Findings below are ordered by how
likely they are to cost an enquiry.

Every claim marked ✅ has been verified against the code, not taken on trust.

---

## Critical: actively losing enquiries

**1. On a phone, the number is never readable without tapping.** ✅ verified
Below 780px the desktop nav is hidden, taking the only text version of the number
with it. What remains is an unlabelled handset icon. The number *is* in the
hamburger panel as text, but that is a tap away. Someone on a landline, or
writing it down, or who does not read a bare glyph as "tap to call", is stuck
until they scroll several screens to the red band.
*Fix:* make the compact header button a small red pill reading `07956 091794`
with the icon, keeping the 44px target. There is room, since the wordmark
already hides at 430px.

**2. The contact page shows the form before the phone number on mobile.** ✅ verified
`.contact-grid` collapses to one column at 900px, and source order puts the form
(line 124) above the call/text/email cards (line 177). The visitor most likely to
convert, the one who wants to speak to a human now, must scroll past seven fields
to find the number.
*Fix:* reorder with CSS `order` inside the mobile media query. Cards first.

**3. The hero's main button is "Browse the work", and nothing in the hero calls
or texts.** ✅ verified
The single highest-attention element on the site sends people sideways into a
portfolio instead of to the action that defines success.
*Fix:* make the primary button `Call 07956 091794` and the secondary
`Text a photo`, demoting "Browse the work" to a text link.

## High

**4. No reviews, no customer voice, and no "what happens next".**
Nothing on the site is another customer's words, and nothing tells a nervous
person what follows contact: when Will replies, whether looking costs anything,
how long a quote takes, whether a deposit is wanted.
*Fix:* a short testimonial band on the home page, driven from `site.json` like
`services` is, plus a three-step "what happens when you ring" block on
`/contact/`. Both work fine with placeholder photos still in place.

**5. The urgency dropdown defaults to "No rush".** ✅ verified
On a site about leaks, the untouched default tells Will the opposite of urgency,
and the customer believes they said it.
*Fix:* placeholder becomes "Please choose"; add "No rush" as a real option and
move "It's leaking now" to the top.

**6. The form cannot carry a photo, though the site asks for one three times.**
The channel a non-confident customer is most likely to use is the only one that
cannot carry the thing Will needs to quote.
*Fix:* add a file input. Netlify Forms handles uploads natively, no backend work.

**7. Job pages and About have no call or text action in the body.** ✅ verified
Neither page contains a `tel:` link outside the header and footer. These are the
pages read *after* someone decides they like Will, and both make them navigate
again before they can act.

**8. Form labels are 11px uppercase at 2.91:1 contrast.** ✅ verified
Below the 4.5:1 accessibility threshold. `--grey` measures 2.91:1 and `--muted-2`
3.62:1; both are used widely for small text.
*Fix:* darken `--grey` to `#6b6862` (5.55:1) and `--muted-2` to `#6f6c66`
(5.23:1). Bump form labels to 12-13px and drop the uppercase on the form.

**9. `/work/` shows one job without JavaScript, and will eager-load every
photo.** ✅ verified
Slides carry a server-side `hidden` attribute, so if the script fails the visitor
gets one job and five dead buttons. Separately, every slide image is
`loading="eager"` at full viewport width, which costs nothing today but will
download five hero photos the moment real ones land.

**10. The About page advertises in 34px bold that the firm has done five jobs.** ✅ verified
*Fix:* replace that statistic with something true and reassuring, and keep the
job count out of the display.

**11. Two render-blocking round trips to Google before any text paints.**
Eight font faces via `fonts.googleapis.com` then `fonts.gstatic.com`. On rural
mobile that is roughly a second of blank screen. It is also the only reason the
privacy policy needs its Google clause.
*Fix:* self-host the woff2 files, trim unused weights, preload the two used above
the fold.

## Medium

**12. Hero copy leads with manners rather than the problem.**
The reviewer argues "keen" reads as *new and eager*, which is the impression a
brand-new firm can least afford, and that nobody choosing a roofer worries about
respect before they worry about the water coming in.
⚠️ This is a direct challenge to copy Vanessa chose deliberately. Recorded, not
acted on.

**13. Horizontal scroll on `/work/` at 360px.**
`.textwill-body{min-width:320px}` cannot shrink below its floor inside a 310px
content box, so the page scrolls sideways on mid-range Android. 375px has only
5px of slack. The carousel dots also overflow once there are more than about six
jobs, and are only 20px tall.

**14. Submitting gives no feedback, and a failed submit loses everything typed.**
On a slow connection the button looks inert, so people tap repeatedly or leave.
*Fix:* a small progressive-enhancement script for a "Sending…" state plus
`sessionStorage` restore, a `tel:` line under the button for the impatient, and a
Netlify autoresponder so the customer gets a receipt.

**15. The services list never stacks on mobile, and CSS is cached for a year
without a content hash.** ✅ verified
The clearest statement of what Will does is the hardest block to read on a phone,
two ragged columns each wrapping several lines. Separately `netlify.toml` marks
`/assets/*` `immutable, max-age=31536000`, but `site.css` and `carousel.js` have
no hash in their filenames, so **any style change is invisible to returning
visitors for up to a year.**

---

## What the review found already sound

Worth not breaking: the tel/sms/mailto plumbing and the `phoneLink`/`phoneIntl`/
`phoneDisplay` split; the image pipeline including the deliberate exclusion of
full-size derivatives and the oversized-original warning; the `<details>`
hamburger working without JavaScript; `live: false` genuinely removing a job from
the build rather than hiding it; the structured data; the honest privacy policy;
and the form basics (autocomplete, `type="tel"`, 16px inputs so iOS does not
zoom, working honeypot).

One gap noted in otherwise good structured data: `PostalAddress` carries only
`addressRegion: "Wales"`. Adding a town and opening hours would help the local
pack for "roofer near me".
