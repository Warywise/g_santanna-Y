import { firstValidation, clientRegEx, foodDrinkRegEx } from './validationModule.js';
import { saveMenuOnLocal } from './localStorageModule.js';
import { addNewClient, clientValue, removeClient, clientSelectValue, clientEvents } from './addClientModule.js';
import { changeAsideDisplay, asideDrinkMenu, asideFoodMenu } from './asideMenuModule.js';
import { addMenuOptions, drinkButtonEvent, foodButtonEvent, optionMenuRemover } from './itemsMenuModule.js';
import { requestedItensCounter, requestRemover, addClientRequest, getBillsBalance } from './clientsControlModule.js';

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

//
////
window.onload = () => {
  clientsSelector.addEventListener('click', updateClientName);
  clientRemover.addEventListener('click', () => removeClient(clientSelectValue()));
  clientAddButton.addEventListener('click', () => addNewClient(clientValue()));

  drinkAddButton.addEventListener('click', drinkButtonEvent);
  foodAddButton.addEventListener('click', foodButtonEvent);

  optionRemoverButton.addEventListener('click', optionMenuRemover);
  drinkOrder.addEventListener('click', () => addClientRequest(drinkOptions));
  foodOrder.addEventListener('click', () => addClientRequest(foodOptions));
  asideRevealButton.addEventListener('click', changeAsideDisplay);

  if (localStorage.getItem('restaurantDrinkMenu')) drinkMenuOptions = saveMenuOnLocal(true, false);
  if (localStorage.getItem('restaurantFoodMenu')) foodMenuOptions =   saveMenuOnLocal(false, true);

  asideDrinkMenu();
  asideFoodMenu();
  addMenuOptions(drinkOptions, drinkMenuOptions);
  addMenuOptions(foodOptions, foodMenuOptions);

  clientsObject['clienteteste'] = {};
  clientEvents('clienteteste');
  updateClientName();
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
  foodDrinkRegEx,
  requestRemover,
  requestedItensCounter,
  getBillsBalance,
  firstValidation,
  saveMenuOnLocal,
  asideDrinkMenu,
  asideFoodMenu,
  removeClient
}
// https://www.devmedia.com.br/desenhando-com-o-mouse-na-canvas-da-html5/27619 
