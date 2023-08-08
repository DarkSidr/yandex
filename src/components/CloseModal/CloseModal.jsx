import React from "react";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./CloseModal.module.css";

const CloseModal = ({ onClose }) => {
  return (
    <button className={styles.button} onClick={onClose}>
      <CloseIcon type="primary" />
    </button>
  );
};

CloseModal.propTypes = {
  onClose: PropTypes.func,
};

export default CloseModal;
