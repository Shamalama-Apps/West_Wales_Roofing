// One Worker serves the whole site: the enquiry endpoint, and everything else
// from the static build. Cloudflare recommends this over Pages for new projects,
// and Pages is now in maintenance mode.
import { handleEnquiry } from "./enquiry.js"

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === "/api/enquiry") {
      if (request.method !== "POST") {
        return new Response("Method not allowed", { status: 405, headers: { Allow: "POST" } })
      }
      return handleEnquiry(request, env)
    }

    return env.ASSETS.fetch(request)
  },
}
