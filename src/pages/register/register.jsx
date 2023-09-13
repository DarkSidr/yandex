import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import { register } from "../../services/api";
import { getRegister } from "../../utils/functions/getStoreFunctions";
import { REGISTER_RESET } from "../../services/actions/register";
import { useForm } from "../../utils/hooks/useForm";
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
  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const isRegistered = useSelector(getRegister).isRegistered;

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

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

      setValues({
        name: "",
        email: "",
        password: "",
      });

      return () => clearTimeout(timer);
    }
  }, [dispatch, setValues, navigate, location.pathname, isRegistered]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (
      values.email.length > 1 &&
      values.password.length > 1 &&
      values.name.length > 1
    ) {
      dispatch(register(values));
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
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChange}
          name={"name"}
          value={values.name}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />

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
        text="Регистрация прошла успешно! Скоро редирект!"
        active={isRegistered}
      />
    </>
  );
};
