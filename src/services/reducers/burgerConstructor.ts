import { TBurgerConstructor } from "../../utils/types/burgerConstructorTypes";
import {
  ADD_CURRENT_INGREDIENTS,
  ADD_CURRENT_BUN,
  BURGER,
  DELETE_INGREDIENT,
} from "../actions/burgerConstructor";

type TAddCurrentIngredients = {
  type: typeof ADD_CURRENT_INGREDIENTS;
} & TBurgerConstructor;

type TAddCurrentBun = {
  type: typeof ADD_CURRENT_BUN;
} & TBurgerConstructor;

type TBurger = {
  type: typeof BURGER;
} & TBurgerConstructor;

type TDeleteIngredient = {
  type: typeof DELETE_INGREDIENT;
} & TBurgerConstructor;

type TAction =
  | TAddCurrentIngredients
  | TAddCurrentBun
  | TBurger
  | TDeleteIngredient;

const initialState: TBurgerConstructor = {
  bun: null,
  ingredients: [],
  burger: [],
  burgerConstructorRequest: false,
};

export const burgerConstructorReducer = (
  state = initialState,
  action: TAction
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
