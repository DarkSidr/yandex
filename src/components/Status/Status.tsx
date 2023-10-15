import React from "react";
import styles from "./Status.module.css";
import classNames from "classnames";

type TStatus = {
  status: string;
};

const Status = ({ status }: TStatus) => {
  const statusMap: { [key: string]: string } = {
    done: "Выполнен",
    pending: "Готовится",
    created: "Создан",
  };

  return (
    <span
      className={classNames(
        "text text_type_main-default",
        status === "done" && styles.accentColor
      )}
    >
      {statusMap[status]}
    </span>
  );
};

export default Status;
