import React from "react";
import PropTypes from "prop-types";
import styles from "./IngredientDetails.module.css";
import { Box } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDataItems } from "../../utils/functions/getStoreFunctions";

const IngredientDetails = ({
  image_large,
  name,
  calories,
  proteins,
  fat,
  carbohydrates,
}) => {
  const { ingredientId } = useParams();
  const ingredient = useSelector(getDataItems).find(
    (item) => item._id === ingredientId
  );

  return (
    <>
      {ingredient && (
        <div className={`${styles.wrapper}`}>
          <div className={styles.modalBody}>
            <div className={styles.imgWrapper}>
              <img
                className={styles.img}
                src={ingredient.image_large}
                alt={ingredient.name}
              />
            </div>
            <div className={styles.modalText}>
              <h4 className="text text_type_main-medium">{ingredient.name}</h4>
              <div className={styles.foodProps}>
                <div className={styles.textBlock}>
                  <span className="text text_type_main-default">
                    Калории,ккал
                  </span>
                  <span className="text text_type_digits-default">
                    {ingredient.calories}
                  </span>
                </div>
                <div className={styles.textBlock}>
                  <span className="text text_type_main-default">Белки, г</span>
                  <span className="text text_type_digits-default">
                    {ingredient.proteins}
                  </span>
                </div>
                <div className={styles.textBlock}>
                  <span className="text text_type_main-default">Жиры, г</span>
                  <span className="text text_type_digits-default">
                    {ingredient.fat}
                  </span>
                </div>
                <div className={styles.textBlock}>
                  <span className="text text_type_main-default">
                    Углеводы, г
                  </span>
                  <span className="text text_type_digits-default">
                    {ingredient.carbohydrates}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
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
