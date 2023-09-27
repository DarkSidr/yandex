import React, { useRef } from "react";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop, useDrag, DropTargetMonitor } from "react-dnd";
import { XYCoord } from "dnd-core";
import { moveCard } from "../BurgerConstructor/BurgerConstructor.utils";
import styles from "./BurgerConstructorItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getBurgerConstructorCurrentIngredients } from "../../utils/functions/getStoreFunctions";
import { AppDispatch } from "../..";
import { TItemBurger } from "../../utils/types/commonTypes";

type TDelItemFN = (item: TItemBurger) => void;

type TDragItem = {
  index: number;
  id: string;
  type: string;
};

type TBurgerConstructorItem = {
  item: TItemBurger;
  index: number;
  delItem: TDelItemFN;
};

const BurgerConstructorItem = ({
  item,
  index,
  delItem,
}: TBurgerConstructorItem) => {
  const ref = useRef<HTMLDivElement>(null);

  const currentItems = useSelector(getBurgerConstructorCurrentIngredients);

  const dispatch: AppDispatch = useDispatch();

  const [, drop] = useDrop({
    accept: "other",
    hover: (item: TDragItem, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
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
