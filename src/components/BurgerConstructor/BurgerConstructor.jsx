import React, { useContext, useState, useReducer, useEffect } from "react";
import { DataContext } from "../../services/dataContext";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PriceItem from "../PriceItem/PriceItem";
import Modal from "../Modal/Modal";
import { usePopupClose } from "../../utils/hooks/usePopupClose";
import styles from "./BurgerConstructor.module.css";
import OrderDetails from "../OrderDetails/OrderDetails";

const totalPriceInitialState = {
  cartItems: [],
  totalCost: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "addToCart":
      const updatedIngredient = [...state.cartItems, action.payload];
      const updatedTotalCost = updatedIngredient.reduce(
        (total, item) => total + item.price,
        0
      );
      return {
        ...state,
        cartItems: updatedIngredient,
        totalCost: updatedTotalCost,
      };
    case "removeToCart":
      const deleteItem = state.cartItems.find(
        (item) => item.name === action.payload.name
      );
      if (!deleteItem) {
        return state;
      }
      const newArr = state.cartItems.filter((item) => item !== deleteItem);
      const newPrice = state.totalCost - deleteItem.price;
      return {
        ...state,
        cartItems: newArr,
        totalCost: newPrice,
      };
    default:
      throw new Error("Invalid action type.");
  }
};

const BurgerConstructor = () => {
  const { data } = useContext(DataContext);

  const [order, setOrder] = React.useState({
    success: false,
    orderNumber: 0,
    name: "",
    isLoaded: false,
  });

  const [totalPriceState, totalPriceDispatcher] = useReducer(
    reducer,
    totalPriceInitialState
  );

  const didLogRef = React.useRef(false);

  const [itemModal, setItemModal] = useState();

  usePopupClose(itemModal, setItemModal);

  const findBun = (data, name) => {
    return data.find((item) => {
      return item.name === name && item.type === "bun";
    });
  };

  const top = findBun(data, "Краторная булка N-200i");

  const bottom = findBun(data, "Краторная булка N-200i");

  const addToCart = (product) => {
    totalPriceDispatcher({ type: "addToCart", payload: product });
  };

  const removeToCart = (product) => {
    totalPriceDispatcher({ type: "removeToCart", payload: product });
  };

  useEffect(() => {
    if (didLogRef.current === false) {
      didLogRef.current = true;
      addToCart(top);
      addToCart(bottom);
      data.forEach((product) => {
        if (product.type !== "bun") {
          addToCart(product);
        }
      });
    }
  }, []);

  const postResponse = async () => {
    let response = await fetch("https://norma.nomoreparties.space/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        ingredients: totalPriceState.cartItems.map((item) => {
          return item._id;
        }),
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((res) =>
        setOrder({
          success: res.success,
          orderNumber: res.order.number,
          name: res.name,
          isLoaded: true,
        })
      )
      .catch((e) => {
        setOrder({ success: false, orderNumber: 0, name: "", isLoaded: false });
        console.error(e);
      });
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
              {data.map((item) => {
                return (
                  <React.Fragment key={item._id}>
                    {item.type !== "bun" && (
                      <div className={styles.row}>
                        <span className={styles.iconWrapper}>
                          <DragIcon type="primary" />
                        </span>
                        <ConstructorElement
                          text={item.name}
                          price={item.price}
                          thumbnail={item.image}
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
            <PriceItem price={totalPriceState.totalCost} large={true} />
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
