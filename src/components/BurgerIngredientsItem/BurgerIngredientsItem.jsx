import React, { useMemo } from "react";
import PropTypes from "prop-types";
import PriceItem from "../PriceItem/PriceItem";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import styles from "./BurgerIngredientsItem.module.css";
import { useSelector } from "react-redux";
import { getBurgerConstructorCurrentItems } from "../../utils/functions/getStoreFunctions";

const BurgerIngredientsItem = ({ item, onChange, getData }) => {
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredients",
    item: item,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const currentItems = useSelector(getBurgerConstructorCurrentItems);

  const filteredArray = useMemo(() => {
    return currentItems.filter((element) => element._id === item._id);
  }, [currentItems]);
  const count = filteredArray.length;

  return (
    <>
      {!isDrag && (
        <li
          className={styles.listItem}
          ref={dragRef}
          onClick={() => {
            onChange(true);
            getData(item);
          }}
        >
          <div className={styles.imgWrapper}>
            <img alt={item.name} className={styles.img} src={item.image} />
          </div>
          <PriceItem price={item.price} />
          <span className={`text text_type_main-default ${styles.text}`}>
            {item.name}
          </span>
          {!!count && <Counter count={count} size="default" extraClass="m-1" />}
        </li>
      )}
    </>
  );
};

BurgerIngredientsItem.propTypes = {
  item: PropTypes.object,
  onChange: PropTypes.func,
};

export default BurgerIngredientsItem;
