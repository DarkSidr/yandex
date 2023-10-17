import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./ProfileMenu.module.css";
import classNames from "classnames";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import { logout } from "../../services/api";

type TPrfileMenu = {
  id: number;
  title: string;
  href: string;
  code?: string;
};

const prfileMenu: TPrfileMenu[] = [
  { id: 1, title: "Профиль", href: "/profile" },
  {
    id: 2,
    title: "История заказов",
    href: "/profile/orders",
  },
  {
    id: 3,
    title: "Выход",
    href: "/logout",
    code: "logout",
  },
];

const ProfileMenu = () => {
  const dispatch = useAppDispatch();
  const refreshToken = localStorage.getItem("refreshToken");

  const location = useLocation();

  const navBlockText =
    location.pathname === "/profile"
      ? "изменить свои персональные данные"
      : "просмотреть свою историю заказов";

  return (
    <div className={styles.navBlock}>
      <ul className={styles.list}>
        {prfileMenu.map((item) => {
          return (
            <li key={item.id} className={styles.item}>
              <NavLink
                to={item.href}
                className={styles.linkWrapper}
                onClick={(e) => {
                  if (item.code === "logout") {
                    e.preventDefault();
                    dispatch(logout(refreshToken));
                  }
                }}
                end
              >
                {({ isActive }) => (
                  <span
                    className={classNames(
                      styles.link,
                      isActive && styles.linkActive
                    )}
                  >
                    {item.title}
                  </span>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <p
        className={classNames(
          "text text_type_main-default",
          styles.navBlockText
        )}
      >
        В этом разделе вы можете <br />
        {navBlockText}
      </p>
    </div>
  );
};

export default ProfileMenu;
