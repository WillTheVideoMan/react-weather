import React, { Component } from "react";
import PropTypes from "prop-types";
import DrawCelestial from "./DrawCelestial";

/**
 *  A component that shows the sun during the day and moon during the night.
 *
 *  Uses the `cloudCover` property to work out the position of the sun and moon.
 *
 *  This weather layer does not animate over time, rather prints a static repersentation depending on properties,
 *  and so does not require seperate animation and drawing components.
 *
 * **Returns:** A [`DrawPrecipitation`](#drawprecipitation) Component, passing a droplet array and styles.
 */

class Celestial extends Component {
  constructor(props) {
    super(props);
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
     * Defines the amount of cloud coverage. This will determine how 'hidden' the celestial bodies are.
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

  /**
   * If the properties change, we need to update the position and size of the body.
   *
   * Will invoke `this.render()` when immutably updating state.
   *
   * @param {*} prevProps
   */
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      /**
       * Calculate a new radius based upon the size of the component.
       */
      const radius = Math.sqrt(this.props.width * this.props.height) * 0.15;

      /**
       * Immutably update the state of the component, calculating new positions based on new dimensions.
       */
      this.setState({
        ...this.state,
        x: this.props.width - radius * 1.3,
        y: 1.3 * radius - 2 * radius * this.props.cloudCover,
        radius: radius
      });
    }
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
