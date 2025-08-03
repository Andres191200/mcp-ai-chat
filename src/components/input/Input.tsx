import styles from "./styles.module.scss";
import React from 'react';

type TInputProps = {
  onChange: (message: string) => void;
  value: string;
  disabled: boolean;
  placeholder: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">;

export default React.forwardRef<HTMLInputElement, TInputProps>(function Input({
  onChange,
  value,
  placeholder,
  ...rest
}, ref) {
  return (
    <div className={styles.inputComponent}>
      <input
        ref={ref}
        {...rest}
        placeholder={placeholder}
        type="text"
        className={styles.messageInput}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
});