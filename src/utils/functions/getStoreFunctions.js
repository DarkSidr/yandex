export const getDataLoading = (store) => store.data.isLoading;
export const getDataItems = (store) => store.data.items;

export const getBurgerConstructorCurrentIngredients = (store) =>
  store.burgerConstructor.ingredients;
export const getBurgerConstructorCurrentBun = (store) =>
  store.burgerConstructor.bun;
export const getBurger = (store) => store.burgerConstructor.burger;
export const getBurgerConstructorBurgerConstructorRequest = (store) =>
  store.burgerConstructor.burgerConstructorRequest;

export const getTotalPrice = (store) => store.totalPrice;

export const getOrderNumber = (store) => store.order.orderNumber;
export const getOrderLoaded = (store) => store.order.isLoaded;

export const getCurrentIngredientCurrentItem = (store) =>
  store.currentIngredient.currentItem;
export const getCurrentIngredientIsLoaded = (store) =>
  store.currentIngredient.isLoaded;
