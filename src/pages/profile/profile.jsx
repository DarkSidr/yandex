import React, { useState, useRef } from "react";
import {
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import classNames from "classnames";

const prfileMenu = [
  { id: 1, title: "Профиль", isActive: true, href: "#" },
  { id: 2, title: "История заказов", isActive: false, href: "#" },
  { id: 3, title: "Выход", isActive: false, href: "#" },
];

export const Profile = () => {
  const [valueInput, setValueInput] = useState("Марк");
  const inputRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const onIconClick = (state) => {
    if (!state) {
      setTimeout(() => inputRef.current.focus(), 0);
    }
    setDisabled(state);
  };

  const [valueLogin, setValueLogin] = React.useState("bob@example.com");
  const onChangeLogin = (e) => {
    setValueLogin(e.target.value);
  };

  const [valuePassword, setValuePassword] = React.useState("password");
  const onChangePassword = (e) => {
    setValuePassword(e.target.value);
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
          onChange={(e) => setValueInput(e.target.value)}
          name={"name"}
          value={valueInput}
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
          onChange={onChangeLogin}
          value={valueLogin}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
        />
        <PasswordInput
          onChange={onChangePassword}
          value={valuePassword}
          name={"password"}
          icon="EditIcon"
        />
      </form>
    </div>
  );
};
