import { TLogin } from "../../utils/types/loginTypes";

export const getUserInfo = (login: TLogin) => {
  return {
    name: login.user ? login.user.user.name : "",
    email: login.user ? login.user.user.email : "",
  };
};
