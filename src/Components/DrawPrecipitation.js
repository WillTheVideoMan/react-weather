import React, { Component } from "react";
import Stackable from "./Stackable";

/**
 * A React 'wrapper' for the HTML canvas element that paints droplets.
 *
 * @author Will Hall
 *
 *   Props:
 *     droplets: array,
 *     --> an array of droplets to draw to the canvas.
 *     style: object,
 *     --> the style of the droplets on the canvas.
 *     width: float,
 *     height: float
 *     --> The width and height of the component. Will be passed on to the HTML canvas.
 *         Can be updated after mounting, making the component resizable.
 *  Children:
 *     Stackable --> Allows for components to be stacked, giving a layered effect.
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
