export default {
  layout: "job.njk",
  pageType: "job",
  eleventyComputed: {
    // Roofing is the business; carpentry sits alongside it on its own path so
    // the roofing pages stay a clean signal for local search.
    permalink: (data) => {
      if (data.live === false) return false
      const base = data.trade === "Carpentry" ? "carpentry" : "work"
      return `/${base}/${data.page.fileSlug}/index.html`
    },
    description: (data) => data.overview,
  },
}
