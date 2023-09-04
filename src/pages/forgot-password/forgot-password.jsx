import React from "react";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import FormWrapper from "../../components/FormWrapper/FormWrapper";

const links = [
  {
    id: 1,
    text: "Вспомнили пароль?",
    linkTo: "/login",
    linkText: "Войти",
  },
];

export const ForgotPassword = () => {
  const [valueEmail, setValueEmail] = React.useState();
  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
  };
  return (
    <FormWrapper
      title="Восстановление пароля"
      buttonText="Восстановить"
      links={links}
    >
      <EmailInput
        onChange={onChangeEmail}
        value={valueEmail}
        name={"email"}
        isIcon={false}
      />
    </FormWrapper>
  );
};
