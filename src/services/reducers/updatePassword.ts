import { TUpdatePassword } from "../../utils/types/updatePasswordTypes";
import {
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_FAILURE,
} from "../actions/updatePassword";

type TUpdatePasswordRequest = {
  type: typeof UPDATE_PASSWORD_REQUEST;
} & TUpdatePassword;

type TUpdatePasswordSuccess = {
  type: typeof UPDATE_PASSWORD_SUCCESS;
} & TUpdatePassword;

type TUpdatePasswordReset = {
  type: typeof UPDATE_PASSWORD_RESET;
} & TUpdatePassword;

type TUpdatePasswordFailure = {
  type: typeof UPDATE_PASSWORD_FAILURE;
} & TUpdatePassword;

type TAction =
  | TUpdatePasswordRequest
  | TUpdatePasswordSuccess
  | TUpdatePasswordReset
  | TUpdatePasswordFailure;

const initialState: TUpdatePassword = {
  loading: false,
  error: null,
  updatePassword: null,
};

export const updatePasswordReducer = (
  state = initialState,
  action: TAction
) => {
  switch (action.type) {
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        updatePassword: true,
      };
    case UPDATE_PASSWORD_RESET:
      return {
        ...state,
        loading: false,
        updatePassword: null,
      };
    case UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
