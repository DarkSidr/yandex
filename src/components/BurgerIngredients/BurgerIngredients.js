import React from "react";
import Tabs from "../Tabs/Tabs";
import { data } from "../../utils/data";
import BurgerIngredientsItem from "../BurgerIngredientsItem/BurgerIngredientsItem";
import styles from "./BurgerIngredients.module.css";

const BurgerIngredients = () => {
  const sortData = data.reduce((acc, obj) => {
    const property = obj.type;
    acc[property] = acc[property] || [];
    acc[property].push(obj);
    return acc;
  }, {});

  return (
    <section className="mt-10">
      <h2 className="text text_type_main-large">Соберите бургер</h2>
      <div className="mt-5 mb-10">
        <Tabs />
      </div>
      <div className={styles.burgerConstructor}>
        {["bun", "sauce", "main"].map((type, index) => {
          return (
            <div className={`mb-10`} key={index}>
              <h2 className="text text_type_main-medium mb-6">
                {type === "bun"
                  ? "Булки"
                  : type === "sauce"
                  ? "Соусы"
                  : "Начинки"}
              </h2>
              <ul className={`${styles.list} pl-4`}>
                {sortData[type].map((item) => (
                  <BurgerIngredientsItem
                    key={item._id}
                    item={item}
                    count={item.fat < 200 ? 1 : 0}
                  />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BurgerIngredients;
