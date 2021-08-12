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
  const newOptions = (inputValue()).split('/');
  newOptions.forEach((values) => {
    const newOption = values.split('=');
    menu[newOption[0]] = +(newOption[1]);
  });
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

//
////
function optionMenuRemover() {
  const itemToRemove = optionRemoverInput.value;
  if (drinkMenuOptions[itemToRemove]) delete drinkMenuOptions[itemToRemove];
  if (foodMenuOptions[itemToRemove]) delete foodMenuOptions[itemToRemove];
  optionRemoverInput.value = '';
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
  const clientResquests = document.getElementById(`${clientClass}-select`);
  const clientExpenses = document.getElementById(`${clientClass}-input`);
  const itemPrice = clientResquests[clientResquests.selectedIndex].slot;
  if (negativeCheck.checked) {
    const result = +(negativeCounter.slot) + +(itemPrice) * +(`0.${negativePercent}`);
    negativeCounter.slot = result;
    negativeCounter.innerText = `R$${result.toFixed(2)}`
    negativeCheck.checked = false;
  }
  clientExpenses.value = +(clientExpenses.value) - +(itemPrice);
  clientResquests[clientResquests.selectedIndex].remove();
}

// Criar comanda de cliente e adiciona-la à pagina
////
const clientArea = (clientName, clientClass) =>
`<label><input type="checkbox" class="client-checks">${clientName}</label>
<div><input class="client-expenses" id="${clientClass}-input" value="0" type="text" disabled>
<button id="${clientClass}-bill-balance" class="client-buttons buttons">Faturar Comanda</button></div>
<div><select id="${clientClass}-select" class="input-areas"></select>
<button class="client-buttons buttons">Remover Item</button></div>
<div>Negativar ↦ <input type="text" value="35" id="${clientClass}-negative-input" class="negativate-input" disabled>%
<input type="checkbox" id="${clientClass}-negative-check" class="client-checks"></div>`;

function addNewClient(clientName) {
  const clientClass = (clientName).replace(/\s/g, '').toLowerCase();

  const clientOption = document.createElement('option');
  clientOption.className = clientClass;
  clientOption.innerHTML = clientName;
  clientsSelector.appendChild(clientOption);

  const div = document.createElement('div');
  div.className = `client-divs ${clientClass}`
  div.innerHTML = clientArea(clientName, clientClass);
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

// Remover cliente e apagar comanda
////
function removeClient(clientName) {
  const clientClass = (clientName).replace(/\s/g, '').toLowerCase();
  const clientElements = document.querySelectorAll(`.${clientClass}`);
  clientElements.forEach((cur) => cur.remove());
}
const clientSelectValue = () => clientsSelector.value;
const clientRemoverButton = () => removeClient(clientSelectValue());

// Adicionar pedido de cliente à sua comanda
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
  clientExpenses.value = (+(clientExpenses.value) + +(requestedPrice)).toFixed(2);
  clientResquests.appendChild(newRequest);
}

const drinkClientRequestEvent = () => addClientRequest(drinkOptions);
const foodClientRequestEvent = () => addClientRequest(foodOptions);

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
  clientRemover.addEventListener('click', clientRemoverButton);
  clientAddButton.addEventListener('click', addClientButton);
  drinkAddButton.addEventListener('click', drinkButtonEvent);
  foodAddButton.addEventListener('click', foodButtonEvent);
  optionRemoverButton.addEventListener('click', optionMenuRemover);
  drinkOrder.addEventListener('click', drinkClientRequestEvent);
  foodOrder.addEventListener('click', foodClientRequestEvent);
  asideRevealButton.addEventListener('click', changeAsideDisplay);

  asideDrinkMenu();
  asideFoodMenu();
  addMenuOptions(drinkOptions, drinkMenuOptions);
  addMenuOptions(foodOptions, foodMenuOptions);
}

// https://www.devmedia.com.br/desenhando-com-o-mouse-na-canvas-da-html5/27619 