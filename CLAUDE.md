# West Wales Roofing — project rules

Marketing site for a roofing firm. Eleventy 3 → `dist/`, hosted on **Cloudflare
Pages**, content managed through Decap CMS at `/admin`.

Moved off Netlify on 2026-09-04 when its build credits ran out mid-project.

It is a **Worker with static assets**, not a Pages project. Cloudflare steers new
projects to Workers and Pages is in maintenance mode, so `wrangler.toml` uses
`main` plus an `[assets]` binding, never `pages_build_output_dir`.

`worker/index.js` routes `/api/enquiry` to the Resend handler and hands
everything else to `env.ASSETS`. Headers live in `src/_headers`, copied into the
build. Note that `_headers` applies to static assets only, not to anything the
Worker itself returns.

## Hard rules

- Never push to `main` without Vanessa's explicit instruction. `main` is the
  production branch — Netlify deploys it, and the CMS commits straight to it.
- **A job with `live: false` must never render a page.** That rule lives in
  `src/jobs/jobs.11tydata.js` as a `permalink` returning `false`. Filtering the
  collection alone is not enough — Eleventy still writes the file.
- Never remove the Spacemail `MX` or `SPF` records when changing DNS. Hosting
  and email are separate concerns on this domain.
- No contact details on the site that Vanessa hasn't confirmed. A wrong phone
  number on a trades site is worse than no phone number.
- Don't commit bun lockfiles. CI runs `npm run build` against the committed
  `package-lock.json`; a stray bun lockfile makes CI ambiguous.

## Two trades, one collection

Every job is a markdown file in `src/jobs/`. A `trade` field of `Roofing` or
`Carpentry` decides which listing it appears on and where it lives:
`/work/<slug>/` or `/carpentry/<slug>/`. `collections.jobs` is roofing only, so
the home page and Recent work are untouched by carpentry existing.

Roofing leads deliberately. Carpentry is linked from the footer and the About
page, never the main nav, so the site stays a clean signal for local roofing
searches. Do not reinstate absolute claims like "roofs are all we do".

## Content model

Jobs are markdown in `src/jobs/`, one file per job. Business details, service
areas and the services list all live in `src/_data/site.json` — which Decap also
edits, so keep its shape stable. Adding a field there means adding it to
`src/admin/config.yml` too, or the CMS will silently drop it on the next save.

## Service areas appear in five places

`src/_data/site.json` drives the body copy, the footer and the schema.org
`areaServed`. The four page `description` values in `index/work/about/contact.njk`
spell the areas out separately for search results and must be changed by hand to
match. Changing one and not the others is the easy mistake.

## src/admin/config.yml is deliberately NOT a template

It is passthrough-copied, never rendered. Decap's own `{{title}}`, `{{slug}}` and
`{{author-name}}` placeholders are the same syntax Nunjucks uses, so running this
file through the template engine silently empties them — which shipped a blank
`slug` and a `summary` of " — " before it was caught. Keep it static.

## Structured data

`src/_includes/schema.njk` emits one `@graph` per page, branching on the
`pageType` front-matter field (`home`, `work`, `job`, `about`, `contact`). Job
pages derive a `Service` node straight from the CMS fields, so new jobs get
correct schema with no extra work. All string values go through `| dump` so
apostrophes in copy cannot break the JSON.

## Images

Every `<img>` in the built HTML is run through `@11ty/eleventy-img` and comes out
as AVIF + WebP with a responsive srcset, capped at 1600px. Nothing in a template
needs to opt in — CMS uploads are handled automatically.

- The fallback format is `auto`, deliberately. A JPEG fallback flattens the
  logo's transparent background onto black.
- Never add `"auto"` to `widths`: it emits a full-size derivative (4000px+ from a
  phone) that a large screen will happily download.
- Set `sizes` on any new `<img>` to match its rendered width, or the browser
  fetches the 1600px file for a 370px card.
- The build warns about originals over 1MB in `src/uploads`. Those stay in git
  permanently — the optimisation is for visitors, not the repo.

## Never use the `padding` shorthand on `.wrap`

`.wrap` is a layout class used alongside a component class on 19 elements
(`class="wrap cta-in"` and so on). Writing `padding: 0 22px` in a media query
resets top and bottom padding to zero on every one of them, which silently
flattened the whole site's vertical rhythm on mobile until it was spotted in the
footer. Always use `padding-left` / `padding-right` longhand there.

## Fonts are self-hosted, not from Google

`src/assets/fonts/` holds woff2 files and the `@font-face` rules sit at the top
of `site.css`. Do not reintroduce a `fonts.googleapis.com` link: it puts two
blocking round trips to a third party in front of the first paint, and it is the
only thing that would put a third party back into the privacy policy.

Only four faces are used: Archivo 600/700/800 and Source Sans 3 400. Weight 500
was folded into 600 deliberately. `latin-ext` is kept for the circumflexes in
Welsh place names. Both families are OFL licensed, so self-hosting is permitted.

## Photographs: strip metadata before they go in src/uploads

Phone photos carry GPS. Five of the originals pinpointed customers' homes, one of
them a vulnerable person's. Anything going into `src/uploads/` must be run through
`ImageOps.exif_transpose` (so rotation is baked into the pixels) and re-saved onto
a blank canvas so no EXIF survives at all. Resize to 1800px on the long edge while
you are there; the site never serves wider than 1600px.

## The portfolio is contracted work, and says so

Will has worked these roofs while contracting to other firms, which is normal in
the trade. `/work/` opens by saying so plainly, and each job carries an optional
`role` field describing his part. Never write copy implying these were jobs booked
by West Wales Roofing, and never name a customer or anything that identifies one.

## Job pages have two layouts

A `beforeAfter` boolean in the front matter picks between them, and it is a CMS
choice rather than something inferred, because two photos existing does not mean
they show the same roof before and after.

- **On**, with both images set: the pair runs full width, labelled, with the
  description and job details in two columns beneath. This is the shape a real
  transformation deserves.
- **Off**: one photo sits beside the job details, the description runs full
  width under it, and the gallery is a horizontal run.

`src/_includes/spec.njk` holds the details table so both layouts share it.

## Job photographs open in a dialog

`src/_includes/gallery-items.njk` holds the photo markup and is included twice:
once inside a native `<dialog>`, once inside `<noscript>`. With JavaScript the
button opens the dialog and the photos download only then; without it the
noscript copy renders inline. The photos are never unreachable, and they are
never downloaded twice, because a browser does not parse noscript content when
scripting is on.

The `<dialog>` element is doing the work: Escape, the backdrop and focus handling
come free. Do not hand-roll a modal here.

## Style

- 2-space indent, no semicolons unless required
- No comments unless the *why* is non-obvious
- British English throughout — "kerb", "colour", "specialise"
- Content is written for homeowners, not developers. Short sentences, plain
  words. Trades customers want to know: do you do my job, do you cover my area,
  are you insured, how do I reach you.

## Design source

The visual design came from a Claude Design canvas (project
`05bbf9ca-663d-4245-8954-dcd51c3fac9a`, file `West Wales Roofing.dc.html`).
Brand red is the logo's `#c93c30`, not the canvas's `#BE3A2F`. Typefaces are
Archivo (display) and Source Sans 3 (body).
