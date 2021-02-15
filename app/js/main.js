/*
  - Desde el principio, que esté seleccionado el lenguaje actual ene le select option input
*/

let matchLang = [];
let newTranslation = availableLangs.en[1];
let readyToTranslation = false;
let optionSelectDefault = availableLangs.en[0];

// Idioma por defecto
if (navigator.language != 'en') {
  console.log('User has not use English lang');
  // Finding the user language with the locals translations
  matchLang = Object.keys(availableLangs).filter(lang => lang === navigator.language);
  // If find some result, add it to new translation and change the ready status to true
  if (matchLang.length > 0) {
    newTranslation = availableLangs[matchLang][1];
    readyToTranslation = true;
    // Ponemos la OPCION en el idioma del usuario: optionSelectDefault
  } else {
    console.log('Has not found lang for user');
    // Ponemos la OPCION en INGLES por defecto: optionSelectDefault
  }
} else {
  console.log('User use English lang by default');
  // Ponemos la OPCION en INGLES por defecto: optionSelectDefault
}

// Creating a new P element
const newPElement = (textToInnerHTML, elementFather) => {
  const pEl = document.createElement('p');
  const contentText = document.createTextNode(textToInnerHTML);
  elementFather.appendChild(pEl);
  pEl.appendChild(contentText);
};

// Creating a new Option input element
const newOptionElement = (textToInnerHTML, elementFather, valueToInnerHTML) => {
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
    newTranslation = availableLangs[newLang][1];
    onSetLang();
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
  /*
  https://stackoverflow.com/questions/4590311/set-option-selected-attribute-from-dynamic-created-option/4590581
  var country = document.getElementById("country");
  country.options[country.options.selectedIndex].selected = true;
 */

});