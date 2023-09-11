import React, { useState, useRef } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import {
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { getLogin } from "../../utils/functions/getStoreFunctions";
import { logout } from "../../services/api";
import { updateUserInfo } from "../../services/api";
import { getUserInfo } from "./profile.utils";

import styles from "./profile.module.css";

const prfileMenu = [
  { id: 1, title: "Профиль", isActive: true, href: "/profile" },
  {
    id: 2,
    title: "История заказов",
    isActive: false,
    href: "/order",
    code: "order",
  },
  {
    id: 3,
    title: "Выход",
    isActive: false,
    href: "/logout",
    code: "logout",
  },
];

export const Profile = () => {
  const login = useSelector(getLogin);
  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();

  const [form, setForm] = useState(getUserInfo(login));

  const handleInputChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const isShowButtons =
    form.name !== login.user.user.name ||
    form.email !== login.user.user.email ||
    (form.password && form.password !== "");

  const inputRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const onIconClick = (state) => {
    if (!state) {
      setTimeout(() => inputRef.current.focus(), 0);
    }
    setDisabled(state);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.navBlock}>
        <ul className={styles.list}>
          {prfileMenu.map((item) => {
            return (
              <li key={item.id} className={styles.item}>
                <a
                  className={classNames(
                    styles.link,
                    item.isActive && styles.linkActive
                  )}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.code === "logout") {
                      dispatch(logout(refreshToken));
                    }
                  }}
                >
                  {item.title}
                </a>
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
          В этом разделе вы можете <br /> изменить свои персональные данные
        </p>
      </div>
      <form className={styles.form}>
        <Input
          type={"text"}
          ref={inputRef}
          placeholder={"Имя"}
          onChange={(e) => handleInputChange(e)}
          name={"name"}
          value={form.name}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          icon={"EditIcon"}
          disabled={disabled}
          onIconClick={() => {
            onIconClick(false);
          }}
          onBlur={() => {
            onIconClick(true);
          }}
        />
        <EmailInput
          onChange={(e) => handleInputChange(e)}
          value={form.email}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
        />
        <PasswordInput
          onChange={(e) => handleInputChange(e)}
          value={form.password || ""}
          name={"password"}
          icon="EditIcon"
        />

        {isShowButtons && (
          <div className={styles.buttonWrapper}>
            <button
              className={styles.resetButton}
              onClick={() => {
                setForm(getUserInfo(login));
              }}
            >
              Отмена
            </button>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={() => {
                if (form.name.length > 1 && form.email.length > 1) {
                  if (form.email.password && form.email.password.length > 1) {
                    dispatch(updateUserInfo(accessToken, form));
                    setForm({ ...form, password: "" });
                  }
                  dispatch(updateUserInfo(accessToken, form));
                  setForm({ ...form, password: "" });
                }
              }}
            >
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};
