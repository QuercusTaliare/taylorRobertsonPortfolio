// THANKS
// The code for the modal functionality is heavily indebted to Noah Blon's codepen for accessible modals. 🙏 
// https://codepen.io/noahblon/pen/yJpXka
// The code for the Vanilla JS Document Ready function is taken from Tobias Ahlin Bjerrome's cheat sheet for jQuery to Vanilla JS conversions
// https://tobiasahlin.com/blog/move-from-jquery-to-vanilla-javascript/#selecting-elements

const app = {};

// VARIABLES *************

// Needed when removing tabindex's from all DOM elements
app.focusableSelectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';


// FUNCTIONS **************

// DOCUMENT READY method 
app.ready = function(callback) {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}

// SELECT FOCUSABLE ELEMENTS method
// returns an array that holds every tab-able element in the DOM
// Called in the Open Modal and Exit Modal methods
app.selectFocusableElements = function() {

  const { focusableSelectors, header, main, footer } = app;

  // Creates three variables that hold nodelists full of every tab-able element on the page (outside the modal)
  const focusableHeaderElements = header.querySelectorAll(focusableSelectors);
  const focusableMainElements = main.querySelectorAll(focusableSelectors);
  const focusableFooterElements = footer.querySelectorAll(focusableSelectors);

  // Creates a variable holding an array of the three previous nodelists
  focusableElements = [...focusableHeaderElements, ...focusableMainElements, ...focusableFooterElements];

  return focusableElements;

}

// OPEN MODAL method
// Makes only the modal tabable when it's open
app.openModal = function(e) {

  const { focusableSelectors, modalNav, header, main, footer } = app;

  modalNav.classList.toggle('inactive');

  // Focuses the first element with a tabindex in the modal
  modalNav.querySelector(focusableSelectors).focus();

  app.selectFocusableElements();

  // Loops through the array, and removes each element's tabindex
  focusableElements.forEach(el => el.setAttribute('tabindex', '-1'));

  // Adds or removes 'aria-hidden' attribute where necessary
  modalNav.removeAttribute('aria-hidden');
  header.setAttribute('aria-hidden', 'true');
  main.setAttribute('aria-hidden', 'true');
  footer.setAttribute('aria-hidden', 'true');
  
} 

// EXIT MODAL method
// Closes the modal and allows the website to be tabable again
app.exitModal = function(e) {

  const { modalNav, header, main, footer, hamburgerMenu } = app;

  modalNav.classList.toggle('inactive');

  app.selectFocusableElements();

  // Removes the -1 tabindex on all focusable elements in DOM
  focusableElements.forEach(el => el.removeAttribute('tabindex'));

  // Adds or removes 'aria-hidden' attribute where necessary
  modalNav.setAttribute('aria-hidden', 'true'); 
  header.removeAttribute('aria-hidden');
  main.removeAttribute('aria-hidden');
  footer.removeAttribute('aria-hidden');

}

// INIT method
app.init = function() {

  // SELECTOR VARIABLES

  app.hamburgerMenu = document.querySelector('.bars');

  app.modalNav = document.querySelector('.modalNav');
  app.modalNavItems = document.querySelectorAll('.modalListItem');
  app.modalExit = document.querySelector('.modalExit');

  app.header = document.querySelector('header');
  app.main = document.querySelector('main');
  app.footer = document.querySelector('footer');

  // EVENT LISTENERS ******************

  app.hamburgerMenu.addEventListener('click', app.openModal);

  app.modalExit.addEventListener('click', app.exitModal);

  app.modalNavItems.forEach(modalNavItem => {
    modalNavItem.addEventListener('click', app.exitModal);
  })

}

// DOCUMENT READY
app.ready(() => { app.init() });

