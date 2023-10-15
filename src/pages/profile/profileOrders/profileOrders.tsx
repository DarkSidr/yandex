import React, { useEffect, useMemo } from "react";
import ProfileMenu from "../../../components/ProfileMenu/ProfileMenu";
import ProfileWrapper from "../../../components/ProfileWrapper/ProfileWrapper";
import styles from "./profileOrders.module.css";
import { useAppDispatch } from "../../../utils/hooks/useAppDispatch";
import {
  ORDERS_WS_CONNECTION_CLOSED,
  ORDERS_WS_CONNECTION_START,
} from "../../../services/actions/ordersWebSocket";
import { useAppSelector } from "../../../utils/hooks/useAppSelector";
import { getOrdersData } from "../../../utils/functions/getStoreFunctions";
import { TWebSocketOrder } from "../../../utils/types/commonTypes";
import OrderCard from "../../../components/OrderCard/OrderCard";

const ProfileOrders = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: ORDERS_WS_CONNECTION_START,
    });
    return () => {
      dispatch({ type: ORDERS_WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  const data = useAppSelector(getOrdersData);

  const info = useMemo(() => {
    return data.messages;
  }, [data.messages]);

  console.log(info);

  return (
    <ProfileWrapper smallMargin>
      <div className={styles.menuWrapper}>
        <ProfileMenu />
      </div>
      <div className={styles.ordersWrapper}>
        {info?.orders.map((item: TWebSocketOrder) => {
          return (
            <OrderCard
              key={item._id}
              item={item}
              link="/profile/orders/"
              isShowStatus
            />
          );
        })}
      </div>
    </ProfileWrapper>
  );
};

export default ProfileOrders;
