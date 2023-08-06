import React from "react";
import PropTypes from "prop-types";
import styles from "./ModalOverlay.module.css";

const ModalOverlay = ({ onClose }) => {
  return <div onClick={onClose} className={styles.modalOverlay}></div>;
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
};

export default ModalOverlay;
