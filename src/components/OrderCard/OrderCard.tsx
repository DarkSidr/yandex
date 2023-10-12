import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./OrderCard.module.css";
import { TOrder } from "../../utils/types/webSocketTypes";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import IconsAndPrice from "../IconsAndPrice/IconsAndPrice";

type TOrderCard = {
  item: TOrder;
};

const OrderCard = ({ item }: TOrderCard) => {
  const location = useLocation();
  return (
    <Link
      className={styles.feedItem}
      to={`/feed/${item.number}`}
      state={{ background: location }}
    >
      <div className={styles.feedItemTop}>
        <span className="text text_type_digits-default">#{item.number}</span>
        <FormattedDate
          className={classNames("text text_type_main-default", styles.date)}
          date={new Date(item.createdAt)}
        />
      </div>
      <p className="text text_type_main-medium">{item.name}</p>
      <IconsAndPrice ingredients={item.ingredients} />
    </Link>
  );
};

export default OrderCard;