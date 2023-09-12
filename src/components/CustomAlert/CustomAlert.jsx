import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
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

CustomAlert.propTypes = {
  text: PropTypes.string,
  active: PropTypes.bool,
};

export default CustomAlert;
