import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { usePopupClose } from "../../utils/hooks/usePopupClose";
import { getCurrentIngredientCurrentItem } from "../../utils/functions/getStoreFunctions";
import { getIngredients } from "../../utils/requests/getIngredients";
import Ingredients from "../../pages/ingredients/ingredients";

const App = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const dispatch = useDispatch();

  useEffect(() => {
    //@ts-ignore
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (accessToken && refreshToken) {
      //@ts-ignore
      dispatch(user(accessToken, refreshToken));
    }
  }, [dispatch, accessToken, refreshToken]);

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  // const currentIngredient = useSelector(getCurrentIngredientCurrentItem);

  usePopupClose(background, handleModalClose);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/ingredients/:ingredientId" element={<Ingredients />} />
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
      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal setState={handleModalClose} title="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
