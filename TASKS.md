# West Wales Roofing — priority queue

One ordered backlog. Work top to bottom: each task is either blocked by the one
above it or simply matters more. Don't jump ahead — the ordering is deliberate.

**Owner:** 🧍 Vanessa (needs an account only she has) · 🤖 Claude · 🧍🤖 both

---

## Phase 1 — make the machine work (nothing else counts until these are done)

**1.** ✅ **Connect the GitHub repo to Netlify.** — done 2026-09-03, verified by
pushing a commit and watching Netlify build it unaided.

**2.** ✅ **GitHub OAuth app + env vars.** — done 2026-09-03, login confirmed
working. ⚠️ **Chrome only — the CMS login fails silently in Safari.** See SETUP.md §2.

**3.** ✅ **CMS access for Will.** — done 2026-09-03. Moved to DecapBridge:
no GitHub account needed, works in Safari, Will published a change end to end.
Old GitHub OAuth handler and its credentials removed.

**3a.** 🧍 **Record the GitHub PAT expiry date.** DecapBridge holds a fine-grained
token for this repo. If it expires the CMS stops saving with no warning. Note the
date here, and set a calendar reminder a week before: **expiry 2027-09-03**
(365 days, the GitHub maximum, set 2026-09-03). The CMS will stop saving that day
with no error unless the token is regenerated in GitHub and updated in DecapBridge.

**4.** 🧍🤖 **Spaceship API key, scoped to `dnsrecords:read` + `dnsrecords:write`.**
Vanessa creates it in API Manager; Claude stores it in Keychain and uses it for
every DNS task below. Not `domains:transfer`, not `domains:billing`.
Optional — skip it and tasks 11–13 become manual instead.

**4a.** ✅ **HTTPS on the live domain** — fixed 2026-09-03. GitHub's certificate
was wedged from the earlier attempt when only two A records resolved; removing and
re-adding the custom domain forced a re-check and it issued for both apex and www.
Enforcement is on. Netlify will issue its own certificate at cutover.

**4b.** ✅ **Site-wide SEO and structured data** — 2026-09-03. Per-page `@graph`:
`RoofingContractor` + `WebSite` everywhere, `AboutPage`/`ContactPage`/`CollectionPage`
by page, `BreadcrumbList` on work and job pages, `ItemList` of jobs, and a `Service`
node per job built from the CMS fields. 404 and thanks are `noindex`. Validated as
parsing JSON on every built page.

## Phase 2 — make the content true (before the domain points at it)

**5.** ✅ **Service areas settled** (2026-09-03, revised). **Carmarthenshire,
Pembrokeshire and Ceredigion.** Cardiff and Swansea dropped. Pembrokeshire was
briefly removed on Vanessa's instruction, then put back by Will through the CMS,
and Vanessa confirmed his version. The counties are now named in the hero, the
four page descriptions, the footer and the schema.

**6.** 🧍🤖 **Real photographs.** 34 supplied in `work-photos/` (not in git,
deliberately). Audited in `docs/PHOTO_AUDIT.md`: **19 are usable roofing work**
in six date groups, **14 are interior carpentry** and cannot go on a roofing
portfolio, and **3 need checking** because they look like they came from a
property listing rather than Will's phone.
→ Vanessa to fill in the job and town for each group, then Claude labels,
  resizes and loads them.

**7.** 🧍 **Will's real bio and background.**
The About page copy is invented from the design canvas. It reads plausibly, which
makes it worse, not better.

**6a.** ✅ **Carpentry section** added 2026-09-03. Roofing still leads: carpentry
lives at `/carpentry/`, linked from the footer and About but not the main nav, so
the roofing pages stay a clean search signal. Will picks Roofing or Carpentry in
the CMS and the job routes itself. The hero no longer claims "roofs are all we do".
→ Needs the 14 carpentry photos labelling before the page has anything on it.

**7a.** ⏸️ **Public liability insurance.** Will has none of his own yet; the work
so far has been under another contractor's cover. He will insure when he starts
taking his own jobs. **Nothing on the site claims he is insured, and nothing
should until he is.** Note he is a sole trader with unlimited personal liability
and his home address is now published, so the exposure is personal.

**8.** 🧍 **Legal and trust details.** Checklist in `docs/LEGAL_CHECKLIST.md`.
✅ Trading disclosure done: sole trader, William Jenkins, 37 The Moorings,
St Dogmaels. In the footer, the privacy policy and the structured data.
⚠️ **Postcode still needed** to complete the address.
⚠️ **Check Will is content to publish his home address** — legally required, but a
service address is an accepted alternative and many sole traders use one.
Still outstanding: public liability cover to display, the 14 day cancellation
notice to issue with quotes, and waste carrier registration.

**9.** ✅ **Privacy policy** — written 2026-09-03, live at `/privacy/`, linked from
the footer and from the form itself. Describes what the site actually does: no
cookies, no analytics, no tracking; Netlify, Spacemail and Google Fonts named.
⚠️ If West Wales Roofing is a limited company, the company number and registered
office must be added to the "Who we are" section (see task 8).

**9a.** ✅ **CMS made usable by a non-developer** — 2026-09-03. Fields reordered and
relabelled as plain questions, unhelpful preview pane removed, publish toggle made
explicit, blank optional fields no longer render empty rows.

**9b.** ✅ **Automatic image optimisation** — 2026-09-03. Uploads are served as
AVIF/WebP with a responsive srcset, capped at 1600px. Measured: a 5.9MB phone photo
becomes 269KB at worst, a 95% reduction. ⚠️ Originals still live in git — see
task 9c if that becomes a problem.

**9c.** 🧍 **Decide whether photo originals should stay in git.** Every upload is
committed at full size forever; twenty jobs at ten 5MB photos is a 1GB repo.
Options: accept it, ask Will to send photos for resizing first, or move the media
library to Cloudinary so originals never enter the repo.

**10.** 🧍🤖 **Higher-resolution logo, then a full favicon set.**
The supplied PNG is 225×100 and looks soft on any modern screen. SVG ideally.

## Phase 3 — go live

**11.** 🧍🤖 **Repoint DNS from GitHub Pages to Netlify.** *(needs 1–10)*
Deliberately last: a portfolio site with no photographs is worse than the holding
page it replaces. Leave the Spacemail MX and SPF records alone.
→ SETUP.md §3

**12.** 🤖 **Retire GitHub Pages.** *(needs 11)*
Disable Pages, delete the holding-page files from the repo root.

**13.** 🧍🤖 **Finish the email records.** *(needs 4 or manual)*
Confirm DKIM exists, add DMARC (`p=none` to start), send a test in and out of
`will@`, and check the first real form notification isn't filed as spam.

**10a.** ✅ **UX review acted on** (2026-09-03). Full findings in
`docs/UX_REVIEW.md`. All three critical items fixed: the number is readable on a
phone, the contact page leads with how to reach Will rather than a form, and the
hero calls and texts instead of pointing at the portfolio. Contrast, mobile
overflow, cache busting, no-JS fallback and heading structure all fixed. Fonts
are self-hosted, so no page waits on Google and the privacy policy names no third
party beyond hosting and email.

**10b.** 🧍 **Still open from the review, needing Vanessa or Will:**
- **Testimonials.** Nothing on the site is another customer's words, which is
  what a homeowner comparing roofers looks for hardest. Three quotes with a first
  name and a village would do it, driven from `site.json`.
- **"What happens when you ring."** Nothing tells a nervous person what follows
  contact: when Will replies, whether looking costs anything, how long a written
  quote takes, whether a deposit is wanted.
- ✅ **Town and opening hours** added 2026-09-03: St Dogmaels, Pembrokeshire,
  7am to 7pm. ⚠️ **Days assumed Monday to Saturday** — confirm with Will, it is
  editable in the CMS under Site details.

## Phase 4 — get found

**14.** 🧍 **Google Business Profile.** Biggest single lever for a local trade.
**15.** 🤖 **Google Search Console** — verify the domain, submit the sitemap.
**16.** 🤖 **Town pages** for local SEO, if the service area stays this broad.
**17.** 🧍 **Checkatrade / TrustATrader** listings, if worth the fee.

## Phase 5 — beyond the website

**18.** 🤖 **Quote and invoice tool: a single local HTML file.**
Requested 2026-09-03. Will has nothing at all right now, so anything beats a
blank page. Agreed approach: **one self-contained HTML file he opens from his own
machine.** Not part of the website, not deployed, never on the internet.

Why this shape:

- **No customer data ever leaves his laptop.** That sidesteps the blocker that
  killed the CMS version: this repo is public, so quotes and invoices stored in
  git would publish customer names, addresses and prices to anyone looking.
- No account, no subscription, no server, nothing to expire.
- The browser's own Print to PDF produces the document, so there is no PDF
  library to maintain. A print stylesheet does the work.
- It carries the West Wales Roofing branding, which off-the-shelf free tiers
  usually will not.

What it needs to do:

- Quote and invoice from the same tool, and turn an accepted quote into an
  invoice without retyping anything
- Sequential numbering that cannot repeat or skip
- Saved customers, so a repeat job does not mean retyping an address
- Line items with quantities, VAT-ready but off by default until Will registers
- Paid / unpaid marking, and a list of what is outstanding
- Print to PDF, correctly laid out on A4

⚠️ **The real risk is losing everything.** Data lives in that browser's local
storage, which is wiped by clearing site data, does not follow him to another
device, and vanishes with the laptop. HMRC expects records kept for six years.
So the tool must ship with a prominent **Download backup** and **Restore backup**,
and Will has to be told plainly: save the backup file to iCloud or Dropbox after
every session, and keep every PDF.

**Before building, consider the honest alternative:** Zoho Invoice has a free
tier for sole traders that does all of the above with cloud backup, multi-device
access and proper VAT handling. It beats a local file on every measure except
branding and independence. The local tool is right if Will wants nothing tied to
an account; Zoho is right if losing the data would be a disaster. Worth putting
both to him in one sentence each.

**18a.** ⏸️ **Benched 2026-09-03.** Revisit once the website is live and Will has
actually been invoicing for a while; what he finds annoying by then will say more
than guessing now.
