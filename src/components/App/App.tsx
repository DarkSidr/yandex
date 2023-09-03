import React, { useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import classNames from "classnames";
import styles from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../utils/requests/getIngredients";
import Loader from "../Loader/Loader";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  getBurgerConstructorCurrentIngredients,
  getDataLoading,
} from "../../utils/functions/getStoreFunctions";
import {
  ADD_CURRENT_INGREDIENTS,
  CHANGE_BUN,
} from "../../services/actions/burgerConstructor";

const App = () => {
  const dispatch = useDispatch();
  const currentItems = useSelector(getBurgerConstructorCurrentIngredients);

  useEffect(() => {
    //@ts-ignore
    dispatch(getIngredients());
  }, [dispatch]);

  const itemsIsLoading = useSelector(getDataLoading);
  //@ts-ignore
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
