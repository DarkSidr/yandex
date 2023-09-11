import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import { updatePassword } from "../../services/api";
import { getUpdatePassword } from "../../utils/functions/getStoreFunctions";

const links = [
  {
    id: 1,
    text: "Вспомнили пароль?",
    linkTo: "/login",
    linkText: "Войти",
  },
];

export const ForgotPassword = () => {
  const [valueEmail, setValueEmail] = useState("");
  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
  };
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const isUpdatePassword = useSelector(getUpdatePassword).updatePassword;

  useEffect(() => {
    if (isUpdatePassword) {
      navigate("/reset-password", {
        state: { previousPath: location.pathname },
      });
    }
  }, [navigate, location.pathname, isUpdatePassword]);

  const onButtonClick = (e) => {
    e.preventDefault();

    if (valueEmail.length > 1) {
      dispatch(
        updatePassword({
          email: valueEmail,
        })
      );
      setValueEmail("");
    }
  };
  return (
    <FormWrapper
      title="Восстановление пароля"
      buttonText="Восстановить"
      links={links}
      onButtomClick={onButtonClick}
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
