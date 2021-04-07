/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
const navElements = document.querySelectorAll('section')
const navList = document.getElementById('navbar__list')

/**
 * End Global Variables
 */

// Build menu by iterating through the navelements
navElements.forEach(el => {
  const navlistElement = `<li class='menu__link ${el.className}' data-link=${el.id}><a href="#${el.id}">${el.dataset.nav}</li>`
  navList.insertAdjacentHTML('beforeend', navlistElement)
})

// Scroll to section on link click by listenting to the click-event in the navlist
navList.addEventListener('click', e => {
  e.preventDefault()
  const parent = e.target.hasAttribute('data-link')
    ? e.target
    : e.target.parentElement
  const elementToScrollTo = document.getElementById(parent.dataset.link)
  elementToScrollTo.scrollIntoView({block: 'end', behavior: 'smooth'})
})

// Set section and nav link as active using the Intersection Observer pattern
const callback = entries => {
  entries.forEach(entry => {
    const navListElement = document.querySelector(
      `.menu__link[data-link='${entry.target.id}']`,
    )
    const section = document.getElementById(entry.target.id)

    if (entry && entry.isIntersecting) {
      navListElement.classList.add('active')
      section.classList.add('active')
    } else {
      if (navListElement.classList.contains('active')) {
        navListElement.classList.remove('active')
      }

      if (section.classList.contains('active')) {
        section.classList.remove('active')
      }
    }
  })
}

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.6,
}

const observer = new IntersectionObserver(callback, options)
navElements.forEach(el => {
  observer.observe(document.getElementById(el.id))
})

//Get the button
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  const scrolling = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrolling > 0) {
    window.requestAnimationFrame(topFunction);
    window.scrollTo(0, scrolling - scrolling / 50);
  }
}
