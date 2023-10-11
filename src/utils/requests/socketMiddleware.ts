import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState, TApplicationActions } from "../types";
import {
  TMessage,
  TWebSocket,
  TWebSocketActions,
} from "../types/webSocketTypes";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: TWebSocket
): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TWebSocketActions) => {
      const { dispatch, getState } = store;
      const { type } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } =
        wsActions;

      if (type === wsInit) {
        socket = new WebSocket(wsUrl);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, error: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData: TMessage & { success: boolean } = JSON.parse(data);
          dispatch({
            type: onMessage,
            messages: parsedData,
          });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
      }
      next(action);
    };
  }) as Middleware;
};
