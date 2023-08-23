import React, { useEffect, useRef, useState, useMemo } from "react";
import { CURRENT_ITEMS_SUCCESS } from "../../services/actions/burgerConstructor";
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

const BUN = "bun";
const MAIN = "main";
const SAUCE = "sauce";

const BurgerConstructor = ({ onDropHandler }) => {
  const items = useSelector((store) => store.data.items);

  const currentItems = useSelector(
    (store) => store.burgerConstructor.currentItems
  );

  const currentItemsRequest = useSelector(
    (store) => store.burgerConstructor.currentItemsRequest
  );

  const totalPrice = useSelector((store) => store.totalPrice);

  const orderNumber = useSelector((store) => store.order.orderNumber);

  const isOrderLoading = useSelector((store) => store.order.isLoaded);

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
        type: CURRENT_ITEMS_SUCCESS,
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

export default BurgerConstructor;
