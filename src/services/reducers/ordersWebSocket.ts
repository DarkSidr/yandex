import { TWebSocketMessages } from "../../utils/types/commonTypes";
import { TOrdersWebSocketActions } from "../../utils/types/ordersWebSocketTypes";
import {
  ORDERS_WS_CONNECTION_CLOSED,
  ORDERS_WS_CONNECTION_ERROR,
  ORDERS_WS_CONNECTION_SUCCESS,
  ORDERS_WS_GET_MESSAGE,
} from "../actions/ordersWebSocket";

type TWSState = {
  wsConnected: boolean;
  error?: Event;
} & TWebSocketMessages;

const initialState: TWSState = {
  wsConnected: false,
  messages: null,
  error: undefined,
};

export const ordersWebSocketReducer = (
  state = initialState,
  action: TOrdersWebSocketActions
) => {
  switch (action.type) {
    case ORDERS_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case ORDERS_WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.error,
        wsConnected: false,
      };

    case ORDERS_WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        messages: null,
      };

    case ORDERS_WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        messages: action.messages,
      };

    default:
      return state;
  }
};
