import React, { useEffect, useMemo, useReducer, useRef } from "react";
import { countBurgerCost } from "../../components/BurgerConstructor/BurgerConstructor.utils";

const totalPriceInitialState = {
  cartItems: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "addToCart":
      const updatedIngredient = [...state.cartItems, action.payload];
      return {
        ...state,
        cartItems: updatedIngredient,
      };
    case "removeFromCart":
      const deleteItem = state.cartItems.find(
        (item) => item.name === action.payload.name
      );
      if (!deleteItem) {
        return state;
      }
      const newArr = state.cartItems.filter((item) => item !== deleteItem);
      return {
        ...state,
        cartItems: newArr,
      };
    default:
      throw new Error("Invalid action type.");
  }
};

export const useCartReducer = (data, top, bottom) => {
  const [totalPriceState, totalPriceDispatcher] = useReducer(
    reducer,
    totalPriceInitialState
  );

  const didLogRef = useRef(false);

  const addToCart = (product) => {
    totalPriceDispatcher({ type: "addToCart", payload: product });
  };

  const removeFromCart = (product) => {
    totalPriceDispatcher({ type: "removeFromCart", payload: product });
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

  const totalCost = useMemo(() => {
    return countBurgerCost(totalPriceState.cartItems);
  }, [totalPriceState.cartItems]);

  return {
    cartItems: totalPriceState.cartItems,
    totalCost,
    addToCart,
    removeFromCart,
  };
};
