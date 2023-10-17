import {
  CURRENT_ORDER_FAILURE,
  CURRENT_ORDER_REQUEST,
  CURRENT_ORDER_RESET,
  CURRENT_ORDER_SUCCESS,
} from "../../services/actions/currentOrder";
import { TWebSocketOrder } from "./commonTypes";

type TData = {
  success: boolean;
  orders: TWebSocketOrder[];
};

export type TCurrentOrder = {
  isLoaded: boolean;
  data: null | TData;
  error: null | Event;
};

type TCurrentOrderRequestAction = {
  readonly type: typeof CURRENT_ORDER_REQUEST;
} & TCurrentOrder;

type TCurrentOrderSuccessAction = {
  readonly type: typeof CURRENT_ORDER_SUCCESS;
} & TCurrentOrder;

type TCurrentOrderFailureAction = {
  readonly type: typeof CURRENT_ORDER_FAILURE;
} & TCurrentOrder;

type TCurrentOrderResetAction = {
  readonly type: typeof CURRENT_ORDER_RESET;
} & TCurrentOrder;

export type TCurrentOrderActions =
  | TCurrentOrderRequestAction
  | TCurrentOrderSuccessAction
  | TCurrentOrderFailureAction
  | TCurrentOrderResetAction;
