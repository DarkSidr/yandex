import React, { FormEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import { updatePassword } from "../../services/api";
import { getUpdatePassword } from "../../utils/functions/getStoreFunctions";
import { UPDATE_PASSWORD_RESET } from "../../services/actions/updatePassword";
import { useForm } from "../../utils/hooks/useForm";
import { TForgotPasswordForm, TLinks } from "../../utils/types/commonTypes";
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

export const ForgotPassword = () => {
  const { values, handleChange, setValues } = useForm<TForgotPasswordForm>({
    email: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();

  const isUpdatePassword = useAppSelector(getUpdatePassword).updatePassword;

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
