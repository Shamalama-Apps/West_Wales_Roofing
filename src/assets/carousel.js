// Slides are all in the DOM so crawlers and no-JS visitors get every job; this
// only hides the inactive ones once JS is available.
const root = document.querySelector('[data-carousel]')
if (root) {
  const slides = [...root.querySelectorAll('[data-slide]')]
  const dots = [...document.querySelectorAll('[data-dot]')]
  let i = 0

  const show = (n) => {
    i = (n + slides.length) % slides.length
    slides.forEach((s, k) => {
      s.hidden = k !== i
      s.classList.toggle('is-active', k === i)
    })
    dots.forEach((d, k) => d.classList.toggle('is-on', k === i))
  }

  root.querySelector('[data-prev]').addEventListener('click', () => show(i - 1))
  root.querySelector('[data-next]').addEventListener('click', () => show(i + 1))
  dots.forEach((d, k) => d.addEventListener('click', () => show(k)))

  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea, select')) return
    if (e.key === 'ArrowLeft') show(i - 1)
    if (e.key === 'ArrowRight') show(i + 1)
  })

  show(0)
}
