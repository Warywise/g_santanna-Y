
import { asideSection, drinkSectorMenu, drinkMenuOptions, foodSectorMenu, foodMenuOptions } from './restaurantSystem.js';

let hideAside = true;
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

export { changeAsideDisplay, asideDrinkMenu, asideFoodMenu };