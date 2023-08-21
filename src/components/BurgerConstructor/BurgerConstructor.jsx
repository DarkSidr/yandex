import React, { useEffect, useRef, useState, useMemo } from "react";
import { CURRENT_ITEMS_SUCCESS } from "../../services/actions/burgerConstructor";
import { TOTAL_PRICE } from "../../services/actions/totalPrice";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PriceItem from "../PriceItem/PriceItem";
import Modal from "../Modal/Modal";
import { usePopupClose } from "../../utils/hooks/usePopupClose";
import styles from "./BurgerConstructor.module.css";
import OrderDetails from "../OrderDetails/OrderDetails";
import { postData } from "../../utils/requests/postData";
import { useSelector, useDispatch } from "react-redux";
import { countBurgerCost, deleteItem } from "./BurgerConstructor.utils";

const BUN = "bun";
const MAIN = "main";
const SAUCE = "sauce";

const BurgerConstructor = () => {
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

  const delItem = (e) => {
    dispatch(deleteItem(e, currentItems));
  };

  const postResponse = () => {
    dispatch(postData(currentItems));
  };

  const { firstElement, lastElement } = useMemo(() => {
    const firstElement = currentItems[0];
    const lastElement = currentItems[currentItems.length - 1];
    return {
      firstElement,
      lastElement,
    };
  }, [currentItems]);

  return (
    <>
      <section className="mt-25 pl-4">
        {currentItemsRequest && (
          <div className={styles.burgerConstructor}>
            <div className={`${styles.wrapper}`}>
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
                {Array.from(new Set(currentItems)).map((item) => {
                  return (
                    <React.Fragment key={item._id}>
                      {item.type !== BUN && (
                        <div className={styles.row}>
                          <span className={styles.iconWrapper}>
                            <DragIcon type="primary" />
                          </span>
                          <ConstructorElement
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                            handleClose={(e) => {
                              delItem(e);
                            }}
                          />
                        </div>
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
