import React from "react";
import loaderIcon from "../../images/amalie-steiness.gif";
import styles from "./Loader.module.css";

type TLoader = {
  title?: string;
};

const Loader = ({ title }: TLoader) => {
  return (
    <div className={styles.main}>
      {title && <h1>{title}</h1>}
      <div className={styles.img_wraper}>
        <img src={loaderIcon} alt="loader" />
      </div>
    </div>
  );
};

export default Loader;
