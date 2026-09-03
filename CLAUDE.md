# West Wales Roofing — project rules

Marketing site for a roofing firm. Eleventy 3 → `dist/`, hosted on Netlify,
content managed through Decap CMS at `/admin`.

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
- Don't commit bun lockfiles. Netlify CI runs `npm run build` against the
  committed `package-lock.json`; a stray bun lockfile makes CI ambiguous.

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
