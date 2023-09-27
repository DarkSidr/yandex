import React, { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import FormWrapper, { TLinks } from "../../components/FormWrapper/FormWrapper";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import { getLogin } from "../../utils/functions/getStoreFunctions";
import { login } from "../../services/api";
import { useForm } from "../../utils/hooks/useForm";
import { AppDispatch } from "../..";
import { TLoginForm } from "../../utils/types/loginTypes";

const links: TLinks[] = [
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
  const { values, handleChange, setValues } = useForm<TLoginForm>({
    email: "",
    password: "",
  });

  const loginData = useSelector(getLogin);

  const dispatch: AppDispatch = useDispatch();

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
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
