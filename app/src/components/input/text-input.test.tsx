import { TextInput } from "./text-input"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"

describe("<TextInput />", () => {
  it("renders an input element", () => {
    render(<TextInput />)

    const input = screen.getByRole("textbox")
    expect(input).toBeInTheDocument()
  })

  it("shows the value passed", () => {
    render(<TextInput value="Hello" />)

    const input = screen.getByRole("textbox") as HTMLInputElement
    expect(input.value).toBe("Hello")
  })

  it("calls onChange when the value changes", async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    render(<TextInput onChange={onChange} />)

    const input = screen.getByRole("textbox")
    await user.type(input, "foo")

    expect(onChange).toHaveBeenCalledTimes(3)
    expect(onChange).toHaveBeenNthCalledWith(1, "f")
    expect(onChange).toHaveBeenNthCalledWith(2, "o")
    expect(onChange).toHaveBeenNthCalledWith(3, "o")
  })

  it("does not call onChange when disabled", async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    render(<TextInput disabled onChange={onChange} />)

    const input = screen.getByRole("textbox")
    await user.type(input, "foo")

    expect(onChange).not.toHaveBeenCalled()
  })

  it("defaults to text type", () => {
    render(<TextInput />)

    const input = screen.getByRole("textbox") as HTMLInputElement
    expect(input.type).toBe("text")
  })

  it("supports the number type", () => {
    render(<TextInput type="number" />)

    const input = screen.getByRole("spinbutton") as HTMLInputElement
    expect(input.type).toBe("number")
  })
})
