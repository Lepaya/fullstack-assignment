import { render, screen } from "@testing-library/react"
import { Button } from "./button"
import { userEvent } from "@testing-library/user-event"

describe("<Button />", () => {
  it("renders the text on the button", () => {
    render(<Button>Click me</Button>)

    const button = screen.getByRole("button", { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it("calls the onClick handler", async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Click me</Button>)

    const button = screen.getByRole("button", { name: /click me/i })
    await user.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("doesn't call the onClick handler when disabled", async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()
    render(
      <Button onClick={onClick} disabled>
        Click me
      </Button>,
    )

    const button = screen.getByRole("button", { name: /click me/i })
    await user.click(button)

    expect(onClick).not.toHaveBeenCalled()
  })
})
