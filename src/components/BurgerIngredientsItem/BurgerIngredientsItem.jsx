import React from "react";
import PropTypes from "prop-types";
import PriceItem from "../PriceItem/PriceItem";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredientsItem.module.css";

const BurgerIngredientsItem = ({ item, count, onChange, getData }) => {
  return (
    <>
      <li
        className={styles.listItem}
        onClick={() => {
          onChange(true);
          getData(item);
        }}
      >
        <div className={styles.imgWrapper}>
          <img alt={item.name} className={styles.img} src={item.image} />
        </div>
        <PriceItem price={item.price} />
        <span className={`text text_type_main-default ${styles.text}`}>
          {item.name}
        </span>
        {!!count && <Counter count={count} size="default" extraClass="m-1" />}
      </li>
    </>
  );
};

BurgerIngredientsItem.propTypes = {
  item: PropTypes.object,
  count: PropTypes.number,
  onChange: PropTypes.func,
};

export default BurgerIngredientsItem;
