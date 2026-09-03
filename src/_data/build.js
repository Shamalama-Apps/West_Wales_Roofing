import crypto from "node:crypto"
import fs from "node:fs"

// The CSS and JS are served immutable for a year, so their URL has to change
// when their content does. Without this a style change is invisible to every
// returning visitor until the cache expires.
const hash = (...files) =>
  crypto
    .createHash("sha256")
    .update(files.map((f) => fs.readFileSync(f)).join(""))
    .digest("hex")
    .slice(0, 8)

export default {
  year: new Date().getFullYear(),
  assetHash: hash("src/assets/site.css", "src/assets/carousel.js"),
}
