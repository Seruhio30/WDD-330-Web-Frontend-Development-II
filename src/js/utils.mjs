// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString)
  return urlParams.get(param);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = true){
  if(clear){
    parentElement.innerHTML = '';
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}
//funtion copiada de renderListwithTemplate week 3
export function renderWithTemplate(template, parentElement, data, callback = "afterbegin", clear = true){
 
  if (!parentElement) {
    console.error("renderWithTemplate: parentElement is null");
    return;
  }
 parentElement.innerHTML = template;

  if (typeof callback === "function") {
    callback(data);
  }

  
//  parentElement.insertAdjacentHTML("afterbegin", template);
//const fragment = document.createRange().createContextualFragment(template);
   //             parentElement.replaceChildren(fragment);

  //const htmlStrings = data.map(template);
  //parentElement.insertAdjacentHTML(callback, htmlStrings.join(''));
}

// se agrega una funcion llamada loadtemplate week 3 group 17

export async function loadTemplate(path)
{
  const res = await fetch(path);
  const template = await res.text();
  return template;

}

//se agrega otar funcion llamada loadheaderfooter week 3 group 17

export async function loadHeaderFooter () {
  const headerTemplate = await loadTemplate("/partials/header.html");

const headerElement = document.querySelector("#main-header");

  if (headerElement) {
    renderWithTemplate(headerTemplate, headerElement);
  } else {
    console.error("No se encontró el elemento #main-header");
  }
const footerTemplate = await loadTemplate("/partials/footer.html");
const footerElement = document.querySelector("#main-footer");
  if (footerElement) {
    renderWithTemplate(footerTemplate, footerElement);
  } else {
    console.error("No se encontró el elemento #main-footer");
  }
  
}


//funtion updateCartCount 
export function updateCartCount() {
  const cartItems = getLocalStorage('so-cart');
  const itemCount = cartItems ? cartItems.length : 0;
  const countElement = document.querySelector('.cart-count');
  if (countElement) {
    countElement.textContent = itemCount;
  }
}
