import { useState, useEffect, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { getLogin } from "../../utils/functions/getStoreFunctions";
import Loader from "../Loader/Loader";

type TComponent = {
  component: ReactElement;
};

type TProtectedRouteElement = {
  onlyUnAuth?: boolean;
} & TComponent;

const ProtectedRouteElement = ({
  onlyUnAuth = false,
  component,
}: TProtectedRouteElement) => {
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
export const OnlyUnAuth = ({ component }: TComponent) => (
  <ProtectedRouteElement onlyUnAuth={true} component={component} />
);
