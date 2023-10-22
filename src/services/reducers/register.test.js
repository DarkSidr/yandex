import { registerReducer } from "./register";
import { initialState } from "./register";
import * as types from "../actions/register";

const userState = {
  email: "",
  name: "",
};

const userInfoState = {
  success: true,
  user: userState,
  accessToken: "",
  refreshToken: "",
};

describe("registerReducer", () => {
  it("should return the initial state", () => {
    expect(registerReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle REGISTER_REQUEST", () => {
    const expectState = {
      ...initialState,
      loading: true,
      error: null,
    };

    expect(
      registerReducer(initialState, {
        type: types.REGISTER_REQUEST,
        loading: true,
        error: null,
      })
    ).toEqual(expectState);
  });

  it("should handle REGISTER_SUCCESS", () => {
    const expectState = {
      ...initialState,
      loading: false,
      user: userInfoState,
      isRegistered: true,
    };
    expect(
      registerReducer(initialState, {
        type: types.REGISTER_SUCCESS,
        loading: false,
        user: userInfoState,
        isRegistered: true,
      })
    ).toEqual(expectState);
  });

  it("should handle REGISTER_RESET", () => {
    const expectState = {
      ...initialState,
      loading: false,
      isRegistered: false,
    };
    expect(
      registerReducer(initialState, {
        type: types.REGISTER_RESET,
        loading: false,
        isRegistered: false,
      })
    ).toEqual(expectState);
  });

  it("should handle REGISTER_FAILURE", () => {
    const expectState = {
      ...initialState,
      loading: false,
      error: {},
      isRegistered: false,
    };
    expect(
      registerReducer(initialState, {
        type: types.REGISTER_FAILURE,
        loading: false,
        error: {},
        isRegistered: false,
      })
    ).toEqual(expectState);
  });
});
