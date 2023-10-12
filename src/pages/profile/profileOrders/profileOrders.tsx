import React from "react";
import ProfileMenu from "../../../components/ProfileMenu/ProfileMenu";
import ProfileWrapper from "../../../components/ProfileWrapper/ProfileWrapper";
import styles from "./profileOrders.module.css";

const ProfileOrders = () => {
  return (
    <ProfileWrapper smallMargin>
      <div className={styles.menuWrapper}>
        <ProfileMenu />
      </div>
    </ProfileWrapper>
  );
};

export default ProfileOrders;
