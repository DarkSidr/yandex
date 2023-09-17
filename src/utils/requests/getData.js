import { BURGER_API_URL } from "../../constants/constants";
import { checkReponse } from "./checkReponse ";

export async function getData() {
  return await fetch(`${BURGER_API_URL}/ingredients`)
    .then(checkReponse)
    .then((data) => {
      if (data?.success) return data.data;
      return Promise.reject(data);
    });
}
