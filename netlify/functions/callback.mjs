// Step two: swap the GitHub code for a token and hand it to the Decap window.
// Every exit path must postMessage back — Decap waits forever otherwise, and a
// silent hang tells nobody anything. The reason is also printed on the page.
const page = (status, payloadObj, human) => {
  const payload = JSON.stringify(payloadObj)
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/</g, "\\u003c")

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>Signing in&hellip;</title></head>
<body style="font:16px/1.5 system-ui,sans-serif;padding:40px;max-width:34em">
<h1 style="font-size:20px">${status === "success" ? "Signed in" : "Sign-in failed"}</h1>
<p>${human}</p>
<p style="color:#666">You can close this window.</p>\n<pre id="diag" style="background:#f4f2ee;padding:12px;font:12px ui-monospace,monospace;white-space:pre-wrap;border-left:4px solid #c93c30"></pre>
<script>
(function () {
  var out = document.getElementById('diag')
  // Each line is its own element: a backslash escape here would be consumed by
  // the template literal that emits this script and break the whole file.
  function say (line) {
    var row = document.createElement('div')
    row.textContent = line
    out.appendChild(row)
  }

  var message = 'authorization:github:${status}:${payload}'

  if (!window.opener) {
    say('PROBLEM: window.opener is not available.')
    say('The link back to the CMS tab was lost during sign-in, so the token')
    say('cannot be handed over. Tell Vanessa: "opener is null".')
    return
  }
  say('opener: present')

  var replied = false
  function receive (e) {
    say('reply from ' + e.origin + ': ' + String(e.data).slice(0, 40))
    if (e.data !== 'authorizing:github') return
    replied = true
    window.removeEventListener('message', receive, false)
    e.source.postMessage(message, e.origin)
    say('token sent to the CMS')
  }
  window.addEventListener('message', receive, false)

  // Retried: if the opener has not attached its listener yet, the first
  // announcement is lost and the login hangs with no way to tell why.
  var tries = 0
  window.opener.postMessage('authorizing:github', '*')
  var timer = setInterval(function () {
    if (replied || ++tries > 20) {
      clearInterval(timer)
      if (!replied) {
        say('PROBLEM: the CMS never answered after ' + tries + ' attempts.')
        say('Tell Vanessa: "no reply from CMS".')
      }
      return
    }
    window.opener.postMessage('authorizing:github', '*')
  }, 250)
  say('announced to CMS, waiting for reply...')
})()
</script>
</body></html>`
}

const fail = (human, code = 400) =>
  new Response(page("error", { message: human }, human), {
    status: code,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  })

export default async (req) => {
  const url = new URL(req.url)

  // GitHub can bounce back with its own refusal (access_denied, and similar).
  const ghError = url.searchParams.get("error")
  if (ghError) {
    return fail(`GitHub refused the sign-in: ${url.searchParams.get("error_description") || ghError}`)
  }

  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")
  const cookie = req.headers.get("cookie") || ""
  const expected = cookie.match(/wwr_oauth_state=([^;]+)/)?.[1]

  if (!code) return fail("GitHub did not send an authorization code.")
  if (!expected) {
    return fail(
      "The sign-in cookie was missing on the way back from GitHub. If this browser blocks cross-site cookies, try Chrome, or allow cookies for this site.",
    )
  }
  if (state !== expected) return fail("The sign-in could not be verified (state mismatch).")

  let data
  try {
    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    })
    data = await res.json()
  } catch (err) {
    return fail(`Could not reach GitHub to exchange the code: ${err.message}`, 502)
  }

  if (!data.access_token) {
    return fail(`GitHub did not return a token: ${data.error_description || data.error || "unknown error"}`, 401)
  }

  return new Response(
    page("success", { token: data.access_token, provider: "github" }, "Returning you to the CMS&hellip;"),
    {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "Set-Cookie": "wwr_oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0",
      },
    },
  )
}

export const config = { path: "/api/callback" }
