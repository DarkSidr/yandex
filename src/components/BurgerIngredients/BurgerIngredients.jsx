import React from "react";
import Tabs from "../Tabs/Tabs";
import BurgerIngredientsItem from "../BurgerIngredientsItem/BurgerIngredientsItem";
import { usePopupClose } from "../../utils/hooks/usePopupClose";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import styles from "./BurgerIngredients.module.css";
import { useDispatch, useSelector } from "react-redux";
import { GET_CURRENT_ITEM } from "../../services/actions/currentIngredient";

const BurgerIngredients = () => {
  const data = useSelector((store) => {
    return store.data.items;
  });

  const sortData = data.reduce((acc, obj) => {
    const property = obj.type;
    acc[property] = acc[property] || [];
    acc[property].push(obj);
    return acc;
  }, {});

  const itemModal = useSelector((store) => store.currentIngredient.currentItem);

  const isLoaded = useSelector((store) => store.currentIngredient.isLoaded);

  const dispatch = useDispatch();

  const getData = (item) => {
    dispatch({
      type: GET_CURRENT_ITEM,
      currentItem: item,
    });
  };

  const [openModal, setOpenModal] = React.useState(false);

  usePopupClose(openModal, setOpenModal);

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
                      onChange={setOpenModal}
                      getData={getData}
                    />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
      {openModal && itemModal && isLoaded && (
        <Modal title="Детали ингредиента" setState={setOpenModal}>
          <IngredientDetails {...itemModal} />
        </Modal>
      )}
    </>
  );
};

export default BurgerIngredients;
