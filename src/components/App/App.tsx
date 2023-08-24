import React, { useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import classNames from "classnames";
import styles from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../utils/requests/getData";
import Loader from "../Loader/Loader";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ADD_CURRENT_ITEMS } from "../../services/actions/burgerConstructor";
import {
  getBurgerConstructorCurrentItems,
  getDataLoading,
} from "../../utils/functions/getStoreFunctions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //@ts-ignore
    dispatch(getData());
  }, [dispatch]);

  const itemsIsLoading = useSelector(getDataLoading);

  const currentItems = useSelector(getBurgerConstructorCurrentItems);
  //@ts-ignore
  const changeBun = (item) => {
    //@ts-ignore
    return currentItems.map((obj) => {
      if (obj.type === "bun") {
        return item;
      } else {
        return obj;
      }
    });
  };

  //@ts-ignore
  const handleDrop = (item) => {
    if (item.type === "bun") {
      const newArr = changeBun(item);
      dispatch({
        type: ADD_CURRENT_ITEMS,
        currentItems: [...newArr],
      });
    } else {
      dispatch({
        type: ADD_CURRENT_ITEMS,
        currentItems: [...currentItems, item],
      });
    }
  };

  return (
    <>
      {itemsIsLoading === true ? (
        <Loader />
      ) : itemsIsLoading === false ? (
        <React.Fragment>
          <AppHeader />
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

export default App;
