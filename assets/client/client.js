'use strict';

function dateChecker(){
  let element = document.getElementById('birth-date').value;
  if(element.length > 9){
    element = element.substring(0, 10);
  }
  let elementArray = element.split('')


  let newElementArray = elementArray.map((elem)=> {
    if (!!+elem || elem === '/') {
      return elem;
    } else {
      return '0';
    }
  })

  if(newElementArray[2] === '/' && newElementArray[5] === '/'){

  } else {
    if((newElementArray[0]) && (newElementArray[0]!=='' || newElementArray[1] !== '')){
      newElementArray[2] = '/';
    }
    if((newElementArray[3] && newElementArray[4]) && (newElementArray[3]!=='' || newElementArray[4] !== '')){
      newElementArray[5] = '/';
    }
  }

  document.getElementById('birth-date').value = newElementArray.join('')
};












