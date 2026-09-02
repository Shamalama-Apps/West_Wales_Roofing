// Step two: swap the GitHub code for a token and hand it to the Decap window.
// The token goes only to the opener on this exact origin, never into a URL.
const page = (status, payload) => `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Signing in&hellip;</title></head>
<body style="font:16px system-ui;padding:40px">
<p>Completing sign-in&hellip; you can close this window if it stays open.</p>
<script>
(function () {
  var message = 'authorization:github:${status}:${payload}'
  function receive (e) {
    if (e.data !== 'authorizing:github') return
    window.removeEventListener('message', receive, false)
    e.source.postMessage(message, e.origin)
  }
  window.addEventListener('message', receive, false)
  if (window.opener) window.opener.postMessage('authorizing:github', '*')
})()
</script>
</body></html>`

export default async (req) => {
  const url = new URL(req.url)
  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")
  const cookie = req.headers.get("cookie") || ""
  const expected = cookie.match(/wwr_oauth_state=([^;]+)/)?.[1]

  if (!code || !state || !expected || state !== expected) {
    return new Response("Sign-in could not be verified. Close this window and try again.", {
      status: 400,
      headers: { "Content-Type": "text/plain" },
    })
  }

  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  })
  const data = await res.json()

  const body = data.access_token
    ? page("success", JSON.stringify({ token: data.access_token, provider: "github" }).replace(/'/g, "\\'"))
    : page("error", JSON.stringify({ message: data.error_description || "No token returned" }).replace(/'/g, "\\'"))

  return new Response(body, {
    status: data.access_token ? 200 : 401,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Set-Cookie": "wwr_oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0",
    },
  })
}

export const config = { path: "/api/callback" }
