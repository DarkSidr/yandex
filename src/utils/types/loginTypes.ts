import { TRequestError, TRequestUser } from "./commonTypes";

export type TLogin = {
  user: null | TRequestUser;
  loading: boolean;
  error: null | TRequestError;
  isAuthenticated: boolean;
};

export type TLoginForm = {
  email: string;
  password: string;
};
