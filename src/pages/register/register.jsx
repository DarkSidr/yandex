import React from "react";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import {
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

const links = [
  {
    id: 1,
    text: "Уже зарегистрированы?",
    linkTo: "/login",
    linkText: "Войти",
  },
];

export const Register = () => {
  const [valueName, setValueName] = React.useState();

  const [valueEmail, setValueEmail] = React.useState();
  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
  };

  const [valuePassword, setValuePassword] = React.useState();
  const onChangePassword = (e) => {
    setValuePassword(e.target.value);
  };
  return (
    <FormWrapper
      title="Регистрация"
      buttonText="Зарегистрироваться"
      links={links}
    >
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={(e) => setValueName(e.target.value)}
        name={"name"}
        value={valueName}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
      />

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
