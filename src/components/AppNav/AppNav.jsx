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
    href: "/",
  },
  {
    id: 2,
    title: "Лента заказов",
    icon: <ListIcon type="secondary" />,
    href: "/test",
  },
];

const AppNav = () => {
  return (
    <nav>
      <ul className={styles.nav}>
        {navList.map((item) => {
          return (
            <li key={item.id}>
              <NavItem icon={item.icon} title={item.title} href={item.href} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AppNav;
