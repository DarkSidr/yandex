import {
  UPDATE_USER_INFO_FAILURE,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_SUCCESS,
} from "../../services/actions/updateUserInfo";
import { TUserError, TUserSuccess } from "./commonTypes";

export type TUpdateUserInfo = {
  loading: boolean;
  isAuthenticated: boolean;
} & TUserError &
  TUserSuccess;

export type TUpdateUserInfoRequestAction = {
  readonly type: typeof UPDATE_USER_INFO_REQUEST;
};

export type TUpdateUserInfoSuccessAction = {
  readonly type: typeof UPDATE_USER_INFO_SUCCESS;
} & TUserSuccess;

export type TUpdateUserInfoFailureAction = {
  readonly type: typeof UPDATE_USER_INFO_FAILURE;
} & TUserError;

export type TUpdateUserInfoActions =
  | TUpdateUserInfoRequestAction
  | TUpdateUserInfoSuccessAction
  | TUpdateUserInfoFailureAction;
