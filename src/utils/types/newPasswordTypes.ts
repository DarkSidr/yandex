import {
  NEW_PASSWORD_FAILURE,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_RESET,
  NEW_PASSWORD_SUCCESS,
} from "../../services/actions/newPassword";
import { TUserError } from "./commonTypes";

export type TNewPassword = {
  loading: boolean;
  newPassword: null | boolean;
} & TUserError;

export type TNewPasswordRequestAction = {
  type: typeof NEW_PASSWORD_REQUEST;
};

export type TNewPasswordSuccessAction = {
  type: typeof NEW_PASSWORD_SUCCESS;
};

export type TNewPasswordResetAction = {
  type: typeof NEW_PASSWORD_RESET;
};

export type TNewPasswordFailureAction = {
  type: typeof NEW_PASSWORD_FAILURE;
};

export type TNewPasswordActions =
  | TNewPasswordRequestAction
  | TNewPasswordSuccessAction
  | TNewPasswordResetAction
  | TNewPasswordFailureAction;

export type TNewPasswordReducer =
  | TNewPasswordRequestAction
  | TNewPasswordSuccessAction
  | TNewPasswordResetAction
  | (TNewPasswordFailureAction & TUserError);
