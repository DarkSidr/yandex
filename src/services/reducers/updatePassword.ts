import {
  TUpdatePassword,
  TUpdatePasswordReducer,
} from "../../utils/types/updatePasswordTypes";
import {
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_FAILURE,
} from "../actions/updatePassword";

const initialState: TUpdatePassword = {
  loading: false,
  error: null,
  updatePassword: null,
};

export const updatePasswordReducer = (
  state = initialState,
  action: TUpdatePasswordReducer
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
