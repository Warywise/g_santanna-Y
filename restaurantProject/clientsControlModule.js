import { clientsObject, negativeCounter, positiveCounter, removeClient, clientsSelector } from './restaurantSystem.js';

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

// Adicionar pedido de cliente à sua comanda
////
function addClientRequest(optionsMenu) {
  const clientClass = (clientsSelector.value).replace(/[\s|\']/g, '').toLowerCase();
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

// Faturar comanda de cliente e registrar valor gasto
////
function getBillsBalance(clientClass) {
  const clientExpenseValue = document.getElementById(`${clientClass}-input`).value;
  const result = +(positiveCounter.slot) + +(clientExpenseValue);
  positiveCounter.slot = result;
  positiveCounter.innerText = `R$${result.toFixed(2)}`
  removeClient(clientClass);
}

export { requestedItensCounter, requestRemover, addClientRequest, getBillsBalance };