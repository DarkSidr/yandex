import { ADD_CURRENT_ITEMS, DELETE_ITEM } from "../actions/burgerConstructor";

const initialState = {
  currentItems: [], // ингредиенты в текущем конструкторе бургера
  currentItemsRequest: false,
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CURRENT_ITEMS: {
      return {
        ...state,
        currentItems: action.currentItems,
        currentItemsRequest: true,
      };
    }
    case DELETE_ITEM: {
      return {
        currentItems: action.currentItems,
        currentItemsRequest: true,
      };
    }
    default: {
      return state;
    }
  }
};
