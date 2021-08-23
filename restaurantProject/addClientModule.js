import { clientRegEx, clientAddAlert, clientAddInput, clientsObject, clientsSelector, secondarySection, updateClientName, requestRemover, requestedItensCounter, getBillsBalance, } from './restaurantSystem.js';
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
  clientRequests.addEventListener('click', () => requestedItensCounter(clientClass));

  const itemRemover = document.getElementById(`${clientClass}-item-remover`);
  itemRemover.addEventListener('click', () => requestRemover(clientClass));

  const billBalanceButton = document.getElementById(`${clientClass}-bill-balance`);
  billBalanceButton.addEventListener('click', () => getBillsBalance(clientClass));

  updateClientName();
}

const clientValue = () => clientAddInput.value.trim();
// const addClientButton = () => addNewClient(clientValue());

export { addNewClient, clientValue };