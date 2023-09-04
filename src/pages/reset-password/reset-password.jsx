import React from "react";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import {
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

const links = [
  {
    id: 1,
    text: "Вспомнили пароль?",
    linkTo: "/login",
    linkText: "Войти",
  },
];

export const ResetPassword = () => {
  const [valuePassword, setValuePassword] = React.useState();
  const onChangePassword = (e) => {
    setValuePassword(e.target.value);
  };

  const [valueInput, setValueInput] = React.useState();

  return (
    <FormWrapper
      title="Восстановление пароля"
      buttonText="Сохранить"
      links={links}
    >
      <PasswordInput
        onChange={onChangePassword}
        value={valuePassword}
        name={"password"}
        placeholder={"Введите новый пароль"}
      />
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={(e) => setValueInput(e.target.value)}
        name={"code"}
        value={valueInput}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
      />
    </FormWrapper>
  );
};
