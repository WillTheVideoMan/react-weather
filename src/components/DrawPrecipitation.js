import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * A React 'wrapper' for the HTML canvas element that paints droplets.
 *
 * An array of droplet objects are passed to this component as props.
 *
 * **A droplet object looks like this:**
 *
 * | Key | Type | Description|
 * |---|---|---|
 * |`x`,`y`|`float`| An x and y coordinate within the dimensions of the component. The origin of drawing for the droplet on the canvas.|
 * |`l`|`float`| The length of each droplet on the canvas.|
 * |`xs`,`ys`|`float`| A displacement on the x and y planes of the 'end' of each droplet from the origin of drawing.|
 *
 *  **Returns:** A HTML5 Canvas which has the droplets painted on it.
 */

class DrawPrecipitation extends Component {
  constructor(props) {
    super(props);

    /**
     * Create a reference to the DOM node on which the canvas is mounted.
     */
    this.canvas = React.createRef();

    /**
     * Holds a refernce to the context of the HTML canvas.
     */
    this.ctx = null;
  }

  /**
   * Define the property types.
   */
  static propTypes = {
    /**
     * An array of droplets to draw to the canvas. Must contain `droplet` object instances.
     */
    droplets: PropTypes.array.isRequired,

    /**
     * A style object. Must contain the keys `colour` (rbg/a or hex string) and `size` (a 'brush stroke' size)
     */
    style: PropTypes.object.isRequired,

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
   * Draw the very first set of droplets.
   */
  componentDidMount() {
    this.ctx = this.canvas.current.getContext("2d");
    this.draw();
  }

  /**
   * If the properties of the droplets change, then draw the new droplets. (Usually the next "frame" of droplets).
   *
   * @param {*} prevProps - The previous properties before the component was updated.
   */
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.draw();
    }
  }

  /**
   * Paints an array of droplets using a given style.
   */
  draw() {
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

export default DrawPrecipitation;
