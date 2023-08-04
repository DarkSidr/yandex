import React from "react";
import TabItem from "../TabItem/TabItem";
import styles from "./Tabs.module.css";

const tabItems = [
  {
    id: 1,
    title: "Булки",
    value: "rolls",
    isActive: true,
  },
  {
    id: 2,
    title: "Соусы",
    value: "sauces",
    isActive: false,
  },
  {
    id: 3,
    title: "Начинки",
    value: "toppings",
    isActive: false,
  },
];

const Tabs = () => {
  const [current, setCurrent] = React.useState("rolls");
  return (
    <div className={styles.tabWrapepr}>
      {tabItems.map((tab) => {
        return (
          <TabItem
            key={tab.id}
            title={tab.title}
            value={tab.value}
            current={current}
            setCurrent={setCurrent}
          />
        );
      })}
    </div>
  );
};

export default Tabs;
