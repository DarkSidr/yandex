import {
  TUpdateUserInfo,
  TUpdateUserInfoActions,
} from "../../utils/types/updateUserInfoTypes";
import {
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAILURE,
} from "../actions/updateUserInfo";

export const initialState: TUpdateUserInfo = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const updateUserInfoReducer = (
  state = initialState,
  action: TUpdateUserInfoActions
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
