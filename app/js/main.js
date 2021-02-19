/*
  - Mostrar los videos en el idioma del usuario, si está disponible
*/

let matchLang = langs.en;
let newTranslation = langs.en[1];
let readyToTranslation = false;
let optionSelectDefault = langs.en[0];

// User default browser language
if (navigator.language != 'en') {
  console.log('User has not use English lang');
  // Finding the user language with the locals translations
  matchLang = Object.keys(langs).filter(lang => lang === navigator.language);
  // If find some result, add it to new translation and change the ready status to true
  if (matchLang.length > 0) {
    newTranslation = langs[matchLang][1];
    optionSelectDefault = Object.keys(langs[matchLang]);
    readyToTranslation = true;
  } else {
    console.log('Has not found lang for user');
  }
} else {
  console.log('User use English lang by default');
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
  if (valueToInnerHTML === matchLang.toString()) { optionEl.selected = true }
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
    matchLang = newLang;
    newTranslation = langs[newLang][1];
    onSetLang();
  }
};

// When DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (readyToTranslation) { onSetLang() } 
  else { console.log('Has not found lang for user') }

  const selectEl = document.getElementById('selectLanguage');
  for (let i = 0; i < Object.keys(langs).length; i++) {
    // Creating the select options with the available languages
    newOptionElement(Object.values(langs)[i][0], selectEl, Object.keys(langs)[i]);
  }
});