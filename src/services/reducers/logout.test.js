import { logoutReducer } from "./logout";
import { initialState } from "./logout";
import * as types from "../actions/logout";

const userState = {
  email: "",
  name: "",
};

const userInfoState = {
  success: true,
  user: userState,
};

describe("logoutReducer", () => {
  it("should return the initial state", () => {
    expect(logoutReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle LOGOUT_REQUEST", () => {
    const expectState = {
      ...initialState,
      loading: true,
      error: null,
    };

    expect(
      logoutReducer(initialState, {
        type: types.LOGOUT_REQUEST,
        loading: true,
        error: null,
      })
    ).toEqual(expectState);
  });

  it("should handle LOGOUT_SUCCESS", () => {
    const expectState = {
      ...initialState,
      loading: false,
      error: null,
    };
    expect(
      logoutReducer(initialState, {
        type: types.LOGOUT_SUCCESS,
        loading: false,
        error: null,
      })
    ).toEqual(expectState);
  });

  it("should handle LOGOUT_FAILURE", () => {
    const expectState = {
      ...initialState,
      loading: false,
      error: {},
    };
    expect(
      logoutReducer(initialState, {
        type: types.LOGOUT_FAILURE,
        loading: false,
        error: {},
      })
    ).toEqual(expectState);
  });
});
