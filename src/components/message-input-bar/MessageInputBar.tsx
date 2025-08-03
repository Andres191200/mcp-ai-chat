import { useState } from "react";
import Input from "../input/Input";
import styles from "./styles.module.scss";

type TMessageInputBarProps = {
  onSendMessage: (message: string) => void;
  disabled: boolean;
};


export default function MessageInputBar({ onSendMessage, disabled }: TMessageInputBarProps) {
  const [message, setMessage] = useState<string>("");

  function onChangeInput(message: string) {
    setMessage(message);
  }

  function handleClick(message: string) {
    onSendMessage(message);
    setMessage('');
  }


  return (
    <div className={styles.messageInputBarComponent}>
      <Input value={message} onChange={onChangeInput} disabled={disabled} placeholder="Type a message!"/>
      <button className={styles.sendMessageButton} onClick={() => handleClick(message)}>Send</button>
    </div>
  );
}
