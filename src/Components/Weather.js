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
        <Precipitation width={0} height={0} type="snow" amount={0.5} />
        <Clouds
          width={0}
          height={0}
          cover={0.5}
          wind={0.5}
          precipitation={0.5}
        />
      </ReactResizeDetector>
    );
  }
}

export default Weather;
