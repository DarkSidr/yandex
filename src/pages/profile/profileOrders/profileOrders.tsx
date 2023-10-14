import React, { useEffect } from "react";
import ProfileMenu from "../../../components/ProfileMenu/ProfileMenu";
import ProfileWrapper from "../../../components/ProfileWrapper/ProfileWrapper";
import styles from "./profileOrders.module.css";
import { useAppDispatch } from "../../../utils/hooks/useAppDispatch";
import {
  ORDERS_WS_CONNECTION_CLOSED,
  ORDERS_WS_CONNECTION_START,
} from "../../../services/actions/ordersWebSocket";

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

  return (
    <ProfileWrapper smallMargin>
      <div className={styles.menuWrapper}>
        <ProfileMenu />
      </div>
    </ProfileWrapper>
  );
};

export default ProfileOrders;
