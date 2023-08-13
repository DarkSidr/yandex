import React, { useEffect, useMemo, useReducer, useRef } from "react";

const totalPriceInitialState = {
  cartItems: [],
  totalCost: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "addToCart":
      const updatedIngredient = [...state.cartItems, action.payload];
      const updatedTotalCost = updatedIngredient.reduce(
        (total, item) => total + item.price,
        0
      );
      return {
        ...state,
        cartItems: updatedIngredient,
        totalCost: updatedTotalCost,
      };
    case "removeToCart":
      const deleteItem = state.cartItems.find(
        (item) => item.name === action.payload.name
      );
      if (!deleteItem) {
        return state;
      }
      const newArr = state.cartItems.filter((item) => item !== deleteItem);
      const newPrice = state.totalCost - deleteItem.price;
      return {
        ...state,
        cartItems: newArr,
        totalCost: newPrice,
      };
    default:
      throw new Error("Invalid action type.");
  }
};

export const usePriceReducer = (data, top, bottom) => {
  const [totalPriceState, totalPriceDispatcher] = useReducer(
    reducer,
    totalPriceInitialState
  );

  const didLogRef = useRef(false);

  const addToCart = (product) => {
    totalPriceDispatcher({ type: "addToCart", payload: product });
  };

  const removeToCart = (product) => {
    totalPriceDispatcher({ type: "removeToCart", payload: product });
  };

  useEffect(() => {
    if (didLogRef.current === false) {
      didLogRef.current = true;
      addToCart(top);
      addToCart(bottom);
      data.forEach((product) => {
        if (product.type !== "bun") {
          addToCart(product);
        }
      });
    }
  }, []);

  return useMemo(() => {
    return totalPriceState;
  }, [data, top, bottom]);
};
