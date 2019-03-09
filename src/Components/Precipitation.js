import React, { Component } from "react";
import DrawPrecipitation from "./DrawPrecipitation";
import PropTypes from "prop-types";

/**
 *  A component that generates, animates and renders droplets of a given precipitation type on a HTML Canvas.
 *
 * **Returns:** A [`DrawPrecipitation`](#drawprecipitation) Component, passing a droplet array and styles.
 */
class Precipitation extends Component {
  constructor(props) {
    super(props);

    /**
     * STATE - hold the state of the droplets.
     *
     * droplets: array
     *  --> An array of droplets to be animated.
     */
    this.state = { droplets: [] };

    /**
     * DYNAMICS - defines how the droplets move over time.
     *
     * dynamics:
     *  drift: integer,
     *  --> The horizontal movement of each droplet.
     *
     *  fall: integer,
     *  --> The vertical movement of each droplet.
     *
     *  streak: integer,
     *  --> The length of each droplet.
     */
    this.dynamics = { drift: null, fall: null, streak: null };

    /**
     * STYLE - defines how the droplets look.
     *
     * style:
     *  colour: string,
     *  --> A hex or rgb/a string.
     *
     *  size: integer,
     *  --> The the width of each droplet.
     */
    this.style = { colour: null, size: null };

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
     * Defines the type of precipitation. Can be `rain`, `sleet` or `snow`
     */
    precipType: PropTypes.string,

    /**
     * Defines the precipAmount of precipitation. A value between `0` and `1`.
     */
    precipAmount: PropTypes.number,

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
   * Called when the component is mounted to the DOM.
   *
   * Update the attributes (style and dynamics) of the droplets, immutably update the state to include a new array of droplets
   * (will invoke this.render()) and request the first frame of the animation.
   */
  componentDidMount() {
    this.updateAttributes();
    this.setState({ ...this.state, droplets: this.newDropletArray() }, () => {
      this.rAF = requestAnimationFrame(this.animate);
    });
  }

  /**
   * Cancel any further animations when the component is about to unmount from the DOM.
   */
  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  /**
   * When the props of the component change, handle updating the attributes of the droplets, and generate a new droplet array.
   *
   * @param {*} prevProps - The previous properties of the components before the update occoured.
   */
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      /**
       * If the type of precipitation changes, then we must update the style and dynamics of the droplets.
       */
      if (prevProps.precipType !== this.props.precipType) {
        this.updateAttributes();
      }
      this.setState({ ...this.state, droplets: this.newDropletArray() });
    }
  }

  /**
   *  A switch statement which takes the 'precipType' prop and sets the style and dynamics attributes accordingly.
   */
  updateAttributes() {
    switch (this.props.precipType) {
      default:
      case "rain":
        this.style.colour = "rgba(174,194,224,0.6)";
        this.style.size = 1;
        this.dynamics.drift = 1;
        this.dynamics.fall = 8;
        this.dynamics.streak = 2;
        break;
      case "snow":
        this.style.colour = "rgba(255,255,255,0.6)";
        this.style.size = 3;
        this.dynamics.drift = 2;
        this.dynamics.fall = 1;
        this.dynamics.streak = 0;
        break;
      case "sleet":
        this.style.colour = "rgba(190,200,224,0.6)";
        this.style.size = 2;
        this.dynamics.drift = 2;
        this.dynamics.fall = 4;
        this.dynamics.streak = 1;
        break;
    }
  }

  /**
   * Returns a new array of droplets.
   */
  newDropletArray() {
    const { precipAmount, width, height } = this.props;
    const { streak, fall, drift } = this.dynamics;
    let droplets = [];

    /**
     * Uses the 'height', 'width' and 'precipAmount' props to work out how many droplets to have in the array.
     * Capped at 1000 droplets for performance.
     */
    const count =
      Math.sqrt(width * height) * precipAmount < 1000
        ? Math.sqrt(width * height) * precipAmount
        : 1000;

    /**
     * Pushes new randomly generated drops onto the 'droplets' array. 'droplets' is an array of unnamed objects.
     *
     * `x` and `y` are randomly derived from the width and height of the component.
     *
     * `l` is randomly determined based on the streak dynamic.
     *
     * `xs` is randomly determined from the drift dynamic. A value between `-1 * drift` and `+1 * drift` to prevent an overall movement of particles across the canvas.
     *
     * `ys` is a randomly determined from the fall dynamic.
     *
     */
    for (var i = 0; i < count; i++) {
      droplets.push({
        x: Math.random() * width,
        y: Math.random() * height,
        l: Math.random() * streak,
        xs: -1 * drift + Math.random() * drift + drift / 2,
        ys: Math.random() * fall + fall
      });
    }

    return droplets;
  }

  /**
   * Animates each drop in the droplet array, by first making a copy of the current droplets held in state (immutability).
   *
   * For each drop, it will move the origin of painting (x and y) by the precipAmount specified by the horizontal (xs) and vertical (ys) displacements ('speed').
   * If the drop will leave the canvas (defined by width and height), then:
   *  --> move the drop to '-20' in the y plane (above the canvas, to prevent drops from 'popping').
   *  --> move the drop to a new random position on the x plane.
   *
   * Then immutably update the state with the new positions of the droplets (will invoke render()) and requests the next animation frame.
   */
  animate() {
    /**
     * Only animate if precipitation is actually present.
     */
    if (this.props.precipAmount !== 0) {
      let { droplets } = { ...this.state };
      const { width, height } = this.props;

      droplets.forEach(drop => {
        drop.x += drop.xs;
        drop.y += drop.ys;
        if (drop.x > width || drop.y > height) {
          drop.x = Math.random() * width;
          drop.y = -20;
        }
      });

      this.setState({ ...this.state.droplets, ...droplets }, () => {
        this.rAF = requestAnimationFrame(this.animate);
      });
    }
  }

  /**
   * Main render function (called by React.Component).
   *
   * Returns a `DrawPrecipitation` component and passes in a droplet array.
   *
   * First checks if the component has a width and a height to prevent printing to an unsized canvas.
   */
  render() {
    if (this.props.width && this.props.height) {
      return (
        <DrawPrecipitation
          droplets={this.state.droplets}
          style={this.style}
          width={this.props.width}
          height={this.props.height}
        />
      );
    } else {
      return null;
    }
  }
}

export default Precipitation;
