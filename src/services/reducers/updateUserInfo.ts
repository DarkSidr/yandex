import { TUpdateUserInfo } from "../../utils/types/updateUserInfoTypes";
import {
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAILURE,
} from "../actions/updateUserInfo";

type TUpdateUserInfoRequest = {
  type: typeof UPDATE_USER_INFO_REQUEST;
} & TUpdateUserInfo;

type TUpdateUserInfoSuccess = {
  type: typeof UPDATE_USER_INFO_SUCCESS;
} & TUpdateUserInfo;

type TUpdateUserInfoFailure = {
  type: typeof UPDATE_USER_INFO_FAILURE;
} & TUpdateUserInfo;

type TAction =
  | TUpdateUserInfoRequest
  | TUpdateUserInfoSuccess
  | TUpdateUserInfoFailure;

const initialState: TUpdateUserInfo = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const updateUserInfoReducer = (
  state = initialState,
  action: TAction
) => {
  switch (action.type) {
    case UPDATE_USER_INFO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user,
        isAuthenticated: true,
      };
    case UPDATE_USER_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
