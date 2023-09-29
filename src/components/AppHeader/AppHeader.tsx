import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./AppHeader.module.css";
import AppNav from "../AppNav/AppNav";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo";
import NavItem from "../NavItem/NavItem";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { getLogin } from "../../utils/functions/getStoreFunctions";
import { useAppSelector } from "../../utils/hooks/useAppSelector";

const AppHeader = () => {
  const login = useAppSelector(getLogin);

  return (
    <header className={`pb-4 pt-4 ${styles.header}`}>
      <div className={styles.headerWrapper}>
        <AppNav />
        <h1 className={styles.headerLogo}>
          <NavLink to="/" className={styles.headerLogoLink}>
            <Logo />
          </NavLink>
        </h1>
        <NavItem
          icon={<ProfileIcon type="secondary" />}
          title="Личный кабинет"
          href={login.isAuthenticated ? "/profile" : "/login"}
        />
      </div>
    </header>
  );
};

export default AppHeader;
