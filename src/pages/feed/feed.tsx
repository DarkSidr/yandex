import React from "react";
import styles from "./feed.module.css";
import { socketMiddleware } from "../../utils/requests/socketMiddleware";

export const Feed = () => {
  const test = socketMiddleware();
  return <main className={styles.wrapper}>Feed</main>;
};
