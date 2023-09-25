import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./CloseModal.module.css";

type TCloseModal = {
  onClose: () => void;
};

const CloseModal = ({ onClose }: TCloseModal) => {
  return (
    <button className={styles.button} onClick={onClose}>
      <CloseIcon type="primary" />
    </button>
  );
};

export default CloseModal;
