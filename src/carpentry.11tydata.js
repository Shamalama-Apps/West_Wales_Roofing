// Hidden until there are carpentry jobs to show. Returning false for the
// permalink means the page is not built at all, so it cannot be found or
// indexed, rather than sitting there empty.
export default {
  eleventyComputed: {
    permalink: (data) => (data.site.showCarpentry ? "/carpentry/index.html" : false),
  },
}
