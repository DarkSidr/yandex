import {
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from "../../services/actions/order";

type TOrderNumber = {
  orderNumber: number;
};

type TIsLoaded = {
  isLoaded: boolean;
};

export type TOrder = {
  success: boolean;
  name: string;
} & TOrderNumber &
  TIsLoaded;

export type TGetOrderRequestAction = {
  readonly type: typeof GET_ORDER_REQUEST;
};

export type TGetOrderSuccessAction = {
  readonly type: typeof GET_ORDER_SUCCESS;
} & TOrder;

export type TGetOrderFailedAction = {
  readonly type: typeof GET_ORDER_FAILED;
};

export type TOrderActions =
  | TGetOrderRequestAction
  | TGetOrderSuccessAction
  | TGetOrderFailedAction;
