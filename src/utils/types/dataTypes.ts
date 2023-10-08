import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
} from "../../services/actions/data";
import { TItemBurger } from "./commonTypes";

type TDataItems = {
  items: [] | TItemBurger[];
};

type TDataLoading = {
  isLoading: null | boolean;
};

export type TData = {
  itemsRequest: boolean;
  itemsFailed: boolean;
} & TDataItems &
  TDataLoading;

export type TGetItemsRequestAction = {
  type: typeof GET_ITEMS_REQUEST;
};

export type TGetItemsSuccessAction = {
  type: typeof GET_ITEMS_SUCCESS;
};

export type TGetItemsFailedAction = {
  type: typeof GET_ITEMS_FAILED;
};

export type TDataActions =
  | TGetItemsRequestAction
  | TGetItemsSuccessAction
  | TGetItemsFailedAction;

export type TDataReducer =
  | TGetItemsRequestAction
  | (TGetItemsSuccessAction & TDataItems)
  | TGetItemsFailedAction;
