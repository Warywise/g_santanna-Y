import { clientRegEx, clientAddAlert, clientAddInput, clientsObject, clientsSelector, secondarySection, updateClientName, requestRemover, requestedItensCounter, getBillsBalance, } from './restaurantSystem.js';
// // Criar comanda de cliente e adiciona-la à pagina
// ////
const clientArea = (clientName, clientClass) =>
`<label>Cliente Teste</label>
<div>
  <input class="client-expenses" id="${clientClass}-input" value="0" type="text" disabled>
  <button id="${clientClass}-bill-balance" class="client-buttons buttons">Faturar Comanda</button>
  <button class="more-info">↙</button>
</div>
<div class="hidden-div">
  <select id="${clientClass}-select" class="input-areas"></select>
  <div>
    <div>
      <input class="client-counter" id="${clientClass}-counter" value="0 x" type="text" disabled>
      <button id="${clientClass}-item-remover" class="client-buttons buttons">Remover Item</button>
    </div>
    <div>
      Negativar ↦ <input type="text" value="35" id="${clientClass}-negative-input" class="negativate-input" disabled>%
      <input type="checkbox" id="${clientClass}-negative-check" class="client-checks">
    </div>
  </div>
</div>`;

const clientEvents = (clientClass) => {
  document.getElementById(`${clientClass}-select`)
    .addEventListener('click', () => requestedItensCounter(clientClass));

  document.getElementById(`${clientClass}-item-remover`)
    .addEventListener('click', () => requestRemover(clientClass));

  document.getElementById(`${clientClass}-bill-balance`)
    .addEventListener('click', () => getBillsBalance(clientClass));
  
  document.querySelector(`.${clientClass} .more-info`)
    .addEventListener('click', (event) => {
      const div = document.querySelector(`.${clientClass} .hidden-div`);
      div.style.display = (div.style.display === 'flex' ? 'none' : 'flex');
      const btnContent = event.target.innerHTML;
      event.target.innerHTML = (btnContent === '↙' ? '↖' : '↙');
    })
};

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

  clientEvents(clientClass);

  updateClientName();
}

const clientValue = () => clientAddInput.value.trim();

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

export { addNewClient, clientValue, removeClient, clientSelectValue, clientEvents };