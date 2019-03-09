import React, { Component } from "react";
import PropTypes from "prop-types";
import Stackable from "./Stackable";

/**
 *  A component that paints a given colour string in a gradient across the component from top to bottom.
 *
 *  The sky transitions from a solid colour to transparent, allowing for any component background colour.
 *
 * **Returns:** A [`Stackable`](#stackable) Component, in which a HTML5 canvas paints the sky.
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
     * The style of the sky to paint. Must contain the key `colour` which is an rbg/a or hex string.
     */
    style: PropTypes.object,

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
   * Paints a sky of given style.
   */
  draw() {
    const { colour } = this.props;
    const thunder = false;

    const gradient = this.ctx.createLinearGradient(
      0,
      0,
      0,
      this.props.height * 2
    );

    gradient.addColorStop(0, colour);
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.props.width, this.props.height);
  }

  render() {
    return (
      <Stackable>
        <canvas
          ref={this.canvas}
          width={this.props.width}
          height={this.props.height}
        />
      </Stackable>
    );
  }
}

export default DrawSky;
