import React, { ReactNode } from "react";
import styles from "./ProfileWrapper.module.css";
import classNames from "classnames";

type TProfileWrapper = {
  smallMargin?: boolean;
  children: ReactNode;
};

const ProfileWrapper = ({ smallMargin, children }: TProfileWrapper) => {
  return (
    <div
      className={classNames(styles.wrapper, smallMargin && styles.smallMargin)}
    >
      {children}
    </div>
  );
};

export default ProfileWrapper;
