import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
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

  const handleInputChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const dispatch = useDispatch();

  const onButtonClick = (e) => {
    e.preventDefault();
    if (form.email.length > 1 && form.password.length > 1) {
      dispatch(login(form));
    }
  };
  console.log(form);

  const test = useSelector(getLogin);
  console.log(test);

  return (
    <FormWrapper
      title="Вход"
      buttonText="Войти"
      links={links}
      onButtomClick={onButtonClick}
    >
      <>
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
      </>
    </FormWrapper>
  );
};
