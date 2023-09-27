import { TItemBurger } from "./commonTypes";

type TDataItems = {
  items: TItemBurger[] | [];
};

type TDataLoading = {
  isLoading: null | boolean;
};

export type TData = {
  itemsRequest: boolean;
  itemsFailed: boolean;
} & TDataItems &
  TDataLoading;

export type TDataItemsReducer = {
  data: TDataItems;
};

export type TDataLoadingReducer = {
  data: TDataLoading;
};
