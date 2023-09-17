import React from "react";
import PropTypes from "prop-types";
import styles from "./EmptyBurger.module.css";
import classNames from "classnames";

const EmptyBurger = ({ type, text }) => {
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

EmptyBurger.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
};

export default EmptyBurger;
