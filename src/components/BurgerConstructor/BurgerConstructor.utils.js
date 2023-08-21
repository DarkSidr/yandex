import { DELETE_ITEM } from "../../services/actions/burgerConstructor";

export function countBurgerCost(ingredients) {
  return ingredients.reduce((total, item) => total + item.price, 0);
}

export function deleteItem(e, items) {
  return async function (dispatch) {
    const parent = e.target.closest(".constructor-element__row");
    if (parent) {
      const del = parent.querySelector(
        ".constructor-element__text"
      ).textContent;
      const deleteItem = items.find((item) => item.name === del);
      const newArr = items.filter((item) => item !== deleteItem);
      dispatch({
        type: DELETE_ITEM,
        currentItems: newArr,
      });
    }
  };
}
