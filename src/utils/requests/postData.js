import React from "react";

const URL = "https://norma.nomoreparties.space/api/orders";

export const postData = async (ingredients, setOrder) => {
  let response = await fetch(URL, {
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
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((res) =>
      setOrder({
        success: res.success,
        orderNumber: res.order.number,
        name: res.name,
        isLoaded: true,
      })
    )
    .catch((e) => {
      setOrder({ success: false, orderNumber: 0, name: "", isLoaded: false });
      console.error(e);
    });
};
