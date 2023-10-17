import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import CloseModal from "../CloseModal/CloseModal";
import styles from "./Modal.module.css";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import { GET_ORDER_FAILED } from "../../services/actions/order";
import classNames from "classnames";
import { useParams } from "react-router-dom";

type TModal = {
  title?: string;
  setState: (visible: boolean) => void;
  isFeedOrder?: boolean;
  children: ReactNode;
};

const modalRoot = document.getElementById("modals");

const Modal = ({ title, setState, isFeedOrder, children }: TModal) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const closeModal = (): void => {
    setState(false);
    dispatch({
      type: GET_ORDER_FAILED,
    });
  };

  return modalRoot
    ? ReactDOM.createPortal(
        <>
          <ModalOverlay />
          <div
            className={classNames(styles.wrapper, "pl-10 pt-10 pr-10 pb-15")}
          >
            <div
              className={classNames(
                styles.modalHeader,
                !title && !isFeedOrder && styles.noTitle
              )}
            >
              {title && <h3 className="text text_type_main-large">{title}</h3>}
              {id && isFeedOrder && (
                <h3 className="text text_type_digits-default">#{id}</h3>
              )}
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
