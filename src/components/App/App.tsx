import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredientsSection from "../BurgerIngredients/BurgerIngredients";
import styles from "./App.module.css";

const App = () => {
  return (
    <React.Fragment>
      <AppHeader />
      <main className={styles.main}>
        <section className="mt-10">
          <h2 className="text text_type_main-large">Соберите бургер</h2>
          <BurgerIngredientsSection />
        </section>
        <section></section>
      </main>
    </React.Fragment>
  );
};

export default App;
