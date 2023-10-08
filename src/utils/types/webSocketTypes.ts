import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "../../services/actions/webSocket";

type TError = {
  error: Event;
};

export type TOrder = {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TMessage = {
  orders: TOrder[];
  total: number;
  totalToday: number;
} | null;

export type TMessages = {
  messages: TMessage | null;
};

export type TWebSocketConnectionStartAction = {
  type: typeof WS_CONNECTION_START;
};

export type TWebSocketConnectionSuccessAction = {
  type: typeof WS_CONNECTION_SUCCESS;
};

export type TWebSocketConnectionErrorAction = {
  type: typeof WS_CONNECTION_ERROR;
};

export type TWebSocketConnectionClosedAction = {
  type: typeof WS_CONNECTION_CLOSED;
};

export type TWebSocketGetMessageAction = {
  type: typeof WS_GET_MESSAGE;
};

export type TWebSocketSendMessageAction = {
  type: typeof WS_SEND_MESSAGE;
};

export type TWebSocket = {
  wsInit: typeof WS_CONNECTION_START;
  wsSendMessage: typeof WS_SEND_MESSAGE;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_MESSAGE;
};

export type TWebSocketActions =
  | TWebSocketConnectionStartAction
  | TWebSocketConnectionSuccessAction
  | TWebSocketConnectionErrorAction
  | TWebSocketConnectionClosedAction
  | TWebSocketGetMessageAction
  | TWebSocketSendMessageAction;

export type TWebSocketReducer =
  | TWebSocketConnectionStartAction
  | TWebSocketConnectionSuccessAction
  | (TWebSocketConnectionErrorAction & TError)
  | TWebSocketConnectionClosedAction
  | (TWebSocketGetMessageAction & TMessages)
  | TWebSocketSendMessageAction;
