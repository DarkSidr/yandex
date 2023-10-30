import { burgerConstructorReducer } from "./burgerConstructor";
import { initialState } from "./burgerConstructor";
import * as types from "../actions/burgerConstructor";

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

describe("burgerConstructorReducer", () => {
  it("should return the initial state", () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle ADD_CURRENT_INGREDIENTS", () => {
    const expectState = {
      ...initialState,
      ingredients: ingredientsState,
      burgerConstructorRequest: false,
    };

    expect(
      burgerConstructorReducer(initialState, {
        type: types.ADD_CURRENT_INGREDIENTS,
        ingredients: ingredientsState,
        burgerConstructorRequest: false,
      })
    ).toEqual(expectState);
  });

  it("should handle ADD_CURRENT_BUN", () => {
    const expectState = {
      ...initialState,
      bun: ingredientState,
      burgerConstructorRequest: false,
    };
    expect(
      burgerConstructorReducer(initialState, {
        type: types.ADD_CURRENT_BUN,
        bun: ingredientState,
        burgerConstructorRequest: false,
      })
    ).toEqual(expectState);
  });

  it("should handle BURGER", () => {
    const expectState = {
      ...initialState,
      burger: ingredientsState,
      burgerConstructorRequest: true,
    };
    expect(
      burgerConstructorReducer(initialState, {
        type: types.BURGER,
        burger: ingredientsState,
        burgerConstructorRequest: true,
      })
    ).toEqual(expectState);
  });

  it("should handle DELETE_INGREDIENT", () => {
    const expectState = {
      ...initialState,
      ingredients: ingredientsState,
      burgerConstructorRequest: true,
    };
    expect(
      burgerConstructorReducer(initialState, {
        type: types.DELETE_INGREDIENT,
        ingredients: ingredientsState,
        burgerConstructorRequest: true,
      })
    ).toEqual(expectState);
  });
});
