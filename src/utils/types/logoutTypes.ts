import { TRequestError } from "./commonTypes";

export type TLogout = {
  loading: boolean;
  error: null | TRequestError;
};
