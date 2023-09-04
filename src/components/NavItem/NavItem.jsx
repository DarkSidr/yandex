import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./NavItem.module.css";

const NavItem = ({ icon, title, href }) => {
  return (
    <NavLink
      to={href}
      className={({ isActive, isPending }) => {
        return isPending
          ? styles.link
          : isActive
          ? styles.linkActive + " " + styles.link
          : styles.link;
      }}
    >
      <span className={styles.iconWrapper}>{icon}</span>
      <span className="text text_type_main-default">{title}</span>
    </NavLink>
  );
};

NavItem.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string,
  href: PropTypes.string,
  // isActive: PropTypes.bool,
};

export default NavItem;
