import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from "../../services/actions/order";

const URL = "https://norma.nomoreparties.space/api/orders";

export function postData(ingredients) {
  return async function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        ingredients: ingredients.map((item) => {
          return item._id;
        }),
      }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            dispatch({
              type: GET_ORDER_SUCCESS,
              success: data.success,
              orderNumber: data.order.number,
              name: data.name,
              isLoaded: true,
            });
          });
        } else {
          Promise.reject(res);
        }
      })
      .catch((e) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
        console.error(e);
      });
  };
}
