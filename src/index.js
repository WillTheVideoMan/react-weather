import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <App
    precipType="rain"
    precipAmount={1}
    cloudCover={1}
    wind={1}
    isDay={false}
  />,
  document.getElementById("root")
);
