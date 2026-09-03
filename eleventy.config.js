import { eleventyImageTransformPlugin } from "@11ty/eleventy-img"
import fs from "node:fs"
import path from "node:path"

export default function (eleventyConfig) {
  // Every <img> in the built HTML is converted to AVIF/WebP with a responsive
  // srcset, whatever the CMS uploaded. Photos come off a phone at several MB and
  // this is what stops that reaching visitors.
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: "html",
    // "auto" keeps the original format as the fallback — a JPEG fallback would
    // flatten the logo's transparent background onto black.
    formats: ["avif", "webp", "auto"],
    // No "auto": it emits a full-size derivative (4000px+ off a phone) that no
    // visitor needs, and a big screen would happily download it.
    widths: [400, 800, 1200, 1600],
    failOnError: true,
    defaultAttributes: { loading: "lazy", decoding: "async", sizes: "100vw" },
    sharpOptions: { animated: false },
  })

  // The originals still land in git, and a roofer's phone will happily commit a
  // 6MB photo. Warn loudly at build time rather than discovering it later.
  eleventyConfig.on("eleventy.after", () => {
    const dir = "src/uploads"
    if (!fs.existsSync(dir)) return
    const big = fs
      .readdirSync(dir)
      .map((f) => ({ f, mb: fs.statSync(path.join(dir, f)).size / 1e6 }))
      .filter(({ mb }) => mb > 1)
      .sort((a, b) => b.mb - a.mb)
    if (big.length) {
      console.warn(`\n[images] ${big.length} original(s) over 1MB in ${dir} — these sit in git forever:`)
      for (const { f, mb } of big) console.warn(`  ${mb.toFixed(1)}MB  ${f}`)
      console.warn("  Visitors get optimised versions, but the repo keeps the originals.\n")
    }
  })
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" })
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" })
  eleventyConfig.addPassthroughCopy({ "src/uploads": "uploads" })
  eleventyConfig.addPassthroughCopy({ "src/logo.png": "logo.png" })
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" })

  // Jobs marked draft stay out of the build entirely, so an unfinished job in
  // the CMS is never reachable by URL or sitemap.
  eleventyConfig.addCollection("jobs", (api) =>
    api
      .getFilteredByGlob("src/jobs/*.md")
      .filter((j) => j.data.live !== false)
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date))
  )

  eleventyConfig.addFilter("featuredFirst", (jobs) => [
    ...jobs.filter((j) => j.data.featured),
    ...jobs.filter((j) => !j.data.featured),
  ])

  eleventyConfig.addFilter("pad", (n) => String(n).padStart(2, "0"))

  // Nunjucks scopes `set` to the loop body, so the job page can't find its own
  // position by iterating — these do it outside the template.
  eleventyConfig.addFilter("indexOfUrl", (jobs, url) =>
    Math.max(0, jobs.findIndex((j) => j.url === url))
  )

  eleventyConfig.addFilter("nextAfterUrl", (jobs, url) => {
    const i = jobs.findIndex((j) => j.url === url)
    return jobs[(i + 1) % jobs.length]
  })

  return {
    dir: { input: "src", output: "dist", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  }
}
