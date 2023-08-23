export const getDataLoading = (store) => store.data.isLoading;
export const getDataItems = (store) => store.data.items;

export const getBurgerConstructorCurrentItems = (store) =>
  store.burgerConstructor.currentItems;
export const getBurgerConstructorCurrentItemsRequest = (store) =>
  store.burgerConstructor.currentItemsRequest;

export const getTotalPrice = (store) => store.totalPrice;

export const getOrderNumber = (store) => store.order.orderNumber;
export const getOrderLoaded = (store) => store.order.isLoaded;

export const getCurrentIngredientCurrentItem = (store) =>
  store.currentIngredient.currentItem;
export const getCurrentIngredientIsLoaded = (store) =>
  store.currentIngredient.isLoaded;
