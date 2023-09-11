import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  NotFound404,
} from "../../pages";
import AppHeader from "../AppHeader/AppHeader";
import { user } from "../../services/api";
import {
  OnlyAuth,
  OnlyUnAuth,
} from "../ProtectedRouteElement/ProtectedRouteElement";

const App = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken && refreshToken) {
      //@ts-ignore
      dispatch(user(accessToken, refreshToken));
    }
  }, [dispatch, accessToken, refreshToken]);

  return (
    <>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
          <Route
            path="/register"
            element={<OnlyUnAuth component={<Register />} />}
          />
          <Route
            path="/forgot-password"
            element={<OnlyUnAuth component={<ForgotPassword />} />}
          />
          <Route
            path="/reset-password"
            element={<OnlyUnAuth component={<ResetPassword />} />}
          />
          <Route
            path="/profile/*"
            element={<OnlyAuth component={<Profile />} />}
          />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
