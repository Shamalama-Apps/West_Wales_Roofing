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

**5.** ✅ **Service areas confirmed** — 2026-09-03. **Carmarthenshire and
Ceredigion only.** Cardiff, Swansea and Pembrokeshire all removed from copy,
metadata and schema.

**6.** 🧍 **Real photographs of real jobs.**
The single biggest item. The whole site is built on the promise "every roof we
finish goes on this site" and every image is currently a placeholder.

**7.** 🧍 **Will's real bio and background.**
The About page copy is invented from the design canvas. It reads plausibly, which
makes it worse, not better.

**8.** 🧍 **Legal and trust details.**
Limited company? Company number and registered address for the footer. Public
liability cover, trade bodies (NFRC, CompetentRoofer), guarantee length on new roofs.

**9.** 🤖 **Privacy policy.** *(needs 8)*
Legally required — the form collects names, numbers and addresses. Host as a
directory so `/privacy` and `/privacy/` both resolve.

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

## Phase 4 — get found

**14.** 🧍 **Google Business Profile.** Biggest single lever for a local trade.
**15.** 🤖 **Google Search Console** — verify the domain, submit the sitemap.
**16.** 🤖 **Town pages** for local SEO, if the service area stays this broad.
**17.** 🧍 **Checkatrade / TrustATrader** listings, if worth the fee.

---

## Done

- Project, repo `Shamalama-Apps/West_Wales_Roofing`, holding page shipped
- Spacemail MX + SPF confirmed live; site and form both use `will@`
- Design canvas converted to a full Eleventy site — home, work carousel, job
  detail, about, contact, thanks, 404, sitemap
- Six seed jobs; drafts render no page at all
- Decap CMS at `/admin` with a GitHub OAuth handler of our own
- Netlify Forms wired to `will@`, tested end to end and the test deleted
- Deployed and verified: https://west-wales-roofing.netlify.app
