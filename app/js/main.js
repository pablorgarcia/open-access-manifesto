/*
  - Desde el principio, que esté seleccionado el lenguaje actual ene le select option input
  - Olvidar el primer texto del array de traducciones
*/

let matchLang = [];
let newTranslation = availableLangs[0];
let readyToTranslation = false;

// Idioma por defecto
if (navigator.language != 'en') {
  console.log('User has not use English lang');
  // Finding the user language with the locals translations
  matchLang = Object.keys(availableLangs).filter(lang => lang === navigator.language);
  // If find some result, add it to new translation and change the ready status to true
  if (matchLang.length > 0) {
    newTranslation = availableLangs[matchLang];
    readyToTranslation = true;
  } else {
    console.log('Has not found lang for user');
  }
} else {
  console.log('User use English lang by default');
}

// Creating a new P element
const newPElement = (textToInnerHTML, elementFather) => {
  console.log('creating new P element');
  const pEl = document.createElement('p');
  const contentText = document.createTextNode(textToInnerHTML);
  elementFather.appendChild(pEl);
  pEl.appendChild(contentText);
};

// Creating a new Option input element
const newOptionElement = (textToInnerHTML, elementFather, valueToInnerHTML) => {
  console.log('creating new OPTION input element');
  const optionEl = document.createElement('option');
  const contentText = document.createTextNode(textToInnerHTML);
  elementFather.appendChild(optionEl);
  optionEl.appendChild(contentText);
  optionEl.value = valueToInnerHTML;
};

const onSetLang = () => {
  const mainEl = document.getElementsByTagName('main')[0];
  const childCount = mainEl.childElementCount;
  // Removing the P elements from DOM
  for (let i = 0; i < childCount; i++) { mainEl.children[0].remove() }
  // Adding the new P elements on DOM with the correct translation
  for (let i = 0; i < newTranslation.length; i++) { newPElement(newTranslation[i], mainEl) }
  // Changing DOM HTML lang attribute for the user one
  document.getElementsByTagName('html')[0].lang = matchLang;
};

// If we change the language from the select input
const onChangeLang = (newLang) => {
  if(newLang != undefined) {
    newTranslation = availableLangs[newLang];
    onSetLang();
    console.log('lang changed to', newLang)
  }
};

// When DOM is ready
document.addEventListener('DOMContentLoaded', () => {

  if (readyToTranslation) { onSetLang() } 
  else { console.log('Has not found lang for user') }

/*
Creamos las opciones del select con los idiomas disponibles que tengamos
llamamos a una funcion constructora de elementos con la opcion seleccionada
*/
  const selectEl = document.getElementById('selectLanguage');

  for (let i = 0; i < Object.keys(availableLangs).length; i++) {
    newOptionElement(Object.values(availableLangs)[i][0], selectEl, Object.keys(availableLangs)[i]);
  }

});