import React, { useMemo } from "react";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import { getDataItems } from "../../utils/functions/getStoreFunctions";
import { countBurgerCost } from "../BurgerConstructor/BurgerConstructor.utils";
import styles from "./IconsAndPrice.module.css";
import PriceItem from "../PriceItem/PriceItem";
import classNames from "classnames";
import { TItemBurger } from "../../utils/types/commonTypes";
import IconsWrapper from "../IconsWrapper/IconsWrapper";

type TIconsAndPrice = {
  ingredients: string[];
};

const generateImages = (items: TItemBurger[]) => {
  return items.slice(0, 6).map((item, index) => (
    <IconsWrapper
      key={item._id}
      item={item}
      index={index}
      itemsLength={items.length}
      isRowIcons
    >
      {index === 5 && items.length > 6 && (
        <>
          <span className={classNames(styles.opacity)}></span>
          <span
            className={classNames(
              styles.counter,
              "text text_type_main-default"
            )}
          >
            +{items.length - 6}
          </span>
        </>
      )}
    </IconsWrapper>
  ));
};

const IconsAndPrice = ({ ingredients }: TIconsAndPrice) => {
  const items = useAppSelector(getDataItems);

  const newArray = useMemo(() => {
    return ingredients.reduce((acc, ingredientId) => {
      const matchingItems = items.filter((item) => item._id === ingredientId);
      return acc.concat(matchingItems);
    }, [] as TItemBurger[]);
  }, [ingredients, items]);

  const uniqueNewArray = useMemo(() => {
    return newArray.reduce((acc, item) => {
      if (!acc.some((existingItem) => existingItem._id === item._id)) {
        acc.push(item);
      }
      return acc;
    }, [] as TItemBurger[]);
  }, [newArray]);

  const burgerCost = useMemo(() => {
    return countBurgerCost(newArray);
  }, [newArray]);

  const images = useMemo(() => {
    return generateImages(uniqueNewArray);
  }, [uniqueNewArray]);

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
