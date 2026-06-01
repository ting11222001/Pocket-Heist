import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import PasswordInput from "@/components/PasswordInput";

describe("PasswordInput", () => {
  const baseProps = {
    id: "password",
    name: "password",
    label: "Password",
    value: "",
    onChange: () => {},
  };

  it("renders a masked password field by default", () => {
    render(<PasswordInput {...baseProps} />);
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password",
    );
  });

  it("toggles the input type when the show/hide button is clicked", async () => {
    const user = userEvent.setup();
    render(<PasswordInput {...baseProps} />);

    const input = screen.getByLabelText("Password");
    await user.click(screen.getByRole("button", { name: /show password/i }));
    expect(input).toHaveAttribute("type", "text");

    await user.click(screen.getByRole("button", { name: /hide password/i }));
    expect(input).toHaveAttribute("type", "password");
  });
});
