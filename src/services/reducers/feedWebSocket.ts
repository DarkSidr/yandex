import { TWebSocketMessages } from "../../utils/types/commonTypes";
import { TFeedWebSocketActions } from "../../utils/types/feedWebSocketTypes";
import {
  FEED_WS_CONNECTION_SUCCESS,
  FEED_WS_CONNECTION_ERROR,
  FEED_WS_CONNECTION_CLOSED,
  FEED_WS_GET_MESSAGE,
} from "../actions/feedWebSocket";

type TWSState = {
  wsConnected: boolean;
  error?: Event;
} & TWebSocketMessages;

const initialState: TWSState = {
  wsConnected: false,
  error: undefined,
  messages: null,
};

export const feedWebSocketReducer = (
  state = initialState,
  action: TFeedWebSocketActions
) => {
  switch (action.type) {
    case FEED_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case FEED_WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.error,
        wsConnected: false,
      };

    case FEED_WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        messages: null,
      };

    case FEED_WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        messages: action.messages,
      };

    default:
      return state;
  }
};
