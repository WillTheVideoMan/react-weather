import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import App from "./App";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
  @import url('https://fonts.googleapis.com/css?family=Abel');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons')
`;

ReactDOM.render(
  <div>
    <GlobalStyles />
    <App />
  </div>,
  document.getElementById("root")
);
