import React, { useEffect, useReducer, useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import classNames from "classnames";
import { DataContext } from "../../services/dataContext";
import styles from "./App.module.css";

const URL = "https://norma.nomoreparties.space/api/ingredients";

const App = () => {
  const [info, setInfo] = useState({
    success: true,
    isLoaded: false,
    data: [],
  });

  useEffect(() => {
    const getInfo = async () => {
      fetch(URL)
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((data) => setInfo({ ...data, isLoaded: true, success: true }))
        .catch((e) => {
          setInfo({ ...info, success: false, isLoaded: false });
          console.error(e);
        });
    };

    getInfo();
  }, []);

  return (
    <React.Fragment>
      <AppHeader />
      <main className={classNames(styles.main, styles.show)}>
        <DataContext.Provider value={info}>
          {info.isLoaded && <BurgerIngredients />}
          {info.isLoaded && <BurgerConstructor />}
        </DataContext.Provider>
      </main>
    </React.Fragment>
  );
};

export default App;
