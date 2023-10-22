import { updateUserInfoReducer } from "./updateUserInfo";
import { initialState } from "./updateUserInfo";
import * as types from "../actions/updateUserInfo";

const userState = {
  email: "",
  name: "",
};

const userInfoState = {
  success: true,
  user: userState,
};

describe("updateUserInfoReducer", () => {
  it("should return the initial state", () => {
    expect(updateUserInfoReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle UPDATE_USER_INFO_REQUEST", () => {
    const expectState = {
      ...initialState,
      loading: true,
      error: null,
    };

    expect(
      updateUserInfoReducer(initialState, {
        type: types.UPDATE_USER_INFO_REQUEST,
        loading: true,
        error: null,
      })
    ).toEqual(expectState);
  });

  it("should handle UPDATE_USER_INFO_SUCCESS", () => {
    const expectState = {
      ...initialState,
      loading: false,
      user: userInfoState,
      isAuthenticated: true,
    };

    expect(
      updateUserInfoReducer(initialState, {
        type: types.UPDATE_USER_INFO_SUCCESS,
        loading: false,
        user: userInfoState,
        isAuthenticated: true,
      })
    ).toEqual(expectState);
  });

  it("should handle UPDATE_USER_INFO_FAILURE", () => {
    const expectState = {
      ...initialState,
      loading: false,
      error: {},
      isAuthenticated: false,
    };

    expect(
      updateUserInfoReducer(initialState, {
        type: types.UPDATE_USER_INFO_FAILURE,
        loading: false,
        error: {},
        isAuthenticated: false,
      })
    ).toEqual(expectState);
  });
});
