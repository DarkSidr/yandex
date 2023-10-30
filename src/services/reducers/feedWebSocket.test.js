import { feedWebSocketReducer } from "./feedWebSocket";
import { initialState } from "./feedWebSocket";
import * as types from "../actions/feedWebSocket";

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

describe("feedWebSocketReducer", () => {
  it("should return the initial state", () => {
    expect(feedWebSocketReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle FEED_WS_CONNECTION_SUCCESS", () => {
    const expectState = {
      ...initialState,
      error: undefined,
      wsConnected: true,
    };

    expect(
      feedWebSocketReducer(initialState, {
        type: types.FEED_WS_CONNECTION_SUCCESS,
        error: undefined,
        wsConnected: true,
      })
    ).toEqual(expectState);
  });

  it("should handle FEED_WS_CONNECTION_ERROR", () => {
    const expectState = {
      ...initialState,
      error: {},
      wsConnected: false,
    };
    expect(
      feedWebSocketReducer(initialState, {
        type: types.FEED_WS_CONNECTION_ERROR,
        error: {},
        wsConnected: false,
      })
    ).toEqual(expectState);
  });

  it("should handle FEED_WS_CONNECTION_CLOSED", () => {
    const expectState = {
      ...initialState,
      error: undefined,
      wsConnected: false,
      messages: null,
    };
    expect(
      feedWebSocketReducer(initialState, {
        type: types.FEED_WS_CONNECTION_CLOSED,
        error: undefined,
        wsConnected: false,
        messages: null,
      })
    ).toEqual(expectState);
  });

  it("should handle FEED_WS_GET_MESSAGE", () => {
    const expectState = {
      ...initialState,
      error: undefined,
      messages: messagesState,
    };
    expect(
      feedWebSocketReducer(initialState, {
        type: types.FEED_WS_GET_MESSAGE,
        error: undefined,
        messages: messagesState,
      })
    ).toEqual(expectState);
  });
});
