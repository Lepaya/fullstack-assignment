import { createGlobalStyle } from "styled-components"

// Workaround to make prettier format the code correctly
// https://github.com/prettier/prettier/issues/11196
const styled = { createGlobalStyle }

export const GlobalStyles = styled.createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
  }

  html,
  body {
    height: 100%;
    background: #f9eaff;
    font-family: "Nunito", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  #root {
    height: 100%;
    isolation: isolate;
  }
`
