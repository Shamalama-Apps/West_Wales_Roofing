# West Wales Roofing — task list

Status key: `[ ]` todo · `[~]` in progress · `[x]` done · `[!]` blocked on Vanessa

---

## 1. Repo & hosting

- [x] Create project at `~/West_Wales_Roofing`
- [x] Coming-soon page, 404 page, CNAME, robots.txt, sitemap.xml
- [ ] Create GitHub repo `Shamalama-Apps/West_Wales_Roofing`
- [ ] Push `main`
- [ ] Enable GitHub Pages (source: `main` / root)
- [ ] Set custom domain `west-wales-roofing.com` in Pages settings
- [ ] Enable "Enforce HTTPS" once the certificate is issued

## 2. DNS (Spaceship control panel — Vanessa)

The domain currently points at Spaceship's parking page (`34.216.117.25`).
Replace those records with GitHub's:

- [!] Delete the existing parking `A` records for `@`
- [!] Add four `A` records for `@`:
      `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- [!] Add `AAAA` records for `@` (optional but recommended):
      `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
- [!] Add `CNAME` `www` → `shamalama-apps.github.io`
- [ ] Verify: `curl -I https://west-wales-roofing.com` returns 200 from GitHub
- [ ] Verify both `https://west-wales-roofing.com` and `https://www.west-wales-roofing.com`

## 3. Email (Spacemail)

There are currently **no MX records on the domain** — the mailbox will not
receive anything until Spacemail's records are added.

- [!] Add the Spacemail `MX` records from the Spaceship panel
- [!] Add the Spacemail `SPF` (TXT) record
- [!] Add the `DKIM` record
- [ ] Add a `DMARC` TXT record (`_dmarc`): start at `v=DMARC1; p=none; rua=...`
- [ ] Send a test email in and out of `info@west-wales-roofing.com`
- [ ] Confirm the address on the site matches the mailbox that actually exists

## 4. Design

- [ ] Confirm business details (see "Open questions" below)
- [ ] Build a design canvas with `/design` — home, services, gallery, contact
- [ ] Agree colours, type and logo direction with the client
- [ ] Source or shoot real photography (no stock roofs — they read as fake)
- [ ] Real logo + favicon set (SVG, 16/32, apple-touch-icon)

## 5. Full site build

- [ ] Home — hero, services, why-us, service area, testimonials, contact
- [ ] Services detail (new roofs, repairs, flat roofs, guttering, chimneys, moss)
- [ ] Gallery / recent work
- [ ] About
- [ ] Contact — form + phone + email + service-area map
- [ ] Contact form backend (Netlify-style function isn't available on Pages —
      use Formspree, Web3Forms, or a small Cloudflare Worker)
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

1. **Whose business is this** — yours, or a client's? Changes tone and who signs off.
2. **Trading name and legal entity** — is it a limited company? Company number for the footer?
3. **Phone number** — a trades site without a visible phone number loses most of its leads.
4. **Real service area** — I've assumed Carmarthenshire, Pembrokeshire, Ceredigion. Correct?
5. **Is `info@west-wales-roofing.com` the mailbox that was actually created?**
6. **Repo visibility** — public (GitHub Pages on a free account requires public) or private?
7. **Any existing branding** — logo, colours, van livery, photos?
