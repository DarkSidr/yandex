type TOrderNumber = {
  orderNumber: number;
};

type TIsLoaded = {
  isLoaded: boolean;
};

export type TOrder = {
  success: boolean;
  name: string;
} & TOrderNumber &
  TIsLoaded;

export type TOrderNumberReducer = {
  order: TOrderNumber;
};

export type TOrderLoadedReducer = {
  order: TIsLoaded;
};
