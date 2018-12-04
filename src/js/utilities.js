function rnd(limit) {
  return Math.floor(Math.random() * limit + 1)
}

function displayLoad_clearGallery(loading, close, gallery, pageOverlay) {
  loading.style.display = 'block'
  close.style.display = 'none'
  gallery.innerHTML = ''
  pageOverlay.style.display = 'none'
}

export { rnd, displayLoad_clearGallery }