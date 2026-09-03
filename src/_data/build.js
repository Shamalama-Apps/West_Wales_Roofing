// Computed at build time so the footer year is never stale in the committed source.
// cmsBaseUrl follows Netlify's own URL: it is the netlify.app address now and
// becomes the custom domain automatically once that is primary, so the Decap
// OAuth config never needs hand-editing at cutover.
export default {
  year: new Date().getFullYear(),
  cmsBaseUrl: process.env.URL || "http://localhost:8080",
}
