import { BURGER_API_URL } from "../../constants/constants";
import { TItemBurger } from "../types/commonTypes";
import { checkReponse } from "./checkReponse ";

export async function postData(
  ingredients: TItemBurger[],
  accessToken: string
) {
  return fetch(`${BURGER_API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: accessToken,
    },
    body: JSON.stringify({
      ingredients: ingredients.map((item) => {
        return item._id;
      }),
    }),
  })
    .then(checkReponse)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
}
