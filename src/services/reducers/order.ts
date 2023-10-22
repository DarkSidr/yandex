import { TOrder, TOrderActions } from "../../utils/types/orderTypes";
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from "../actions/order";

export const initialState: TOrder = {
  success: false,
  orderNumber: 0,
  name: "",
  isLoaded: false,
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        success: false,
        isLoaded: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        success: action.success,
        orderNumber: action.orderNumber,
        name: action.name,
        isLoaded: action.isLoaded,
      };
    }
    case GET_ORDER_FAILED: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
