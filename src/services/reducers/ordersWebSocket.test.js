import { ordersWebSocketReducer } from "./ordersWebSocket";
import { initialState } from "./ordersWebSocket";
import * as types from "../actions/ordersWebSocket";

const ordersState = [
  {
    _id: "",
    ingredients: ["", ""],
    status: "",
    name: "",
    number: 1,
    createdAt: "",
    updatedAt: "",
  },
];

const messagesState = {
  orders: ordersState,
  total: 1,
  totalToday: 1,
};

describe("ordersWebSocketReducer", () => {
  it("should return the initial state", () => {
    expect(ordersWebSocketReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle ORDERS_WS_CONNECTION_SUCCESS", () => {
    const expectState = {
      ...initialState,
      error: undefined,
      wsConnected: true,
    };

    expect(
      ordersWebSocketReducer(initialState, {
        type: types.ORDERS_WS_CONNECTION_SUCCESS,
        error: undefined,
        wsConnected: true,
      })
    ).toEqual(expectState);
  });

  it("should handle ORDERS_WS_CONNECTION_ERROR", () => {
    const expectState = {
      ...initialState,
      error: {},
      wsConnected: false,
    };
    expect(
      ordersWebSocketReducer(initialState, {
        type: types.ORDERS_WS_CONNECTION_ERROR,
        error: {},
        wsConnected: false,
      })
    ).toEqual(expectState);
  });

  it("should handle ORDERS_WS_CONNECTION_CLOSED", () => {
    const expectState = {
      ...initialState,
      error: undefined,
      wsConnected: false,
      messages: null,
    };
    expect(
      ordersWebSocketReducer(initialState, {
        type: types.ORDERS_WS_CONNECTION_CLOSED,
        error: undefined,
        wsConnected: false,
        messages: null,
      })
    ).toEqual(expectState);
  });

  it("should handle ORDERS_WS_GET_MESSAGE", () => {
    const expectState = {
      ...initialState,
      error: undefined,
      messages: messagesState,
    };
    expect(
      ordersWebSocketReducer(initialState, {
        type: types.ORDERS_WS_GET_MESSAGE,
        error: undefined,
        messages: messagesState,
      })
    ).toEqual(expectState);
  });
});
