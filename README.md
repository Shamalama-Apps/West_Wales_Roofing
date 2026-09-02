# West Wales Roofing

Website for **West Wales Roofing** — <https://west-wales-roofing.com>

| | |
|---|---|
| Domain | west-wales-roofing.com (registrar: Spaceship) |
| DNS | Spaceship nameservers — `launch1.spaceship.net`, `launch2.spaceship.net` |
| Email | Spacemail, one mailbox — `will@west-wales-roofing.com` |
| Hosting | GitHub Pages, served from `main` branch root |
| Repo | `Shamalama-Apps/West_Wales_Roofing` |

## Current state

A static "coming soon" holding page. No build step — plain HTML/CSS, deployed by
pushing to `main`.

```
index.html     coming-soon holding page
404.html       not-found page (same design, noindex)
CNAME          custom domain for GitHub Pages — do not delete
robots.txt     allows indexing, points at sitemap
sitemap.xml    single URL for now
```

## Deploying

```sh
git add <files you changed>
git commit -m "Describe the change"
git push origin main
```

GitHub Pages rebuilds automatically, usually within a minute.

## Next

See [TASKS.md](TASKS.md).
