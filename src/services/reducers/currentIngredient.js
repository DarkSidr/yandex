import {
  GET_CURRENT_ITEM,
  DELETE_CURRENT_ITEM,
} from "../actions/currentIngredient";

const initialState = {
  currentItem: null, // объект текущего просматриваемого ингредиента,
  isLoaded: false,
};

export const currentIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_ITEM: {
      return { ...state, currentItem: action.currentItem, isLoaded: true };
    }
    case DELETE_CURRENT_ITEM: {
      return { currentItem: null, isLoaded: false };
    }
    default: {
      return state;
    }
  }
};
