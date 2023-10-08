import {
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_SUCCESS,
} from "../../services/actions/updatePassword";
import { TUserError } from "./commonTypes";

export type TUpdatePassword = {
  loading: boolean;
  updatePassword: null | boolean;
} & TUserError;

export type TUpdatePasswordRequestAction = {
  type: typeof UPDATE_PASSWORD_REQUEST;
};

export type TUpdatePasswordSuccessAction = {
  type: typeof UPDATE_PASSWORD_SUCCESS;
};

export type TUpdatePasswordResetAction = {
  type: typeof UPDATE_PASSWORD_RESET;
};

export type TUpdatePasswordFailureAction = {
  type: typeof UPDATE_PASSWORD_FAILURE;
};

export type TUpdatePasswordActions =
  | TUpdatePasswordRequestAction
  | TUpdatePasswordSuccessAction
  | TUpdatePasswordResetAction
  | TUpdatePasswordFailureAction;

export type TUpdatePasswordReducer =
  | TUpdatePasswordRequestAction
  | TUpdatePasswordSuccessAction
  | TUpdatePasswordResetAction
  | (TUpdatePasswordFailureAction & TUserError);
