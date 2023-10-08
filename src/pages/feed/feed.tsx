import styles from "./feed.module.css";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import { getFeedData } from "../../utils/functions/getStoreFunctions";
import { TWSState } from "../../services/reducers/webSocket";
import { TMessage, TOrder } from "../../utils/types/webSocketTypes";

export const Feed = () => {
  const data: TWSState = useAppSelector(getFeedData);
  const info: TMessage = data.messages;
  console.log(info);

  return (
    <>
      {data.wsConnected && data.messages && (
        <main className={styles.wrapper}>
          <div className={styles.feed}>
            {info.orders.length > 0 &&
              info.orders.map((item: TOrder) => {
                return (
                  <div key={item._id}>
                    {item.name} <br />
                    {item.createdAt}
                  </div>
                );
              })}
          </div>
        </main>
      )}
    </>
  );
};
