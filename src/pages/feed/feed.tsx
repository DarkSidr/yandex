import styles from "./feed.module.css";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import { getFeedData } from "../../utils/functions/getStoreFunctions";
import { TMessage, TOrder } from "../../utils/types/webSocketTypes";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/formatted-date/formatted-date";
import IconsAndPrice from "../../components/IconsAndPrice/IconsAndPrice";

export const Feed = () => {
  const data = useAppSelector(getFeedData);

  const info: TMessage = data.messages;

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
          </div>
        </main>
      )}
    </>
  );
};
