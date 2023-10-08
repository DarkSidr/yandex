import { TOTAL_PRICE } from "../../services/actions/totalPrice";

export type TTotalPrice = {
  totalPrice: number;
};

export type TTotalPriceAction = {
  type: typeof TOTAL_PRICE;
};

export type TTotalPriceReducer = {
  type: typeof TOTAL_PRICE;
} & TTotalPrice;
