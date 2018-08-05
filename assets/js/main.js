'use strict';

function componentToHex(c) {
  let hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(+r) + componentToHex(+g) + componentToHex(+b);
}

const folders = document.getElementById('folders-container');
let lastSelected;

const checkFolderState = (state) => (
  state === 'block'
);

const changeState = (state, element, triangleIconState) => {
  element.parentNode.children[0].style.webkitTransform = `rotate(${triangleIconState}deg)`;
  element.parentNode.children[0].style.transform = `rotate(${triangleIconState}deg)`;
  while(element){
    element.style.display = state;
    element = element.nextElementSibling;
  }
};

const highlight = (element) => {
  let colorString = element.style.color;
  let colorArr = colorString.substring(colorString.indexOf('(') + 1, colorString.indexOf(')')).split(', ');
  //let color = colorArr.length === 1 ? '' :  rgbToHex(...colorArr);
  //let color = colorArr.length === 1 ? '' :  colorString;
  let color = colorString.length === 0 ? '' :  colorString;
  let checked = (color === 'red');
  if (checked){
    element.style.color = '';
  }
  else {
    element.style.color = 'red';
    lastSelected = element;
  }
};

const unHighlightAll = () => {
  let elements = folders.getElementsByTagName('div');
  elements = Array.prototype.slice.call(elements);
  elements.forEach(item=> item.style.color = '')
}

const nodesToParent = (target, parent) => {
  let count = 0;
  while (target !== parent){
    count++;
    target = target.parentNode;
  }
  return count;
}

const checkOrder = (e1, e2) => {
  if(e1.parentNode === e2.parentNode){
    let nodes  = e1.parentNode.childNodes;
    nodes = Array.prototype.slice.call(nodes);
    return (nodes.indexOf(e1) < nodes.indexOf(e2));
  }
  else {
    let parent = document.getElementById('folders-container');
    let c1 = nodesToParent(e1, parent);
    let c2 = nodesToParent(e2, parent);
    if(c1 < c2){
      while (e1.parentNode !== e2.parentNode){
        e2 = e2.parentNode;
      }
    } else {
      while (e1.parentNode !== e2.parentNode){
        e1 = e1.parentNode;
      }
    }
    let nodes = e1.parentNode.childNodes;
    nodes = Array.prototype.slice.call(nodes);
    return (nodes.indexOf(e1) < nodes.indexOf(e2));
  }
};

const multiplyHighlight = (secondElement, firstElement = lastSelected) => {
  if (checkOrder(firstElement, secondElement)){
    do {
      if (firstElement.nextElementSibling) {
        firstElement = firstElement.nextElementSibling;
        firstElement.style.color = 'red';
      } else {
        firstElement = firstElement.parentElement;
      }
    } while (secondElement !== firstElement);
  } else {
    let temp = firstElement;
    firstElement = secondElement;
    secondElement = temp;
    do {
      if (secondElement.previousElementSibling) {
        secondElement = secondElement.previousElementSibling;
        secondElement.style.color = 'red';
      } else {
        secondElement = secondElement.parentElement;
      }
    } while (secondElement !== firstElement);
  }

};

window.onload = ()=>{
  let elements = folders.getElementsByTagName('div');
  elements = Array.prototype.slice.call(elements);
  elements.forEach((item)=>{
    if(item.getElementsByTagName('div').length){
      let img = document.createElement('img');
      img.setAttribute('src', 'assets/images/triangle-icon.svg');
      img.className = 'icon';
      item.insertBefore(img, item.children[0]);
    }
  })
}

folders.addEventListener('click', (event) => {
  let target = event.target;
  if (target.tagName === 'SPAN' && event.ctrlKey) {
    highlight(target.parentElement);
  }
  else if(target.tagName === 'SPAN' && event.shiftKey) {
    multiplyHighlight(target.parentElement)
  }
  else if (target.tagName === 'SPAN' && target.nextElementSibling !== null){
    let nextElement = target.nextElementSibling;
    if(checkFolderState(nextElement.style.display)){
      changeState('none', nextElement, 0);
    } else {
      changeState('block', nextElement, 90);
    }
  } else {
    unHighlightAll();
  }
});