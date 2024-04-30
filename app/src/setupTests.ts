// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"

// https://github.com/testing-library/user-event/discussions/1087
window.HTMLElement.prototype.hasPointerCapture = jest.fn()
window.HTMLElement.prototype.scrollIntoView = jest.fn()
