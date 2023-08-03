import React from "react";
import PriceItem from "../PriceItem/PriceItem";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredientsItem.module.css";

const BurgerIngredientsItem = ({ item }) => {
  return (
    <li className={styles.listItem}>
      <div className={styles.imgWrapper}>
        <img className={styles.img} src={item.image} />
      </div>
      <PriceItem price={item.price} />
      <span className={`text text_type_main-default ${styles.text}`}>
        {item.name}
      </span>
      <Counter count={1} size="default" extraClass="m-1" />
    </li>
  );
};

export default BurgerIngredientsItem;
