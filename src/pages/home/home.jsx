import React, { useEffect } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import Loader from "../../components/Loader/Loader";

import { getIngredients } from "../../utils/requests/getIngredients";
import {
  getBurgerConstructorCurrentIngredients,
  getDataLoading,
} from "../../utils/functions/getStoreFunctions";

import {
  ADD_CURRENT_INGREDIENTS,
  CHANGE_BUN,
} from "../../services/actions/burgerConstructor";

import styles from "./home.module.css";

export const Home = () => {
  const dispatch = useDispatch();
  const currentItems = useSelector(getBurgerConstructorCurrentIngredients);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const itemsIsLoading = useSelector(getDataLoading);
  const handleDrop = (item) => {
    if (item.type === "bun") {
      dispatch({
        type: CHANGE_BUN,
        bun: item,
      });
    } else {
      dispatch({
        type: ADD_CURRENT_INGREDIENTS,
        ingredients: [...currentItems, item],
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
