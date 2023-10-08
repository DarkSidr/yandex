import { getData } from "./getData";
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
} from "../../services/actions/data";
import { AppThunk } from "../types";

export const getIngredients = (): AppThunk => {
  return async function (dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });
    return getData()
      .then((ingredients) => {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: ingredients,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ITEMS_FAILED,
          items: [],
        });
        console.error(err);
      });
  };
};
