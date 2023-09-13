import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./FormWrapper.module.css";

const FormWrapper = ({ title, buttonText, links, onFormSubmit, children }) => {
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

FormWrapper.propTypes = {
  title: PropTypes.string,
  buttonText: PropTypes.string,
  links: PropTypes.array,
  onButtomClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default FormWrapper;
