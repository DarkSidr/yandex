import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import { getLogin } from "../../utils/functions/getStoreFunctions";
import { login } from "../../services/api";

const links = [
  {
    id: 1,
    text: "Вы — новый пользователь?",
    linkTo: "/register",
    linkText: "Зарегистрироваться",
  },
  {
    id: 2,
    text: "Забыли пароль?",
    linkTo: "/forgot-password",
    linkText: "Восстановить пароль",
  },
];

export const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const loginData = useSelector(getLogin);

  const handleInputChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (form.email.length > 1 && form.password.length > 1) {
      dispatch(login(form));
    }
  };

  return (
    <>
      <FormWrapper
        title="Вход"
        buttonText="Войти"
        links={links}
        onFormSubmit={onFormSubmit}
      >
        <EmailInput
          onChange={(e) => {
            handleInputChange(e);
          }}
          value={form.email}
          name={"email"}
          isIcon={false}
        />
        <PasswordInput
          onChange={(e) => {
            handleInputChange(e);
          }}
          value={form.password}
          name={"password"}
        />
      </FormWrapper>
      <CustomAlert
        text="Не правильный логин или пароль"
        active={
          loginData.error &&
          loginData.error.success === false &&
          !loginData.isAuthenticated
        }
      />
    </>
  );
};
