import styles from "./feed.module.css";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import { getFeedData } from "../../utils/functions/getStoreFunctions";
import { TOrder } from "../../utils/types/webSocketTypes";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/formatted-date/formatted-date";
import IconsAndPrice from "../../components/IconsAndPrice/IconsAndPrice";
import classNames from "classnames";
import { useEffect, useMemo } from "react";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions/webSocket";
import { Link, useLocation } from "react-router-dom";

export const Feed = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
    });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  const data = useAppSelector(getFeedData);

  const info = useMemo(() => {
    return data.messages;
  }, [data.messages]);

  const location = useLocation();

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
                info.orders.map((item: TOrder) => {
                  return (
                    <Link
                      key={item._id}
                      className={styles.feedItem}
                      to={`/feed/${item.number}`}
                      state={{ background: location }}
                    >
                      <div className={styles.feedItemTop}>
                        <span className="text text_type_digits-default">
                          #{item.number}
                        </span>
                        <FormattedDate
                          className={classNames(
                            "text text_type_main-default",
                            styles.date
                          )}
                          date={new Date(item.createdAt)}
                        />
                      </div>
                      <p className="text text_type_main-medium">{item.name}</p>
                      <IconsAndPrice ingredients={item.ingredients} />
                    </Link>
                  );
                })}
            </div>
            <div className={styles.orderTable}>
              <div className={styles.orderTableTop}>
                <div>
                  <span className="text text_type_main-medium">Готовы:</span>
                  <div className={styles.orderWrapper}>
                    {done?.map((item) => {
                      return (
                        <span
                          key={item._id}
                          className={classNames(
                            "text text_type_digits-default",
                            styles.orderNumber
                          )}
                        >
                          {item?.number}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <span className="text text_type_main-medium">В работе:</span>
                  <div className={styles.orderWrapper}>
                    {pending?.map((item) => {
                      return (
                        <span
                          key={item._id}
                          className={classNames(
                            "text text_type_digits-default"
                          )}
                        >
                          {item?.number}
                        </span>
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
