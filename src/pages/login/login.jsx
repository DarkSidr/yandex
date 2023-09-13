import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import { getLogin } from "../../utils/functions/getStoreFunctions";
import { login } from "../../services/api";
import { useForm } from "../../utils/hooks/useForm";

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
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const loginData = useSelector(getLogin);

  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (values.email.length > 1 && values.password.length > 1) {
      dispatch(login(values));
      setValues({
        email: "",
        password: "",
      });
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
          onChange={handleChange}
          value={values.email}
          name={"email"}
          isIcon={false}
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
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
