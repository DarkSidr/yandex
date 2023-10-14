import { Action } from "redux";
import { TBurgerConstructorActions } from "./burgerConstructorTypes";
import { TDataActions } from "./dataTypes";
import { TLoginActions } from "./loginTypes";
import { TLogoutActions } from "./logoutTypes";
import { TNewPasswordActions } from "./newPasswordTypes";
import { TOrderActions } from "./orderTypes";
import { TRegisterActions } from "./registerTypes";
import { TTotalPriceAction } from "./totalPriceTypes";
import { TUpdatePasswordActions } from "./updatePasswordTypes";
import { TUpdateUserInfoActions } from "./updateUserInfoTypes";
import { TUserActions } from "./userTypes";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { store } from "../../services/reducers";
import { TFeedWebSocketActions } from "./feedWebSocketTypes";
import { TOrdersWebSocketActions } from "./ordersWebSocketTypes";

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions =
  | TBurgerConstructorActions
  | TDataActions
  | TLoginActions
  | TLogoutActions
  | TNewPasswordActions
  | TOrderActions
  | TRegisterActions
  | TTotalPriceAction
  | TUpdatePasswordActions
  | TUpdateUserInfoActions
  | TUserActions
  | TFeedWebSocketActions
  | TOrdersWebSocketActions;

export type AppDispatch = ThunkDispatch<RootState, Action<string>, Action>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
