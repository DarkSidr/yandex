import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const TabItem = ({ title, value, current, setCurrent }) => {
  return (
    <Tab value={value} active={current === value} onClick={setCurrent}>
      {title}
    </Tab>
  );
};

TabItem.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  current: PropTypes.string,
  setCurrent: PropTypes.func,
};

export default TabItem;
