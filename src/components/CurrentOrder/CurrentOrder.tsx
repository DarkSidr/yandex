import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import {
  getCurrentOrderDetails,
  getDataItems,
} from "../../utils/functions/getStoreFunctions";
import classNames from "classnames";
import styles from "./CurrentOrder.module.css";
import { TItemBurger } from "../../utils/types/commonTypes";
import IconsWrapper from "../IconsWrapper/IconsWrapper";
import PriceItem from "../PriceItem/PriceItem";
import { countBurgerCost } from "../BurgerConstructor/BurgerConstructor.utils";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import Status from "../Status/Status";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import { currentOrder } from "../../services/api";
import Loader from "../Loader/Loader";
import { CURRENT_ORDER_RESET } from "../../services/actions/currentOrder";

type TItemBurgerWithCount = { count: number } & TItemBurger;

const CurrentOrder = () => {
  const { id } = useParams();
  const allIngredients = useAppSelector(getDataItems);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(currentOrder(id as string));
    return () => {
      dispatch({ type: CURRENT_ORDER_RESET });
    };
  }, [dispatch, id]);

  const data = useAppSelector(getCurrentOrderDetails);

  const info = data.data?.orders[0];

  const burger = useMemo(() => {
    if (data.data?.orders) {
      return info?.ingredients.reduce((acc, ingredientId) => {
        const matchingItems = allIngredients.filter(
          (item) => item._id === ingredientId
        );
        return acc.concat(matchingItems);
      }, [] as TItemBurger[]);
    }
  }, [data, info?.ingredients, allIngredients]);

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
    <>
      {!data.isLoaded && !ingredients?.length ? (
        <Loader />
      ) : (
        <div className={classNames("mt-5", styles.modalWrapper)}>
          <div className={styles.topTextWrapper}>
            <h3 className="text text_type_main-medium">{info?.name}</h3>
            <Status status={info?.status as string} />
          </div>
          <div className="mt-15">
            <h3 className="text text_type_main-medium">Состав:</h3>
            <div className={styles.ingredientsWrapper}>
              {ingredients?.map((item) => {
                return (
                  <div className={styles.ingredientsRow} key={item._id}>
                    <div className={styles.iconAndName}>
                      <IconsWrapper item={item} />
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
                );
              })}
            </div>
            <div className={styles.modalBottom}>
              <span>
                <FormattedDate
                  className={classNames(
                    "text text_type_main-default",
                    styles.date
                  )}
                  date={new Date(info?.createdAt as string)}
                />
              </span>
              <PriceItem price={burgerCost || ""} columnGap="medium" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentOrder;
