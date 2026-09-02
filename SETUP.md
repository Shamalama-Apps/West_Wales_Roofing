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

## 2. Create the GitHub OAuth app (required for the CMS login)

Decap signs in through GitHub. Git Gateway, the old Netlify way, is deprecated,
so this site brings its own OAuth handler at `/api/auth`.

1. <https://github.com/settings/developers> → **New OAuth App**
   - Application name: `West Wales Roofing CMS`
   - Homepage URL: `https://west-wales-roofing.com`
   - Authorization callback URL: `https://west-wales-roofing.com/api/callback`
2. Generate a client secret, then from this folder:

   ```sh
   netlify env:set GITHUB_CLIENT_ID <the client id>
   netlify env:set GITHUB_CLIENT_SECRET <the client secret>
   netlify deploy --build --prod
   ```

3. Add Will as a collaborator on `Shamalama-Apps/West_Wales_Roofing` with
   **Write** access. He needs a free GitHub account to log into `/admin`.

   *If a GitHub account for Will is a dealbreaker, the alternative is
   DecapBridge, which gives him an email/password login instead — it swaps the
   `backend` block in `src/admin/config.yml` and drops the two functions.*

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
