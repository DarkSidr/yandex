import { TRequestError } from "./commonTypes";

export type TUpdatePassword = {
  loading: boolean;
  error: null | TRequestError;
  updatePassword: null | boolean;
};
