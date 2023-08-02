import React from "react";
import styles from "./AppHeader.module.css";
import AppNav from "../AppNav/AppNav";
import { Box } from "@ya.praktikum/react-developer-burger-ui-components";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo";
import NavItem from "../NavItem/NavItem";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

const AppHeader = () => {
  return (
    <header className={`pb-4 pt-4 ${styles.header}`}>
      <div className={styles.headerWrapper}>
        <AppNav />
        <h1 className={styles.headerLogo}>
          <a className={styles.headerLogoLink} href="#">
            <Logo />
          </a>
        </h1>
        <NavItem
          icon={<ProfileIcon type="primary" />}
          title="Личный кабинет"
          href="#"
          isActive={false}
        />
      </div>
    </header>
  );
};

export default AppHeader;
