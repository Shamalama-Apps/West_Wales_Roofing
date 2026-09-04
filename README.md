# West Wales Roofing

Website for **West Wales Roofing** — <https://west-wales-roofing.com>

| | |
|---|---|
| Domain | west-wales-roofing.com (registrar: Spaceship) |
| Email | Spacemail, one mailbox — `will@west-wales-roofing.com` |
| Hosting | Cloudflare Worker with static assets — live at <https://west-wales-roofing.com> |
| Repo | `Shamalama-Apps/West_Wales_Roofing` |
| Build | Eleventy 3 → `_site/` |
| CMS | Decap at `/admin`, GitHub backend, OAuth via Netlify Functions |
| Forms | Worker route `/api/enquiry` → emails `will@west-wales-roofing.com` |

## Running it

```sh
npm install        # or: bun install
npm run dev        # local server with live reload
npm run build      # writes _site/
```

Netlify's CI runs `npm run build` — `package-lock.json` is committed for that
reason. Netlify only auto-detects `bun.lockb`, not the `bun.lock` bun 3 writes,
so bun lockfiles are gitignored to keep CI unambiguous. Using bun locally is fine.

## Structure

```
src/
  _data/site.json      business details, areas, services — editable in the CMS
  _data/build.js       build-time values (footer year)
  _includes/base.njk   shell: head, header, footer
  _includes/job.njk    job detail layout
  jobs/*.md            one file per job — the portfolio
  jobs/jobs.11tydata.js  layout + permalink rules for jobs
  index.njk work.njk about.njk contact.njk thanks.njk 404.njk sitemap.njk
  admin/               Decap CMS (index.html + config.yml)
  assets/              site.css, carousel.js
  uploads/             CMS-uploaded photos
netlify/functions/     GitHub OAuth handler for the CMS
```

## How the portfolio works

Each job is a markdown file in `src/jobs/`. Front matter carries the specs
(category, location, system, size, duration, date) and the photos; the markdown
body is the write-up.

`live: false` means the job is a draft: it renders **no page at all** and stays
out of listings and the sitemap, so an unfinished job is never reachable by URL.
`featured: true` floats it to the top of the home page.

Publishing a change from `/admin` commits to `main`, and Netlify rebuilds.

## Setup still outstanding

See [SETUP.md](SETUP.md) — the CMS login and the DNS cutover both need steps only
Vanessa can do.
