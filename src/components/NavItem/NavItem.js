import React from "react";
import styles from "./NavItem.module.css";

const NavItem = ({ icon, title, href, isActive }) => {
  return (
    <a
      className={
        isActive === true ? styles.link + " " + styles.linkActive : styles.link
      }
      href={href}
    >
      <span className={styles.iconWrapper}>{icon}</span>
      <span className="text text_type_main-default">{title}</span>
    </a>
  );
};

export default NavItem;
