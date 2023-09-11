import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import { register } from "../../services/api";
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
  const [form, setForm] = useState({
    name: "",
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
    if (
      form.email.length > 1 &&
      form.password.length > 1 &&
      form.name.length > 1
    ) {
      dispatch(register(form));
    }
  };

  return (
    <FormWrapper
      title="Регистрация"
      buttonText="Зарегистрироваться"
      links={links}
      onButtomClick={onButtonClick}
    >
      <>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => {
            handleInputChange(e);
          }}
          name={"name"}
          value={form.name}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />

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
