import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <App
    precipType="snow"
    precipAmount={0.1}
    cloudCover={0.1}
    wind={0.1}
    isDay={true}
  />,
  document.getElementById("root")
);
