import { TNewPassword } from "../../utils/types/newPasswordTypes";
import {
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_RESET,
  NEW_PASSWORD_FAILURE,
} from "../actions/newPassword";

type TNewPasswordRequest = {
  type: typeof NEW_PASSWORD_REQUEST;
} & TNewPassword;

type TNewPasswordSuccess = {
  type: typeof NEW_PASSWORD_SUCCESS;
} & TNewPassword;

type TNewPasswordReset = {
  type: typeof NEW_PASSWORD_RESET;
} & TNewPassword;

type TNewPasswordFailure = {
  type: typeof NEW_PASSWORD_FAILURE;
} & TNewPassword;

type TAction =
  | TNewPasswordRequest
  | TNewPasswordSuccess
  | TNewPasswordReset
  | TNewPasswordFailure;

const initialState: TNewPassword = {
  loading: false,
  error: null,
  newPassword: null,
};

export const newPasswordReducer = (state = initialState, action: TAction) => {
  switch (action.type) {
    case NEW_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        newPassword: true,
      };
    case NEW_PASSWORD_RESET:
      return {
        ...state,
        loading: false,
        newPassword: null,
      };
    case NEW_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
