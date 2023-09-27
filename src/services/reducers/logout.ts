import { TLogout } from "../../utils/types/logoutTypes";
import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../actions/logout";

type TLogoutRequest = {
  type: typeof LOGOUT_REQUEST;
} & TLogout;

type TLogoutSuccess = {
  type: typeof LOGOUT_SUCCESS;
} & TLogout;

type TLogoutFailure = {
  type: typeof LOGOUT_FAILURE;
} & TLogout;

type TAction = TLogoutRequest | TLogoutSuccess | TLogoutFailure;

const initialState: TLogout = {
  loading: false,
  error: null,
};

export const logoutReducer = (state = initialState, action: TAction) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
