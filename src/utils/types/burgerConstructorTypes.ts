import {
  ADD_CURRENT_BUN,
  ADD_CURRENT_INGREDIENTS,
  BURGER,
  DELETE_INGREDIENT,
} from "../../services/actions/burgerConstructor";
import { TItemBurger } from "./commonTypes";

type TBun = {
  readonly bun: null | TItemBurger;
};

type TIngredients = {
  readonly ingredients: [] | TItemBurger[];
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
  readonly type: typeof ADD_CURRENT_INGREDIENTS;
} & TIngredients;

export type TAddCurrentBunAction = {
  readonly type: typeof ADD_CURRENT_BUN;
} & TBun;

export type TBurgerAction = {
  readonly type: typeof BURGER;
} & TBurger;

export type TDeleteIngredientAction = {
  readonly type: typeof DELETE_INGREDIENT;
} & TIngredients;

export type TBurgerConstructorActions =
  | TAddCurrentIngredientsAction
  | TAddCurrentBunAction
  | TBurgerAction
  | TDeleteIngredientAction;
