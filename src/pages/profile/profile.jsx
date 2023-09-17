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
import { updateToken } from "../../services/api";
import { useForm } from "../../utils/hooks/useForm";

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

  const { values, handleChange, setValues } = useForm(getUserInfo(login));

  const isShowButtons =
    values.name !== login.user.user.name ||
    values.email !== login.user.user.email ||
    (values.password && values.password !== "");

  const inputRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const onIconClick = (state) => {
    if (!state) {
      setTimeout(() => inputRef.current.focus(), 0);
    }
    setDisabled(state);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (values.name.length > 1 && values.email.length > 1) {
      dispatch(updateUserInfo(accessToken, values));
      dispatch(updateToken(refreshToken));
      if (values.password) {
        delete values.password;
      }
      setValues({ ...values });
    }
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
      <form
        className={styles.form}
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <Input
          type={"text"}
          ref={inputRef}
          placeholder={"Имя"}
          onChange={handleChange}
          name={"name"}
          value={values.name}
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
          onChange={handleChange}
          value={values.email}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password || ""}
          name={"password"}
          icon="EditIcon"
        />

        {isShowButtons && (
          <div className={styles.buttonWrapper}>
            <button
              className={styles.resetButton}
              onClick={() => {
                setValues(getUserInfo(login));
              }}
            >
              Отмена
            </button>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};
