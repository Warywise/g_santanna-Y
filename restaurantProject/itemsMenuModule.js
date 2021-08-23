import { firstValidation, foodDrinkRegEx, saveMenuOnLocal, addMenuInput, drinkOptions, foodOptions, drinkMenuOptions, foodMenuOptions, optionRemoverInput, asideDrinkMenu, asideFoodMenu } from './restaurantSystem.js';

// Funções responsáveis pela adição de itens ao 'Select' de opções do cardápio
////
function selectedOptionEvent(event) {
  const selected = event.target;
  if (selected.className == 'selected') {
    selected.className = '';
  } else {
    if (selected.parentElement.querySelector('.selected'))
      selected.parentElement.querySelector('.selected').className = '';
    selected.className = 'selected';
  }
}

function addMenuOptions(menuSelector, menuOptions) {
  menuSelector.innerHTML = '';
  const itens = Object.keys(menuOptions).sort();
  itens.forEach((cur) => {
    const selector = document.createElement('li');
    selector.addEventListener('click', selectedOptionEvent);
    selector.innerHTML = cur;
    selector.slot = menuOptions[cur];
    menuSelector.appendChild(selector);
  });
}

function addMenuOptionsButton(inputValue, selector, menu) {
  const validValue = firstValidation(inputValue());
  const newOptions = validValue.match(foodDrinkRegEx);
  newOptions.forEach((value) => {
    if (value.match(/^([\s\-]).+/gi)) value = value.replace(/\-/, '');
    const newOption = value.split('=');
    if (!newOption[0].match(/[^\s|\']+/gi)) return;
    menu[newOption[0].trim()] = +(newOption[1].trim());
  });
  saveMenuOnLocal(false, false);
  addMenuOptions(selector, menu);
}

const textMenuInputValue = () => {
  const value = addMenuInput.value;
  addMenuInput.value = '';
  return value;
}
const drinkButtonEvent = () => {
  addMenuOptionsButton(textMenuInputValue, drinkOptions, drinkMenuOptions);
  asideDrinkMenu();
};
const foodButtonEvent = () => {
  addMenuOptionsButton(textMenuInputValue, foodOptions, foodMenuOptions);
  asideFoodMenu();
}

// Remover itens das opções do cardápio
////
function optionMenuRemover() {
  const itemToRemove = optionRemoverInput.value;
  if (drinkMenuOptions[itemToRemove]) delete drinkMenuOptions[itemToRemove];
  if (foodMenuOptions[itemToRemove]) delete foodMenuOptions[itemToRemove];
  optionRemoverInput.value = '';
  saveMenuOnLocal(false, false);
  asideDrinkMenu();
  asideFoodMenu();
  addMenuOptions(drinkOptions, drinkMenuOptions);
  addMenuOptions(foodOptions, foodMenuOptions);
}

export { addMenuOptions, drinkButtonEvent, foodButtonEvent, optionMenuRemover };
