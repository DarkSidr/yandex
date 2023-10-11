import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import {
  getDataItems,
  getFeedData,
} from "../../utils/functions/getStoreFunctions";
import classNames from "classnames";
import styles from "./FeedOrderDetails.module.css";
import { TItemBurger } from "../../utils/types/commonTypes";
import IconsWrapper from "../IconsWrapper/IconsWrapper";
import PriceItem from "../PriceItem/PriceItem";
import { countBurgerCost } from "../BurgerConstructor/BurgerConstructor.utils";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

type TItemBurgerWithCount = { count: number } & TItemBurger;

const FeedOrderDetails = () => {
  const { id } = useParams();
  const data = useAppSelector(getFeedData);

  const items = useAppSelector(getDataItems);

  const info = useMemo(() => {
    if (data.messages && id) {
      return data.messages?.orders.find((item) => {
        return String(item.number) === id;
      });
    }
  }, [data, id]);

  const status: { [key: string]: string } = {
    done: "Выполнен",
    pending: "Готовится",
    created: "Создан",
  };

  const burger = useMemo(() => {
    if (info?.ingredients) {
      return info?.ingredients.reduce((acc, ingredientId) => {
        const matchingItems = items.filter((item) => item._id === ingredientId);
        return acc.concat(matchingItems);
      }, [] as TItemBurger[]);
    }
  }, [info, items]);

  const burgerCost = useMemo(() => {
    if (burger) {
      return countBurgerCost(burger);
    }
  }, [burger]);

  const ingredients = useMemo(() => {
    const idCount = {} as Record<string, number>;
    const result = burger?.reduce((acc, obj) => {
      const id = obj._id;
      if (!idCount[id]) {
        idCount[id] = 1;
        acc.push({ ...obj, count: 1 });
      } else {
        idCount[id]++;
        const existingItem = acc.find((item) => item._id === id);
        if (existingItem) {
          existingItem.count = idCount[id];
        }
      }
      return acc;
    }, [] as TItemBurgerWithCount[]);

    return result;
  }, [burger]);

  return (
    <div className={classNames("mt-5", styles.modalWrapper)}>
      <div className={styles.topTextWrapper}>
        <h3 className="text text_type_main-medium">{info?.name}</h3>
        <span
          className={classNames(
            "text text_type_main-default",
            styles.accentColor
          )}
        >
          {status[info?.status as string]}
        </span>
      </div>
      <div className="mt-15">
        <h3 className="text text_type_main-medium">Состав:</h3>
        <div className={styles.ingredientsWrapper}>
          <>
            {ingredients?.map((item) => {
              return (
                <>
                  <div className={styles.ingredientsRow}>
                    <div className={styles.iconAndName}>
                      <IconsWrapper key={item._id} item={item} />
                      <span className="text text_type_main-default">
                        {item.name}
                      </span>
                    </div>
                    <div>
                      <PriceItem
                        price={`${item.count} x ${item.price}`}
                        columnGap="medium"
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </>
        </div>
        <div className={styles.modalBottom}>
          <span>
            <FormattedDate
              className={classNames("text text_type_main-default", styles.date)}
              date={new Date(info?.createdAt as string)}
            />
          </span>
          <PriceItem price={burgerCost || ""} columnGap="medium" />
        </div>
      </div>
    </div>
  );
};

export default FeedOrderDetails;
