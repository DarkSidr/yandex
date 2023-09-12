import React from "react";
import classNames from "classnames";
import styles from "./CustomAlert.module.css";

const CustomAlert = ({ text, active }) => {
  return (
    <div
      className={classNames(
        styles.customAlert,
        active && styles.customAlertActive
      )}
    >
      <span className="text text_type_main-large">{text}</span>
    </div>
  );
};

export default CustomAlert;
