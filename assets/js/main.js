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
  lastSelected = element.parentNode;

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
  label:
  while (firstElement !== secondElement) {
    while (firstElement.querySelector('.show-sub-folder') && !flag) {
      firstElement = firstElement.querySelector('.show-sub-folder');
      firstElement.children[0].classList.toggle('active', true);
      if (firstElement === secondElement) break label;
    }
    flag = true;
    if (firstElement.nextElementSibling) {
      firstElement = firstElement.nextElementSibling;
      flag = false;
      firstElement.children[0].classList.toggle('active', true);
    } else {
      firstElement = firstElement.parentNode;
    }
  }
};

const multiplyHighlight = (secondElement) => {
  const firstElement = lastSelected;
  const comparePosition = firstElement.compareDocumentPosition(secondElement);
  if (comparePosition === 4 || comparePosition === 20) {
    a(firstElement, secondElement);
  } else if (comparePosition === 2 || comparePosition === 10) {
    a(secondElement, firstElement);
  }
};

const checkClick = (event) => {
  const target = event.target.closest('.items-container');
  if (target) {
    if (!!target && event.ctrlKey) {
      highlight(target);
    } else if (!!target && event.shiftKey && lastSelected !== '') {
      multiplyHighlight(target.parentElement);
    } else if (!!target && target.nextElementSibling !== null) {
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
    if (item.querySelector('div')) {
      const img = document.createElement('img');
      img.setAttribute('src', 'assets/images/triangle-icon.png');
      img.className = 'triangle-icon-size';
      console.log(item.children[0].children[0]);
      item = item.children[0];
      item.insertBefore(img, item.children[0]);
    }
  });
};

folders.addEventListener('click', checkClick);
