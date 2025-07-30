import React from "react";
import styles from './styles.module.scss';
import type { TMessage } from "../../db/db";

export default function Message({message, userID}: TMessage) {
  return (
    <div className={styles.messageComponent}>
      <p>User: {userID}</p>
      <h3>Message: {message}</h3>
    </div>
  );
}
