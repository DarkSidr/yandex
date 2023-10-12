import React, { useState, useRef, FormEvent } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getLogin } from "../../utils/functions/getStoreFunctions";
import { updateUserInfo } from "../../services/api";
import { getUserInfo } from "./profile.utils";
import { updateToken } from "../../services/api";
import { useForm } from "../../utils/hooks/useForm";

import styles from "./profile.module.css";
import { TProfileForm } from "../../utils/types/commonTypes";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import ProfileWrapper from "../../components/ProfileWrapper/ProfileWrapper";

export const Profile = () => {
  const login = useAppSelector(getLogin);
  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useAppDispatch();

  const { values, handleChange, setValues } = useForm<TProfileForm>(
    getUserInfo(login)
  );

  const isShowButtons =
    values.name !== (login.user && login.user.user.name) ||
    values.email !== (login.user && login.user.user.email) ||
    (values.password && values.password !== "");

  const inputRef = useRef<HTMLInputElement>(null);
  const [disabled, setDisabled] = useState(true);
  const onIconClick = (state: boolean): void => {
    if (!state) {
      setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
    }
    setDisabled(state);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
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
    <ProfileWrapper>
      <ProfileMenu />
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
    </ProfileWrapper>
  );
};
