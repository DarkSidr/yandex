import { newPasswordReducer } from "./newPassword";
import { initialState } from "./newPassword";
import * as types from "../actions/newPassword";

describe("newPasswordReducer", () => {
  it("should return the initial state", () => {
    expect(newPasswordReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle NEW_PASSWORD_REQUEST", () => {
    const expectState = {
      ...initialState,
      loading: true,
      error: null,
    };

    expect(
      newPasswordReducer(initialState, {
        type: types.NEW_PASSWORD_REQUEST,
        loading: true,
        error: null,
      })
    ).toEqual(expectState);
  });

  it("should handle NEW_PASSWORD_SUCCESS", () => {
    const expectState = {
      ...initialState,
      loading: false,
      newPassword: true,
    };
    expect(
      newPasswordReducer(initialState, {
        type: types.NEW_PASSWORD_SUCCESS,
        loading: false,
        newPassword: true,
      })
    ).toEqual(expectState);
  });

  it("should handle NEW_PASSWORD_RESET", () => {
    const expectState = {
      ...initialState,
      loading: false,
      newPassword: null,
    };
    expect(
      newPasswordReducer(initialState, {
        type: types.NEW_PASSWORD_RESET,
        loading: false,
        newPassword: null,
      })
    ).toEqual(expectState);
  });

  it("should handle NEW_PASSWORD_FAILURE", () => {
    const expectState = {
      ...initialState,
      loading: false,
      error: {},
    };
    expect(
      newPasswordReducer(initialState, {
        type: types.NEW_PASSWORD_FAILURE,
        loading: false,
        error: {},
      })
    ).toEqual(expectState);
  });
});
