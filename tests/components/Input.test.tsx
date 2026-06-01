import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import Input from "@/components/Input"

describe("Input", () => {
  const baseProps = {
    id: "email",
    name: "email",
    type: "email" as const,
    label: "Email",
    value: "",
    onChange: () => {},
  }

  it("renders a labelled input", () => {
    render(<Input {...baseProps} />)
    expect(screen.getByLabelText("Email")).toBeInTheDocument()
  })

  it("calls onChange when the user types", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Input {...baseProps} onChange={onChange} />)

    await user.type(screen.getByLabelText("Email"), "a")
    expect(onChange).toHaveBeenCalled()
  })

  it("renders an end adornment when provided", () => {
    render(<Input {...baseProps} endAdornment={<span>icon</span>} />)
    expect(screen.getByText("icon")).toBeInTheDocument()
  })
})
