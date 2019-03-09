import React, { Component } from "react";
import styled from "styled-components";
import ReactResizeDetector from "react-resize-detector";
import Precipitation from "./components/Precipitation";
import Clouds from "./components/Clouds";
import Celestial from "./components/Celestial";
import Sky from "./components/Sky";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  border: 2px solid #2b2b2b;
  overflow: none;
  box-sizing: border-box;
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(61, 61, 61);
  max-width: 100%;
`;

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Background>
        <Container>
          <ReactResizeDetector
            handleWidth
            handleHeight
            refreshMode="throttle"
            refreshRate={500}
          >
            <Sky isDay={this.props.isDay} cloudCover={this.props.cloudCover} />
            <Celestial
              isDay={this.props.isDay}
              cloudCover={this.props.cloudCover}
            />
            <Precipitation
              precipType={this.props.precipType}
              precipAmount={this.props.precipAmount}
            />
            <Clouds
              cloudCover={this.props.cloudCover}
              wind={this.props.wind}
              precipAmount={this.props.precipAmount}
            />
          </ReactResizeDetector>
        </Container>
      </Background>
    );
  }
}

export default App;
