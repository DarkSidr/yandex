import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavItem.module.css";

export type TNavItem = {
  id?: number;
  icon: JSX.Element;
  title: string;
  href: string;
};

const NavItem = ({ icon, title, href }: TNavItem) => {
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

export default NavItem;
