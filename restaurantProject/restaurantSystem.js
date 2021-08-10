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
const drinkOrder = document.getElementById('take-drink-order');
const foodOrder = document.getElementById('take-food-order');

const asideRevealButton = document.getElementById('reveal-aside-section');
let hideAside = true;

const secondarySection = document.querySelector('.secondary-section');

const asideSection = document.querySelector('.aside-section');
const negativeCounter = document.getElementById('negative-count');
const positiveCounter = document.getElementById('positive-count');
const drinkSectorMenu = document.getElementById('drink-section-menu');
const foodSectorMenu = document.getElementById('food-section-menu');

const drinkMenuOptions = {
  'Agua': 2,
  'Coca Lata': 3.5,
  'Guaravita': 1.5,
  'Todynho': 3,
}
const currentDrinkMenu = () => drinkMenuOptions;
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
  menu[newOption[0]] = +(newOption[1]);
  addMenuOptions(selector, menu);
}

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
const drinkButtonEvent = () => {
  addMenuOptionsButton(drinkValue, drinkOptions, drinkMenuOptions);
  asideDrinkMenu();
};
const foodButtonEvent = () => {
  addMenuOptionsButton(foodValue, foodOptions, foodMenuOptions);
  asideFoodMenu();
}
//
////
function changeAsideDisplay() {
  if (hideAside) {
    asideSection.style.margin = '10px';
    hideAside = false;
  } else {
    asideSection.style.margin = '10px -40%';
    hideAside = true;
  }
}

//
////
function requestRemover(clientClass) {
  const clientResquests = document.getElementById(`${clientClass}-select`);
  const clientExpenses = document.getElementById(`${clientClass}-input`);
  const itemPrice = clientResquests[clientResquests.selectedIndex].slot;
  clientExpenses.value = +(clientExpenses.value) - +(itemPrice);
  clientResquests[clientResquests.selectedIndex].remove();
}

//
////
function addNewClient(clientName) {
  const clientClass = (clientName).replace(/\s/g, '').toLowerCase();
  const clientOption = document.createElement('option');
  clientOption.className = clientClass;
  clientOption.innerHTML = clientName;
  clientsSelector.appendChild(clientOption);
  const div = document.createElement('div');
  div.className = `client-divs ${clientClass}`
  div.innerHTML = `<label class="client-check"><input type="checkbox">${clientName}</label>
  <select id="${clientClass}-select" class="input-areas"></select>
  <button class="client-buttons buttons">Remover Item</button>
  <input class="client-expenses" id="${clientClass}-input" value="0" type="text" disabled>
  <button id="${clientClass}-bill-balance" class="client-buttons buttons">Faturar Comanda</button>`;
  secondarySection.appendChild(div);
  const itemRemover = document.getElementById(`${clientClass}-select`).nextElementSibling;
  const removerItemEvent = () => requestRemover(clientClass);
  itemRemover.addEventListener('click', removerItemEvent);
  const billBalanceButton = document.getElementById(`${clientClass}-bill-balance`);
  const billBalanceEvent = () => getBillsBalance(clientClass);
  billBalanceButton.addEventListener('click', billBalanceEvent);
}

const clientValue = () => {
  const value = clientAddInput.value;
  clientAddInput.value = '';
  return value;
}
const addClientButton = () => addNewClient(clientValue());

//
////
function removeClient(clientName) {
  const clientClass = (clientName).replace(/\s/g, '').toLowerCase();
  const clientElements = document.querySelectorAll(`.${clientClass}`);
  clientElements.forEach((cur) => cur.remove());
}
const clientSelectValue = () => clientsSelector.value;
const clientRemoverButton = () => removeClient(clientSelectValue());

//
////
function addClientRequest(optionsMenu) {
  const newRequest = document.createElement('option');
  const clientClass = clientSelectValue().replace(/\s/g, '').toLowerCase();
  const clientResquests = document.getElementById(`${clientClass}-select`);
  const clientExpenses = document.getElementById(`${clientClass}-input`);
  const requestedItem = optionsMenu[optionsMenu.selectedIndex].value;
  const requestedPrice = optionsMenu[optionsMenu.selectedIndex].slot;
  newRequest.innerHTML = requestedItem;
  newRequest.slot = requestedPrice;
  clientExpenses.value = +(clientExpenses.value) + +(requestedPrice);
  clientResquests.appendChild(newRequest);
}

const drinkClientRequestEvent = () => addClientRequest(drinkOptions);
const foodClientRequestEvent = () => addClientRequest(foodOptions);

//
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
function fillAsideMenu(menuOption, menuSector) {
  const itens = Object.keys(menuOption);
  const prices = Object.values(menuOption);
  itens.forEach((item, ind) => {
    const line = document.createElement('p');
    line.innerHTML = `➢ ${item}: R$${(prices[ind]).toFixed(2)}`
    menuSector.appendChild(line);
  });
}

const asideDrinkMenu = () => {
  drinkSectorMenu.innerHTML = '<div>Bebidas ↙</div><br>'
  fillAsideMenu(drinkMenuOptions, drinkSectorMenu);
}
const asideFoodMenu = () => {
  foodSectorMenu.innerHTML = '<div>↘ Comestíveis</div><br>'
  fillAsideMenu(foodMenuOptions, foodSectorMenu);
}

//
////
window.onload = () => {
  clientRemover.addEventListener('click', clientRemoverButton);
  clientAddButton.addEventListener('click', addClientButton);
  drinkAddButton.addEventListener('click', drinkButtonEvent);
  foodAddButton.addEventListener('click', foodButtonEvent);
  drinkOrder.addEventListener('click', drinkClientRequestEvent);
  foodOrder.addEventListener('click', foodClientRequestEvent);
  asideRevealButton.addEventListener('click', changeAsideDisplay);

  asideDrinkMenu();
  asideFoodMenu();
  addMenuOptions(drinkOptions, drinkMenuOptions);
  addMenuOptions(foodOptions, foodMenuOptions);
}



// https://www.devmedia.com.br/desenhando-com-o-mouse-na-canvas-da-html5/27619 