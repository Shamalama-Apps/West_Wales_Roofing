# Setup steps that need a human

Everything else is built and deployed. These four need an account only Vanessa
has, and they're in dependency order.

---

## 1. Connect the repo to Netlify (required — nothing else updates without it)

Right now the site was deployed from a laptop. Until GitHub is connected,
**publishing from the CMS will commit but the site will not rebuild.**

1. <https://app.netlify.com/projects/west-wales-roofing/configuration/deploys>
2. **Link repository** → GitHub → authorise the Netlify GitHub App
3. Pick `Shamalama-Apps/West_Wales_Roofing`, branch `main`
4. Build command `npm run build`, publish directory `dist` (should prefill from `netlify.toml`)

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

## 3. Point DNS at Netlify (do this when the site is signed off)

The domain currently serves the old coming-soon page from GitHub Pages. In the
Spaceship DNS panel:

- **Delete** the four `A` records for `@` pointing at `185.199.108–111.153`
- **Delete** the `www` CNAME pointing at `shamalama-apps.github.io`
- Add the records Netlify shows under
  <https://app.netlify.com/projects/west-wales-roofing/configuration/domain>
  after you add `west-wales-roofing.com` as a custom domain there
  (an `A` record to Netlify's load balancer, and `www` as a CNAME)

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
