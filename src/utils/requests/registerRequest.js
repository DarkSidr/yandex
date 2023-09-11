import { BURGER_API_URL } from "../../constants/constants";
import { checkReponse } from "./checkReponse ";

export const registerRequest = async (form) => {
  return await fetch(`${BURGER_API_URL}/auth/register`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  })
    .then(checkReponse)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};
