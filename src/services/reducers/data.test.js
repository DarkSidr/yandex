import { dataReducer } from "./data";
import { initialState } from "./data";
import * as types from "../actions/data";

const ingredientState = {
  _id: "",
  name: "",
  type: "",
  proteins: "",
  fat: "",
  carbohydrates: "",
  calories: "",
  price: "",
  image: "",
  image_mobile: "",
  image_large: "",
};

const ingredientsState = [ingredientState];

describe("dataReducer", () => {
  it("should return the initial state", () => {
    expect(dataReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_ITEMS_REQUEST", () => {
    const expectState = {
      ...initialState,
      itemsRequest: true,
      isLoading: true,
    };

    expect(
      dataReducer(initialState, {
        type: types.GET_ITEMS_REQUEST,
        itemsRequest: true,
        isLoading: true,
      })
    ).toEqual(expectState);
  });

  it("should handle GET_ITEMS_SUCCESS", () => {
    const expectState = {
      ...initialState,
      itemsFailed: false,
      items: ingredientsState,
      itemsRequest: false,
      isLoading: false,
    };
    expect(
      dataReducer(initialState, {
        type: types.GET_ITEMS_SUCCESS,
        itemsFailed: false,
        items: ingredientsState,
        itemsRequest: false,
        isLoading: false,
      })
    ).toEqual(expectState);
  });

  it("should handle GET_ITEMS_FAILED", () => {
    const expectState = {
      ...initialState,
      items: [],
      itemsFailed: true,
      itemsRequest: false,
      isLoading: null,
    };
    expect(
      dataReducer(initialState, {
        type: types.GET_ITEMS_FAILED,
        items: [],
        itemsFailed: true,
        itemsRequest: false,
        isLoading: null,
      })
    ).toEqual(expectState);
  });
});
