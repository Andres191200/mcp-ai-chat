import styles from "./styles.module.scss";

type TInputProps = {
  onChange: (message: string) => void;
  value: string;
  disabled: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">;

export default function Input({ onChange, value, ...rest }: TInputProps) {
  return (
    <div className={styles.inputComponent}>
      <input
        {...rest}
        type="text"
        className={styles.messageInput}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
