# West Wales Roofing — task list

Status key: `[ ]` todo · `[~]` in progress · `[x]` done · `[!]` blocked on Vanessa

---

## 1. Repo & hosting

- [x] Create project at `~/West_Wales_Roofing`
- [x] Create GitHub repo `Shamalama-Apps/West_Wales_Roofing`
- [x] Holding page shipped on GitHub Pages while the real site was built
- [x] **Hosting moved to Netlify** so the CMS and contact form can work —
      GitHub Pages serves static files only and can do neither
- [x] Netlify project `west-wales-roofing` created and deployed
- [!] Connect the GitHub repo to Netlify for continuous deployment (SETUP.md §1)
- [ ] Retire GitHub Pages once DNS moves (SETUP.md §3)

## 2. DNS (Spaceship control panel — Vanessa)

Currently pointing at **GitHub Pages**, still serving the holding page.

- [x] Parking records removed, GitHub `A` records and `www` CNAME added
- [!] Repoint `@` and `www` at Netlify when the site is signed off (SETUP.md §3)
- [ ] Confirm HTTPS once Netlify has issued the certificate

⚠️ Only two of the four GitHub `A` records ever resolved (`.108.153`, `.109.153`).
Moot once we move to Netlify, but worth knowing the panel may not have saved
everything that was entered.

## 3. Email (Spacemail)

- [x] Spacemail `MX` records (`mx1`/`mx2.spacemail.com`) — added automatically
- [x] Spacemail `SPF` record (`v=spf1 include:spf.spacemail.com ~all`)
- [x] Site and form both use `will@west-wales-roofing.com`
- [ ] Confirm the `DKIM` record exists in the Spaceship panel
- [ ] Add a `DMARC` TXT record (`_dmarc`): start at `v=DMARC1; p=none; rua=...`
- [ ] Send a test email in and out of `will@west-wales-roofing.com`
- [ ] Check the first real form notification lands (and isn't filed as spam)

## 4. Design

- [x] Confirm business details — logo, `will@`, 07956 091794, five service areas
- [x] Design canvas built in Claude Design (`West Wales Roofing.dc.html`)
- [x] Convert the canvas to a real site — home, work, job detail, about, contact
- [ ] ⚠️ Higher-res logo needed — supplied PNG is only 225×100, soft on retina. Ask for SVG or 3x
- [ ] Favicon set from the logo (SVG, 16/32, apple-touch-icon)
- [ ] Real photography — the site is a photo portfolio and every image is a placeholder

## 5. Build — done

- [x] Eleventy 3 static build, pre-rendered HTML for local SEO
- [x] Home, Work (carousel), Job detail, About, Contact, Thanks, 404, sitemap
- [x] Six seed jobs from the design; drafts render no page at all
- [x] Decap CMS at `/admin` — jobs, photos, contact details, services
- [x] GitHub OAuth handler (Git Gateway is deprecated, so we run our own)
- [x] Netlify Forms wired to `will@west-wales-roofing.com`, tested end to end
- [x] Deployed to https://west-wales-roofing.netlify.app

## 6. Handover steps — see SETUP.md

- [!] Connect the GitHub repo to Netlify (CMS publishes won't rebuild until this is done)
- [!] Create the GitHub OAuth app and set `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`
- [!] Add Will as a repo collaborator so he can log into `/admin`
- [!] Repoint DNS from GitHub Pages to Netlify, then disable Pages
- [ ] Privacy policy — legally required now the form collects personal details

## 7. Launch & marketing

- [ ] Google Business Profile (huge for local trades)
- [ ] Google Search Console — verify domain, submit sitemap
- [ ] Local SEO: town pages if the service area stays broad
- [ ] Checkatrade / TrustATrader listings if applicable
- [ ] Insurance, guarantees and certifications shown on site

---

## Open questions for Vanessa

1. **Trading name and legal entity** — limited company? Company number and
   registered address are needed for the footer if so.
2. **Insurance and certifications** — public liability cover, trade bodies?
3. **Guarantee** — how many years on new roofs?
4. **Will's real bio** — the About page copy is currently written from assumptions.
5. **Service areas** — the design copy said Carmarthenshire, Ceredigion and north
   Pembrokeshire; I've used your five (adding Swansea and Cardiff). Confirm which
   is right, since it drives the local SEO.
