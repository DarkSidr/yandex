import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PriceItem from "../PriceItem/PriceItem";
import styles from "./BurgerConstructor.module.css";

const BurgerConstructor = () => {
  const top = data.find((item) => {
    return item.name === "Краторная булка N-200i";
  });
  const bottom = data.find((item) => {
    return item.name === "Флюоресцентная булка R2-D3";
  });
  return (
    <div className={styles.burgerConstructor}>
      <div className={`${styles.wrapper} pl-8`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={top.name}
          price={top.price}
          thumbnail={top.image}
        />
        <div className={styles.scrollContent}>
          {data.map((item) => {
            return (
              <>
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
              </>
            );
          })}
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bottom.name}
          price={bottom.price}
          thumbnail={bottom.image}
        />
      </div>
      <div className={`mt-10 ${styles.acceptBlock}`}>
        <PriceItem price={610} large={true}></PriceItem>
        <Button htmlType="button" type="primary" size="large">
          Нажми на меня
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
