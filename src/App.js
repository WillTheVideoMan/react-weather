import React, { Component } from "react";
import styled from "styled-components";
import ReactResizeDetector from "react-resize-detector";
import Precipitation from "./components/Precipitation";
import Clouds from "./components/Clouds";

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
            <Precipitation width={0} height={0} type="rain" amount={1} />
            <Clouds width={0} height={0} cover={1} wind={1} precipitation={1} />
          </ReactResizeDetector>
        </Container>
      </Background>
    );
  }
}

export default App;
