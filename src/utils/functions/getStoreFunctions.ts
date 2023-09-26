import { TLogin } from "../types/loginTypes";

type TLoginReducer = {
  loginReducer: TLogin;
};

export const getDataLoading = (store: any) => store.data.isLoading;
export const getDataItems = (store: any) => store.data.items;

export const getBurgerConstructorCurrentIngredients = (store: any) =>
  store.burgerConstructor.ingredients;
export const getBurgerConstructorCurrentBun = (store: any) =>
  store.burgerConstructor.bun;
export const getBurger = (store: any) => store.burgerConstructor.burger;
export const getBurgerConstructorBurgerConstructorRequest = (store: any) =>
  store.burgerConstructor.burgerConstructorRequest;

export const getTotalPrice = (store: any) => store.totalPrice;

export const getOrderNumber = (store: any) => store.order.orderNumber;
export const getOrderLoaded = (store: any) => store.order.isLoaded;

export const getCurrentIngredientCurrentItem = (store: any) =>
  store.currentIngredient.currentItem;
export const getCurrentIngredientIsLoaded = (store: any) =>
  store.currentIngredient.isLoaded;

export const getRegister = (store: any) => store.registerReducer;

export const getLogin = (store: TLoginReducer) => store.loginReducer;

export const getUpdatePassword = (store: any) => store.updatePasswordReducer;

export const getNewPassword = (store: any) => store.newPasswordReducer;
