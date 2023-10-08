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
import { webSocketReducer } from "./webSocket";
import { TWebSocket } from "../../utils/types/webSocketTypes";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "../actions/webSocket";

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
  webSocketReducer: webSocketReducer,
});

const wsUrl: string = "wss://norma.nomoreparties.space/orders/all";

const webSocketActions: TWebSocket = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware, socketMiddleware(wsUrl, webSocketActions))
  )
);
