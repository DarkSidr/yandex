import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
} from "../../services/actions/data";

const URL = "https://norma.nomoreparties.space/api/ingredients";

export function getData() {
  return async function (dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });
    await fetch(URL)
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            dispatch({
              type: GET_ITEMS_SUCCESS,
              items: data.data,
            });
          });
        } else {
          Promise.reject(res);
        }
      })
      .catch((e) => {
        dispatch({
          type: GET_ITEMS_FAILED,
          items: [],
        });
        console.error(e);
      });
  };
}
