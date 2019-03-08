import React, { Component } from "react";
import PropTypes from "prop-types";
import Stackable from "./Stackable";

/**
 * A React 'wrapper' for the HTML canvas element that paints droplets.
 *
 *  **Returns:** A HTML5 Canvas wrapped in a [`Stackable`](#stackable) component.
 */

class DrawPrecipitation extends Component {
  constructor(props) {
    super(props);

    /**
     * Create a reference to the DOM node on which the canvas is mounted.
     */
    this.canvas = React.createRef();
  }

  /**
   * Define the property types.
   */
  static propTypes = {
    /**
     * An array of droplets to draw to the canvas. Must contain `droplet` object instances.
     */
    droplets: PropTypes.array,
    /**
     * A style object. Must contain the keys `colour` (rbg/a or hex string) and `size` (a 'brush stroke' size)
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
   */
  componentDidMount() {
    this.ctx = this.canvas.current.getContext("2d");
  }

  /**
   * Paint the array of droplets to the canvas whenever new props are passed down.
   */
  componentDidUpdate() {
    const { width, height, droplets, style } = this.props;

    /**
     * Pass styles from the props to the canvas context.
     */
    this.ctx.strokeStyle = style.colour;
    this.ctx.lineWidth = style.size;
    this.ctx.lineCap = "round";

    /**
     * Clear the whole canvas.
     */
    this.ctx.clearRect(0, 0, width, height);

    /**
     * Paints a droplet by first moving the paint origin to the x and y value of each droplet,
     * then drawing a line based on the length and displacement ('speed') of each droplet
     */
    droplets.forEach(drop => {
      this.ctx.beginPath();
      this.ctx.moveTo(drop.x, drop.y);
      this.ctx.lineTo(drop.x + drop.l * drop.xs, drop.y + drop.l * drop.ys);
      this.ctx.stroke();
    });
  }

  /**
   * Main render function (called by React.Component).
   * The canvas is wrapped in a Stackable component to allow component layering.
   */
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

export default DrawPrecipitation;
