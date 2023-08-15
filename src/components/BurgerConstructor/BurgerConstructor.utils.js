import React from "react";

export function countBurgerCost(ingredients) {
  return ingredients.reduce((total, item) => total + item.price, 0);
}
