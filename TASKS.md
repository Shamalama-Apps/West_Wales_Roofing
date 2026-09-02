# West Wales Roofing — task list

Status key: `[ ]` todo · `[~]` in progress · `[x]` done · `[!]` blocked on Vanessa

---

## 1. Repo & hosting

- [x] Create project at `~/West_Wales_Roofing`
- [x] Coming-soon page, 404 page, CNAME, robots.txt, sitemap.xml
- [x] Create GitHub repo `Shamalama-Apps/West_Wales_Roofing` (public — Pages needs it on the free org plan)
- [x] Push `main`
- [x] Enable GitHub Pages (source: `main` / root) — built and serving
- [x] Set custom domain `west-wales-roofing.com` (picked up from the `CNAME` file)
- [ ] Enable "Enforce HTTPS" once DNS points at GitHub and the certificate is issued

## 2. DNS (Spaceship control panel — Vanessa)

The domain currently points at Spaceship's parking page (`34.216.117.25`).
Replace those records with GitHub's:

- [x] Delete the existing parking `A` records for `@`
- [~] Add four `A` records for `@`:
      `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
      ⚠️ Only `.108.153` and `.109.153` resolve — add the other two for redundancy
- [!] Add `AAAA` records for `@` (optional but recommended):
      `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
- [x] Add `CNAME` `www` → `shamalama-apps.github.io`
- [ ] Verify: `curl -I https://west-wales-roofing.com` returns 200 from GitHub
- [ ] Verify both `https://west-wales-roofing.com` and `https://www.west-wales-roofing.com`

## 3. Email (Spacemail)

There are currently **no MX records on the domain** — the mailbox will not
receive anything until Spacemail's records are added.

- [x] Spacemail `MX` records (`mx1`/`mx2.spacemail.com`) — added automatically
- [x] Spacemail `SPF` record (`v=spf1 include:spf.spacemail.com ~all`)
- [ ] Confirm the `DKIM` record exists in the Spaceship panel
- [ ] Add a `DMARC` TXT record (`_dmarc`): start at `v=DMARC1; p=none; rua=...`
- [ ] Send a test email in and out of `will@west-wales-roofing.com`
- [x] Site uses `will@west-wales-roofing.com`

## 4. Design

- [x] Confirm business details — logo, `will@`, 07956 091794, five service areas
- [ ] Build a design canvas with `/design` — home, services, gallery, contact
- [ ] Agree colours, type and logo direction with the client
- [ ] Source or shoot real photography (no stock roofs — they read as fake)
- [ ] ⚠️ Higher-res logo needed — supplied PNG is only 225×100, soft on retina. Ask for SVG or 3x
- [ ] Favicon set from the logo (SVG, 16/32, apple-touch-icon)

## 5. Full site build

- [ ] Home — hero, services, why-us, service area, testimonials, contact
- [ ] Services detail (new roofs, repairs, flat roofs, guttering, chimneys, moss)
- [ ] Gallery / recent work
- [ ] About
- [ ] Contact — form + phone + email + service-area map
- [ ] Contact form backend — Pages can't run functions; use Formspree, Web3Forms,
      or a small Cloudflare Worker, delivering to `will@west-wales-roofing.com`
- [ ] Privacy policy + cookie notice (host as a directory with `index.html`
      so `/privacy` and `/privacy/` both resolve)
- [ ] Mobile-first check at 375px, 768px, 1280px
- [ ] Lighthouse: performance, accessibility, SEO all ≥ 95

## 6. Launch & marketing

- [ ] Google Business Profile (huge for local trades)
- [ ] Google Search Console — verify domain, submit sitemap
- [ ] Local SEO: town pages if the service area is broad
- [ ] Checkatrade / TrustATrader listings if applicable
- [ ] Insurance, guarantees and certifications shown on site

---

## Open questions for Vanessa

Answered: logo supplied (red `#c93c30` / white), contact is `will@west-wales-roofing.com`
and 07956 091794, areas are Carmarthenshire, Pembrokeshire, Ceredigion, Swansea, Cardiff.
Repo is public — GitHub Pages requires it on the free org plan.

Still open:

1. **Trading name and legal entity** — limited company? Company number + registered
   address are needed for the footer if so.
2. **Insurance and certifications** — public liability cover, any trade bodies
   (NFRC, CompetentRoofer)? Trades customers look for these.
3. **Guarantee** — how many years on new roofs?
4. **Photos of real work** — the single most valuable thing for the full site.
5. **Higher-resolution logo** — the PNG supplied is 225×100 and will look soft.
