import styles from "./Button.module.css";

interface ButtonProps {
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export default function Button({
  type = "submit",
  onClick,
  children,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles.button}
    >
      {children}
    </button>
  );
}
