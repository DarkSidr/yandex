import { combineReducers } from "redux";
import { dataReducer } from "./data";
import { burgerConstructorReducer } from "./burgerConstructor";
import { totalPriceReducer } from "./totalPrice";
import { orderReducer } from "./order";
import { currentIngredientReducer } from "./currentIngredient";

export const rootReducer = combineReducers({
  data: dataReducer,
  burgerConstructor: burgerConstructorReducer,
  totalPrice: totalPriceReducer,
  order: orderReducer,
  currentIngredient: currentIngredientReducer,
});
