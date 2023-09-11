import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../actions/register";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isRegistered: false,
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user,
        isRegistered: true,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        isRegistered: false,
      };
    default:
      return state;
  }
};
