import React from "react";
import styles from "./OrderCount.module.css";
import classNames from "classnames";

type TOrderCount = {
  title: string;
  count: number;
};

const OrderCount = ({ title, count }: TOrderCount) => {
  return (
    <div className={styles.wrapper}>
      <span className="text text_type_main-medium">{title}</span>
      <span className={classNames("text text_type_digits-large", styles.title)}>
        {count}
      </span>
    </div>
  );
};

export default OrderCount;
