import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { TItemTab, TMenuItemsRef } from "../Tabs/Tabs";

export type TTabItem = {
  activeIndex: number;
  handleMenuItemClick: (index: number) => void;
  index: number;
} & TItemTab &
  TMenuItemsRef;

const TabItem = ({
  title,
  value,
  activeIndex,
  handleMenuItemClick,
  menuItemsRef,
  index,
}: TTabItem) => {
  return (
    <div ref={(el) => el && (menuItemsRef.current[index] = el)}>
      <Tab
        value={value}
        active={activeIndex === index}
        onClick={() => {
          handleMenuItemClick(index);
        }}
      >
        {title}
      </Tab>
    </div>
  );
};

export default TabItem;
