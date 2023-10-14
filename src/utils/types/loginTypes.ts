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
  readonly type: typeof LOGIN_REQUEST;
};

export type TLoginSuccessAction = {
  readonly type: typeof LOGIN_SUCCESS;
} & TUserSuccess;

export type TLoginLogoutAction = {
  readonly type: typeof LOGIN_LOGOUT;
};

export type TLoginFailureAction = {
  type: typeof LOGIN_FAILURE;
} & TUserError;

export type TLoginActions =
  | TLoginRequestAction
  | TLoginSuccessAction
  | TLoginLogoutAction
  | TLoginFailureAction;
