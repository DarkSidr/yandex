import { TRequestError } from "./commonTypes";

export type TNewPassword = {
  loading: boolean;
  error: null | TRequestError;
  newPassword: null | boolean;
};
