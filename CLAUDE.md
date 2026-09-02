# West Wales Roofing — project rules

Static marketing site for a roofing company. Plain HTML/CSS, no framework, no
build step. Deployed by pushing to `main`; GitHub Pages serves the repo root.

## Hard rules

- **Never delete `CNAME`.** GitHub Pages drops the custom domain if it goes
  missing, and the site falls back to `shamalama-apps.github.io`.
- Never push to `main` without Vanessa's explicit instruction.
- Host legal pages as a directory with `index.html` (`/privacy/index.html`) so
  both `/privacy` and `/privacy/` resolve — a bare `.html` 404s on the slash.
- No contact details on the site that haven't been confirmed by Vanessa. A wrong
  phone number on a trades site is worse than no phone number.

## Style

- 2-space indent, no semicolons in JS unless required
- No comments unless the *why* is non-obvious
- No `console.log` in committed code
- British English throughout — "kerb", "colour", "specialise"

## Content

Written for homeowners, not developers. Short sentences, plain words, no
marketing waffle. Trades customers want to know: do you do my job, do you cover
my area, are you insured, how do I reach you.
