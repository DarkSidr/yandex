import React, { useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import classNames from "classnames";
import styles from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../utils/requests/getData";
import Loader from "../Loader/Loader";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //@ts-ignore
    dispatch(getData());
  }, [dispatch]);

  const itemsIsLoading = useSelector((store: any) => {
    return store.data.isLoading;
  });

  return (
    <>
      {itemsIsLoading === true ? (
        <Loader />
      ) : itemsIsLoading === false ? (
        <React.Fragment>
          <AppHeader />
          <main className={classNames(styles.main, styles.show)}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </React.Fragment>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default App;
