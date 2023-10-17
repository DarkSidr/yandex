import classnames from "classnames";
import { useParams } from "react-router-dom";
import styles from "./currentOrderDetails.module.css";
import CurrentOrder from "../../components/CurrentOrder/CurrentOrder";

export const CurrentOrderDetails = () => {
  const { id } = useParams();
  return (
    <>
      <div className={styles.wrapper}>
        <div>
          <h1
            className={classnames(
              "text text_type_digits-default",
              styles.title
            )}
          >
            #{id}
          </h1>
          <CurrentOrder />
        </div>
      </div>
    </>
  );
};
