import { useRef, useState } from "react";
import Input from "../input/Input";
import styles from "./styles.module.scss";

type TMessageInputBarProps = {
  onSendMessage: (message: string) => void;
  disabled: boolean;
};

export default function MessageInputBar({
  onSendMessage,
  disabled,
}: TMessageInputBarProps) {
  const [message, setMessage] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  function onChangeInput(message: string) {
    setMessage(message);
  }

  function handleClick(message: string, event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) {
    if(inputRef.current){
      inputRef.current.blur();
    }
    event.preventDefault();
    onSendMessage(message);
    setMessage("");
  }

  return (
    <div className={styles.messageInputBarComponent}>
      <form onSubmit={(event) => handleClick(message, event)}>
        <Input
          ref={inputRef}
          value={message}
          onChange={onChangeInput}
          disabled={disabled}
          placeholder="Type a message!"
        />
        <button
          className={styles.sendMessageButton}
          onClick={(event) => handleClick(message, event)}
        >
          Send
        </button>
      </form>
    </div>
  );
}
