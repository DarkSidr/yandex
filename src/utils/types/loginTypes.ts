import {
  LOGIN_FAILURE,
  LOGIN_LOGOUT,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../../services/actions/login";
import { TUserError, TUserSuccess } from "./commonTypes";

export type TLogin = {
  loading: boolean;
  isAuthenticated: boolean;
} & TUserError &
  TUserSuccess;

export type TLoginForm = {
  email: string;
  password: string;
};

export type TLoginRequestAction = {
  type: typeof LOGIN_REQUEST;
};

export type TLoginSuccessAction = {
  type: typeof LOGIN_SUCCESS;
};

export type TLoginLogoutAction = {
  type: typeof LOGIN_LOGOUT;
};

export type TLoginFailureAction = {
  type: typeof LOGIN_FAILURE;
};

export type TLoginActions =
  | TLoginRequestAction
  | TLoginSuccessAction
  | TLoginLogoutAction
  | TLoginFailureAction;

export type TLoginReducer =
  | TLoginRequestAction
  | (TLoginSuccessAction & TUserSuccess)
  | TLoginLogoutAction
  | (TLoginFailureAction & TUserError);
