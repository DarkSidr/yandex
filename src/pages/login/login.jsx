import React from "react";
import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import FormWrapper from "../../components/FormWrapper/FormWrapper";

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
  const [valueEmail, setValueEmail] = React.useState("bob@example.com");
  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
  };

  const [valuePassword, setValuePassword] = React.useState("password");
  const onChangePassword = (e) => {
    setValuePassword(e.target.value);
  };
  return (
    <FormWrapper title="Вход" buttonText="Войти" links={links}>
      <EmailInput
        onChange={onChangeEmail}
        value={valueEmail}
        name={"email"}
        isIcon={false}
      />
      <PasswordInput
        onChange={onChangePassword}
        value={valuePassword}
        name={"password"}
      />
    </FormWrapper>
  );
};
