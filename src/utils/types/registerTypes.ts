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
  readonly type: typeof REGISTER_REQUEST;
};

export type TRegisterSuccessAction = {
  readonly type: typeof REGISTER_SUCCESS;
  user: null | TUserResponse;
};

export type TRegisterResetAction = {
  readonly type: typeof REGISTER_RESET;
};

export type TRegisterFailureAction = {
  readonly type: typeof REGISTER_FAILURE;
} & TUserError;

export type TRegisterActions =
  | TRegisterRequestAction
  | TRegisterSuccessAction
  | TRegisterResetAction
  | TRegisterFailureAction;
