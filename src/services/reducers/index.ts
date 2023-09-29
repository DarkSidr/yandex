import { combineReducers } from "redux";
import { dataReducer } from "./data";
import { burgerConstructorReducer } from "./burgerConstructor";
import { totalPriceReducer } from "./totalPrice";
import { orderReducer } from "./order";
import { registerReducer } from "./register";
import { loginReducer } from "./login";
import { userReducer } from "./user";
import { logoutReducer } from "./logout";
import { updateUserInfoReducer } from "./updateUserInfo";
import { updatePasswordReducer } from "./updatePassword";
import { newPasswordReducer } from "./newPassword";

export const rootReducer = combineReducers({
  data: dataReducer,
  burgerConstructor: burgerConstructorReducer,
  totalPrice: totalPriceReducer,
  order: orderReducer,
  registerReducer: registerReducer,
  loginReducer: loginReducer,
  userReducer: userReducer,
  logoutReducer: logoutReducer,
  updateUserInfoReducer: updateUserInfoReducer,
  updatePasswordReducer: updatePasswordReducer,
  newPasswordReducer: newPasswordReducer,
});
