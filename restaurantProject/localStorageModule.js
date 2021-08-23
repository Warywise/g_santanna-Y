import { drinkMenuOptions, foodMenuOptions } from './restaurantSystem.js';

function saveMenuOnLocal(drink, food) {
  if (drink) return JSON.parse(localStorage.getItem('restaurantDrinkMenu'));
  if (food) return JSON.parse(localStorage.getItem('restaurantFoodMenu'));
  localStorage.setItem('restaurantDrinkMenu', JSON.stringify(drinkMenuOptions));
  localStorage.setItem('restaurantFoodMenu', JSON.stringify(foodMenuOptions));
}

export { saveMenuOnLocal };