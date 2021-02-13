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
  const pText = document.createElement('p');
  const contentText = document.createTextNode(textToInnerHTML);
  elementFather.appendChild(pText);
  pText.appendChild(contentText);
};

// When DOM is ready
document.addEventListener('DOMContentLoaded', () => {

  if (readyToTranslation) {
    const mainEl = document.getElementsByTagName('main')[0];
    const childCount = mainEl.childElementCount;
    // Removing the P elements from DOM
    for (let i = 0; i < childCount; i++) { mainEl.children[0].remove(); }
    // Adding the new P elements on DOM with the correct translation
    for (let i = 0; i < newTranslation.length; i++) { newPElement(newTranslation[i], mainEl); }
    // Changing DOM HTML lang attribute for the user one
    document.getElementsByTagName('html')[0].lang = matchLang;
  } else {
    console.log('Has not found lang for user');
  }

/*
Creamos las opciones del select con los idiomas disponibles que tengamos
llamamos a una funcion constructora de elementos con la opcion seleccionada
*/
  const selectEl = document.getElementById('selectLanguage');
  console.log('select input element',selectEl);

});