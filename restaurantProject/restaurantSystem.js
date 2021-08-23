import { firstValidation, clientRegEx, foodDrinkRegEx } from './validationModule.js';
import { saveMenuOnLocal } from './localStorageModule.js';
import { addNewClient, clientValue } from './addClientModule.js';
import { changeAsideDisplay, asideDrinkMenu, asideFoodMenu } from './asideMenuModule.js';

const clientsSelector = document.getElementById('current-clients');
const clientRemover = document.getElementById('remove-client');
const clientAddInput = document.getElementById('add-client-input');
const clientAddButton = document.getElementById('add-client-button');
const clientAddAlert = document.querySelector('.add-client-alert');

const addMenuInput = document.getElementById('add-menu-input');
const drinkAddButton = document.getElementById('add-drink-button');
const foodAddButton = document.getElementById('add-food-button');

const currentClientName = document.querySelector('#menu-div p');
const drinkOptions = document.getElementById('drink-options');
const foodOptions = document.getElementById('food-options');
const drinkOrder = document.getElementById('take-drink-order');
const foodOrder = document.getElementById('take-food-order');
const optionRemoverInput = document.getElementById('option-remover-input');
const optionRemoverButton = document.getElementById('option-remover-button');

const asideRevealButton = document.getElementById('reveal-aside-section');

const secondarySection = document.querySelector('.secondary-section');

const asideSection = document.querySelector('.aside-section');
const negativeCounter = document.getElementById('negative-count');
const positiveCounter = document.getElementById('positive-count');
const drinkSectorMenu = document.getElementById('drink-section-menu');
const foodSectorMenu = document.getElementById('food-section-menu');

let drinkMenuOptions = {};

let foodMenuOptions = {};

const clientsObject = {};

//
////
const updateClientName = () => currentClientName.innerHTML = clientsSelector.value;

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

// Remover item de comanda do cliente
////
function requestRemover(clientClass) {
  const negativeCheck = document.getElementById(`${clientClass}-negative-check`);
  const negativePercent = 100 - (document.getElementById(`${clientClass}-negative-input`).value);
  const clientRequests = document.getElementById(`${clientClass}-select`);
  const clientExpenses = document.getElementById(`${clientClass}-input`);
  const currentItem = clientRequests[clientRequests.selectedIndex];
  const itemKey = currentItem.value;
  const clientKey = clientsObject[clientClass];
  const itemPrice = clientKey[itemKey];

  if (negativeCheck.checked) {
    const result = +(negativeCounter.slot) + (+(itemPrice) * +(`0.${negativePercent}`));
    negativeCounter.slot = result;
    negativeCounter.innerText = `R$${result.toFixed(2)}`
    negativeCheck.checked = false;
  }
  currentItem.slot > 1 ?
    currentItem.slot = +(currentItem.slot) - 1 :
    delete clientKey[currentItem.value] && currentItem.remove();
  clientExpenses.value = +(clientExpenses.value) - +(itemPrice);
  requestedItensCounter(clientClass);
}

// Remover cliente e apagar comanda
////
function removeClient(clientName) {
  const clientClass = (clientName).replace(/[\s|\']/g, '').toLowerCase();
  delete clientsObject[clientClass];
  const clientElements = document.querySelectorAll(`.${clientClass}`);
  clientElements.forEach((cur) => cur.remove());
  updateClientName();
}
const clientSelectValue = () => clientsSelector.value;
const clientRemoverButton = () => removeClient(clientSelectValue());

// Adicionar pedido de cliente à sua comanda
////
function addClientRequest(optionsMenu) {
  const clientClass = clientSelectValue().replace(/[\s|\']/g, '').toLowerCase();
  const clientKey = clientsObject[clientClass];
  const clientRequests = document.getElementById(`${clientClass}-select`);
  const clientExpenses = document.getElementById(`${clientClass}-input`);
  const requestedItem = optionsMenu.querySelector('.selected').innerText;
  const requestedPrice = optionsMenu.querySelector('.selected').slot;
  if (!clientKey[requestedItem]) {
    clientKey[requestedItem] = +(requestedPrice);
    const newRequest = document.createElement('option');
    newRequest.innerHTML = requestedItem;
    newRequest.slot = 1;
    clientRequests.appendChild(newRequest);
  } else {
    const thisRequest = Array.from(document.querySelectorAll(`#${clientClass}-select option`))
      .find((item) => item.innerHTML === requestedItem);
    thisRequest.slot = +(thisRequest.slot) + 1;
  }
  requestedItensCounter(clientClass);
  clientExpenses.value = (+(clientExpenses.value) + +(requestedPrice)).toFixed(2);
}

const drinkClientRequestEvent = () => addClientRequest(drinkOptions);
const foodClientRequestEvent = () => addClientRequest(foodOptions);

// Contador de itens pedidos por clientes
///
function requestedItensCounter(clientClass) {
  const counter = document.getElementById(`${clientClass}-counter`);
  const clientRequests = document.getElementById(`${clientClass}-select`);
  if (clientRequests.selectedIndex >= 0) {
    counter.value = `${clientRequests[clientRequests.selectedIndex].slot} x`;
  } else {
    counter.value = `0 x`
  }
}

// Faturar comanda de cliente e registrar valor gasto
////
function getBillsBalance(clientClass) {
  const clientExpenseValue = document.getElementById(`${clientClass}-input`).value;
  const result = +(positiveCounter.slot) + +(clientExpenseValue);
  positiveCounter.slot = result;
  positiveCounter.innerText = `R$${result.toFixed(2)}`
  removeClient(clientClass);
}

//
////
window.onload = () => {
  clientsSelector.addEventListener('click', updateClientName);
  clientRemover.addEventListener('click', clientRemoverButton);
  clientAddButton.addEventListener('click', () => addNewClient(clientValue()));

  drinkAddButton.addEventListener('click', drinkButtonEvent);
  foodAddButton.addEventListener('click', foodButtonEvent);

  optionRemoverButton.addEventListener('click', optionMenuRemover);
  drinkOrder.addEventListener('click', drinkClientRequestEvent);
  foodOrder.addEventListener('click', foodClientRequestEvent);
  asideRevealButton.addEventListener('click', changeAsideDisplay);

  if (localStorage.getItem('restaurantDrinkMenu')) drinkMenuOptions = saveMenuOnLocal(true, false);
  if (localStorage.getItem('restaurantFoodMenu')) foodMenuOptions =   saveMenuOnLocal(false, true);

  asideDrinkMenu();
  asideFoodMenu();
  addMenuOptions(drinkOptions, drinkMenuOptions);
  addMenuOptions(foodOptions, foodMenuOptions);
}

export {
  clientsSelector,
  clientRemover,
  clientAddInput,
  clientAddButton,
  clientAddAlert,
  addMenuInput,
  drinkAddButton,
  foodAddButton,
  currentClientName,
  drinkOptions,
  foodOptions,
  drinkOrder,
  foodOrder,
  optionRemoverInput,
  optionRemoverButton,
  asideRevealButton,
  secondarySection,
  asideSection,
  negativeCounter,
  positiveCounter,
  drinkSectorMenu,
  foodSectorMenu,
  drinkMenuOptions,
  foodMenuOptions,
  clientsObject,
  updateClientName,
  clientRegEx,
  requestRemover,
  requestedItensCounter,
  getBillsBalance,
}
// https://www.devmedia.com.br/desenhando-com-o-mouse-na-canvas-da-html5/27619 
