import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import PriceItem from "../PriceItem/PriceItem";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import styles from "./BurgerIngredientsItem.module.css";
import { useSelector } from "react-redux";
import { getBurger } from "../../utils/functions/getStoreFunctions";
import { Link } from "react-router-dom";

const BurgerIngredientsItem = ({ item }) => {
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredients",
    item: item,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const location = useLocation();

  const ingredientId = item["_id"];

  const currentItems = useSelector(getBurger);

  const filteredArray = useMemo(() => {
    return currentItems.filter((element) => element._id === item._id);
  }, [currentItems, item._id]);
  const count = filteredArray.length;

  return (
    <>
      {!isDrag && (
        <Link
          className={styles.listItem}
          ref={dragRef}
          to={`/ingredients/${ingredientId}`}
          state={{ background: location }}
        >
          <div className={styles.imgWrapper}>
            <img alt={item.name} className={styles.img} src={item.image} />
          </div>
          <PriceItem price={item.price} />
          <span className={`text text_type_main-default ${styles.text}`}>
            {item.name}
          </span>
          {!!count && <Counter count={count} size="default" extraClass="m-1" />}
        </Link>
      )}
    </>
  );
};

BurgerIngredientsItem.propTypes = {
  item: PropTypes.object,
};

export default BurgerIngredientsItem;
