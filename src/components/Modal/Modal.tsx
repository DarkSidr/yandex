import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import CloseModal from "../CloseModal/CloseModal";
import styles from "./Modal.module.css";

type TModal = {
  title?: string;
  setState: (visible: boolean) => void;
  children: ReactNode;
};

const modalRoot = document.getElementById("modals");

const Modal = ({ title, setState, children }: TModal) => {
  const closeModal = (): void => {
    setState(false);
  };

  return modalRoot
    ? ReactDOM.createPortal(
        <>
          <ModalOverlay />
          <div className={`${styles.wrapper} pl-10 pt-10 pr-10 pb-15`}>
            <div
              className={`${
                title
                  ? styles.modalHeader
                  : styles.modalHeader + " " + styles.noTitle
              }`}
            >
              {title && <h3 className="text text_type_main-large">{title}</h3>}
              <CloseModal onClose={closeModal} />
            </div>

            {children}
          </div>
        </>,
        modalRoot
      )
    : null;
};

export default Modal;
