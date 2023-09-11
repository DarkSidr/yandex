import { BURGER_API_URL } from "../../constants/constants";
import { checkReponse } from "./checkReponse ";

export const tokenRequest = async (refreshToken) => {
  return await fetch(`${BURGER_API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  })
    .then(checkReponse)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};
