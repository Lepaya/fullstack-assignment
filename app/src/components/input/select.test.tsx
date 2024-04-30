import { Select } from "./select"
import { act, render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"

describe("<Select />", () => {
  it("renders the label", () => {
    render(<Select label="Office" />)

    const label = screen.getByLabelText(/Office/i)
    expect(label).toBeInTheDocument()
  })

  it("renders the placeholder", () => {
    render(<Select placeholder="Select an option" />)

    const placeholder = screen.getByText(/Select an option/i)
    expect(placeholder).toBeInTheDocument()
  })

  it("renders the value instead of the placeholder", () => {
    render(<Select value={"paris"} />)

    const placeholder = screen.queryByText(/Select an option/i)
    expect(placeholder).not.toBeInTheDocument()
    const value = screen.getByText(/Paris/i)
    expect(value).toBeInTheDocument()
  })

  it("renders the value of a selected option", () => {
    render(
      <Select
        options={[
          { value: "1", label: "Amsterdam" },
          { value: "2", label: "Berlin" },
        ]}
        value="2"
      />,
    )

    const value = screen.getByText(/Berlin/i)
    expect(value).toBeInTheDocument()
  })

  it("renders the options after clicking the trigger", async () => {
    const user = userEvent.setup()
    render(
      <Select
        placeholder="Select a city"
        options={[
          { value: "amsterdam", label: "Amsterdam" },
          { value: "berlin", label: "Berlin" },
          { value: "paris", label: "Paris" },
        ]}
      />,
    )

    const trigger = screen.getByRole("combobox")
    await act(async () => {
      await user.click(trigger)
    })

    const options = screen.getAllByRole("option")

    expect(options).toHaveLength(3)
    expect(options[0]).toHaveTextContent("Amsterdam")
    expect(options[1]).toHaveTextContent("Berlin")
    expect(options[2]).toHaveTextContent("Paris")
  })

  it("calls the onChange callback with the selected value", async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()

    render(
      <Select
        placeholder="Select a city"
        options={[
          { value: "amsterdam", label: "Amsterdam" },
          { value: "berlin", label: "Berlin" },
          { value: "paris", label: "Paris" },
        ]}
        onChange={onChange}
      />,
    )

    const trigger = screen.getByRole("combobox")
    await act(async () => {
      await user.click(trigger)
    })

    const option = screen.getByText(/Berlin/i)
    await act(async () => {
      await user.click(option)
    })

    expect(onChange).toHaveBeenCalledWith("berlin")
  })

  it("does not render the options when disabled", async () => {
    const user = userEvent.setup()
    render(
      <Select
        disabled
        placeholder="Select a city"
        options={[
          { value: "amsterdam", label: "Amsterdam" },
          { value: "berlin", label: "Berlin" },
          { value: "paris", label: "Paris" },
        ]}
      />,
    )

    const trigger = screen.getByRole("combobox")
    await act(async () => {
      await user.click(trigger)
    })

    const options = screen.queryAllByRole("option")

    expect(options).toHaveLength(0)
  })
})
