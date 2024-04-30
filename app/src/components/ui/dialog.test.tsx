import { render, screen } from "@testing-library/react"
import { Dialog } from "./dialog"
import { userEvent } from "@testing-library/user-event"

describe("<Dialog />", () => {
  it("renders a dialog with a title and content", () => {
    render(
      <Dialog open title="Hello">
        world!
      </Dialog>,
    )

    const title = screen.getByText("Hello")
    expect(title).toBeInTheDocument()
    const content = screen.getByText("world!")
    expect(content).toBeInTheDocument()
  })

  it("calls the onClose handler when pressing escape", async () => {
    const user = userEvent.setup()
    const onClose = jest.fn()
    render(
      <Dialog open title="Hello" onClose={onClose}>
        world!
      </Dialog>,
    )

    await user.keyboard("{escape}")

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("calls the onClose handler when clicking the overlay", async () => {
    const user = userEvent.setup()
    const onClose = jest.fn()
    render(
      <Dialog open title="Hello" onClose={onClose}>
        world!
      </Dialog>,
    )

    const overlay = screen.getByTestId("dialog-overlay")
    await user.click(overlay)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("calls the onClose handler when clicking the close button", async () => {
    const user = userEvent.setup()
    const onClose = jest.fn()
    render(
      <Dialog open title="Hello" onClose={onClose}>
        world!
      </Dialog>,
    )

    const overlay = screen.getByTestId("dialog-close-button")
    await user.click(overlay)

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
