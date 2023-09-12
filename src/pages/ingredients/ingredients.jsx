import React from "react";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import styles from "./ingredients.module.css";

const Ingredients = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      <IngredientDetails />
    </div>
  );
};

export default Ingredients;
