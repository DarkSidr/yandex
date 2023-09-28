import { RootState } from "../..";

export const getDataLoading = (store: RootState) => store.data.isLoading;
export const getDataItems = (store: RootState) => store.data.items;

export const getBurgerConstructorCurrentIngredients = (store: RootState) =>
  store.burgerConstructor.ingredients;
export const getBurgerConstructorCurrentBun = (store: RootState) =>
  store.burgerConstructor.bun;
export const getBurger = (store: RootState) => store.burgerConstructor.burger;
export const getBurgerConstructorBurgerConstructorRequest = (
  store: RootState
) => store.burgerConstructor.burgerConstructorRequest;

export const getTotalPrice = (store: RootState) => store.totalPrice;

export const getOrderNumber = (store: RootState) => store.order.orderNumber;
export const getOrderLoaded = (store: RootState) => store.order.isLoaded;

export const getRegister = (store: RootState) => store.registerReducer;

export const getLogin = (store: RootState) => store.loginReducer;

export const getUpdatePassword = (store: RootState) =>
  store.updatePasswordReducer;

export const getNewPassword = (store: RootState) => store.newPasswordReducer;
