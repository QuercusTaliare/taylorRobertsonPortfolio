const app = {};

// VARIABLES
const hamburgerMenu = document.querySelector('.bars');
const navListItem = document.querySelector('.navListItem');
const mainNav = document.querySelector('.mainNav');
const modalNav = document.querySelector('.modalNav');
const modalExit = document.querySelector('.modalExit');
const header = document.querySelector('header');
const main = document.querySelector('main');
const footer = document.querySelector('footer');

const FOCUSABLE_SELECTORS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

// FUNCTIONS

// https://codepen.io/noahblon/pen/yJpXka
app.toggleNav = function(e) {
  // mainNav.classList.toggle('inactive');
  modalNav.classList.toggle('inactive');

  modalNav.querySelector(FOCUSABLE_SELECTORS).focus();

  const focusableHeaderElements = header.querySelectorAll(FOCUSABLE_SELECTORS);

  

  focusableElementsArray.push(main.querySelectorAll(FOCUSABLE_SELECTORS));

  focusableElementsArray = [...focusableHeaderElements];

  // focusableElements.append(main.querySelectorAll(FOCUSABLE_SELECTORS));

 
  focusableElements.forEach(el => el.setAttribute('tabindex', '-1'));

  modalNav.removeAttribute('aria-hidden');
  header.setAttribute('aria-hidden', 'true');
} 

app.exitNav = function(e) {

  modalNav.classList.toggle('inactive');
}

// EVENT LISTENERS

hamburgerMenu.addEventListener('click', app.toggleNav);
modalExit.addEventListener('click', app.exitNav);