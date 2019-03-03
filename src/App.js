import React, { Component } from "react";
import styled from "styled-components";
import Weather from "./Components/Weather";

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
          <Weather />
        </Container>
      </Background>
    );
  }
}

export default App;
