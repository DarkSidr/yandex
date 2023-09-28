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
