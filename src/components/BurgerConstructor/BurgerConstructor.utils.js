import {
  CURRENT_ITEMS_SUCCESS,
  DELETE_ITEM,
} from "../../services/actions/burgerConstructor";

export function countBurgerCost(ingredients) {
  return ingredients.reduce((total, item) => total + item.price, 0);
}

function removeItemFromArray(array, itemToRemove) {
  const index = array.findIndex((item) => item === itemToRemove);
  if (index !== -1) {
    return array.slice(0, index).concat(array.slice(index + 1));
  }
  return array;
}

export function deleteItem(itemToRemove, items) {
  return async function (dispatch) {
    const newArray = removeItemFromArray(items, itemToRemove);
    dispatch({
      type: DELETE_ITEM,
      currentItems: newArray,
    });
  };
}

export function moveCard(dragIndex, hoverIndex, items) {
  return async function (dispatch) {
    const dragCard = items[dragIndex];
    const newCards = [...items];
    newCards.splice(dragIndex, 1);
    newCards.splice(hoverIndex, 0, dragCard);
    dispatch({
      type: CURRENT_ITEMS_SUCCESS,
      currentItems: newCards,
    });
  };
}
