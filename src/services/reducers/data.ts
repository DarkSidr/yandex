import { TData, TDataActions } from "../../utils/types/dataTypes";
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
} from "../actions/data";

export const initialState: TData = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
  isLoading: null,
};

export const dataReducer = (state = initialState, action: TDataActions) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
        isLoading: true,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsFailed: false,
        items: action.items,
        itemsRequest: false,
        isLoading: false,
      };
    }
    case GET_ITEMS_FAILED: {
      return {
        ...state,
        items: [],
        itemsFailed: true,
        itemsRequest: false,
        isLoading: null,
      };
    }
    default: {
      return state;
    }
  }
};
