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
  Feed,
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
import { getIngredients } from "../../utils/requests/getIngredients";
import Ingredients from "../../pages/ingredients/ingredients";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import ProfileOrders from "../../pages/profile/profileOrders/profileOrders";
import CurrentOrder from "../CurrentOrder/CurrentOrder";
import { CurrentOrderDetails } from "../../pages/currentOrderDetails/currentOrderDetails";

const App = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (accessToken && refreshToken) {
      dispatch(user(accessToken, refreshToken));
    }
  }, [dispatch, accessToken, refreshToken]);

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = (): void => {
    navigate(-1);
  };

  usePopupClose(background, handleModalClose);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/ingredients/:ingredientId" element={<Ingredients />} />
        <Route path="/feed/:id" element={<CurrentOrderDetails />} />
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
          path="/profile/orders"
          element={<OnlyAuth component={<ProfileOrders />} />}
        />

        <Route
          path="/profile/orders/:id"
          element={<OnlyAuth component={<CurrentOrderDetails />} />}
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

          <Route
            path="/feed/:id"
            element={
              <Modal setState={handleModalClose} isFeedOrder>
                <CurrentOrder />
              </Modal>
            }
          />

          <Route
            path="/profile/orders/:id"
            element={
              <Modal setState={handleModalClose} isFeedOrder>
                <CurrentOrder />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
