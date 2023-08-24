import React from "react";
import loaderIcon from "../../images/amalie-steiness.gif";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.main}>
      <div className={styles.img_wraper}>
        <img src={loaderIcon} alt="loader" />
      </div>
    </div>
  );
};

export default Loader;
