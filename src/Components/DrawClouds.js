import React, { Component } from "react";
import PropTypes from "prop-types";
import Stackable from "./Stackable";

/**
 * A React 'wrapper' for the HTML canvas element that paints clouds.
 *
 * An array of cloud objects are passed to this component as props.
 *
 * **A cloud object looks like this:**
 *
 * | Key | Type | Description|
 * |---|---|---|
 * |`x`,`y`|`float`| An x and y coordinate within the dimensions of the component. The origin of drawing for the cloud on the canvas.|
 * |`radius`|`float`| The radius of each cloud on the canvas.|
 * |`speed`|`float`| The horizontal speed of each cloud as they move across the component.|
 *
 *  **Returns:** A HTML5 Canvas wrapped in a [`Stackable`](#stackable) component.
 */

class DrawClouds extends Component {
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
     * An array of clouds to be painted. Contains unnamed instances of `cloud` objects.
     */
    clouds: PropTypes.array,

    /**
     * The style of the clouds. Must contain the key `colour`: an rbg/a or hex string.
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
   * Paints an array of clouds to the canvas when the properties change.
   *
   * @param {*} prevProps - The previous properties before the component was updated.
   */
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { width, height, clouds, style } = this.props;

      /**
       * Pass the style string to the canvas context
       */
      this.ctx.fillStyle = style.colour;

      /**
       * Clear the whole canvas.
       */
      this.ctx.clearRect(0, 0, width, height);

      /**
       * For each cloud, draw a circle dependant on radius and fill it with the defined style.
       */
      clouds.forEach(cloud => {
        this.ctx.beginPath();
        this.ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
        this.ctx.fill();
      });
    }
  }

  /**
   * Main render function handled by React.
   *
   * Returns a canvas wrapped in a `Stackable` componenet to allow layering.
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

export default DrawClouds;
