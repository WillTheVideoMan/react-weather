import React, { Component } from "react";
import PropTypes from "prop-types";
import DrawClouds from "./DrawClouds";

/**
 *  A component that generates, animates and renders a set of shimmering clouds.
 *
 *  This weather layer uses cloud cover, precipitation and wind values to determine how the style of clouds to print.
 *
 * **Returns:** A [`DrawClouds`](#drawclouds) Component, passing a cloud array and styles.
 */
class Clouds extends Component {
  constructor(props) {
    super(props);

    /**
     * STATE - Holds the state of the clouds
     *
     * clouds:array
     * --> An array of cloud objects.
     */
    this.state = { clouds: [] };

    /**
     * STYLE - The style of each cloud.
     *
     * colour:string
     * --> An RGB/A string containing the colour of each cloud. Dependant on the precipAmount.
     */
    this.style = { colour: null };

    /**
     * rAF - holds a reference to the requestID for the requestAnimationFrame method.
     */
    this.rAF = null;

    /**
     * Bind 'this' to the animate function to pass context
     */
    this.animate = this.animate.bind(this);
  }

  /**
   * Define the property types.
   */
  static propTypes = {
    /**
     * Defines the amount of cloud cover present, and so how many clouds to print. A value betwen `0` and `1`.
     */
    cloudCover: PropTypes.number.isRequired,

    /**
     * Defines the strenth of the wind. A value betwen `0` and `1`.
     */
    wind: PropTypes.number.isRequired,

    /**
     * Defines the amount of precipiatatio falling, and hence the colour of the clouds. A value betwen `0` and `1`.
     */
    precipAmount: PropTypes.number.isRequired,

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
   * Called when the components mounts to the DOM. Prepares the components for printing by updating the cloud attributes (style),
   * then immutably updating the current state with a new array of clouds.
   *
   * Finally, request the very first animation frame. Will invoke this.render();
   */
  componentDidMount() {
    this.updateAttributes();
    this.setState({ ...this.state, clouds: this.newCloudArray() }, () => {
      requestAnimationFrame(this.animate);
    });
  }

  /**
   * If the props of the component change we need to generate new clouds and immutably update the component state.
   *
   * @param {*} prevProps - The previous properties of the components before the update occoured.
   */
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      /**
       * If the precipitation type also updates, we need to update the cloud attributes (style) too.
       */
      if (prevProps.precipAmount !== this.props.precipAmount) {
        this.updateAttributes();
      }

      this.setState({ ...this.state, clouds: this.newCloudArray() });
    }
  }

  /**
   * Updates the attributes (style) of the clouds to be printed.
   */
  updateAttributes() {
    const { precipAmount } = this.props;

    /**
     * Linear interpolation scales the inverse of the `precipAmount` value (between `0` and `1`) to an RGB value (between `150` and `255`).
     *
     * The heavier the precipitation (`precipAmount` approaches `1`), the darker the cloud will be (RGB approaches `150`).
     */
    const rgb =
      150 * (1 - (1 - precipAmount)) + (255 * (1 - precipAmount - 0)) / (1 - 0);

    /** Update component's style */
    this.style.colour = "rgba(" + rgb + "," + rgb + "," + rgb + ",0.4)";
  }

  /**
   * Generates a new cloud array by pushing up to 40 unnamed cloud object instances to an empty array.
   *
   * The number of clouds is determined by `cloudClover`
   *
   * `x` is randomly determined from `2 * width` of the component so that there is a continous stream of clouds.
   *
   * `y` is randomly determined from `1/4 height` of the component, so that clouds only appear in the top quarter of the component.
   *
   * `radius` is randomly determined based on the size of the component.
   *
   * `speed` is determined from `1/radius * wind` so that bigger clouds move slower, and are linked to wind amount.
   *
   */
  newCloudArray() {
    const { width, height, cloudCover, wind } = this.props;
    let clouds = [];

    for (let i = 0; i < 40 * cloudCover; i++) {
      /**
       * `radius` is based on component size, so cap at a maximum `radius` of 20.
       */
      let radius = Math.random() * Math.sqrt(width * height) * 0.75;
      if (radius < 20) radius = 20;

      clouds.push({
        x: -width + Math.random() * width * 2,
        y: (Math.random() * height) / 4 - radius,
        radius: radius,
        speed: (75 / radius) * wind
      });
    }

    return clouds;
  }

  /**
   * Animates the clouds as they move across the screen due to wind.
   *
   * For each cloud, it will add the cloud's `speed` to its `x` value, moving from left to right across the screen.
   *
   * If the cloud leaves the component on the right, reset `x` to move the cloud off the screen by one cloud `radius` and one component width.
   *
   * Immutably updates the state with the now transformed clouds. Will invoke `this.render()`
   *
   */
  animate() {
    /**
     * Only animate if the clouds are acutally moving due to wind.
     */
    if (this.props.wind !== 0) {
      let { clouds } = { ...this.state };

      clouds.forEach(cloud => {
        cloud.x += cloud.speed;
        if (cloud.x > this.props.width + cloud.radius) {
          cloud.x = -cloud.radius - this.props.width;
        }
      });

      this.setState({ ...this.state.clouds, ...clouds }, () => {
        requestAnimationFrame(this.animate);
      });
    }
  }

  /**
   * The main render function, handled by React.
   *
   * Returns a `DrawClouds` component and passes in a droplet array to print.
   */
  render() {
    return (
      <DrawClouds
        clouds={this.state.clouds}
        style={this.style}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

export default Clouds;
