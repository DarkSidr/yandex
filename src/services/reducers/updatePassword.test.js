import { updatePasswordReducer } from "./updatePassword";
import { initialState } from "./updatePassword";
import * as types from "../actions/updatePassword";

describe("updatePasswordReducer", () => {
  it("should return the initial state", () => {
    expect(updatePasswordReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle UPDATE_PASSWORD_REQUEST", () => {
    const expectState = {
      ...initialState,
      loading: true,
      error: null,
    };

    expect(
      updatePasswordReducer(initialState, {
        type: types.UPDATE_PASSWORD_REQUEST,
        loading: true,
        error: null,
      })
    ).toEqual(expectState);
  });

  it("should handle UPDATE_PASSWORD_SUCCESS", () => {
    const expectState = {
      ...initialState,
      loading: false,
      updatePassword: true,
    };

    expect(
      updatePasswordReducer(initialState, {
        type: types.UPDATE_PASSWORD_SUCCESS,
        loading: false,
        updatePassword: true,
      })
    ).toEqual(expectState);
  });

  it("should handle UPDATE_PASSWORD_RESET", () => {
    const expectState = {
      ...initialState,
      loading: false,
      updatePassword: null,
    };

    expect(
      updatePasswordReducer(initialState, {
        type: types.UPDATE_PASSWORD_RESET,
        loading: false,
        updatePassword: null,
      })
    ).toEqual(expectState);
  });

  it("should handle UPDATE_PASSWORD_FAILURE", () => {
    const expectState = {
      ...initialState,
      loading: false,
      error: {},
    };

    expect(
      updatePasswordReducer(initialState, {
        type: types.UPDATE_PASSWORD_FAILURE,
        loading: false,
        error: {},
      })
    ).toEqual(expectState);
  });
});
