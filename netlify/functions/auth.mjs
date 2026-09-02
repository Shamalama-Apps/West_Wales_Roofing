// Step one of Decap's GitHub login: bounce the owner to GitHub with a state
// token we can check on the way back. Replaces Netlify's deprecated Git Gateway.
export default async (req) => {
  const clientId = process.env.GITHUB_CLIENT_ID
  if (!clientId) {
    return new Response("GITHUB_CLIENT_ID is not set on this site.", { status: 500 })
  }

  const url = new URL(req.url)
  const state = crypto.randomUUID()

  const authorize = new URL("https://github.com/login/oauth/authorize")
  authorize.searchParams.set("client_id", clientId)
  authorize.searchParams.set("redirect_uri", `${url.origin}/api/callback`)
  authorize.searchParams.set("scope", "repo")
  authorize.searchParams.set("state", state)

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorize.toString(),
      "Set-Cookie": `wwr_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`,
      "Cache-Control": "no-store",
    },
  })
}

export const config = { path: "/api/auth" }
