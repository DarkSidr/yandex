import { BURGER_API_URL } from "../../constants/constants";
import { checkReponse } from "./checkReponse ";

export const logoutRequest = async (refreshToken) => {
  return await fetch(`${BURGER_API_URL}/auth/logout`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
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
