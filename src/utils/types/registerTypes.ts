import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_RESET,
  REGISTER_SUCCESS,
} from "../../services/actions/register";
import { TUserError } from "./commonTypes";

type TUser = {
  email: string;
  name: string;
};

export type TUserResponse = {
  success: boolean;
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

export type TRegister = {
  user: null | TUserResponse;
  loading: boolean;
  isRegistered: boolean;
} & TUserError;

export type TRegisterRequestAction = {
  type: typeof REGISTER_REQUEST;
};

export type TRegisterSuccessAction = {
  type: typeof REGISTER_SUCCESS;
};

export type TRegisterResetAction = {
  type: typeof REGISTER_RESET;
};

export type TRegisterFailureAction = {
  type: typeof REGISTER_FAILURE;
};

export type TRegisterActions =
  | TRegisterRequestAction
  | TRegisterSuccessAction
  | TRegisterResetAction
  | TRegisterFailureAction;

export type TRegisterReducer =
  | TRegisterRequestAction
  | (TRegisterSuccessAction & { user: null | TUserResponse })
  | TRegisterResetAction
  | (TRegisterFailureAction & TUserError);
