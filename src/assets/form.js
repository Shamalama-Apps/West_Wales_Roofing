// Progressive enhancement only: with this file missing or blocked the form still
// posts normally. It exists because on a weak rural signal the submit button
// looks inert for several seconds, so people tap it again or give up, and a
// failed post throws away everything they typed.
const form = document.querySelector('form[name="enquiry"]')
if (form) {
  const KEY = 'wwr-enquiry'
  const fields = [...form.querySelectorAll('input, select, textarea')].filter(
    (el) => el.type !== 'hidden' && el.name !== 'company'
  )

  const read = () => {
    try {
      return JSON.parse(sessionStorage.getItem(KEY) || '{}')
    } catch {
      return {}
    }
  }

  // Restore anything left behind by a failed post or a tap on Back.
  const saved = read()
  fields.forEach((el) => {
    if (saved[el.name] != null && !el.value) el.value = saved[el.name]
  })

  form.addEventListener('input', () => {
    try {
      const data = {}
      fields.forEach((el) => (data[el.name] = el.value))
      sessionStorage.setItem(KEY, JSON.stringify(data))
    } catch {
      // storage can be unavailable in private browsing; the form still works
    }
  })

  form.addEventListener('submit', () => {
    const btn = form.querySelector('button[type="submit"]')
    if (btn) {
      btn.disabled = true
      btn.textContent = 'Sending…'
    }
    try {
      sessionStorage.removeItem(KEY)
    } catch {}
  })
}

// The function redirects back with ?error= when an enquiry could not be sent.
// Saying so plainly beats a silent failure the visitor never learns about.
if (new URLSearchParams(location.search).has('error')) {
  const box = document.querySelector('[data-form-error]')
  if (box) {
    box.hidden = false
    box.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }
}
