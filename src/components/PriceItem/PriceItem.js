import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import styles from "./PriceItem.module.css";

const PriceItem = ({ price }) => {
  return (
    <div className={styles.wrapper}>
      <span className="text text_type_digits-default">{price}</span>
      <div className={styles.icon}>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

export default PriceItem;
