import React from "react";
import styles from "./styles.module.scss";
import type { TMessage } from "../../db/db";

export default function Message({ message, date, userName }: TMessage) {
  console.log("date: ", date);
  const messageDate = new Date(date);
  return (
    <div className={styles.messageComponent}>
      <div className={styles.messageHeader}>
        <p>{userName}</p>
        <p className={styles.date}>{messageDate.toLocaleString("es-AR")}</p>
      </div>
      <div className={styles.messageContent}>
        <h3>{message}</h3>
      </div>
    </div>
  );
}
