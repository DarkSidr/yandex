import {
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAILURE,
} from "../actions/newPassword";

const initialState = {
  loading: false,
  error: null,
  newPassword: null,
};

export const newPasswordReducer = (state = initialState, action) => {
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
