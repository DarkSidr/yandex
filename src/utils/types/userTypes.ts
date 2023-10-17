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
  readonly type: typeof FETCH_USER_REQUEST;
};

export type TFetchUserSuccessAction = {
  readonly type: typeof FETCH_USER_SUCCESS;
  data: null | TRequestUser;
};

export type TFetchUserFailureAction = {
  readonly type: typeof FETCH_USER_FAILURE;
} & TUserError;

export type TUserActions =
  | TFetchUserRequestAction
  | TFetchUserSuccessAction
  | TFetchUserFailureAction;
