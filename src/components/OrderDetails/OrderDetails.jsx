import React from "react";
import PropTypes from "prop-types";
import styles from "./OrderDetails.module.css";
import doneImage from "../../images/done.png";

const OrderDetails = ({ orderNumber }) => {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={styles.modalBody}>
        <h2 className={`text text_type_digits-large ${styles.modalTitle}`}>
          {orderNumber}
        </h2>
        <h3 className="text text_type_main-medium mt-8 mb-15">
          идентификатор заказа
        </h3>

        <div className={styles.imgWrapper}>
          <img src={doneImage} alt="done" />
        </div>

        <span className="text text_type_main-default">
          Ваш заказ начали готовить
        </span>

        <span className={`text text_type_main-default ${styles.textDecor}`}>
          Дождитесь готовности на орбитальной станции
        </span>
      </div>
    </div>
  );
};

OrderDetails.propTypes = {
  orderNumber: PropTypes.number,
};

export default OrderDetails;