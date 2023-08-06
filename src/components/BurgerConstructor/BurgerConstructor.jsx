import React from "react";
import PropTypes from "prop-types";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PriceItem from "../PriceItem/PriceItem";
import Modal from "../Modal/Modal";
import styles from "./BurgerConstructor.module.css";
import useModalState from "../../utils/hooks/useModal";
import OrderDetails from "../OrderDetails/OrderDetails";

const BurgerConstructor = ({ data }) => {
  const { openModal, setOpenModal } = useModalState();

  const top = data.find((item) => {
    return item.name === "Краторная булка N-200i";
  });
  const bottom = data.find((item) => {
    return item.name === "Краторная булка N-200i";
  });

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
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
          <PriceItem price={610} large={true} />
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Нажми на меня
          </Button>
        </div>
      </div>
      {openModal && (
        <Modal onClose={closeModal}>
          <OrderDetails onClose={closeModal} />
        </Modal>
      )}
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.array,
};

export default BurgerConstructor;
