import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 *  A component that prints (in text) temperature details and a short weather summary.
 *
 * **Returns:** A number of `styled-components` that format text and icons using CSS Flexbox.
 */

class Information extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Define property types.
   */
  static propTypes = {
    /**
     * Defines the current temperature. Can be any numeric value.
     */
    currentTemp: PropTypes.number.isRequired,
    /**
     * Defines the highest temperature for the day. Can be any numeric value.
     */
    highTemp: PropTypes.number.isRequired,
    /**
     * Defines the lowest temperature for the day. Can be any numeric value.
     */
    lowTemp: PropTypes.number.isRequired,
    /**
     * A short text summary, limited to 28 characters.
     */
    summary: PropTypes.string.isRequired
  };

  /**
   * Main render function handled by React.
   *
   * Uses Material Icons for the Hi and Lo arrows.
   *
   * Prevents summary strings longer than 28 characters, and adds a "..." if too long.
   *
   * **Returns:** A series of `styled-components` which position and style the text.
   */
  render() {
    const { currentTemp, highTemp, lowTemp, summary } = this.props;

    return (
      <Container>
        <Temperature>
          <Current>{currentTemp}</Current>
          <Degrees>°C</Degrees>
          <HiLo>
            <div>
              <HiLoIcon colour="#ff3b00">arrow_drop_up</HiLoIcon>
              <span>{highTemp}</span>
            </div>
            <div>
              <HiLoIcon colour="#428cf4">arrow_drop_down</HiLoIcon>
              <span>{lowTemp}</span>
            </div>
          </HiLo>
        </Temperature>
        <Summary>
          {summary.length > 28 ? summary.substring(0, 25) + "..." : summary}
        </Summary>
      </Container>
    );
  }
}

/**
 * Main container. Uses viewport width and height to position text.
 */
const Container = styled.div`
  position: absolute;

  top: calc(75vh - 15vw);
  left: 10vw;

  color: white;
  font-family: "Abel", sans-serif;
  line-height: 1;
`;

/**
 * Initiates the CSS FlexBox system. Align items is analogous to vertical-align.
 */
const Temperature = styled.div`
  display: flex;
  align-items: center;
`;

/**
 * Font size is based on viewport width and height to scale on smaller screens.
 */
const Summary = styled.div`
  font-size: calc(3vh + 3vw);
  margin-left: 0.25em;
`;

const Current = styled.div`
  font-size: calc(12.5vh + 12.5vw);
`;

const Degrees = styled.div`
  font-size: calc(2vh + 2vw);
`;

const HiLo = styled.div`
  font-size: calc(3vh + 3vw);
  margin-top: 0.15em;
`;

/**
 * Give basic icon styling. Accepts a colour prop, falling back to white.
 */
const HiLoIcon = styled.i`
  font-family: "Material Icons";
  font-size: calc(2.5vh + 2.5vw);
  color: ${props => props.colour || "white"};
  font-weight: normal;
  font-style: normal;
`;

export default Information;
