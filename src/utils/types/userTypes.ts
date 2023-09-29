import { TRequestError, TRequestUser } from "./commonTypes";

export type TUser = {
  data: null | TRequestUser;
  loading: boolean;
  error: null | TRequestError;
};
