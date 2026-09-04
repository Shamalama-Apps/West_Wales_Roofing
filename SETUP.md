# Setup steps that need a human

Everything else is built and deployed. These four need an account only Vanessa
has, and they're in dependency order.

---

## 1. ✅ Hosting — done

Live at **https://west-wales-roofing.vanessa-latchem.workers.dev**

A **Cloudflare Worker with static assets**, not a Pages project: Cloudflare steers
new projects to Workers and Pages is in maintenance mode. Every push to `main`
rebuilds and deploys.

- Build command `npm run build`, deploy command `npx wrangler deploy`
- Output directory is `_site`, Eleventy's default. Cloudflare detects the
  framework and applies that default, overriding `assets.directory` in
  `wrangler.toml`, so the two must agree.
- Moved off Netlify on 2026-09-04 when its build credits ran out mid-project.

## 2. ✅ CMS login — done

Content editors sign in through **DecapBridge** (site
`be7291bb-7d2f-41a4-89db-76b05a4f4d35`), not GitHub. Editors need no GitHub
account; they get an email invite and set their own password.

Confirmed working 2026-09-03 in Safari and Chrome, with Will publishing a change
end to end.

- **Add an editor:** DecapBridge dashboard → the site → *Manage collaborators* →
  invite by email. They set their own password and can reset it unaided.
- **Commits are attributed by name in the commit message**, while the git author
  stays the token owner — deliberate, because the repo is public and it would
  otherwise publish the editor's login permanently.
- **The GitHub token** DecapBridge holds is a fine-grained PAT limited to this
  repo. ⚠️ If it expires the CMS breaks silently — see the renewal note in
  TASKS.md.

We previously ran our own GitHub OAuth handler here. It failed silently in Safari
and was removed once DecapBridge was proven. To go back: `git revert` the commit
"Switch CMS auth to DecapBridge", restore the two functions from history, and
re-create a GitHub OAuth app.

## 3. ✅ DNS and email — done

The domain runs on Cloudflare nameservers (`patryk` / `princess`), the site is
live at west-wales-roofing.com, `www` 301s to the apex with the path preserved,
and GitHub Pages is retired.

The contact form posts to the Worker at `/api/enquiry`, which sends through
Resend from `send.west-wales-roofing.com` to Will's inbox, with the customer's
address as the reply-to. **The `send.` subdomain is deliberate**: it keeps
Resend's records away from the apex, where Spacemail's MX, SPF and DKIM live.
All four survived the migration untouched.

Authentication is complete: DKIM, SPF and bounce handling are all in place.
Resend puts its SPF and bounce MX on a `send.` subdomain of the domain you
register with it, so they sit at `send.send.west-wales-roofing.com`. The doubled
name is correct and must not be tidied away.

## 3-old. ~~Point DNS at Cloudflare~~ (superseded)

The domain currently serves the old coming-soon page from GitHub Pages. In the
Spaceship DNS panel:

- **Delete** the four `A` records for `@` pointing at `185.199.108–111.153`
- **Delete** the `www` CNAME pointing at `shamalama-apps.github.io`
- Add `west-wales-roofing.com` as a custom domain on the Worker, and follow the
  records Cloudflare gives you

Leave the Spacemail `MX` and `SPF` records alone — they are unrelated to hosting
and email will break if they are removed.

**Also update these when the domain changes**, or things break quietly:

- **DecapBridge → site settings → Decap CMS login URL**: change from
  `https://west-wales-roofing.netlify.app/admin/` to
  `https://west-wales-roofing.com/admin/`, or invite emails will send Will to the
  old address.
- The CMS `base_url` needs no change — it follows Netlify's `URL` automatically.

Then, in this repo:

```sh
gh api -X DELETE repos/Shamalama-Apps/West_Wales_Roofing/pages   # turn off GitHub Pages
git rm index.html 404.html CNAME robots.txt sitemap.xml          # old holding page
git commit -m "Remove GitHub Pages holding page"
git push origin main
```

Netlify issues the HTTPS certificate itself once DNS resolves.

## 4. Before it goes public

- [ ] Real photos on every job — the whole site is built around them
- [ ] Higher-resolution logo (the current PNG is 225×100 and looks soft)
- [ ] Will's real bio on `/about/` — the current one is written from assumptions
- [ ] Company number and registered address for the footer, if it's a limited company
- [ ] Insurance and any trade bodies (NFRC, CompetentRoofer)
- [ ] Privacy policy — the contact form collects names, numbers and addresses,
      so this is a legal requirement, not a nicety.
      Host it as `src/privacy/index.njk` so `/privacy` and `/privacy/` both resolve.
- [ ] Google Business Profile and Search Console
