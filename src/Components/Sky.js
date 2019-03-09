import React, { Component } from "react";
import PropTypes from "prop-types";
import DrawSky from "./DrawSky";

/**
 *  A component that generates and prints a sky weather 'layer' based on cloud coverage and if it is day or night.
 *
 *  A clear daytime sky is bright sky blue. A clear nightime sky is dark navy blue. Clouds result in a grey sky.
 *
 * **Returns:** A [`DrawSky`](#drawsky) Component, passing an RGB colour string to paint the sky.
 */
class Sky extends Component {
  constructor(props) {
    super(props);
    this.state = { colour: null };
  }

  /**
   * Define the property types.
   */
  static propTypes = {
    /**
     * Defines wether it is day or not, and so wether to paint bright sky blue or dark navy blue.
     */
    isDay: PropTypes.bool,

    /**
     * Defines the amount of cloud cover, and hence the 'grey-ness' of the sky. A value between `0` and `1`.
     */
    cloudCover: PropTypes.number,

    /**
     * The width of the component. Defines the width of the returned HTML5 Canvas.
     */
    width: PropTypes.number,

    /**
     * The height of the component. Defines the height of the returned HTML5 Canvas.
     */
    height: PropTypes.number
  };

  /**
   * When the component mounts, immutably update the state with a new sky colour.
   */
  componentDidMount() {
    this.setState({ ...this.state, ...this.getNewColour() });
  }

  /**
   *If the properties of the component change, immutably update the state with a new sky colour.
   */
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ ...this.state, ...this.getNewColour() });
    }
  }

  /**
   * Returns an object containing the `colour` key which is assigned a new `RGBA` string value.
   *
   * Uses `cloudCover` to scale from full blue to grey, and `isDay` to determine the shade of blue.
   */
  getNewColour() {
    const { cloudCover, isDay } = this.props;
    let colours = {};

    if (isDay) {
      /** Day time RGB values */
      colours.r = 43;
      colours.g = 170;
      colours.b = 255;
    } else {
      /** Night time RGB values */
      colours.r = 26;
      colours.g = 26;
      colours.b = 102;
    }

    /**
     * Use cloud cover to determine how much 'sky' colour to show.
     */
    const rgb =
      "rgba(" +
      this.interpolate(cloudCover, 0, 1, colours.r, 61) +
      ", " +
      this.interpolate(cloudCover, 0, 1, colours.g, 61) +
      ", " +
      this.interpolate(cloudCover, 0, 1, colours.b, 61) +
      ")";

    return { colour: rgb };
  }

  /**
   * A linear interpolation function which scales some `y` from some value `x` based on defined max and min of `x` and `y`.
   *
   * @param {*} x - Any value between `x0` and `x1`
   * @param {*} x0 - Min value of `x`
   * @param {*} x1 - Max value of `x`
   * @param {*} y0 - Min value of `y`
   * @param {*} y1 - Max value of `y`
   */
  interpolate(x, x0, x1, y0, y1) {
    return (y0 * (x1 - x) + y1 * (x - x0)) / (x1 - x0);
  }

  /**
   * Main render function handled by React.
   *
   * First checks if the component has a width and a height to prevent printing to an unsizec canvas.
   */
  render() {
    if (this.props.width && this.props.height) {
      return (
        <DrawSky
          width={this.props.width}
          height={this.props.height}
          colour={this.state.colour}
        />
      );
    } else {
      return null;
    }
  }
}

export default Sky;
