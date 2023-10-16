import {
  TCurrentOrder,
  TCurrentOrderActions,
} from "../../utils/types/currentOrderTypes";
import {
  CURRENT_ORDER_FAILURE,
  CURRENT_ORDER_REQUEST,
  CURRENT_ORDER_RESET,
  CURRENT_ORDER_SUCCESS,
} from "../actions/currentOrder";

const initialState: TCurrentOrder = {
  isLoaded: false,
  data: null,
  error: null,
};

export const currentOrderReducer = (
  state = initialState,
  action: TCurrentOrderActions
) => {
  switch (action.type) {
    case CURRENT_ORDER_REQUEST: {
      return {
        ...state,
        isLoaded: false,
      };
    }
    case CURRENT_ORDER_SUCCESS: {
      return {
        ...state,
        isLoaded: true,
        data: action.data,
      };
    }
    case CURRENT_ORDER_FAILURE: {
      return {
        ...state,
        isLoaded: false,
        data: null,
        error: action.error,
      };
    }
    case CURRENT_ORDER_RESET: {
      return {
        ...state,
        isLoaded: false,
        data: null,
      };
    }
    default: {
      return state;
    }
  }
};
