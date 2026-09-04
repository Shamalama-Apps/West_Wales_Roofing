// Cloudflare Pages Function. Replaces Netlify Forms: takes the contact form
// POST, emails it to Will through Resend, and redirects to the thank you page.
// Works without JavaScript in the browser, since it is an ordinary form post.

const FIELDS = ["name", "phone", "email", "address", "type", "when", "message"]

const seeOther = (url) => new Response(null, { status: 303, headers: { Location: url } })

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c])

export async function onRequestPost(context) {
  const { request, env } = context
  const origin = new URL(request.url).origin

  let form
  try {
    form = await request.formData()
  } catch {
    return seeOther(`${origin}/contact/?error=1`)
  }

  // The honeypot is hidden from people and irresistible to bots. Accept the
  // submission so the bot sees success, but send nothing.
  if ((form.get("company") || "").trim()) return seeOther(`${origin}/thanks/`)

  const data = {}
  for (const f of FIELDS) data[f] = (form.get(f) || "").toString().trim().slice(0, 4000)

  if (!data.name || !data.phone) return seeOther(`${origin}/contact/?error=missing`)

  const to = env.ENQUIRY_TO || "will@west-wales-roofing.com"
  const from = env.ENQUIRY_FROM || "West Wales Roofing <enquiries@send.west-wales-roofing.com>"

  const rows = [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Where the roof is", data.address],
    ["Type of job", data.type],
    ["How soon", data.when],
    ["Description", data.message],
  ].filter(([, v]) => v)

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n")
  const html =
    `<h2 style="font:600 18px system-ui">New enquiry from the website</h2>` +
    `<table style="font:15px/1.5 system-ui;border-collapse:collapse">` +
    rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 14px 6px 0;color:#666;vertical-align:top">${escapeHtml(k)}</td>` +
          `<td style="padding:6px 0">${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`,
      )
      .join("") +
    `</table>`

  if (!env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set; enquiry not sent")
    return seeOther(`${origin}/contact/?error=config`)
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        // so Will can hit reply and land in the customer's inbox
        reply_to: data.email || undefined,
        subject: `Roofing enquiry from ${data.name}${data.address ? ` (${data.address})` : ""}`,
        text,
        html,
      }),
    })
    if (!res.ok) {
      console.error("Resend rejected the enquiry:", res.status, await res.text())
      return seeOther(`${origin}/contact/?error=send`)
    }
  } catch (err) {
    console.error("Could not reach Resend:", err.message)
    return seeOther(`${origin}/contact/?error=send`)
  }

  return seeOther(`${origin}/thanks/`)
}
