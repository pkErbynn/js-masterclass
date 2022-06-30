'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  return btn.addEventListener('click', openModal)
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


//////////////////////////////////////////////
////////////////// Lecture testing ///////////
//////////////////////////////////////////////

///////////////////////////////////////
// Selecting, Creating, and Deleting Elements

// Selecting elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header'); // most used and preferred...returns NodeList type
// const allSections = document.querySelectorAll('.section'); // and this...returns NodeList type
// console.log(allSections);

// document.getElementById('section--1'); // returns NodeList type type
// const allButtons = document.getElementsByTagName('button'); // returns HTMLCollectionsElement type
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn')); // returns HTMLCollectionsElement type


// Creating and inserting elements
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'We use cookied for improved functionality and analytics.';
// message.innerHTML =
//   'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message); // prepend the child nodes
// header.append(message);
// header.append(message.cloneNode(true));  // since message element is a live element, can only exist at one place, it needs to be clone in order to be visible in multiple places

// header.before(message);  // places element as sibling
// header.after(message);


// Delete elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//     // message.parentElement.removeChild(message);  // old way of removing element
//   });

// ///////////////////////////////////////
// // Styles, Attributes and Classes
  
// // Styles
// message.style.backgroundColor = '#37383d';  // this approach only gets and sets inline styles...backgroundColor needs to be in camelCase
// message.style.width = '120%';

// console.log(message.style.color);
// console.log(message.style.backgroundColor);

// console.log(getComputedStyle(message).color); // gets and set external sheet styles 
// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';  // parseFloat() on only takes the float side of the string..eg '12.4px' to 12.4

// document.documentElement.style.setProperty('--color-primary', 'orangered'); // gets and sets css variables / custom properties at root

// /////// Attributes
// /// Getting and setting standard attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);  // access properties on an image element...same as .src
// console.log(logo.className); // for some reasons, not '.class' but '.className'

// logo.alt = 'Beautiful minimalist logo';

// /// Getting and setting non-standard attributes
// console.log(logo.designer); // doesn't work since not a standard attribute on image element
// console.log(logo.getAttribute('designer')); // another way of getting attributes from elements...works when set manually in html file
// logo.setAttribute('company', 'Bankist'); // can set non-standard attribute

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href); // gets absolute path
// console.log(link.getAttribute('href')); // gets relative path unless absolute from html source already

// /// Data attributes - properties that starts with 'data-' keyword
// console.log(logo.dataset.versionNumber); // data attributes are stored in dataset property...with camelCase


// /////// Classes
// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c');
// logo.classList.contains('c'); // not includes