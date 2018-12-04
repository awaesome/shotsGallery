const gallery = document.querySelector('.gallery')
const sizes = ['wide', 'tall', 'big']

export default function populateGallery(shots) {
  shots.forEach(shot => {
    const {
      id,
      name,
      covers: { 808: imgUrl },
      stats: { appreciations: likes } = 0,
      stats: { views } = 0
    } = shot

    const img = new Image()
    img.src = imgUrl

    // can be some massage
    // img.onerror = () => {
    //   console.log('failed')
    // }

    img.onload = () => {
      img.classList.add('shot__img')
      img.alt = "oopsy"

      const div = document.createElement('div')
      div.setAttribute('data-id', id)

      const shotSize = Math.floor(Math.random() * 3)

      div.classList.add(`shot`, `shot--${sizes[shotSize]}`)

      div.innerHTML = `
      <div class="shot__overlay">
        <div class="shot__overlay__name">${name}</div>
        <div class="shot__overlay__stats">
          <span class="badge badge-danger"><i class="far fa-heart"></i> ${likes}</span>
          <span class="badge badge-warning"><i class="far fa-eye"></i> ${views}</span>
        </div>
      </div>
    `
      div.appendChild(img)
      gallery.appendChild(div)
    }
  })

}