import { registerRequest } from "../utils/requests/registerRequest";
import { loginRequest } from "../utils/requests/loginRequest";
import { userRequest } from "../utils/requests/userRequest";
import { logoutRequest } from "../utils/requests/logoutRequest";
import { updateUserInfoRequest } from "../utils/requests/updateUserInfoRequest";
import { updatePasswordRequest } from "../utils/requests/updatePasswordRequest";
import { newPasswordRequest } from "../utils/requests/newPasswordRequest";

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./actions/register";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_LOGOUT,
  LOGIN_FAILURE,
} from "./actions/login";

import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from "./actions/user";

import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "./actions/logout";

import {
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAILURE,
} from "./actions/updateUserInfo";

import {
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
} from "./actions/updatePassword";

import {
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAILURE,
} from "./actions/newPassword";

import { tokenRequest } from "../utils/requests/tokenRequest";

export const register = (form) => {
  return async function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    return registerRequest(form)
      .then((data) => {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        dispatch({
          type: REGISTER_SUCCESS,
          user: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_FAILURE,
          error: err,
        });
        console.error(err);
      });
  };
};

export const login = (form) => {
  return async function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    return loginRequest(form)
      .then((data) => {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        dispatch({
          type: LOGIN_SUCCESS,
          user: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILURE,
          error: err,
        });
        console.error(err);
      });
  };
};

export const user = (accessToken, refreshToken) => {
  return async function (dispatch) {
    dispatch({
      type: FETCH_USER_REQUEST,
    });
    return userRequest(accessToken)
      .then((data) => {
        dispatch({
          type: FETCH_USER_SUCCESS,
          user: data,
        });
        dispatch({
          type: LOGIN_SUCCESS,
          user: data,
        });
      })
      .catch((err) => {
        if (err.message === "jwt expired") {
          tokenRequest(refreshToken)
            .then(async (res) => {
              localStorage.setItem("refreshToken", res.refreshToken);
              localStorage.setItem("accessToken", res.accessToken);
              const userData = await userRequest(res.accessToken);
              dispatch({
                type: FETCH_USER_SUCCESS,
                user: userData,
              });
              dispatch({
                type: LOGIN_SUCCESS,
                user: userData,
              });
            })
            .catch((error) => {
              dispatch({
                type: FETCH_USER_FAILURE,
                error: error,
              });
              console.log(error);
            });
        }
        dispatch({
          type: FETCH_USER_FAILURE,
          error: err,
        });
        console.error(err);
      });
  };
};

export const logout = (refreshToken) => {
  return async function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    return logoutRequest(refreshToken)
      .then((data) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch({
          type: LOGOUT_SUCCESS,
        });
        dispatch({
          type: LOGIN_LOGOUT,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOGOUT_FAILURE,
          error: err,
        });
        console.error(err);
      });
  };
};

export const updateUserInfo = (token, form) => {
  return async function (dispatch) {
    dispatch({
      type: UPDATE_USER_INFO_REQUEST,
    });
    return updateUserInfoRequest(token, form)
      .then((data) => {
        dispatch({
          type: UPDATE_USER_INFO_SUCCESS,
          user: data,
        });
        dispatch({
          type: LOGIN_SUCCESS,
          user: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_USER_INFO_FAILURE,
          error: err,
        });
        console.error(err);
      });
  };
};

export const updatePassword = (form) => {
  return async function (dispatch) {
    dispatch({
      type: UPDATE_PASSWORD_REQUEST,
    });
    return updatePasswordRequest(form)
      .then((data) => {
        dispatch({
          type: UPDATE_PASSWORD_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_PASSWORD_FAILURE,
          error: err,
        });
        console.error(err);
      });
  };
};

export const newPassword = (form) => {
  return async function (dispatch) {
    dispatch({
      type: NEW_PASSWORD_REQUEST,
    });
    return newPasswordRequest(form)
      .then((data) => {
        dispatch({
          type: NEW_PASSWORD_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: NEW_PASSWORD_FAILURE,
          error: err,
        });
        console.error(err);
      });
  };
};

export const updateToken = (refreshToken) => {
  return async function (dispatch) {
    dispatch({
      type: FETCH_USER_REQUEST,
    });
    return tokenRequest(refreshToken)
      .then(async (res) => {
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("accessToken", res.accessToken);
        const userData = await userRequest(res.accessToken);
        dispatch({
          type: FETCH_USER_SUCCESS,
          user: userData,
        });
        dispatch({
          type: LOGIN_SUCCESS,
          user: userData,
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_USER_FAILURE,
          error: error,
        });
        console.log(error);
      });
  };
};
