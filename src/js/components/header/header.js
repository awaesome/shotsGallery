const headerMenu = document.querySelector('.header-menu')
const spanDivider = headerMenu.querySelector('.divider-line')
const headerMenuSearch = headerMenu.querySelector('.prime-search')
const mainHero = document.querySelector('.main-hero-search')

// reveal header input on scroll
function dropSearch() {
  if (window.scrollY >= mainHero.offsetHeight) {
    headerMenu.style.borderBottom = "2px solid black"
    headerMenuSearch.classList.add('isShow')
    spanDivider.style.visibility = "visible"
  } else {
    spanDivider.style.visibility = "hidden"
    headerMenuSearch.classList.remove('isShow')
  }
}

window.addEventListener('scroll', dropSearch)