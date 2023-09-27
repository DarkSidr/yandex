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

export type TBurgerConstructorBunReducer = {
  burgerConstructor: TBun;
};

export type TBurgerConstructorIngredientsReducer = {
  burgerConstructor: TIngredients;
};

export type TBurgerConstructorBurgerReducer = {
  burgerConstructor: TBurger;
};

export type TBurgerConstructorRequestReducer = {
  burgerConstructor: TBurgerRequest;
};
