import styles from "./Input.module.css"

export interface InputProps {
  id: string
  name: string
  type: "text" | "email" | "password"
  label: string
  placeholder?: string
  required?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  endAdornment?: React.ReactNode
}

export default function Input({
  id,
  name,
  type,
  label,
  placeholder,
  required,
  value,
  onChange,
  endAdornment,
}: InputProps) {
  const inputClass = endAdornment
    ? `${styles.input} ${styles.hasAdornment}`
    : styles.input

  return (
    <div className={styles.formGroup}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.inputWrap}>
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={inputClass}
        />
        {endAdornment}
      </div>
    </div>
  )
}
