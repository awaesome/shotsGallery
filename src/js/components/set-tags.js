import { getFields } from '../data/fetch-fields'
import { rnd } from '../utilities'

const headerMenu = document.querySelector('.header-menu')
const headerFields = headerMenu.querySelector('.tags')
const mainHero = document.querySelector('.main-hero-search')
const heroFields = mainHero.querySelector('.tags')

// position of field on array to pick random tag
let pos

// save to session Storage
function setTags() {
  if (!sessionStorage.getItem('tags')) {
    getFields()
      .then(({ fields, popular }) => {
        const headerTags = []
        const heroTags = []
        for (let i = 0; i < 7; i++) {
          pos = rnd(popular.length - 1)
          headerTags.forEach(tag => {
            if (tag.includes(fields[pos].name))
              pos++
          })
          headerTags.push(fields[pos].name)
          if (i > 1) {
            pos = rnd(popular.length - 1)
            heroTags && heroTags.forEach(tag => {
              if (tag == popular[pos].name)
                pos++
            })
            heroTags.push(popular[pos].name)
          }
        }
        const tags = {
          headerTags,
          heroTags
        }
        sessionStorage.setItem('tags', JSON.stringify(tags))
      })
      .then(() => loadTags())
  } else {
    loadTags()
  }
}

// load tags to header and hero
function loadTags() {
  const tags = JSON.parse(sessionStorage.getItem('tags'))
  tags && tags.headerTags.forEach(tag => {
    const li = document.createElement('li')
    li.classList.add('tags__tag')
    li.innerHTML = `${tag}`
    headerFields.appendChild(li)
  })
  tags && tags.heroTags.forEach(tag => {
    const li = document.createElement('li')
    li.classList.add('tags__tag')
    li.innerHTML = `${tag}`
    heroFields.appendChild(li)
  })
}

setTags()