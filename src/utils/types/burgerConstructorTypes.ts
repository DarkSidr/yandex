import {
  ADD_CURRENT_BUN,
  ADD_CURRENT_INGREDIENTS,
  BURGER,
  DELETE_INGREDIENT,
} from "../../services/actions/burgerConstructor";
import { TItemBurger } from "./commonTypes";

type TBun = {
  bun: null | TItemBurger;
};

type TIngredients = {
  ingredients: [] | TItemBurger[];
};

type TBurger = {
  burger: [] | TItemBurger[];
};

type TBurgerRequest = {
  burgerConstructorRequest: boolean;
};

export type TBurgerConstructor = TBun & TIngredients & TBurger & TBurgerRequest;

export type TBurgerConstructorComponent = {
  onDropHandler: (item: TItemBurger) => void;
};

export type TAddCurrentIngredientsAction = {
  type: typeof ADD_CURRENT_INGREDIENTS;
};

export type TAddCurrentBunAction = {
  type: typeof ADD_CURRENT_BUN;
};

export type TBurgerAction = {
  type: typeof BURGER;
};

export type TDeleteIngredientAction = {
  type: typeof DELETE_INGREDIENT;
};

export type TBurgerConstructorActions =
  | TAddCurrentIngredientsAction
  | TAddCurrentBunAction
  | TBurgerAction
  | TDeleteIngredientAction;

export type TBurgerConstructorReducer =
  | (TAddCurrentIngredientsAction & TIngredients)
  | (TAddCurrentBunAction & TBun)
  | (TBurgerAction & TBurger)
  | (TDeleteIngredientAction & TIngredients);
