// The photos are inside a <dialog>, which gives Escape, the backdrop and focus
// handling for free. Without this file the noscript block shows them inline, so
// nothing is ever unreachable.
for (const wrap of document.querySelectorAll('.gallery')) {
  const dialog = wrap.querySelector('[data-gallery]')
  const openBtn = wrap.querySelector('[data-gallery-open]')
  if (!dialog || !openBtn || typeof dialog.showModal !== 'function') continue

  openBtn.hidden = false
  openBtn.addEventListener('click', () => dialog.showModal())
  wrap.querySelector('[data-gallery-close]').addEventListener('click', () => dialog.close())

  // clicking the backdrop rather than a photo closes it
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close()
  })
}
