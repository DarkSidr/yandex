import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { getLogin } from "../../utils/functions/getStoreFunctions";
import Loader from "../Loader/Loader";

const ProtectedRouteElement = ({ onlyUnAuth = false, component }) => {
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector(getLogin).user;
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350);

    return () => clearTimeout(timer);
  }, []);

  if (location.pathname === "/reset-password" && !location.state) {
    return <Navigate to="/forgot-password" />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ component }) => (
  <ProtectedRouteElement onlyUnAuth={true} component={component} />
);
