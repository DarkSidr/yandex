import React from "react";
import PropTypes from "prop-types";
import styles from "./IngredientDetails.module.css";
import { Box } from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientDetails = ({
  image_large,
  name,
  calories,
  proteins,
  fat,
  carbohydrates,
}) => {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={styles.modalBody}>
        <div className={styles.imgWrapper}>
          <img className={styles.img} src={image_large} alt={name} />
        </div>
        <div className={styles.modalText}>
          <h4 className="text text_type_main-medium">{name}</h4>
          <div className={styles.foodProps}>
            <div className={styles.textBlock}>
              <span className="text text_type_main-default">Калории,ккал</span>
              <span className="text text_type_digits-default">{calories}</span>
            </div>
            <div className={styles.textBlock}>
              <span className="text text_type_main-default">Белки, г</span>
              <span className="text text_type_digits-default">{proteins}</span>
            </div>
            <div className={styles.textBlock}>
              <span className="text text_type_main-default">Жиры, г</span>
              <span className="text text_type_digits-default">{fat}</span>
            </div>
            <div className={styles.textBlock}>
              <span className="text text_type_main-default">Углеводы, г</span>
              <span className="text text_type_digits-default">
                {carbohydrates}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  image_large: PropTypes.string,
  name: PropTypes.string,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
};

export default IngredientDetails;