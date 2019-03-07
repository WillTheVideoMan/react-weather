import React, { Component } from "react";
import Precipitation from "./Precipitation";
import ReactResizeDetector from "react-resize-detector";
import Clouds from "./Clouds";

class Weather extends Component {
  render() {
    return (
      <ReactResizeDetector
        handleWidth
        handleHeight
        refreshMode="throttle"
        refreshRate={500}
      >
        <Precipitation width={0} height={0} type="rain" amount={0} />
        <Clouds width={0} height={0} cover={1} wind={0.1} precipitation={0} />
      </ReactResizeDetector>
    );
  }
}

export default Weather;
