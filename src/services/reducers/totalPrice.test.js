import { totalPriceReducer } from "./totalPrice";
import { initialState } from "./totalPrice";
import * as types from "../actions/totalPrice";

describe("totalPriceReducer", () => {
  it("should return the initial state", () => {
    expect(totalPriceReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle TOTAL_PRICE", () => {
    const expectState = {
      ...initialState,
      totalPrice: 1,
    };

    expect(
      totalPriceReducer(initialState, {
        type: types.TOTAL_PRICE,
        totalPrice: 1,
      })
    ).toEqual(expectState);
  });
});
