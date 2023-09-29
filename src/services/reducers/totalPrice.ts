import { TTotalPrice } from "../../utils/types/totalPriceTypes";
import { TOTAL_PRICE } from "../actions/totalPrice";

type TTotalPriceAction = {
  type: typeof TOTAL_PRICE;
} & TTotalPrice;

type TAction = TTotalPriceAction;

const initialState: TTotalPrice = {
  totalPrice: 0,
};

export const totalPriceReducer = (state = initialState, action: TAction) => {
  switch (action.type) {
    case TOTAL_PRICE: {
      return { ...state, totalPrice: action.totalPrice };
    }
    default: {
      return state;
    }
  }
};
