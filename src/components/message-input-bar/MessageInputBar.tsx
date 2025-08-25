import { useEffect, useRef, useState } from "react";
import Input from "../input/Input";
import styles from "./styles.module.scss";

type TMessageInputBarProps = {
  onSubmit: (message: string) => void;
  disabled?: boolean;
};

export default function MessageInputBar({
  onSubmit,
  disabled = false,
}: TMessageInputBarProps) {
  const [message, setMessage] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function handleKeyDown() {
      inputRef.current?.focus();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function onChangeInput(message: string) {
    setMessage(message);
  }

  function handleClick(
    message: string,
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
  ) {
    if (inputRef.current) {
      inputRef.current.blur();
    }
    event.preventDefault();
    onSubmit(message);
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
          placeholder={disabled ? "" : "Type a message!"}
        />
        <button
          className={styles.sendMessageButton}
          disabled={disabled}
          onClick={(event) => handleClick(message, event)}
        >
          {disabled ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
