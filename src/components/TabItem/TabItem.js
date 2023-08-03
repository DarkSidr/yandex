import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const TabItem = ({ title, value, current, setCurrent }) => {
  return (
    <Tab value={value} active={current === value} onClick={setCurrent}>
      {title}
    </Tab>
  );
};

export default TabItem;
