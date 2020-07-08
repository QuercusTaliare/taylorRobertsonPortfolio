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


// SELECT FOCUSABLE ELEMENTS method
// returns an array that holds every tab-able element in the DOM
// Called in the Open Modal and Exit Modal methods
app.selectFocusableElements = function() {
  // Creates three variables that hold nodelists full of every tab-able element on the page (outside the modal)
  const focusableHeaderElements = header.querySelectorAll(FOCUSABLE_SELECTORS);
  const focusableMainElements = main.querySelectorAll(FOCUSABLE_SELECTORS);
  const focusableFooterElements = footer.querySelectorAll(FOCUSABLE_SELECTORS);

  // Creates a variable holding an array of the three previous nodelists
  focusableElements = [...focusableHeaderElements, ...focusableMainElements, ...focusableFooterElements];

  return focusableElements;
}

// OPEN MODAL method - adapted from Noah Blon's codepen
// https://codepen.io/noahblon/pen/yJpXka
// Makes only the modal tabable when it's open
app.openModal = function(e) {

  modalNav.classList.toggle('inactive');

  // Focuses the first element with a tabindex in the modal
  modalNav.querySelector(FOCUSABLE_SELECTORS).focus();

  app.selectFocusableElements();

  // Loops through the array, and removes each element's tabindex
  focusableElements.forEach(el => el.setAttribute('tabindex', '-1'));

  // Adds or removes 'aria-hidden' attribute where necessary
  modalNav.removeAttribute('aria-hidden');
  header.setAttribute('aria-hidden', 'true');
  main.setAttribute('aria-hidden', 'true');
  footer.setAttribute('aria-hidden', 'true');
  
} 

app.exitModal = function(e) {

  modalNav.classList.toggle('inactive');

  app.selectFocusableElements();

  focusableElements.forEach(el => el.removeAttribute('tabindex'));

  modalNav.setAttribute('aria-hidden', 'true');
  header.removeAttribute('aria-hidden');
  main.removeAttribute('aria-hidden');
  footer.removeAttribute('aria-hidden');

  hamburgerMenu.focus();
}

// EVENT LISTENERS

hamburgerMenu.addEventListener('click', app.openModal);
modalExit.addEventListener('click', app.exitModal);