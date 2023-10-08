import { postData } from "./postData";
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from "../../services/actions/order";
import { TItemBurger } from "../types/commonTypes";
import { AppThunk } from "../types";

export const postIDIngredients = (ingredients: TItemBurger[]): AppThunk => {
  return async function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    return postData(ingredients)
      .then((data) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          success: data.success,
          orderNumber: data.order.number,
          name: data.name,
          isLoaded: true,
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
        console.error(e);
      });
  };
};
