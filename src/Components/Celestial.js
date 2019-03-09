import React, { Component } from "react";
import PropTypes from "prop-types";
import DrawCelestial from "./DrawCelestial";

/**
 *  A component that shows the sun during the day and moon during the night.
 *
 *  Uses the `cloudCover` property to work out the position of the sun and moon, giving it's 'hidden-ness' in the clouds.
 *
 *  This weather layer does not animate over time, but rather prints a static repersentation depending on properties.
 *
 * **Returns:** A [`DrawPrecipitation`](#drawprecipitation) Component, passing a droplet array and styles.
 */

class Celestial extends Component {
  constructor(props) {
    super(props);

    /**
     * STATE - Holds the current parameters of the celestial body.
     *
     * x: float,
     * y: float,
     * --> The x and y coordinate of the celesial body on the HTML5 Canvas.
     *
     * radius: float
     * --> The radius of the celestial body. Used to calculate x and y positioning.
     */
    this.state = { x: null, y: null, radius: null };
  }

  /**
   * Define the property types.
   */
  static propTypes = {
    /**
     * If it is day, then display the sun. Else, display the moon.
     */
    isDay: PropTypes.bool,

    /**
     * Defines the amount of cloud coverage. A value between `0` and `1`. This will determine how 'hidden' the celestial bodies are.
     */
    cloudCover: PropTypes.number,

    /**
     * The width of the component. Can be updated after mounting, making the component resizable.
     */
    width: PropTypes.number,

    /**
     * The height of the component. Can be updated after mounting, making the component resizable.
     */
    height: PropTypes.number
  };

  componentDidMount() {
    this.setState({ ...this.state, ...this.getNewCelestialBody() });
  }

  /**
   * If the properties change, we need to
   *
   * Will invoke `this.render()` when immutably updating state.
   *
   * @param {*} prevProps
   */
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ ...this.state, ...this.getNewCelestialBody() });
    }
  }

  /**
   * Returns a new celstial body.
   */
  getNewCelestialBody() {
    /**
     * Calculate a new radius based upon the size of the component.
     */
    const radius = Math.sqrt(this.props.width * this.props.height) * 0.15;

    /**
     * Return a new Celesial body, calculating new positions based on new dimensions.
     */
    return {
      x: this.props.width - radius * 1.3,
      y: 1.3 * radius - 2 * radius * this.props.cloudCover,
      radius: radius
    };
  }

  /**
   * The main render function. Returns a `DrawCelestial` component with a given position on the canvas.
   */
  render() {
    return (
      <DrawCelestial
        isDay={this.props.isDay}
        width={this.props.width}
        height={this.props.height}
        x={this.state.x}
        y={this.state.y}
        radius={this.state.radius}
      />
    );
  }
}

export default Celestial;
