import React from "react";
import styles from "./EmptyBurger.module.css";
import classNames from "classnames";

type TEmptyBurger = {
  type?: string;
  text: string;
};

const EmptyBurger = ({ type, text }: TEmptyBurger) => {
  return (
    <div
      className={classNames(
        styles.EmptyBurger,
        type === "top" ? styles.top : type === "bottom" ? styles.bottom : ""
      )}
    >
      <span className="text text_type_main-default">{text}</span>
    </div>
  );
};

export default EmptyBurger;
