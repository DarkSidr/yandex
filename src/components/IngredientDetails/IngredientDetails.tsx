import React from "react";
import styles from "./IngredientDetails.module.css";
import { useParams } from "react-router-dom";
import { getDataItems } from "../../utils/functions/getStoreFunctions";
import { TItemBurger } from "../../utils/types/commonTypes";
import { useAppSelector } from "../../utils/hooks/useAppSelector";

const IngredientDetails = () => {
  const { ingredientId } = useParams();
  const ingredient = useAppSelector(getDataItems).find(
    (item: TItemBurger) => item._id === ingredientId
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

export default IngredientDetails;
