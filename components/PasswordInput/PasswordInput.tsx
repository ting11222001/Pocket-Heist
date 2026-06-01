"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import Input, { InputProps } from "@/components/Input"
import styles from "./PasswordInput.module.css"

type PasswordInputProps = Omit<InputProps, "type" | "endAdornment">

export default function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const toggle = (
    <button
      type="button"
      className={styles.toggle}
      aria-label={showPassword ? "Hide password" : "Show password"}
      onClick={() => setShowPassword((prev) => !prev)}
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  )

  return (
    <Input
      {...props}
      type={showPassword ? "text" : "password"}
      endAdornment={toggle}
    />
  )
}
