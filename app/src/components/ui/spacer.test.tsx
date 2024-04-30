import { render } from "@testing-library/react"

import { Spacer } from "./spacer"

describe("<Spacer />", () => {
  it("renders a 1px by 1px div by default", () => {
    const { container } = render(<Spacer />)

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        style="flex-grow: 0; flex-shrink: 0; width: 1px; height: 1px;"
      />
    `)
  })

  it("allows passing a different width", () => {
    const { container } = render(<Spacer w={10} />)

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        style="flex-grow: 0; flex-shrink: 0; width: 10px; height: 1px;"
      />
    `)
  })

  it("allows passing a different height", () => {
    const { container } = render(<Spacer h={10} />)

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        style="flex-grow: 0; flex-shrink: 0; width: 1px; height: 10px;"
      />
    `)
  })

  it("allows passing a different width and height", () => {
    const { container } = render(<Spacer w={10} h={10} />)

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        style="flex-grow: 0; flex-shrink: 0; width: 10px; height: 10px;"
      />
    `)
  })
})
