import React, { FormEvent, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./FormWrapper.module.css";
import { TLinks } from "../../utils/types/commonTypes";

type TFormWrapper = {
  title: string;
  buttonText: string;
  links: TLinks[];
  onFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

const FormWrapper = ({
  title,
  buttonText,
  links,
  onFormSubmit,
  children,
}: TFormWrapper) => {
  const location = useLocation();
  return (
    <div className={styles.formWrapper}>
      <div className={styles.formContent}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            onFormSubmit && onFormSubmit(e);
          }}
        >
          <h3 className="text text_type_main-medium">{title}</h3>
          {children}
          <Button htmlType="submit" type="primary" size="medium">
            {buttonText}
          </Button>
        </form>
        <div className={styles.linkBlock}>
          {links.map((item) => {
            return (
              <span className={styles.linkText} key={item.id}>
                {item.text}
                <Link
                  to={item.linkTo}
                  state={{ previousPath: location.pathname }}
                  className={styles.link}
                >
                  {item.linkText}
                </Link>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FormWrapper;
