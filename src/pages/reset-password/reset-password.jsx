import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import {
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getNewPassword } from "../../utils/functions/getStoreFunctions";
import { newPassword } from "../../services/api";

const links = [
  {
    id: 1,
    text: "Вспомнили пароль?",
    linkTo: "/login",
    linkText: "Войти",
  },
];

export const ResetPassword = () => {
  const [form, setForm] = useState({
    password: "",
    token: "",
  });

  const handleInputChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const isNewPassword = useSelector(getNewPassword).newPassword;

  useEffect(() => {
    if (isNewPassword) {
      const timer = setTimeout(() => {
        navigate("/login", {
          state: { previousPath: location.pathname },
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [navigate, location.pathname, isNewPassword]);

  const onClickButton = (e) => {
    e.preventDefault();
    if (form.password.length > 1 && form.token.length > 1) {
      dispatch(newPassword(form));
      setForm({ password: "", token: "" });
    }
  };

  return (
    <FormWrapper
      title="Восстановление пароля"
      buttonText="Сохранить"
      links={links}
      onButtomClick={onClickButton}
    >
      {isNewPassword ? (
        <>успешно!</>
      ) : (
        <>
          <PasswordInput
            onChange={(e) => handleInputChange(e)}
            value={form.password}
            name={"password"}
            placeholder={"Введите новый пароль"}
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={(e) => handleInputChange(e)}
            name={"token"}
            value={form.token}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </>
      )}
    </FormWrapper>
  );
};
