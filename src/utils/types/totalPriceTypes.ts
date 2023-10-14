import { TOTAL_PRICE } from "../../services/actions/totalPrice";

export type TTotalPrice = {
  totalPrice: number;
};

export type TTotalPriceAction = {
  readonly type: typeof TOTAL_PRICE;
} & TTotalPrice;
