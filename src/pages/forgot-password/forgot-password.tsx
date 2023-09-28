import React, { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import { updatePassword } from "../../services/api";
import { getUpdatePassword } from "../../utils/functions/getStoreFunctions";
import { UPDATE_PASSWORD_RESET } from "../../services/actions/updatePassword";
import { useForm } from "../../utils/hooks/useForm";
import { AppDispatch } from "../..";
import { TForgotPasswordForm, TLinks } from "../../utils/types/commonTypes";

const links: TLinks[] = [
  {
    id: 1,
    text: "Вспомнили пароль?",
    linkTo: "/login",
    linkText: "Войти",
  },
];

export const ForgotPassword = () => {
  const { values, handleChange, setValues } = useForm<TForgotPasswordForm>({
    email: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch: AppDispatch = useDispatch();

  const isUpdatePassword = useSelector(getUpdatePassword).updatePassword;

  useEffect(() => {
    if (isUpdatePassword) {
      navigate("/reset-password", {
        state: { previousPath: location.pathname },
      });
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, navigate, location.pathname, isUpdatePassword]);

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.email.length > 1) {
      dispatch(
        updatePassword({
          email: values.email,
        })
      );
      setValues({ email: "" });
    }
  };

  return (
    <FormWrapper
      title="Восстановление пароля"
      buttonText="Восстановить"
      links={links}
      onFormSubmit={onFormSubmit}
    >
      <EmailInput
        onChange={handleChange}
        value={values.email}
        name={"email"}
        isIcon={false}
      />
    </FormWrapper>
  );
};
