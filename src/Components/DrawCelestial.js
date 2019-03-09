import React, { Component } from "react";
import PropTypes from "prop-types";
import Stackable from "./Stackable";

/**
 * A React 'wrapper' for the HTML canvas element that paints a glowing sparkly sun or a cool shiny moon.
 *
 * **Returns:** A HTML5 Canvas wrapped in a [`Stackable`](#stackable) component.
 */

class DrawCelestial extends Component {
  constructor(props) {
    super(props);

    /**
     * Create a reference to the DOM node on which the canvas is mounted.
     */
    this.canvas = React.createRef();
  }

  static propTypes = {
    /**
     * If it is day, then display the sun. Else, display the moon.
     */
    isDay: PropTypes.bool,
    /**
     * The x coordinate of the celestial body's center. The orgin is the top-left of the browser window.
     */
    x: PropTypes.number,
    /**
     * The y coordinate of the celestial body's center. The orgin is the top-left of the browser window.
     */
    y: PropTypes.number,
    /**
     * The radius of the celestial body.
     */
    radius: PropTypes.number,
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
   * Draw the celestial body to the canvas.
   */
  componentDidMount() {
    this.ctx = this.canvas.current.getContext("2d");
    this.draw();
  }

  /**
   * If the properties of the celestial body change, then we need to paint the new celestial body.
   * We can do this by invoking `this.draw()`
   *
   * @param {*} prevProps - The previous properties of the celestial body.
   */
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.draw();
    }
  }

  /**
   * Draws a celestial body to a given location on the HTML5 canvas.
   */
  draw() {
    const { isDay, x, y, radius, width, height } = this.props;

    /**
     * Clear the canvas.
     */
    this.ctx.clearRect(0, 0, width, height);

    /**
     * Define what the celestial body looks like, depending of wether to print a sun or a moon.
     * `shadowBlur` gives us the glowing appearance.
     */
    if (isDay) {
      this.ctx.fillStyle = "#ffbb00";
      this.ctx.shadowColor = "#ffa500";
    } else {
      this.ctx.fillStyle = "#e3e5f9";
      this.ctx.shadowColor = "#c9ceff";
    }

    this.ctx.shadowBlur = 50;

    /**
     * Paint the celestial body given the parameters and using the style as above.
     */
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();

    /**
     * Define what the specs look like. They are cool artifacts which originate from the celestial body.
     */
    this.ctx.fillStyle = "rgb(255, 255, 255, 0.05)";
    this.ctx.shadowBlur = null;

    /**
     * Invoke `drawSpecs` to print 4 specs (light artifacts), given the current position and size of the celestial body.
     */
    this.drawSpecs(4, x, y, radius);
  }

  /**
   * Recursively prints a glowing line of specs coming from a central x and y coordinate.
   *
   * @param {*} count - The number of spec to print.
   * @param {*} lastX - The x coordinate of the last printed spec.
   * @param {*} lastY - The y coordinate of the last printed spec.
   * @param {*} lastradius - The radius of the last printed spec.
   */
  drawSpecs(count, lastX, lastY, lastradius) {
    count--;

    const x = lastX - lastradius / 1.5;
    const y = lastY + lastradius / 1.5;
    const radius = lastradius / 2;

    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();

    if (count > 0) {
      this.drawSpecs(count, x, y, radius);
    }
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

export default DrawCelestial;
