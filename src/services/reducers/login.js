import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_LOGOUT,
  LOGIN_FAILURE,
} from "../actions/login";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user,
        isAuthenticated: true,
      };
    case LOGIN_LOGOUT: {
      return { ...state, loading: false, user: null, isAuthenticated: false };
    }
    case LOGIN_FAILURE:
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
