import React from "react";
import styles from "./OrderStatus.module.css";
import classNames from "classnames";
import { TWebSocketOrder } from "../../utils/types/commonTypes";

type TOrderStatus = {
  title: string;
  items?: TWebSocketOrder[];
  isDone?: boolean;
};

const OrderStatus = ({ title, items, isDone }: TOrderStatus) => {
  return (
    <div>
      <span className="text text_type_main-medium">{title}</span>
      <div className={styles.orderWrapper}>
        {items?.map((item) => {
          return (
            <span
              key={item._id}
              className={classNames(
                "text text_type_digits-default",
                isDone && styles.orderNumber
              )}
            >
              {item?.number}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatus;
