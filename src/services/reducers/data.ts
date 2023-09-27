import { TData } from "../../utils/types/dataTypes";
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
} from "../actions/data";

type TGetItemsRequest = {
  type: typeof GET_ITEMS_REQUEST;
} & TData;

type TGetItemsSuccess = {
  type: typeof GET_ITEMS_SUCCESS;
} & TData;

type TGetItemsFailed = {
  type: typeof GET_ITEMS_FAILED;
} & TData;

type TAction = TGetItemsRequest | TGetItemsSuccess | TGetItemsFailed;

const initialState: TData = {
  items: [], // все полученные ингредиенты
  itemsRequest: false, // успешное получение всех ингредиентов
  itemsFailed: false, // ошибка при получении данных
  isLoading: null,
};

export const dataReducer = (state = initialState, action: TAction) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      console.log("request");
      return {
        ...state,
        itemsRequest: true,
        isLoading: true,
      };
    }
    case GET_ITEMS_SUCCESS: {
      console.log("success");
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
