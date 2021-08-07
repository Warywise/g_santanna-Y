const clientsSelector = document.getElementById('current-clients');
const clientRemover = document.getElementById('remove-client');
const clientAddInput = document.getElementById('add-client-input');
const clientAddButton = document.getElementById('add-client-button');

const drinkAddInput = document.getElementById('add-drink-input');
const drinkAddButton = document.getElementById('add-drink-button');
const foodAddInput = document.getElementById('add-food-input');
const foodAddButton = document.getElementById('add-food-button');

const optionsMenu = document.getElementById('menu-divs');
const drinkOptions = document.getElementById('drink-options');
const foodOptions = document.getElementById('food-options');

const secondarySection = document.querySelector('.secondary-section');

const foodValue = () => {
  const value = foodAddInput.value;
  foodAddInput.value = '';
  return value;
}
const drinkValue = () => {
  const value = drinkAddInput.value;
  drinkAddInput.value = '';
  return value;
}

const drinkMenuOptions = {
  'Agua': 2,
  'Coca Lata': 3.5,
  'Guaravita': 1.5,
  'Todynho': 3,
}

const foodMenuOptions = {
  'Coxinha': 2,
  'Pastel': 3,
  'Joelho': 2.5,
  'Croissant': 3.5,
}

function addMenuOptions(menuSelector, menuOptions) {
  menuSelector.innerHTML = '';
  const itens = Object.keys(menuOptions);
  const prices = Object.values(menuOptions);
  itens.forEach((cur, ind) => {
    const selector = document.createElement('option');
    selector.innerHTML = cur;
    selector.slot = prices[ind];
      menuSelector.appendChild(selector);
  });
}

function addMenuOptionsButton(inputValue, selector, menu) {
  const newOption = (inputValue()).split('=');
  menu[newOption[0]] = newOption[1];
  addMenuOptions(selector, menu);
}

const drinkButtonEvent = () => addMenuOptionsButton(drinkValue, drinkOptions, drinkMenuOptions);
const foodButtonEvent = () => addMenuOptionsButton(foodValue, foodOptions, foodMenuOptions);

//
////
window.onload = () => {
  drinkAddButton.addEventListener('click', drinkButtonEvent);
  foodAddButton.addEventListener('click', foodButtonEvent);

  addMenuOptions(drinkOptions, drinkMenuOptions);
  addMenuOptions(foodOptions, foodMenuOptions);
}