import React from "react";
import PropTypes from "prop-types";
import PriceItem from "../PriceItem/PriceItem";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import styles from "./BurgerIngredientsItem.module.css";
import useModalState from "../../utils/hooks/useModal";

const BurgerIngredientsItem = ({ item, count }) => {
  const { openModal, setOpenModal } = useModalState();

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <li
        className={styles.listItem}
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <div className={styles.imgWrapper}>
          <img alt={item.name} className={styles.img} src={item.image} />
        </div>
        <PriceItem price={item.price} />
        <span className={`text text_type_main-default ${styles.text}`}>
          {item.name}
        </span>
        {!!count && <Counter count={count} size="default" extraClass="m-1" />}
      </li>
      {openModal && (
        <Modal onClose={closeModal}>
          <IngredientDetails onClose={closeModal} {...item} />
        </Modal>
      )}
    </>
  );
};

BurgerIngredientsItem.propTypes = {
  item: PropTypes.object,
  count: PropTypes.number,
};

export default BurgerIngredientsItem;
