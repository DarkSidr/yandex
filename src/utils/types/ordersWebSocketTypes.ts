import {
  ORDERS_WS_CONNECTION_CLOSED,
  ORDERS_WS_CONNECTION_ERROR,
  ORDERS_WS_CONNECTION_START,
  ORDERS_WS_CONNECTION_SUCCESS,
  ORDERS_WS_GET_MESSAGE,
  ORDERS_WS_SEND_MESSAGE,
} from "../../services/actions/ordersWebSocket";
import { TErrorWebSocket, TWebSocketMessages } from "./commonTypes";

export type TOrdersWebSocketConnectionStartAction = {
  readonly type: typeof ORDERS_WS_CONNECTION_START;
};

export type TOrdersWebSocketConnectionSuccessAction = {
  readonly type: typeof ORDERS_WS_CONNECTION_SUCCESS;
};

export type TOrdersWebSocketConnectionErrorAction = {
  readonly type: typeof ORDERS_WS_CONNECTION_ERROR;
} & TErrorWebSocket;

export type TOrdersWebSocketConnectionClosedAction = {
  readonly type: typeof ORDERS_WS_CONNECTION_CLOSED;
};

export type TOrdersWebSocketGetMessageAction = {
  readonly type: typeof ORDERS_WS_GET_MESSAGE;
} & TWebSocketMessages;

export type TOrdersWebSocketSendMessageAction = {
  type: typeof ORDERS_WS_SEND_MESSAGE;
};

export type TOrdersWebSocket = {
  wsInit: typeof ORDERS_WS_CONNECTION_START;
  wsSendMessage: typeof ORDERS_WS_SEND_MESSAGE;
  onOpen: typeof ORDERS_WS_CONNECTION_SUCCESS;
  onClose: typeof ORDERS_WS_CONNECTION_CLOSED;
  onError: typeof ORDERS_WS_CONNECTION_ERROR;
  onMessage: typeof ORDERS_WS_GET_MESSAGE;
};

export type TOrdersWebSocketActions =
  | TOrdersWebSocketConnectionStartAction
  | TOrdersWebSocketConnectionSuccessAction
  | TOrdersWebSocketConnectionErrorAction
  | TOrdersWebSocketConnectionClosedAction
  | TOrdersWebSocketGetMessageAction
  | TOrdersWebSocketSendMessageAction;
