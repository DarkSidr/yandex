import React, { ReactNode } from "react";
import styles from "./IconsWrapper.module.css";
import { TItemBurger } from "../../utils/types/commonTypes";

type TIconsWrapper = {
  itemsLength?: number;
  index?: number;
  isRowIcons?: boolean;
  item: TItemBurger;
  children?: ReactNode;
};

const IconsWrapper = ({
  itemsLength,
  index,
  isRowIcons,
  item,
  children,
}: TIconsWrapper) => {
  const length = itemsLength as number;
  const itemIndex = index as number;
  return (
    <div
      className={styles.iconWrapper}
      style={
        isRowIcons
          ? {
              zIndex: length - itemIndex,
              marginLeft: length - itemIndex === length ? "" : "-20px",
            }
          : {}
      }
    >
      <img className={styles.icon} src={item.image_mobile} alt={item.name} />
      {children}
    </div>
  );
};

export default IconsWrapper;
