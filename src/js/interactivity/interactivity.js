import { getProjects } from '../data/fetch-projects'
import { getProject } from '../data/fetch-project'
import populateGallery from './populateGallery'
import populateShot from './populateShot'
import { rnd, displayLoad_clearGallery } from '../utilities'

const headerMenu = document.querySelector('.header-menu')
const headerMenuSearch = headerMenu.querySelector('.prime-search')
const currentSearch = headerMenu.querySelector('.current-search')
const heroSearch = document.querySelector('.prime-search--main-hero')

const tagsList = document.querySelectorAll('.tags')

const loading = document.querySelector(".loading")

const gallery = document.querySelector('.gallery')
const pageOverlay = document.querySelector('.page-overlay')

const buttonChangeBg = document.querySelector('.gBtn--change-bg')
const buttonMore = document.querySelector('.gBtn--more-content')

let selectedImg = false

let options = {
  queryString: '',
  sort: '',
  time: '',
  page: ''
}

// fetch data on form(input) submit
function handleSubmit(e) {
  e.preventDefault()

  const queryString = (this.querySelector('input[type=search]')).value
  currentSearch.innerHTML = queryString
  if (queryString != '') {
    displayLoad_clearGallery(loading, gallery, pageOverlay)

    options = {
      queryString,
      page: 1
    }

    getProjects(options)
      .then(data => { populateGallery(data) })
      .then(loading.style.display = "none")
  }

  this.reset()
}

// fetch data to add more shots to the page
function handleClickMore(e) {
  e.preventDefault()

  if (options.queryString) {
    options.page++
    getProjects(options)
      .then(data => { populateGallery(data) })
  }
}

// fetch data on tag click
function handleClickTag(e) {
  e.preventDefault()
  displayLoad_clearGallery(loading, gallery, pageOverlay)

  if (e.target.matches('li')) {
    this.style.pointerEvents = "none"

    const li = e.target
    const tagName = li.innerText

    currentSearch.innerHTML = tagName

    options = {
      queryString: tagName,
      page: 1
    }

    getProjects(options)
      .then(data => { populateGallery(data) })
      .then(() => {
        loading.style.display = "none"
        this.style.pointerEvents = "auto"
      })
  }
}

// change background
function handleClickChangeBg() {
  const shots = gallery.querySelectorAll('.shot')
  const bgSrc = (shots[rnd(shots.length) - 1]).querySelector('img').src
  const bg = document.querySelector('.background')
  bg.style.backgroundImage = `url(${bgSrc})`
}

// zoom in&out img
function handleClickZoomImg() {
  this.classList.toggle('img-card__container-img__img--origin')
}

// opens img details window
function handleClickShots(e) {
  e.stopPropagation()
  if (e.target.parentElement.matches('.shot')) {

    const shot = e.target.parentElement
    const shotId = shot.dataset.id

    getProject(shotId)
      .then(data => populateShot(data))
      .then(() => {
        pageOverlay.style.display = 'grid'

        // take elements when they are created
        selectedImg = document.querySelector('.img-card__container-img__img')
        const tagsList = pageOverlay.querySelector('.tags')

        // create event listener when elements exist
        selectedImg.addEventListener('click', handleClickZoomImg)
        tagsList.addEventListener('click', handleClickTag)
      })
  }
}

// close img details window on mouse click
function handleClickClose(e) {
  if (e.target.matches('.page-overlay') ||
    e.target.matches('.fa-window-close')) {
    pageOverlay.style.display = 'none'
  }
}

// close img details window on Esc
function handlePressClose(e) {
  if (e.keyCode == 27 && selectedImg) {
    pageOverlay.style.display = 'none'
    selectedImg.classList.remove('img-card__container-img__img--origin')
  }
}

// populate gallery on page load
window.onload = () => {
  displayLoad_clearGallery(loading, gallery, pageOverlay)
  options.queryString = "random"
  getProjects(options)
    .then(data => { populateGallery(data) })
    .then(loading.style.display = "none")
}

// show button after some time to content load
setTimeout(() => buttonMore.style.display = "block", 2000)


headerMenuSearch.addEventListener('submit', handleSubmit)
heroSearch.addEventListener('submit', handleSubmit)
buttonMore.addEventListener('click', handleClickMore)
buttonChangeBg.addEventListener('click', handleClickChangeBg)
tagsList.forEach(list => list.addEventListener('click', handleClickTag))
gallery.addEventListener('click', handleClickShots)
pageOverlay.addEventListener('click', handleClickClose)
window.addEventListener('keydown', handlePressClose)








//