import React from "react";

const URL = "https://norma.nomoreparties.space/api/ingredients";

export const getData = async (info, setInfo) => {
  fetch(URL)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((data) => setInfo({ ...data, isLoaded: true, success: true }))
    .catch((e) => {
      setInfo({ ...info, success: false, isLoaded: false });
      console.error(e);
    });
};
