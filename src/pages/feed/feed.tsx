import styles from "./feed.module.css";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import { getFeedData } from "../../utils/functions/getStoreFunctions";
import { TMessage, TOrder } from "../../utils/types/webSocketTypes";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/formatted-date/formatted-date";
import IconsAndPrice from "../../components/IconsAndPrice/IconsAndPrice";
import classNames from "classnames";
import { useEffect, useMemo } from "react";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions/webSocket";

export const Feed = () => {
  const data = useAppSelector(getFeedData);
  const info: TMessage = data.messages;
  const dispatch = useAppDispatch();

  const done = useMemo(() => {
    return info?.orders.filter((item) => item.status === "done");
  }, [info?.orders]);

  const pending = useMemo(() => {
    return info?.orders.filter((item) => item.status === "pending");
  }, [info?.orders]);

  const doneColums = useMemo(() => {
    const columns = [];
    let remaining = done && [...done];

    while (remaining && remaining.length > 0) {
      columns.push(remaining.splice(0, 10));
    }
    return columns;
  }, [done]);

  const pendingColums = useMemo(() => {
    const columns = [];
    let remaining = pending && [...pending];

    while (remaining && remaining?.length > 0) {
      columns.push(pending?.splice(0, 10));
    }
    return columns;
  }, [pending]);

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
    });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return (
    <>
      {data.wsConnected && data.messages && info && (
        <main className={styles.mainWrapper}>
          <h2 className="text text_type_main-large">Лента заказов</h2>
          <div className={styles.wrapper}>
            <div className={styles.feed}>
              {info.orders.length > 0 &&
                info.orders.map((item: TOrder) => {
                  return (
                    <div key={item._id} className={styles.feedItem}>
                      <div className={styles.feedItemTop}>
                        <span className="text text_type_digits-default">
                          #{item.number}
                        </span>
                        <FormattedDate
                          className={styles.date}
                          date={new Date(item.createdAt)}
                        />
                      </div>
                      <p className="text text_type_main-medium">{item.name}</p>
                      <IconsAndPrice ingredients={item.ingredients} />
                    </div>
                  );
                })}
            </div>
            <div className={styles.orderTable}>
              <div className={styles.orderTableTop}>
                <div>
                  <span className="text text_type_main-medium">Готовы:</span>
                  <div className={styles.orderWrapper}>
                    {doneColums?.map((item, index) => {
                      return (
                        <div className={styles.orderColumn} key={index}>
                          {item.map((number) => {
                            return (
                              <span
                                key={number?.number}
                                className={classNames(
                                  "text text_type_digits-default",
                                  styles.orderNumber
                                )}
                              >
                                {number?.number}
                              </span>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <span className="text text_type_main-medium">В работе:</span>
                  <div className={styles.orderWrapper}>
                    {pendingColums?.map((item, index) => {
                      return (
                        <div className={styles.orderColumn} key={index}>
                          {item?.map((number) => {
                            return (
                              <span
                                key={number?.number}
                                className={classNames(
                                  "text text_type_digits-default"
                                )}
                              >
                                {number?.number}
                              </span>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className={styles.allTheTime}>
                <span className="text text_type_main-medium">
                  Выполнено за все время:
                </span>
                <span
                  className={classNames(
                    "text text_type_digits-large",
                    styles.title
                  )}
                >
                  {info.total}
                </span>
              </div>
              <div className={styles.today}>
                <span className="text text_type_main-medium">
                  Выполнено за сегодня:
                </span>
                <span
                  className={classNames(
                    "text text_type_digits-large",
                    styles.title
                  )}
                >
                  {info.totalToday}
                </span>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};
