import styles from "./feed.module.css";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import { getFeedData } from "../../utils/functions/getStoreFunctions";
import { useEffect, useMemo } from "react";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import {
  FEED_WS_CONNECTION_CLOSED,
  FEED_WS_CONNECTION_START,
} from "../../services/actions/feedWebSocket";
import OrderCard from "../../components/OrderCard/OrderCard";
import OrderStatus from "../../components/OrderStatus/OrderStatus";
import OrderCount from "../../components/OrderCount/OrderCount";
import { TWebSocketOrder } from "../../utils/types/commonTypes";

export const Feed = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: FEED_WS_CONNECTION_START,
    });
    return () => {
      dispatch({ type: FEED_WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  const data = useAppSelector(getFeedData);

  const info = useMemo(() => {
    return data.messages;
  }, [data.messages]);

  const done = useMemo(() => {
    return info?.orders.filter((item) => item.status === "done");
  }, [info?.orders]);

  const pending = useMemo(() => {
    return info?.orders.filter((item) => item.status === "pending");
  }, [info?.orders]);

  return (
    <>
      {data.wsConnected && data.messages && info && (
        <main className={styles.mainWrapper}>
          <h2 className="text text_type_main-large">Лента заказов</h2>
          <div className={styles.wrapper}>
            <div className={styles.feed}>
              {info.orders.length > 0 &&
                info.orders.map((item: TWebSocketOrder) => {
                  return <OrderCard key={item._id} item={item} />;
                })}
            </div>
            <div className={styles.orderTable}>
              <div className={styles.orderTableTop}>
                <OrderStatus title="Готовы:" items={done} isDone />
                <OrderStatus title="В работе:" items={pending} />
              </div>
              <OrderCount title="Выполнено за все время:" count={info.total} />
              <OrderCount
                title="Выполнено за сегодня:"
                count={info.totalToday}
              />
            </div>
          </div>
        </main>
      )}
    </>
  );
};
