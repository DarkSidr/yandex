import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { dataReducer } from "./data";
import { burgerConstructorReducer } from "./burgerConstructor";
import { totalPriceReducer } from "./totalPrice";
import { orderReducer } from "./order";
import { registerReducer } from "./register";
import { loginReducer } from "./login";
import { userReducer } from "./user";
import { logoutReducer } from "./logout";
import { updateUserInfoReducer } from "./updateUserInfo";
import { updatePasswordReducer } from "./updatePassword";
import { newPasswordReducer } from "./newPassword";
import thunkMiddleware from "redux-thunk";
import { socketMiddleware } from "../../utils/requests/socketMiddleware";
import { feedWebSocketReducer } from "./feedWebSocket";
import { TFeedWebSocket } from "../../utils/types/feedWebSocketTypes";
import {
  FEED_WS_CONNECTION_CLOSED,
  FEED_WS_CONNECTION_ERROR,
  FEED_WS_CONNECTION_START,
  FEED_WS_CONNECTION_SUCCESS,
  FEED_WS_GET_MESSAGE,
  FEED_WS_SEND_MESSAGE,
} from "../actions/feedWebSocket";
import { ordersWebSocketReducer } from "./ordersWebSocket";
import { TOrdersWebSocket } from "../../utils/types/ordersWebSocketTypes";
import {
  ORDERS_WS_CONNECTION_CLOSED,
  ORDERS_WS_CONNECTION_ERROR,
  ORDERS_WS_CONNECTION_START,
  ORDERS_WS_CONNECTION_SUCCESS,
  ORDERS_WS_GET_MESSAGE,
  ORDERS_WS_SEND_MESSAGE,
} from "../actions/ordersWebSocket";
import { currentOrderReducer } from "./currentOrder";

export const rootReducer = combineReducers({
  data: dataReducer,
  burgerConstructor: burgerConstructorReducer,
  totalPrice: totalPriceReducer,
  order: orderReducer,
  registerReducer: registerReducer,
  loginReducer: loginReducer,
  userReducer: userReducer,
  logoutReducer: logoutReducer,
  updateUserInfoReducer: updateUserInfoReducer,
  updatePasswordReducer: updatePasswordReducer,
  newPasswordReducer: newPasswordReducer,
  feedWebSocketReducer: feedWebSocketReducer,
  ordersWebSocketReducer: ordersWebSocketReducer,
  currentOrderReducer: currentOrderReducer,
});

const wsFeedUrl: string = "wss://norma.nomoreparties.space/orders/all";
const wsOrdersUrl: string = "wss://norma.nomoreparties.space/orders";

const webFeedSocketActions: TFeedWebSocket = {
  wsInit: FEED_WS_CONNECTION_START,
  wsSendMessage: FEED_WS_SEND_MESSAGE,
  onOpen: FEED_WS_CONNECTION_SUCCESS,
  onClose: FEED_WS_CONNECTION_CLOSED,
  onError: FEED_WS_CONNECTION_ERROR,
  onMessage: FEED_WS_GET_MESSAGE,
};

const webOrdersSocketActions: TOrdersWebSocket = {
  wsInit: ORDERS_WS_CONNECTION_START,
  wsSendMessage: ORDERS_WS_SEND_MESSAGE,
  onOpen: ORDERS_WS_CONNECTION_SUCCESS,
  onClose: ORDERS_WS_CONNECTION_CLOSED,
  onError: ORDERS_WS_CONNECTION_ERROR,
  onMessage: ORDERS_WS_GET_MESSAGE,
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware,
      socketMiddleware(wsFeedUrl, webFeedSocketActions),
      socketMiddleware(wsOrdersUrl, webOrdersSocketActions, true)
    )
  )
);
