import { loginReducer } from "./login";
import { initialState } from "./login";
import * as types from "../actions/login";

const userState = {
  email: "",
  name: "",
};

const userInfoState = {
  success: true,
  user: userState,
};

describe("loginReducer", () => {
  it("should return the initial state", () => {
    expect(loginReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle LOGIN_REQUEST", () => {
    const expectState = {
      ...initialState,
      loading: true,
      error: null,
    };

    expect(
      loginReducer(initialState, {
        type: types.LOGIN_REQUEST,
        loading: true,
        error: null,
      })
    ).toEqual(expectState);
  });

  it("should handle LOGIN_SUCCESS", () => {
    const expectState = {
      ...initialState,
      loading: false,
      user: userInfoState,
      isAuthenticated: true,
    };
    expect(
      loginReducer(initialState, {
        type: types.LOGIN_SUCCESS,
        loading: false,
        user: userInfoState,
        isAuthenticated: true,
      })
    ).toEqual(expectState);
  });

  it("should handle LOGIN_LOGOUT", () => {
    const expectState = {
      ...initialState,
      loading: false,
      user: null,
      isAuthenticated: false,
    };
    expect(
      loginReducer(initialState, {
        type: types.LOGIN_LOGOUT,
        loading: false,
        user: null,
        isAuthenticated: false,
      })
    ).toEqual(expectState);
  });

  it("should handle LOGIN_FAILURE", () => {
    const expectState = {
      ...initialState,
      loading: false,
      error: {},
      isAuthenticated: false,
    };
    expect(
      loginReducer(initialState, {
        type: types.LOGIN_FAILURE,
        loading: false,
        error: {},
        isAuthenticated: false,
      })
    ).toEqual(expectState);
  });
});
