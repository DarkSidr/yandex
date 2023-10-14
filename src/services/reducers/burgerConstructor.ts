import {
  TBurgerConstructor,
  TBurgerConstructorActions,
} from "../../utils/types/burgerConstructorTypes";
import {
  ADD_CURRENT_INGREDIENTS,
  ADD_CURRENT_BUN,
  BURGER,
  DELETE_INGREDIENT,
} from "../actions/burgerConstructor";

const initialState: TBurgerConstructor = {
  bun: null,
  ingredients: [],
  burger: [],
  burgerConstructorRequest: false,
};

export const burgerConstructorReducer = (
  state = initialState,
  action: TBurgerConstructorActions
) => {
  switch (action.type) {
    case ADD_CURRENT_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.ingredients,
        burgerConstructorRequest: false,
      };
    }
    case ADD_CURRENT_BUN: {
      return {
        ...state,
        bun: action.bun,
        burgerConstructorRequest: false,
      };
    }
    case BURGER: {
      return {
        ...state,
        burger: action.burger,
        burgerConstructorRequest: true,
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        ingredients: action.ingredients,
        burgerConstructorRequest: true,
      };
    }
    default: {
      return state;
    }
  }
};
