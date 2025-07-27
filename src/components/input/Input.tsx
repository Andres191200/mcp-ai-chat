import styles from "./styles.module.scss";

type TInputProps = {
  onChange: (message: string) => void;
  value: string;
  disabled: boolean;
  placeholder: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">;

export default function Input({
  onChange,
  value,
  placeholder,
  ...rest
}: TInputProps) {
  return (
    <div className={styles.inputComponent}>
      <input
        {...rest}
        placeholder={placeholder}
        type="text"
        className={styles.messageInput}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
