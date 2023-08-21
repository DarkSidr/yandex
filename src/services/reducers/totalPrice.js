import { TOTAL_PRICE } from "../actions/totalPrice";

const initialState = 0;

export const totalPriceReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOTAL_PRICE: {
      return action.totalPrice;
    }
    default: {
      return state;
    }
  }
};
