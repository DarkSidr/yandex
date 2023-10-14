import {
  FEED_WS_CONNECTION_CLOSED,
  FEED_WS_CONNECTION_ERROR,
  FEED_WS_CONNECTION_START,
  FEED_WS_CONNECTION_SUCCESS,
  FEED_WS_GET_MESSAGE,
  FEED_WS_SEND_MESSAGE,
} from "../../services/actions/feedWebSocket";
import { TErrorWebSocket, TWebSocketMessages } from "./commonTypes";

export type TFeedWebSocketConnectionStartAction = {
  readonly type: typeof FEED_WS_CONNECTION_START;
};

export type TFeedWebSocketConnectionSuccessAction = {
  readonly type: typeof FEED_WS_CONNECTION_SUCCESS;
};

export type TFeedWebSocketConnectionErrorAction = {
  readonly type: typeof FEED_WS_CONNECTION_ERROR;
} & TErrorWebSocket;

export type TFeedWebSocketConnectionClosedAction = {
  readonly type: typeof FEED_WS_CONNECTION_CLOSED;
};

export type TFeedWebSocketGetMessageAction = {
  readonly type: typeof FEED_WS_GET_MESSAGE;
} & TWebSocketMessages;

export type TFeedWebSocketSendMessageAction = {
  type: typeof FEED_WS_SEND_MESSAGE;
};

export type TFeedWebSocket = {
  wsInit: typeof FEED_WS_CONNECTION_START;
  wsSendMessage: typeof FEED_WS_SEND_MESSAGE;
  onOpen: typeof FEED_WS_CONNECTION_SUCCESS;
  onClose: typeof FEED_WS_CONNECTION_CLOSED;
  onError: typeof FEED_WS_CONNECTION_ERROR;
  onMessage: typeof FEED_WS_GET_MESSAGE;
};

export type TFeedWebSocketActions =
  | TFeedWebSocketConnectionStartAction
  | TFeedWebSocketConnectionSuccessAction
  | TFeedWebSocketConnectionErrorAction
  | TFeedWebSocketConnectionClosedAction
  | TFeedWebSocketGetMessageAction
  | TFeedWebSocketSendMessageAction;
