import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BURGER } from "../../services/actions/burgerConstructor";
import EmptyBurger from "../EmptyBurger/EmptyBurger";
import { TOTAL_PRICE } from "../../services/actions/totalPrice";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PriceItem from "../PriceItem/PriceItem";
import Modal from "../Modal/Modal";
import { usePopupClose } from "../../utils/hooks/usePopupClose";
import styles from "./BurgerConstructor.module.css";
import OrderDetails from "../OrderDetails/OrderDetails";
import { postIDIngredients } from "../../utils/requests/postIDIngredients";
import { useSelector, useDispatch } from "react-redux";
import { countBurgerCost, deleteItem } from "./BurgerConstructor.utils";
import CustomAlert from "../CustomAlert/CustomAlert";
import { useDrop } from "react-dnd";
import BurgerConstructorItem, {
  TItemBurger,
} from "../BurgerConstructorItem/BurgerConstructorItem";
import {
  getBurgerConstructorCurrentIngredients,
  getBurgerConstructorCurrentBun,
  getBurger,
  getTotalPrice,
  getOrderNumber,
  getOrderLoaded,
  getLogin,
} from "../../utils/functions/getStoreFunctions";
import { AppDispatch } from "../..";

type TBurgerConstructor = {
  onDropHandler: (item: TItemBurger) => void;
};

const BurgerConstructor = ({ onDropHandler }: TBurgerConstructor) => {
  const login = useSelector(getLogin);

  const navigate = useNavigate();

  const location = useLocation();

  const [checkBun, setCheckBum] = useState(false);

  const currentIngredients = useSelector(
    getBurgerConstructorCurrentIngredients
  );

  const currentBun = useSelector(getBurgerConstructorCurrentBun);

  const burger = useSelector(getBurger);

  const totalPrice = useSelector(getTotalPrice);

  const orderNumber = useSelector(getOrderNumber);

  const isOrderLoading = useSelector(getOrderLoaded);

  const dispatch: AppDispatch = useDispatch();

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

  const [showModal, setShowModal] = useState<boolean>();

  usePopupClose(showModal, setShowModal);

  const delItem = (item: TItemBurger) => {
    dispatch(deleteItem(item, currentIngredients));
  };

  const postResponse = () => {
    dispatch(postIDIngredients(burger));
  };

  const [, dropTarget] = useDrop({
    accept: "ingredients",
    drop(item: TItemBurger) {
      onDropHandler(item);
    },
  });

  return (
    <>
      <section className="mt-25 pl-4">
        <div className={styles.burgerConstructor}>
          <div className={`${styles.wrapper}`} ref={dropTarget}>
            {currentBun ? (
              <div className="pl-8">
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${currentBun.name} (верх)`}
                  price={currentBun.price}
                  thumbnail={currentBun.image}
                />
              </div>
            ) : (
              <EmptyBurger type={"top"} text="Выберите булки"></EmptyBurger>
            )}
            {currentIngredients.length > 0 ? (
              <div className={`${styles.scrollContent} pl-8`}>
                {currentIngredients.map((item: TItemBurger, index: number) => {
                  return (
                    <React.Fragment key={item.uniqueId}>
                      <BurgerConstructorItem
                        item={item}
                        index={index}
                        delItem={delItem}
                      />
                    </React.Fragment>
                  );
                })}
              </div>
            ) : (
              <EmptyBurger text="Выберите начинки"></EmptyBurger>
            )}
            {currentBun ? (
              <div className="pl-8">
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${currentBun.name} (низ)`}
                  price={currentBun.price}
                  thumbnail={currentBun.image}
                />
              </div>
            ) : (
              <EmptyBurger type={"bottom"} text="Выберите булки"></EmptyBurger>
            )}
          </div>

          <div className={`mt-10 ${styles.acceptBlock}`}>
            <PriceItem price={totalPrice} large={true} />
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={() => {
                if (!login.isAuthenticated) {
                  navigate("/login", {
                    state: { previousPath: location.pathname },
                  });
                }
                if (!currentBun && login.isAuthenticated) {
                  setCheckBum(true);
                }

                if (currentBun && login.isAuthenticated) {
                  setCheckBum(false);
                  setShowModal(true);
                  postResponse();
                }
              }}
            >
              Оформить заказ
            </Button>
          </div>
          <CustomAlert text="выберите булки" active={checkBun && !currentBun} />
        </div>
      </section>
      {showModal && isOrderLoading && (
        <Modal setState={setShowModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
