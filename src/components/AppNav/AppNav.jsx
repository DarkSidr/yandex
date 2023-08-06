import React from "react";
import styles from "./AppNav.module.css";
import {
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

import NavItem from "../NavItem/NavItem";

const navList = [
  {
    id: 1,
    title: "Конструктор",
    icon: <BurgerIcon type="primary" />,
    href: "#",
    isActive: true,
  },
  {
    id: 2,
    title: "Лента заказов",
    icon: <ListIcon type="secondary" />,
    href: "#",
    isActive: false,
  },
];

const AppNav = () => {
  return (
    <nav>
      <ul className={styles.nav}>
        {navList.map((item) => {
          return (
            <li key={item.id}>
              <NavItem
                icon={item.icon}
                title={item.title}
                href={item.href}
                isActive={item.isActive}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AppNav;
