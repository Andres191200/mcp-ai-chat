import { useEffect, useRef, useState } from "react";
import Input from "../input/Input";
import { TypeAnimation } from "react-type-animation";
import styles from "./styles.module.scss";

type TMessageInputBarProps = {
  onSubmit: (message: string) => void;
  disabled: boolean;
};

export default function MessageInputBar({
  onSubmit,
  disabled,
}: TMessageInputBarProps) {
  const [message, setMessage] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const placeholderSequence: (string | number)[] = [
    "Thinking...",
    1000,
    "Generating a response....",
    1000,
    "1 sec...",
    1000,
    "I'm still thinking...",
    1000,
  ];

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
        <div className={styles.placeholder}>
          {disabled ? (
           <span>
             <TypeAnimation
              sequence={placeholderSequence}
              wrapper="span"
              repeat={Infinity}
            />
           </span>
          ) : null}
        </div>
        <button
          className={styles.sendMessageButton}
          disabled={disabled}
          onClick={(event) => handleClick(message, event)}
        >
          Send
        </button>
      </form>
    </div>
  );
}
