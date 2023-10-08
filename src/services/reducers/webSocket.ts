import { TMessages, TWebSocketReducer } from "../../utils/types/webSocketTypes";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../actions/webSocket";

export type TWSState = {
  wsConnected: boolean;
  error?: Event;
} & TMessages;

const initialState: TWSState = {
  wsConnected: false,
  messages: null,
};

export const webSocketReducer = (
  state = initialState,
  action: TWebSocketReducer
) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.error,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        messages: action.messages,
      };

    default:
      return state;
  }
};
