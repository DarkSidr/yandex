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
  type: typeof LOGOUT_REQUEST;
};

export type TLogoutSuccessAction = {
  type: typeof LOGOUT_SUCCESS;
};
export type TLogoutFailureAction = {
  type: typeof LOGOUT_FAILURE;
};

export type TLogoutActions =
  | TLogoutRequestAction
  | TLogoutSuccessAction
  | TLogoutFailureAction;

export type TLogoutReducer =
  | TLogoutRequestAction
  | TLogoutSuccessAction
  | (TLogoutFailureAction & TUserError);
