import React, { Component } from "react";
import Precipitation from "./Precipitation";
import ReactResizeDetector from "react-resize-detector";

class Weather extends Component {
  render() {
    return (
      <ReactResizeDetector
        handleWidth
        handleHeight
        refreshMode="throttle"
        refreshRate={500}
      >
        <Precipitation width={0} height={0} type="rain" amount={1} />
      </ReactResizeDetector>
    );
  }
}

export default Weather;