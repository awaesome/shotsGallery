function rnd(limit) {
  return Math.floor(Math.random() * limit + 1)
}

function displayLoad_clearGallery(loading, gallery, pageOverlay) {
  loading.style.display = 'block'
  gallery.innerHTML = ''
  pageOverlay.style.display = 'none'
}

export { rnd, displayLoad_clearGallery }