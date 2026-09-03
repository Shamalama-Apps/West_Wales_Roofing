export default {
  layout: "job.njk",
  pageType: "job",
  eleventyComputed: {
    // A job the CMS has left as a draft must not render at all — returning false
    // for the permalink keeps it out of dist entirely, not just out of listings.
    permalink: (data) =>
      data.live === false ? false : `/work/${data.page.fileSlug}/index.html`,
    description: (data) => data.overview,
  },
}
