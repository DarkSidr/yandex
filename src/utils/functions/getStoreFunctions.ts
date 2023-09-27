import { TDataItemsReducer, TDataLoadingReducer } from "../types/dataTypes";

import {
  TBurgerConstructorBunReducer,
  TBurgerConstructorBurgerReducer,
  TBurgerConstructorIngredientsReducer,
  TBurgerConstructorRequestReducer,
} from "../types/burgerConstructorTypes";

import { TTotalPriceReducer } from "../types/totalPriceTypes";

import { TOrderLoadedReducer, TOrderNumberReducer } from "../types/orderTypes";

import { TRegisterReducer } from "../types/registerTypes";

import { TLoginReducer } from "../types/loginTypes";

import { TUpdatePasswordReducer } from "../types/updatePasswordTypes";

import { TNewPasswordReducer } from "../types/newPasswordTypes";

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

export const getRegister = (store: any) => store.registerReducer;

export const getLogin = (store: any) => store.loginReducer;

export const getUpdatePassword = (store: any) => store.updatePasswordReducer;

export const getNewPassword = (store: any) => store.newPasswordReducer;
