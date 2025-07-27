import { useState } from "react";
import Input from "../input/Input";
import styles from "./styles.module.scss";

export default function MessageInputBar() {
  const [message, setMessage] = useState<string>("");

  function onChangeInput(message: string) {
    console.log('message: ', message);
    setMessage(message);
  }

  return (
    <div className={styles.messageInputBarComponent}>
      <Input value={message} onChange={onChangeInput} disabled={false} />
      <button className={styles.sendMessageButton}>Send</button>
    </div>
  );
}
