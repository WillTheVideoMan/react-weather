import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <App
    precipType="rain"
    precipAmount={0.2}
    cloudCover={0.2}
    wind={0.2}
    isDay={true}
  />,
  document.getElementById("root")
);
