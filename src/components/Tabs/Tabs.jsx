import TabItem from "../TabItem/TabItem";
import PropTypes from "prop-types";
import styles from "./Tabs.module.css";

const tabItems = [
  {
    id: 1,
    title: "Булки",
    value: "bun",
    isActive: true,
  },
  {
    id: 2,
    title: "Соусы",
    value: "sauce",
    isActive: false,
  },
  {
    id: 3,
    title: "Начинки",
    value: "main",
    isActive: false,
  },
];

const Tabs = ({ activeIndex, menuItemsRef, handleMenuItemClick }) => {
  return (
    <div className={styles.tabWrapepr}>
      {tabItems.map((tab, index) => {
        return (
          <TabItem
            key={tab.id}
            title={tab.title}
            value={tab.value}
            activeIndex={activeIndex}
            handleMenuItemClick={handleMenuItemClick}
            menuItemsRef={menuItemsRef}
            index={index}
          />
        );
      })}
    </div>
  );
};

Tabs.propTypes = {
  activeIndex: PropTypes.number,
  menuItemsRef: PropTypes.object,
  handleMenuItemClick: PropTypes.func,
};

export default Tabs;
