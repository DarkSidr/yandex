import pageNotFound from "../../images/404.png";
import styles from "./NotFound404.module.css";

export const NotFound404 = () => {
  return (
    <div className={styles.container}>
      <img
        className={styles.imgWrapper}
        alt="page not found"
        src={pageNotFound}
      />
    </div>
  );
};
