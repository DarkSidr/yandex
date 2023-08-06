import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import styles from "./App.module.css";

const URL = "https://norma.nomoreparties.space/api/ingredients";

const App = () => {
  const [info, setInfo] = React.useState({
    success: true,
    isLoaded: false,
    data: [],
  });

  React.useEffect(() => {
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
      <main className={styles.main + " " + styles.show}>
        {info.isLoaded && <BurgerIngredients data={info.data} />}
        {info.isLoaded && <BurgerConstructor data={info.data} />}
      </main>
    </React.Fragment>
  );
};

export default App;
