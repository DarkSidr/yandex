import { TUser } from "../../utils/types/userTypes";
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from "../actions/user";

type TFetchUserRequest = {
  type: typeof FETCH_USER_REQUEST;
} & TUser;

type TFetchUserSuccess = {
  type: typeof FETCH_USER_SUCCESS;
} & TUser;

type TFetchUserFailure = {
  type: typeof FETCH_USER_FAILURE;
} & TUser;

type TAction = TFetchUserRequest | TFetchUserSuccess | TFetchUserFailure;

const initialState: TUser = {
  data: null,
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action: TAction) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: null,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
