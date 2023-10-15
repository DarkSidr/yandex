import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./OrderCard.module.css";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import IconsAndPrice from "../IconsAndPrice/IconsAndPrice";
import { TWebSocketOrder } from "../../utils/types/commonTypes";
import Status from "../Status/Status";

type TOrderCard = {
  item: TWebSocketOrder;
  link: string;
  isShowStatus?: boolean;
};

const OrderCard = ({ item, link, isShowStatus = false }: TOrderCard) => {
  const location = useLocation();
  return (
    <Link
      className={styles.feedItem}
      to={`${link}${item.number}`}
      state={{ background: location }}
    >
      <div className={styles.feedItemTop}>
        <span className="text text_type_digits-default">#{item.number}</span>
        <FormattedDate
          className={classNames("text text_type_main-default", styles.date)}
          date={new Date(item.createdAt)}
        />
      </div>
      <div>
        <p className="text text_type_main-medium">{item.name}</p>
        {isShowStatus && (
          <div className="mt-2">
            <Status status={item.status} />
          </div>
        )}
      </div>
      <IconsAndPrice ingredients={item.ingredients} />
    </Link>
  );
};

export default OrderCard;
