import {
  TTotalPrice,
  TTotalPriceAction,
} from "../../utils/types/totalPriceTypes";
import { TOTAL_PRICE } from "../actions/totalPrice";

const initialState: TTotalPrice = {
  totalPrice: 0,
};

export const totalPriceReducer = (
  state = initialState,
  action: TTotalPriceAction
) => {
  switch (action.type) {
    case TOTAL_PRICE: {
      return { ...state, totalPrice: action.totalPrice };
    }
    default: {
      return state;
    }
  }
};
