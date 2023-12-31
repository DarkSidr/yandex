import React, { FormEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import {
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getNewPassword } from "../../utils/functions/getStoreFunctions";
import { newPassword } from "../../services/api";
import { NEW_PASSWORD_RESET } from "../../services/actions/newPassword";
import { useForm } from "../../utils/hooks/useForm";
import { TLinks, TResetPasswordForm } from "../../utils/types/commonTypes";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";

const links: TLinks[] = [
  {
    id: 1,
    text: "Вспомнили пароль?",
    linkTo: "/login",
    linkText: "Войти",
  },
];

export const ResetPassword = () => {
  const { values, handleChange, setValues } = useForm<TResetPasswordForm>({
    password: "",
    token: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();

  const isNewPassword = useAppSelector(getNewPassword).newPassword;

  useEffect(() => {
    if (isNewPassword) {
      const timer = setTimeout(() => {
        navigate("/login", {
          state: { previousPath: location.pathname },
        });
        dispatch({
          type: NEW_PASSWORD_RESET,
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [dispatch, navigate, location.pathname, isNewPassword]);

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.password.length > 1 && values.token.length > 1) {
      dispatch(newPassword(values));
      setValues({ password: "", token: "" });
    }
  };

  return (
    <>
      <FormWrapper
        title="Восстановление пароля"
        buttonText="Сохранить"
        links={links}
        onFormSubmit={onFormSubmit}
      >
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={"password"}
          placeholder={"Введите новый пароль"}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={handleChange}
          name={"token"}
          value={values.token}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
      </FormWrapper>
      <CustomAlert
        text="Успешно! Скоро будет редирект"
        active={isNewPassword}
      />
    </>
  );
};
