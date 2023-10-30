import { userReducer } from "./user";
import { initialState } from "./user";
import * as types from "../actions/user";

const userState = {
  email: "",
  name: "",
};

const userInfoState = {
  success: true,
  user: userState,
};

describe("userReducer", () => {
  it("should return the initial state", () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle FETCH_USER_REQUEST", () => {
    const expectState = {
      ...initialState,
      loading: true,
      error: null,
    };

    expect(
      userReducer(initialState, {
        type: types.FETCH_USER_REQUEST,
        loading: true,
        error: null,
      })
    ).toEqual(expectState);
  });

  it("should handle FETCH_USER_SUCCESS", () => {
    const expectState = {
      ...initialState,
      loading: false,
      data: userInfoState,
      error: null,
    };

    expect(
      userReducer(initialState, {
        type: types.FETCH_USER_SUCCESS,
        loading: false,
        data: userInfoState,
        error: null,
      })
    ).toEqual(expectState);
  });

  it("should handle FETCH_USER_FAILURE", () => {
    const expectState = {
      ...initialState,
      loading: false,
      error: {},
    };

    expect(
      userReducer(initialState, {
        type: types.FETCH_USER_FAILURE,
        loading: false,
        error: {},
      })
    ).toEqual(expectState);
  });
});
