import { orderReducer } from "./order";
import { initialState } from "./order";
import * as types from "../actions/order";

const orderState = {
  success: true,
  name: "",
  orderNumber: 1,
  isLoaded: true,
};

describe("orderReducer", () => {
  it("should return the initial state", () => {
    expect(orderReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_ORDER_REQUEST", () => {
    const expectState = {
      ...initialState,
      success: false,
      isLoaded: false,
    };

    expect(
      orderReducer(initialState, {
        type: types.GET_ORDER_REQUEST,
        success: false,
        isLoaded: false,
      })
    ).toEqual(expectState);
  });

  it("should handle GET_ORDER_SUCCESS", () => {
    const expectState = {
      ...initialState,
      ...orderState,
    };
    expect(
      orderReducer(initialState, {
        type: types.GET_ORDER_SUCCESS,
        ...orderState,
      })
    ).toEqual(expectState);
  });

  it("should handle GET_ORDER_FAILED", () => {
    expect(
      orderReducer(initialState, {
        type: types.GET_ORDER_FAILED,
      })
    ).toEqual(initialState);
  });
});
