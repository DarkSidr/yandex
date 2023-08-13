import React, { useContext } from "react";
import { DataContext } from "../../services/dataContext";
import Tabs from "../Tabs/Tabs";
import BurgerIngredientsItem from "../BurgerIngredientsItem/BurgerIngredientsItem";
import { usePopupClose } from "../../utils/hooks/usePopupClose";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import styles from "./BurgerIngredients.module.css";

const BurgerIngredients = () => {
  const { data } = useContext(DataContext);

  const sortData = data.reduce((acc, obj) => {
    const property = obj.type;
    acc[property] = acc[property] || [];
    acc[property].push(obj);
    return acc;
  }, {});

  const [itemModal, setItemModal] = React.useState();

  usePopupClose(itemModal, setItemModal);

  return (
    <>
      <section className="mt-10">
        <h2 className="text text_type_main-large">Соберите бургер</h2>
        <div className="mt-5 mb-10">
          <Tabs />
        </div>
        <div className={styles.burgerConstructor}>
          {["bun", "sauce", "main"].map((type, index) => {
            return (
              <div className={`mb-10`} key={index}>
                <h2 className="text text_type_main-medium mb-6">
                  {type === "bun"
                    ? "Булки"
                    : type === "sauce"
                    ? "Соусы"
                    : "Начинки"}
                </h2>
                <ul className={`${styles.list} pl-4`}>
                  {sortData[type].map((item) => (
                    <BurgerIngredientsItem
                      key={item._id}
                      item={item}
                      count={item.fat < 200 ? 1 : 0}
                      onChange={setItemModal}
                    />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
      {itemModal && (
        <Modal title="Детали ингредиента" setState={setItemModal}>
          <IngredientDetails {...itemModal} />
        </Modal>
      )}
    </>
  );
};

export default BurgerIngredients;
