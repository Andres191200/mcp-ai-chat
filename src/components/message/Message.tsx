import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import type { TMessage } from "../../db/db";
import gsap from "gsap";

export default function Message({ message, date, userName }: TMessage) {
  const messageDate = new Date(date);
  const messageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(messageRef.current){
      gsap.fromTo(messageRef.current, {
        duration: 0.5,
        delay: 0.1,
        y: 25,
        opacity: 0,
        ease: "power2.out"
      }, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        delay: 0.1,
        ease: "power2.out"
      });
    }
  }, []);
  
  return (
    <div className={styles.messageComponent} ref={messageRef}>
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
