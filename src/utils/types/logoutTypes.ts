import {
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from "../../services/actions/logout";
import { TUserError } from "./commonTypes";

export type TLogout = {
  loading: boolean;
} & TUserError;

export type TLogoutRequestAction = {
  readonly type: typeof LOGOUT_REQUEST;
};

export type TLogoutSuccessAction = {
  readonly type: typeof LOGOUT_SUCCESS;
};
export type TLogoutFailureAction = {
  readonly type: typeof LOGOUT_FAILURE;
} & TUserError;

export type TLogoutActions =
  | TLogoutRequestAction
  | TLogoutSuccessAction
  | TLogoutFailureAction;
