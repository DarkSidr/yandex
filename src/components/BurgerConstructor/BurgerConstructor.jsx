import React, { useEffect, useState } from "react";
import {
  ADD_CURRENT_INGREDIENTS,
  ADD_CURRENT_BUN,
  BURGER,
} from "../../services/actions/burgerConstructor";
import { TOTAL_PRICE } from "../../services/actions/totalPrice";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PriceItem from "../PriceItem/PriceItem";
import Modal from "../Modal/Modal";
import { usePopupClose } from "../../utils/hooks/usePopupClose";
import styles from "./BurgerConstructor.module.css";
import OrderDetails from "../OrderDetails/OrderDetails";
import { postData } from "../../utils/requests/postData";
import { useSelector, useDispatch } from "react-redux";
import { countBurgerCost, deleteItem } from "./BurgerConstructor.utils";
import { useDrop } from "react-dnd";
import BurgerConstructorItem from "../BurgerConstructorItem/BurgerConstructorItem";
import {
  getDataItems,
  getBurgerConstructorCurrentIngredients,
  getBurgerConstructorCurrentBun,
  getBurger,
  getBurgerConstructorBurgerConstructorRequest,
  getTotalPrice,
  getOrderNumber,
  getOrderLoaded,
} from "../../utils/functions/getStoreFunctions";
import PropTypes from "prop-types";

const BUN = "bun";
const MAIN = "main";
const SAUCE = "sauce";

const BurgerConstructor = ({ onDropHandler }) => {
  const items = useSelector(getDataItems);

  const currentIngredients = useSelector(
    getBurgerConstructorCurrentIngredients
  );

  const currentBun = useSelector(getBurgerConstructorCurrentBun);

  const burger = useSelector(getBurger);

  const burgerConstructorRequest = useSelector(
    getBurgerConstructorBurgerConstructorRequest
  );

  const totalPrice = useSelector(getTotalPrice);

  const orderNumber = useSelector(getOrderNumber);

  const isOrderLoading = useSelector(getOrderLoaded);

  const dispatch = useDispatch();

  useEffect(() => {
    const currentIngredients = items.filter((obj) => obj.type !== BUN);
    const currentBun = items.find(
      (obj, index) =>
        obj.type === BUN && items.findIndex((o) => o.type === BUN) === index
    );

    dispatch({
      type: ADD_CURRENT_INGREDIENTS,
      ingredients: currentIngredients,
    });

    dispatch({
      type: ADD_CURRENT_BUN,
      bun: currentBun,
    });
  }, [dispatch, items]);

  useEffect(() => {
    if (currentBun && currentIngredients) {
      dispatch({
        type: BURGER,
        burger: [currentBun, ...currentIngredients, currentBun],
      });
    }
  }, [dispatch, currentBun, currentIngredients]);

  useEffect(() => {
    dispatch({
      type: TOTAL_PRICE,
      totalPrice: countBurgerCost(burger),
    });
  }, [dispatch, burger]);

  const [itemModal, setItemModal] = useState();

  usePopupClose(itemModal, setItemModal);

  const delItem = (item) => {
    dispatch(deleteItem(item, currentIngredients));
  };

  const postResponse = () => {
    dispatch(postData(burger));
  };

  const [, dropTarget] = useDrop({
    accept: "ingredients",
    drop(item) {
      onDropHandler(item);
    },
  });

  const randomInteger = function (min, max) {
    return min + Math.random() * (max + 1 - min);
  };

  return (
    <>
      <section className="mt-25 pl-4">
        {burgerConstructorRequest && (
          <div className={styles.burgerConstructor}>
            <div className={`${styles.wrapper}`} ref={dropTarget}>
              <div className="pl-8">
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${currentBun.name} (верх)`}
                  price={currentBun.price}
                  thumbnail={currentBun.image}
                />
              </div>
              <div className={`${styles.scrollContent} pl-8`}>
                {currentIngredients.map((item, index) => {
                  return (
                    <React.Fragment key={randomInteger(0, index)}>
                      <BurgerConstructorItem
                        item={item}
                        index={index}
                        delItem={delItem}
                      />
                    </React.Fragment>
                  );
                })}
              </div>
              <div className="pl-8">
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${currentBun.name} (низ)`}
                  price={currentBun.price}
                  thumbnail={currentBun.image}
                />
              </div>
            </div>

            <div className={`mt-10 ${styles.acceptBlock}`}>
              <PriceItem price={totalPrice} large={true} />
              <Button
                htmlType="button"
                type="primary"
                size="large"
                onClick={() => {
                  setItemModal(true);
                  postResponse();
                }}
              >
                Нажми на меня
              </Button>
            </div>
          </div>
        )}
      </section>
      {itemModal && isOrderLoading && (
        <Modal setState={setItemModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </>
  );
};

BurgerConstructor.propTypes = {
  onDropHandler: PropTypes.func,
};

export default BurgerConstructor;
