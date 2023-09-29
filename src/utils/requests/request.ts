export const BASE_URL = "https://norma.nomoreparties.space/api/";

type TResponse = Response & {
  success: boolean;
  refreshToken: string;
  accessToken: string;
};

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }

  return res.json().then((err) => Promise.reject(err));
};

const checkSuccess = (res: TResponse) => {
  if (res && res.success) {
    return res;
  }

  return res.json().then((err) => Promise.reject(err));
};

export const request = (endpoint: string, options: RequestOptions) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};
