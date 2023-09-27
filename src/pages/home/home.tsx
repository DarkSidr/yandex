import React from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";

import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import Loader from "../../components/Loader/Loader";

import {
  getBurgerConstructorCurrentIngredients,
  getDataLoading,
} from "../../utils/functions/getStoreFunctions";

import {
  ADD_CURRENT_INGREDIENTS,
  ADD_CURRENT_BUN,
} from "../../services/actions/burgerConstructor";

import styles from "./home.module.css";
import { TItemBurger } from "../../utils/types/commonTypes";

export const Home = () => {
  const dispatch = useDispatch();
  const currentItems = useSelector(getBurgerConstructorCurrentIngredients);

  const itemsIsLoading = useSelector(getDataLoading);
  const handleDrop = (item: TItemBurger): void => {
    if (item.type === "bun") {
      dispatch({
        type: ADD_CURRENT_BUN,
        bun: item,
      });
    } else {
      dispatch({
        type: ADD_CURRENT_INGREDIENTS,
        ingredients: currentItems
          ? [...currentItems, { ...item, uniqueId: uuidv4() }]
          : [{ ...item, uniqueId: uuidv4() }],
      });
    }
  };

  return (
    <>
      {itemsIsLoading === true ? (
        <Loader />
      ) : itemsIsLoading === false ? (
        <React.Fragment>
          <DndProvider backend={HTML5Backend}>
            <main className={classNames(styles.main, styles.show)}>
              <BurgerIngredients />
              <BurgerConstructor onDropHandler={handleDrop} />
            </main>
          </DndProvider>
        </React.Fragment>
      ) : (
        <Loader />
      )}
    </>
  );
};
