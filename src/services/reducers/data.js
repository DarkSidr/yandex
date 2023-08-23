import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
} from "../actions/data";

const initialState = {
  items: [], // все полученные ингредиенты
  itemsRequest: false, // успешное получение всех ингредиентов
  itemsFailed: false, // ошибка при получении данных
  isLoading: null,
};

export const dataReducer = (state = initialState, action) => {
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
