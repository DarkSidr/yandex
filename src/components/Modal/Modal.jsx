import React from "react";
import { useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import CloseModal from "../CloseModal/CloseModal";
import { DELETE_CURRENT_ITEM } from "../../services/actions/currentIngredient";
import styles from "./Modal.module.css";

const modalRoot = document.getElementById("modals");

const Modal = ({ title, setState, children }) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    setState(undefined);
    dispatch({
      type: DELETE_CURRENT_ITEM,
    });
  };

  return ReactDOM.createPortal(
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
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  setState: PropTypes.func,
  children: PropTypes.element,
};

export default Modal;