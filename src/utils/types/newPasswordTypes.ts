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
  readonly type: typeof NEW_PASSWORD_REQUEST;
};

export type TNewPasswordSuccessAction = {
  readonly type: typeof NEW_PASSWORD_SUCCESS;
};

export type TNewPasswordResetAction = {
  readonly type: typeof NEW_PASSWORD_RESET;
};

export type TNewPasswordFailureAction = {
  readonly type: typeof NEW_PASSWORD_FAILURE;
} & TUserError;

export type TNewPasswordActions =
  | TNewPasswordRequestAction
  | TNewPasswordSuccessAction
  | TNewPasswordResetAction
  | TNewPasswordFailureAction;
