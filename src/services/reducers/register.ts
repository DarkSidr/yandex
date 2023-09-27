import { TRegister } from "../../utils/types/registerTypes";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_RESET,
  REGISTER_FAILURE,
} from "../actions/register";

type TRegisterRequest = {
  type: typeof REGISTER_REQUEST;
} & TRegister;

type TRegisterSuccess = {
  type: typeof REGISTER_SUCCESS;
} & TRegister;

type TRegisterReset = {
  type: typeof REGISTER_RESET;
} & TRegister;

type TRegisterFailure = {
  type: typeof REGISTER_FAILURE;
} & TRegister;

type TAction =
  | TRegisterRequest
  | TRegisterSuccess
  | TRegisterReset
  | TRegisterFailure;

const initialState: TRegister = {
  user: null,
  loading: false,
  error: null,
  isRegistered: false,
};

export const registerReducer = (state = initialState, action: TAction) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user,
        isRegistered: true,
      };
    case REGISTER_RESET:
      return {
        ...state,
        loading: false,
        isRegistered: false,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        isRegistered: false,
      };
    default:
      return state;
  }
};
