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
  type: typeof UPDATE_USER_INFO_REQUEST;
};

export type TUpdateUserInfoSuccessAction = {
  type: typeof UPDATE_USER_INFO_SUCCESS;
};

export type TUpdateUserInfoFailureAction = {
  type: typeof UPDATE_USER_INFO_FAILURE;
};

export type TUpdateUserInfoActions =
  | TUpdateUserInfoRequestAction
  | TUpdateUserInfoSuccessAction
  | TUpdateUserInfoFailureAction;

export type TUpdateUserInfoReducer =
  | TUpdateUserInfoRequestAction
  | (TUpdateUserInfoSuccessAction & TUserSuccess)
  | (TUpdateUserInfoFailureAction & TUserError);
