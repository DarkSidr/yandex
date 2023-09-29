import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import styles from "./PriceItem.module.css";

type TPriceItem = {
  price: number;
  large?: boolean;
};

const PriceItem = ({ price, large = false }: TPriceItem) => {
  return (
    <div className={`${styles.wrapper}  ${large && styles.largeWrapper}`}>
      <span
        className={`text text_type_digits-default ${
          large && "text_type_digits-medium"
        }`}
      >
        {price}
      </span>
      <div className={`${styles.icon} ${large && styles.largeIcon}`}>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

export default PriceItem;
