import React, { useRef } from "react";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop, useDrag } from "react-dnd";
import { moveCard } from "../BurgerConstructor/BurgerConstructor.utils";
import styles from "./BurgerConstructorItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getBurgerConstructorCurrentItems } from "../../utils/functions/getStoreFunctions";

const BurgerConstructorItem = ({ item, index, delItem }) => {
  const ref = useRef(null);

  const currentItems = useSelector(getBurgerConstructorCurrentItems);

  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: "other",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(moveCard(dragIndex, hoverIndex, currentItems));

      item.index = hoverIndex;
    },
  });

  const [{ isDrag }, drag] = useDrag({
    type: "other",
    item: () => {
      return { item, index };
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const opacity = isDrag ? 0 : 1;
  drag(drop(ref));
  return (
    <div ref={ref} className={styles.row} style={{ opacity }}>
      <span className={styles.iconWrapper}>
        <DragIcon type="primary" />
      </span>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => {
          delItem(item);
        }}
      />
    </div>
  );
};

export default BurgerConstructorItem;
