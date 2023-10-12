import React, { useEffect } from "react";
import FeedOrderDetails from "../../../components/FeedOrderDetails/FeedOrderDetails";
import { useAppDispatch } from "../../../utils/hooks/useAppDispatch";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../../services/actions/webSocket";
import { useAppSelector } from "../../../utils/hooks/useAppSelector";
import { getFeedData } from "../../../utils/functions/getStoreFunctions";
import Loader from "../../../components/Loader/Loader";
import styles from "./feedOrder.module.css";
import { useParams } from "react-router-dom";
import classnames from "classnames";

export const FeedOrder = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
    });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  const data = useAppSelector(getFeedData);

  return (
    <>
      {!data.wsConnected &&
      !data?.messages?.orders &&
      (data.messages?.orders.length as number) !== 50 ? (
        <Loader />
      ) : (
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
              <FeedOrderDetails />
            </div>
          </div>
        </>
      )}
    </>
  );
};
