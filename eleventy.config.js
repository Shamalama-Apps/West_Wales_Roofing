export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" })
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" })
  eleventyConfig.addPassthroughCopy({ "src/uploads": "uploads" })
  eleventyConfig.addPassthroughCopy({ "logo.png": "logo.png" })
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
