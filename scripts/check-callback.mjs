// The OAuth callback builds a <script> inside a template literal, so a stray
// backslash escape in the source is consumed before it reaches the browser and
// silently breaks the whole script. That failure is invisible server-side — the
// page still returns 200 — so it gets checked here instead.
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { execFileSync } from "node:child_process"

process.env.GITHUB_CLIENT_ID ||= "test-id"
process.env.GITHUB_CLIENT_SECRET ||= "test-secret"

const mod = await import("../netlify/functions/callback.mjs")
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "wwr-"))
const realFetch = globalThis.fetch
let failures = 0

const extract = (html) => {
  const m = html.match(/<script>([\s\S]*?)<\/script>/)
  if (!m) throw new Error("no <script> in response")
  return m[1]
}

const parses = (js, name) => {
  const f = path.join(tmp, `${name}.js`)
  fs.writeFileSync(f, js)
  try {
    execFileSync("node", ["--check", f], { stdio: "pipe" })
    return true
  } catch (e) {
    console.error(`  ${name}: SYNTAX ERROR\n${String(e.stderr).split("\n").slice(0, 3).join("\n")}`)
    return false
  }
}

const check = (name, ok) => {
  console.log(`  ${ok ? "ok  " : "FAIL"} ${name}`)
  if (!ok) failures++
}

// Failure pages must still carry a parseable script, or the CMS hangs forever.
for (const [name, url, headers] of [
  ["bad-state", "https://x.test/api/callback?code=x&state=y", {}],
  ["no-code", "https://x.test/api/callback", {}],
  ["gh-refusal", "https://x.test/api/callback?error=access_denied&error_description=no", {}],
]) {
  const html = await (await mod.default(new Request(url, { headers }))).text()
  check(`${name}: script parses`, parses(extract(html), name))
}

// The success page embeds a token, so escaping has to survive hostile input.
for (const [name, token] of [
  ["plain", "gho_16C7e42F292c6912E7710c838347Ae178B4a"],
  ["hostile", `gho_'"\\</script><img src=x>`],
]) {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ access_token: token }), {
      headers: { "Content-Type": "application/json" },
    })
  const res = await mod.default(
    new Request("https://x.test/api/callback?code=abc&state=st", {
      headers: { cookie: "wwr_oauth_state=st" },
    }),
  )
  const html = await res.text()
  const js = extract(html)
  check(`success/${name}: script parses`, parses(js, `success-${name}`))

  const lit = js.match(/var message = ('(?:[^'\\]|\\.)*')/)?.[1]
  // eslint-disable-next-line no-eval
  const recovered = lit ? eval(lit) : null
  const expected = "authorization:github:success:" + JSON.stringify({ token, provider: "github" })
  check(`success/${name}: token survives escaping`, recovered === expected)
  check(`success/${name}: token cannot escape the script tag`, !html.includes("</script><img"))
}

globalThis.fetch = realFetch
fs.rmSync(tmp, { recursive: true, force: true })
console.log(failures ? `\n${failures} check(s) failed` : "\nall callback checks passed")
process.exit(failures ? 1 : 0)
