import React from "react";
import classNames from "classnames";
import styles from "./CustomAlert.module.css";

type TCustomAlert = {
  text: string;
  active: boolean;
};

const CustomAlert = ({ text, active }: TCustomAlert) => {
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
