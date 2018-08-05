'use strict';

const folders = document.getElementById('folders-container');
let lastSelected = '';

const changeState = (element) => {
  element.previousElementSibling.children[0].classList.toggle('triangle-icon');
  while (element) {
    element.classList.toggle('show-sub-folder');
    element = element.nextElementSibling;
  }
};
const highlight = (element) => {
  element.classList.toggle('active');
  lastSelected = element;

};

const unHighlightAll = () => {
  let elements = folders.getElementsByTagName('span');
  elements = Array.prototype.slice.call(elements);
  elements.forEach((item) => {
    item.classList.toggle('active', false);
  });
};

const a = (firstElement, secondElement) => {
  let flag = false;
  firstElement.children[0].classList.toggle('active', true);
  while (firstElement.querySelector('.show-sub-folder')) {
    firstElement = firstElement.querySelector('.show-sub-folder');
    firstElement.children[0].classList.toggle('active', true);
    if (firstElement === secondElement) {
      flag = true;
      break;
    }
  }
  while (!flag) {
    if (firstElement === secondElement) {
      break;
    }
    if (firstElement.nextElementSibling) {
      firstElement = firstElement.nextElementSibling;
      firstElement.children[0].classList.toggle('active', true);
    } else {
      firstElement = firstElement.parentNode;
    }
  }
};
const multiplyHighlight2 = (secondElement, firstElement = lastSelected.parentElement) => {
  if (firstElement.compareDocumentPosition(secondElement) === 4 || firstElement.compareDocumentPosition(secondElement) === 20) {
    a(firstElement, secondElement);
  } else if (firstElement.compareDocumentPosition(secondElement) === 2 || firstElement.compareDocumentPosition(secondElement) === 10) {
    a(secondElement, firstElement);
  }
};

const checkClick = (event) => {
  const target = event.target.closest('.items-container');
  if (target) {
    if (target.tagName === 'SPAN' && event.ctrlKey) {
      highlight(target);
    } else if (target.tagName === 'SPAN' && event.shiftKey && lastSelected !== '') {
      multiplyHighlight2(target.parentElement);
    } else if (!!target && target.tagName === 'SPAN' && target.nextElementSibling !== null) {
      const nextElement = target.nextElementSibling;
      changeState(nextElement);
    }
  } else {
    unHighlightAll();
  }
};

window.onload = () => {
  let elements = folders.getElementsByTagName('div');
  elements = Array.prototype.slice.call(elements);
  elements.forEach((item) => {
    if (item.getElementsByTagName('div').length) {
      const img = document.createElement('img');
      img.setAttribute('src', 'assets/images/triangle-icon.svg');
      img.className = 'icon';
      console.log(item.children[0].children[0]);
      item = item.children[0];
      item.insertBefore(img, item.children[0]);
    }
  });
};

folders.addEventListener('click', checkClick);
