import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
} from "../../services/actions/user";
import { TRequestUser, TUserError } from "./commonTypes";

export type TUser = {
  data: null | TRequestUser;
  loading: boolean;
} & TUserError;

export type TFetchUserRequestAction = {
  type: typeof FETCH_USER_REQUEST;
};

export type TFetchUserSuccessAction = {
  type: typeof FETCH_USER_SUCCESS;
};

export type TFetchUserFailureAction = {
  type: typeof FETCH_USER_FAILURE;
};

export type TUserActions =
  | TFetchUserRequestAction
  | TFetchUserSuccessAction
  | TFetchUserFailureAction;

export type TUserReducer =
  | TFetchUserRequestAction
  | (TFetchUserSuccessAction & { data: null | TRequestUser })
  | (TFetchUserFailureAction & TUserError);
