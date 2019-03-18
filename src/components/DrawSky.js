import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 *  A component that paints a given colour string in a gradient across the component from top to bottom.
 *
 *  The sky transitions from a solid colour to transparent, allowing for any component background colour.
 *
 * **Returns:** A HTML5 Canvas with a given sky style.
 */
class DrawSky extends Component {
  constructor(props) {
    super(props);

    /**
     * Create a reference to the DOM node on which the canvas is mounted.
     */
    this.canvas = React.createRef();
  }

  static propTypes = {
    /**
     * The style of the sky to paint. `colour` must be an rbg/a or hex string.
     */
    colour: PropTypes.string.isRequired,

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
   * Get the 2D context of the canvas when it is mounted to the DOM.
   * Draw the sky.
   */
  componentDidMount() {
    this.ctx = this.canvas.current.getContext("2d");
    this.draw();
  }

  /**
   * If the properties of the sky changes, then draw the new sky. (Usually a new style of sky to print.).
   *
   * @param {*} prevProps - The previous properties before the component was updated.
   */
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.draw();
    }
  }

  /**
   * Paints a sky of given style. Generates a gradient from transparent to a given colour.
   */
  draw() {
    const { colour } = this.props;
    const gradient = this.ctx.createLinearGradient(
      0,
      0,
      0,
      this.props.height * 2
    );

    /**
     * Add the colour and transparent to the gradient. Colour stops are points on the gradient.
     */
    gradient.addColorStop(0, colour);
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    /**
     * Draw a rectangle the size of the screen which is filled with the gradient.
     */
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.props.width, this.props.height);
  }

  /**
   * Main render function (called by React.Component).
   * Returns a HTML5 Canvas.
   */
  render() {
    return (
      <canvas
        ref={this.canvas}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

export default DrawSky;
