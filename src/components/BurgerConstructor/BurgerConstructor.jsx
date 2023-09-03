import React, { useEffect, useRef, useState, useMemo } from "react";
import { ADD_CURRENT_ITEMS } from "../../services/actions/burgerConstructor";
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
  getBurgerConstructorCurrentItems,
  getBurgerConstructorCurrentItemsRequest,
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

  const currentItems = useSelector(getBurgerConstructorCurrentItems);

  const currentItemsRequest = useSelector(
    getBurgerConstructorCurrentItemsRequest
  );

  const totalPrice = useSelector(getTotalPrice);

  const orderNumber = useSelector(getOrderNumber);

  const isOrderLoading = useSelector(getOrderLoaded);

  const dispatch = useDispatch();

  const didLogRef = useRef(false);

  useEffect(() => {
    if (didLogRef.current === false) {
      didLogRef.current = true;
      const currentItems = items.filter(
        (obj, index) =>
          obj.type !== BUN ||
          (obj.type === BUN && items.findIndex((o) => o.type === BUN) === index)
      );
      currentItems.push(currentItems[0]);

      dispatch({
        type: ADD_CURRENT_ITEMS,
        currentItems: currentItems,
      });
    }
    dispatch({
      type: TOTAL_PRICE,
      totalPrice: countBurgerCost(currentItems),
    });
  }, [dispatch, items, currentItems]);

  const [itemModal, setItemModal] = useState();

  usePopupClose(itemModal, setItemModal);

  const delItem = (item) => {
    dispatch(deleteItem(item, currentItems));
  };

  const postResponse = () => {
    dispatch(postData(currentItems));
  };

  const { firstElement, lastElement } = useMemo(() => {
    const bun = currentItems.find((item) => item.type === BUN);
    const firstElement = bun;
    const lastElement = bun;
    return {
      firstElement,
      lastElement,
    };
  }, [currentItems]);

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
        {currentItemsRequest && (
          <div className={styles.burgerConstructor}>
            <div className={`${styles.wrapper}`} ref={dropTarget}>
              <div className="pl-8">
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${firstElement.name} (верх)`}
                  price={firstElement.price}
                  thumbnail={firstElement.image}
                />
              </div>
              <div className={`${styles.scrollContent} pl-8`}>
                {currentItems.map((item, index) => {
                  return (
                    <React.Fragment key={randomInteger(0, index)}>
                      {item.type !== BUN && (
                        <BurgerConstructorItem
                          item={item}
                          index={index}
                          delItem={delItem}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
              <div className="pl-8">
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${lastElement.name} (низ)`}
                  price={lastElement.price}
                  thumbnail={lastElement.image}
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
