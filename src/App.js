import React, { Component } from "react";
import styled from "styled-components";
import ReactResizeDetector from "react-resize-detector";
import Precipitation from "./components/Precipitation";
import Clouds from "./components/Clouds";
import Celestial from "./components/Celestial";
import Sky from "./components/Sky";
import Information from "./components/Information";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      precipType: "snow",
      precipAmount: 0.2,
      cloudCover: 0.2,
      wind: 0.2,
      isDay: false,
      currentTemp: 0,
      highTemp: 4,
      lowTemp: -3,
      summary: "Light Snow"
    };
  }

  render() {
    const {
      precipType,
      precipAmount,
      cloudCover,
      wind,
      isDay,
      currentTemp,
      highTemp,
      lowTemp,
      summary
    } = { ...this.state };

    return (
      <Container>
        <ReactResizeDetector
          handleWidth
          handleHeight
          refreshMode="throttle"
          refreshRate={500}
        >
          <Sky isDay={isDay} cloudCover={cloudCover} />
          <Celestial isDay={isDay} cloudCover={cloudCover} />
          <Precipitation precipType={precipType} precipAmount={precipAmount} />
          <Clouds
            cloudCover={cloudCover}
            wind={wind}
            precipAmount={precipAmount}
          />
          <Information
            currentTemp={currentTemp}
            highTemp={highTemp}
            lowTemp={lowTemp}
            summary={summary}
          />
        </ReactResizeDetector>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  border: 5px solid #2b2b2b;
  overflow: none;
  box-sizing: border-box;

  canvas {
    position: absolute;
  }
`;

export default App;
