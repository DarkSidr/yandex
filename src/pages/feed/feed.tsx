import styles from "./feed.module.css";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import { getFeedData } from "../../utils/functions/getStoreFunctions";
import { TWSState } from "../../services/reducers/webSocket";
import { TMessage, TOrder } from "../../utils/types/webSocketTypes";

export const Feed = () => {
  const data: TWSState = useAppSelector(getFeedData);
  const info: TMessage = data.messages;

  return (
    <>
      {data.wsConnected && data.messages && info && (
        <main className={styles.wrapper}>
          <div className={styles.feed}>
            {info.orders.length > 0 &&
              info.orders.map((item: TOrder, index: number) => {
                return (
                  <div key={item._id}>
                    <span>{index + 1}</span>
                    <div>
                      {item.name} <br />
                      {item.createdAt} <br />
                      {item.number}
                    </div>
                  </div>
                );
              })}
          </div>
        </main>
      )}
    </>
  );
};
