import React from "react";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import { getDataItems } from "../../utils/functions/getStoreFunctions";
import { countBurgerCost } from "../BurgerConstructor/BurgerConstructor.utils";
import styles from "./IconsAndPrice.module.css";
import PriceItem from "../PriceItem/PriceItem";
import classNames from "classnames";

type TIconsAndPrice = {
  ingredients: string[];
};

const IconsAndPrice = ({ ingredients }: TIconsAndPrice) => {
  const items = useAppSelector(getDataItems);

  const getData = (ingredients: string[]) => {
    const newArray = items.filter((item) => ingredients.includes(item._id));
    newArray.sort((a, b) => {
      if (a.type === "bun" && b.type !== "bun") {
        return -1;
      } else if (a.type !== "bun" && b.type === "bun") {
        return 1;
      } else {
        return 0;
      }
    });

    const resultArray = [];

    for (const item of newArray) {
      resultArray.push(item);
      if (item.type === "bun") {
        resultArray.push({ ...item });
      }
    }

    const burgerCost = countBurgerCost(resultArray);

    const images = newArray.slice(0, 6).map((item, index) => (
      <div
        className={classNames(styles.iconWrapper)}
        style={{ zIndex: newArray.length - index }}
        key={item._id}
      >
        <img
          className={classNames(styles.icon)}
          src={item.image_mobile}
          alt={item.name}
        />
        {index === 5 && newArray.length > 6 && (
          <>
            <span className={classNames(styles.opacity)}></span>
            <span
              className={classNames(
                styles.counter,
                "text text_type_main-default"
              )}
            >
              +{newArray.length - 6}
            </span>
          </>
        )}
      </div>
    ));

    return { burgerCost, images };
  };
  const { burgerCost, images } = getData(ingredients);

  return (
    <div className={styles.wrapper}>
      <div className={styles.iconsWrapper}>{images}</div>
      <div className={styles.priceWrapper}>
        <PriceItem price={burgerCost} columnGap="medium" />
      </div>
    </div>
  );
};

export default IconsAndPrice;
