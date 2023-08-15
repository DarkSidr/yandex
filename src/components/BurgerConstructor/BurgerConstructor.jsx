import React, { useContext, useState } from "react";
import { DataContext } from "../../services/dataContext";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PriceItem from "../PriceItem/PriceItem";
import Modal from "../Modal/Modal";
import { usePopupClose } from "../../utils/hooks/usePopupClose";
import styles from "./BurgerConstructor.module.css";
import OrderDetails from "../OrderDetails/OrderDetails";
import { postData } from "../../utils/requests/postData";
import { useCartReducer } from "../../utils/hooks/useCartReducer";

const BUN = "bun";
const MAIN = "main";
const SAUCE = "sauce";

const BurgerConstructor = () => {
  const { data } = useContext(DataContext);

  const [order, setOrder] = React.useState({
    success: false,
    orderNumber: 0,
    name: "",
    isLoaded: false,
  });

  const [itemModal, setItemModal] = useState();

  usePopupClose(itemModal, setItemModal);

  const findBun = (data, name) => {
    return data.find((item) => {
      return item.name === name && item.type === BUN;
    });
  };

  const top = findBun(data, "Краторная булка N-200i");

  const bottom = findBun(data, "Краторная булка N-200i");

  const { cartItems, totalCost, removeFromCart } = useCartReducer(
    data,
    top,
    bottom
  );

  const uniqueIngredients = Array.from(new Set(cartItems));

  const postResponse = () => {
    postData(cartItems, setOrder);
  };

  return (
    <>
      <section className="mt-25 pl-4">
        <div className={styles.burgerConstructor}>
          <div className={`${styles.wrapper}`}>
            <div className="pl-8">
              <ConstructorElement
                type="top"
                isLocked={true}
                text={top.name + " " + "(верх)"}
                price={top.price}
                thumbnail={top.image}
              />
            </div>
            <div className={`${styles.scrollContent} pl-8`}>
              {uniqueIngredients.map((item) => {
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
                            const parent = e.target.closest(
                              ".constructor-element__row"
                            );
                            if (parent) {
                              removeFromCart({
                                name: parent.querySelector(
                                  ".constructor-element__text"
                                ).textContent,
                              });
                            }
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
                text={bottom.name + " " + "(низ)"}
                price={bottom.price}
                thumbnail={bottom.image}
              />
            </div>
          </div>
          <div className={`mt-10 ${styles.acceptBlock}`}>
            <PriceItem price={totalCost} large={true} />
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
      </section>
      {itemModal && order.isLoaded && (
        <Modal setState={setItemModal}>
          <OrderDetails orderNumber={order.orderNumber} />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
