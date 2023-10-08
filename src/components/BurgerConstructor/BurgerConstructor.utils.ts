import {
  ADD_CURRENT_INGREDIENTS,
  DELETE_INGREDIENT,
} from "../../services/actions/burgerConstructor";
import { AppDispatch } from "../../utils/types";
import { TItemBurger } from "../../utils/types/commonTypes";

export function countBurgerCost(ingredients: TItemBurger[]) {
  return ingredients.reduce((total, item) => total + item.price, 0);
}

function removeItemFromArray(array: TItemBurger[], itemToRemove: TItemBurger) {
  const index = array.findIndex((item: TItemBurger) => item === itemToRemove);
  if (index !== -1) {
    return array.slice(0, index).concat(array.slice(index + 1));
  }
  return array;
}

export function deleteItem(itemToRemove: TItemBurger, items: TItemBurger[]) {
  return async function (dispatch: AppDispatch) {
    const newArray = removeItemFromArray(items, itemToRemove);
    dispatch({
      type: DELETE_INGREDIENT,
      ingredients: newArray,
    });
  };
}

export function moveCard(
  dragIndex: number,
  hoverIndex: number,
  items: TItemBurger[]
) {
  return async function (dispatch: AppDispatch) {
    const dragCard = items[dragIndex];
    const newCards = [...items];
    newCards.splice(dragIndex, 1);
    newCards.splice(hoverIndex, 0, dragCard);
    dispatch({
      type: ADD_CURRENT_INGREDIENTS,
      ingredients: newCards,
    });
  };
}
