import React, { useEffect, useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import classNames from "classnames";
import { DataContext } from "../../services/dataContext";
import { getData } from "../../utils/requests/getData";
import styles from "./App.module.css";

const App = () => {
  const [info, setInfo] = useState({
    success: true,
    isLoaded: false,
    data: [],
  });

  useEffect(() => {
    getData(info, setInfo);
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
