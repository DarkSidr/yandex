import { TRequestError, TRequestUser } from "./commonTypes";

export type TUpdateUserInfo = {
  user: null | TRequestUser;
  loading: boolean;
  error: null | TRequestError;
  isAuthenticated: boolean;
};
