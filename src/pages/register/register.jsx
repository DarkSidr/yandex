import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import { register } from "../../services/api";
import { getRegister } from "../../utils/functions/getStoreFunctions";
import { REGISTER_RESET } from "../../services/actions/register";
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

  const isRegistered = useSelector(getRegister).isRegistered;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isRegistered) {
      const timer = setTimeout(() => {
        navigate("/login", {
          state: { previousPath: location.pathname },
        });
        dispatch({
          type: REGISTER_RESET,
        });
      }, 3000);

      setForm({
        name: "",
        email: "",
        password: "",
      });

      return () => clearTimeout(timer);
    }
  }, [navigate, location.pathname, isRegistered]);

  const handleInputChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
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
    <>
      <FormWrapper
        title="Регистрация"
        buttonText="Зарегистрироваться"
        links={links}
        onFormSubmit={onFormSubmit}
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
      <CustomAlert
        text="Регистрация прошла успешно! Скоро редирект!"
        active={isRegistered}
      />
    </>
  );
};
