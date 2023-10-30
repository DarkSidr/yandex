import { currentOrderReducer } from "./currentOrder";
import { initialState } from "./currentOrder";
import * as types from "../actions/currentOrder";

const ordersState = {
  _id: "",
  ingredients: ["", ""],
  status: "",
  name: "",
  number: 1,
  createdAt: "",
  updatedAt: "",
};

const dataState = {
  success: true,
  orders: ordersState,
};

describe("currentOrderReducer", () => {
  it("should return the initial state", () => {
    expect(currentOrderReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle CURRENT_ORDER_REQUEST", () => {
    const expectState = {
      ...initialState,
      isLoaded: false,
    };

    expect(
      currentOrderReducer(initialState, {
        type: types.CURRENT_ORDER_REQUEST,
        isLoaded: false,
      })
    ).toEqual(expectState);
  });

  it("should handle CURRENT_ORDER_SUCCESS", () => {
    const expectState = {
      ...initialState,
      isLoaded: true,
      data: dataState,
    };
    expect(
      currentOrderReducer(initialState, {
        type: types.CURRENT_ORDER_SUCCESS,
        isLoaded: true,
        data: dataState,
      })
    ).toEqual(expectState);
  });

  it("should handle CURRENT_ORDER_FAILURE", () => {
    const expectState = {
      ...initialState,
      isLoaded: false,
      data: null,
      error: {},
    };
    expect(
      currentOrderReducer(initialState, {
        type: types.CURRENT_ORDER_FAILURE,
        isLoaded: false,
        data: null,
        error: {},
      })
    ).toEqual(expectState);
  });

  it("should handle CURRENT_ORDER_RESET", () => {
    const expectState = {
      ...initialState,
      isLoaded: false,
      data: null,
    };
    expect(
      currentOrderReducer(initialState, {
        type: types.CURRENT_ORDER_RESET,
        isLoaded: false,
        data: null,
      })
    ).toEqual(expectState);
  });
});
