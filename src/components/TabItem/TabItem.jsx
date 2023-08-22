import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const TabItem = ({
  title,
  value,
  activeIndex,
  handleMenuItemClick,
  menuItemsRef,
  index,
}) => {
  return (
    <div ref={(el) => (menuItemsRef.current[index] = el)}>
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

TabItem.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  current: PropTypes.string,
  setCurrent: PropTypes.func,
};

export default TabItem;
