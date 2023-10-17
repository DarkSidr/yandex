import { Middleware } from "redux";
import {
  TFeedWebSocket,
  TFeedWebSocketActions,
} from "../types/feedWebSocketTypes";
import { TWebSocketMessage } from "../types/commonTypes";
import {
  TOrdersWebSocket,
  TOrdersWebSocketActions,
} from "../types/ordersWebSocketTypes";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: TFeedWebSocket | TOrdersWebSocket,
  isOrders?: boolean
): Middleware => {
  return ((store) => {
    let socket: WebSocket | null = null;

    return (next) =>
      (action: TFeedWebSocketActions | TOrdersWebSocketActions) => {
        const { dispatch } = store;
        const { type } = action;
        const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

        let token = null;
        let resultToken = null;

        if (isOrders) {
          token = localStorage.getItem("accessToken");
          if (token) {
            let parts = token.split(" ");
            resultToken = parts.length > 1 ? parts.slice(1).join(" ") : token;
          }
        }

        if (type === wsInit) {
          const url = !resultToken ? wsUrl : `${wsUrl}?token=${resultToken}`;
          socket = new WebSocket(url);
        }

        if (socket) {
          socket.onopen = (event) => {
            dispatch({ type: onOpen });
          };

          socket.onerror = (event) => {
            dispatch({ type: onError });
          };

          socket.onmessage = (event) => {
            const { data } = event;
            const parsedData: TWebSocketMessage & { success: boolean } =
              JSON.parse(data);

            dispatch({
              type: onMessage,
              messages: parsedData,
            });
          };

          socket.onclose = (event) => {
            dispatch({ type: onClose });
            socket = null;
            token = null;
            resultToken = null;
          };

          if (onClose && onClose === type) {
            console.log("сокет закрыт");
            socket.close();
          }
        }
        return next(action);
      };
  }) as Middleware;
};
