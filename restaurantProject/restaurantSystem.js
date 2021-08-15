const clientsSelector = document.getElementById('current-clients');
const clientRemover = document.getElementById('remove-client');
const clientAddInput = document.getElementById('add-client-input');
const clientAddButton = document.getElementById('add-client-button');
const clientAddAlert = document.querySelector('.add-client-alert');

const drinkAddInput = document.getElementById('add-drink-input');
const drinkAddButton = document.getElementById('add-drink-button');
const foodAddInput = document.getElementById('add-food-input');
const foodAddButton = document.getElementById('add-food-button');

const currentClientName = document.querySelector('#menu-div p');
const optionsMenu = document.getElementById('menu-divs');
const drinkOptions = document.getElementById('drink-options');
const foodOptions = document.getElementById('food-options');
const drinkOrder = document.getElementById('take-drink-order');
const foodOrder = document.getElementById('take-food-order');
const optionRemoverInput = document.getElementById('option-remover-input');
const optionRemoverButton = document.getElementById('option-remover-button');

const asideRevealButton = document.getElementById('reveal-aside-section');
let hideAside = true;

const secondarySection = document.querySelector('.secondary-section');

const asideSection = document.querySelector('.aside-section');
const negativeCounter = document.getElementById('negative-count');
const positiveCounter = document.getElementById('positive-count');
const drinkSectorMenu = document.getElementById('drink-section-menu');
const foodSectorMenu = document.getElementById('food-section-menu');

let drinkMenuOptions = {
  // 'Agua': 2,
  // 'Coca Lata': 3.5,
  // 'Guaravita': 1.5,
  // 'Todynho': 3,
};

let foodMenuOptions = {
  // 'Coxinha': 2,
  // 'Pastel': 3,
  // 'Joelho': 2.5,
  // 'Croissant': 3.5,
};

const clientsObject = {};

const clientRegEx = (/[^ãôéáíúa-z\s\']+/gi);
const foodDrinkRegEx = (/([\-\,\'\"\s\wãâáêéíõôú]+)(\s+)?\=(\s+)?\d+([\.]?[\d]+)?/gi);

const firstValidation = (string) => {
  let newString = string.replace(/([\w|\s])\.+([\w|\s])/g, '$1,$2');
  return newString.replace(/(\d+)[\,|\.]+(\d+)/g, '$1.$2');
}

//
////
const updateClientName = () => currentClientName.innerHTML = clientsSelector.value;

// 
////
function saveMenuOnLocal(drink, food) {
  if (drink) return JSON.parse(localStorage.getItem('restaurantDrinkMenu'));
  if (food) return JSON.parse(localStorage.getItem('restaurantFoodMenu'));
  localStorage.setItem('restaurantDrinkMenu', JSON.stringify(drinkMenuOptions));
  localStorage.setItem('restaurantFoodMenu', JSON.stringify(foodMenuOptions));
}

// Funções responsáveis pela adição de itens ao 'Select' de opções do cardápio
////
function addMenuOptions(menuSelector, menuOptions) {
  menuSelector.innerHTML = '';
  const itens = Object.keys(menuOptions).sort();
  itens.forEach((cur) => {
    const selector = document.createElement('option');
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

const foodInputValue = () => {
  const value = foodAddInput.value;
  foodAddInput.value = '';
  return value;
}
const drinkInputValue = () => {
  const value = drinkAddInput.value;
  drinkAddInput.value = '';
  return value;
}
const drinkButtonEvent = () => {
  addMenuOptionsButton(drinkInputValue, drinkOptions, drinkMenuOptions);
  asideDrinkMenu();
};
const foodButtonEvent = () => {
  addMenuOptionsButton(foodInputValue, foodOptions, foodMenuOptions);
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

// Revelar e esconder setor lateral de faturamentos e cardápio
////
function changeAsideDisplay() {
  if (hideAside) {
    asideSection.style.opacity = '1';
    hideAside = false;
  } else {
    asideSection.style.opacity = '0';
    hideAside = true;
  }
}

// Remover item de comanda do cliente
////
function requestRemover(clientClass) {
  const negativeCheck = document.getElementById(`${clientClass}-negative-check`);
  const negativePercent = 100 - (document.getElementById(`${clientClass}-negative-input`).value);
  const clientRequests = document.getElementById(`${clientClass}-select`);
  const clientExpenses = document.getElementById(`${clientClass}-input`);
  const itemKey = clientRequests[clientRequests.selectedIndex].value;
  let itemPrice;
  if (drinkMenuOptions[itemKey]) itemPrice = drinkMenuOptions[itemKey];
  if (foodMenuOptions[itemKey]) itemPrice = foodMenuOptions[itemKey];
  if (negativeCheck.checked) {
    const result = +(negativeCounter.slot) + (+(itemPrice) * +(`0.${negativePercent}`));
    negativeCounter.slot = result;
    negativeCounter.innerText = `R$${result.toFixed(2)}`
    negativeCheck.checked = false;
  }
  const clientKey = clientsObject[clientClass];
  const currentItem = clientRequests[clientRequests.selectedIndex];
  currentItem.slot > 1 ?
    currentItem.slot = +(currentItem.slot) - 1 :
    delete clientKey[currentItem.value] && currentItem.remove();
  clientExpenses.value = +(clientExpenses.value) - +(itemPrice);
  requestedItensCounter(clientClass);
}

// // Criar comanda de cliente e adiciona-la à pagina
// ////
const clientArea = (clientName, clientClass) =>
`<label><input type="checkbox" class="client-checks">${clientName}</label>
<div><input class="client-expenses" id="${clientClass}-input" value="0" type="text" disabled>
<button id="${clientClass}-bill-balance" class="client-buttons buttons">Faturar Comanda</button></div>
<div><select id="${clientClass}-select" class="input-areas"></select>
<input class="client-counter" id="${clientClass}-counter" value="0 x" type="text" disabled>
<button id="${clientClass}-item-remover" class="client-buttons buttons">Remover Item</button></div>
<div>Negativar ↦ <input type="text" value="35" id="${clientClass}-negative-input" class="negativate-input" disabled>%
<input type="checkbox" id="${clientClass}-negative-check" class="client-checks"></div>`;

function addNewClient(clientName) {
  if (clientName.match(clientRegEx) || !clientName.match(/[^\s|\']+/gi)) {
    clientAddAlert.style.opacity = '1';
    setTimeout(() => clientAddAlert.style.opacity = '0', 6000);
    return;
  }
  clientAddInput.value = '';

  const clientClass = (clientName).replace(/[\s|\']/g, '').toLowerCase();
  clientsObject[clientClass] = {};

  const clientOption = document.createElement('option');
  clientOption.className = clientClass;
  clientOption.innerHTML = clientName;
  clientsSelector.appendChild(clientOption);

  const div = document.createElement('div');
  div.className = `client-divs ${clientClass}`
  div.innerHTML = clientArea(clientName, clientClass);
  secondarySection.appendChild(div);

  const clientRequests = document.getElementById(`${clientClass}-select`);
  const clientCounter = () => requestedItensCounter(clientClass);
  clientRequests.addEventListener('click', clientCounter);

  const itemRemover = document.getElementById(`${clientClass}-item-remover`);
  const removerItemEvent = () => requestRemover(clientClass);
  itemRemover.addEventListener('click', removerItemEvent);

  const billBalanceButton = document.getElementById(`${clientClass}-bill-balance`);
  const billBalanceEvent = () => getBillsBalance(clientClass);
  billBalanceButton.addEventListener('click', billBalanceEvent);

  updateClientName();
}

const clientValue = () => clientAddInput.value.trim();
const addClientButton = () => addNewClient(clientValue());

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
  const requestedItem = optionsMenu[optionsMenu.selectedIndex].value;
  const requestedPrice = optionsMenu[optionsMenu.selectedIndex].slot;
  if (!clientKey[requestedItem]) {
    clientKey[requestedItem] = true;
    const newRequest = document.createElement('option');
    newRequest.innerHTML = requestedItem;
    newRequest.slot = 1;
    clientRequests.appendChild(newRequest);
  } else {
    const allRequests = document.querySelectorAll(`#${clientClass}-select option`);
    const thisRequest = Array.from(allRequests).filter((item) => item.innerHTML === requestedItem);
    thisRequest[0].slot = +(thisRequest[0].slot) + 1;
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

// Preencher cardápio de setor lateral
////
function fillAsideMenu(menuOption, menuSector) {
  const itens = Object.keys(menuOption).sort();
  itens.forEach((item) => {
    const line = document.createElement('p');
    line.innerHTML = `➢ ${item}: R$${(menuOption[item]).toFixed(2)}`
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
  clientsSelector.addEventListener('click', updateClientName);
  clientRemover.addEventListener('click', clientRemoverButton);
  clientAddButton.addEventListener('click', addClientButton);
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

// https://www.devmedia.com.br/desenhando-com-o-mouse-na-canvas-da-html5/27619 