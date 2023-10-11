import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import styles from "./PriceItem.module.css";
import classNames from "classnames";

type TPriceItem = {
  price: number | string;
  large?: boolean;
  columnGap?: "small" | "medium";
};

const PriceItem = ({ price, large = false, columnGap }: TPriceItem) => {
  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.largeWrapper]: columnGap === "medium",
      })}
    >
      <span
        className={classNames(
          "text text_type_digits-default",
          large && "text_type_digits-medium"
        )}
      >
        {price}
      </span>
      <div className={classNames(styles.icon, large && styles.largeIcon)}>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

export default PriceItem;
