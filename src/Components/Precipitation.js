/*
  Precipitation.js
  Author: Will Hall

  Precipitation:React.Component - A component that generates, animates and renders droplets of a given precipitation type on a HTML Canvas.
    Props:
      type: string,
      --> defines the type of precipitation. Can be 'rain', 'sleet' or 'snow'
      amount: integer,
      --> defines the amount of precipitation. A value between 0 and 1.
      width: float,
      height: float,
      --> The width and height of the component. Can be updated after mounting, making the component resizable.
    Children:
      DrawPrecipitation --> Where the painting to canvas actually happens.
      
*/

import React, { Component } from "react";
import DrawPrecipitation from "./DrawPrecipitation";

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
     *  fall: integer,
     *  --> The vertical movement of each droplet.
     *  streak: integer,
     *  --> The length of each droplet.
     */
    this.dynamics = { drift: null, fall: null, streak: null };

    /**
     * STYLE - defines how the droplets look.
     *
     * style:
     *  color: string,
     *  --> A hex or rgb/a string.
     *  size: integer,
     *  --> The the width of each droplet.
     */
    this.style = { color: null, size: null };

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
   * When the props of the component change, handle updating the attributes of the droplets, or generate a new droplet array.
   */
  componentDidUpdate(prevProps) {
    /**
     * If the props of the component change, then generate a new droplet array.
     * Immutably update the state to include a new array of droplets. Will invoke this.render().
     */
    if (prevProps !== this.props) {
      /**
       * If the type of precipitation changes, then we must update the style and dynamics of the droplets.
       */
      if (prevProps.type !== this.props.type) {
        this.updateAttributes();
      }

      this.setState({ ...this.state, droplets: this.newDropletArray() });
    }
  }

  /**
   *  A switch statement which takes the 'type' prop and sets the style and dynamics attributes accordingly.
   */
  updateAttributes() {
    switch (this.props.type) {
      default:
      case "rain":
        this.style.color = "rgba(174,194,224,0.6)";
        this.style.size = 1;
        this.dynamics.drift = 1;
        this.dynamics.fall = 8;
        this.dynamics.streak = 2;
        break;
      case "snow":
        this.style.color = "rgba(255,255,255,0.6)";
        this.style.size = 3;
        this.dynamics.drift = 2;
        this.dynamics.fall = 1;
        this.dynamics.streak = 0;
        break;
      case "sleet":
        this.style.color = "rgba(190,200,224,0.6)";
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
    const { amount, width, height } = this.props;
    let droplets = [];

    /**
     * Uses the 'height', 'width' and 'amount' props to work out how many droplets to have in the array.
     * Capped at 1000 droplets for performance.
     */
    const count =
      Math.sqrt(width * height) * amount < 1000
        ? Math.sqrt(width * height) * amount
        : 1000;

    /**
     * Pushes new randomly generated drops onto the 'droplets' array. 'droplets' is an array of unnamed objects.
     *
     * droplets:[{
     *  x: float,
     *  y: float,
     *  --> A random x and y coordinate within the dimensions of the component. The origin of drawing for the droplet on the canvas.
     *  l: float,
     *  --> A random length of each droplet on the canvas. Based on {dynamics.streak}.
     *  xs: float,
     *  ys: float
     *  --> A random displacement on the x and y planes of the 'end' of each droplet from the origin of drawing.
     *      Based on {dynamics.drift} and {dynamics.fall}
     * }]
     */
    for (var i = 0; i < count; i++) {
      droplets.push({
        x: Math.random() * width,
        y: Math.random() * height,
        l: Math.random() * this.dynamics.streak,
        xs:
          -1 * this.dynamics.drift +
          Math.random() * this.dynamics.drift +
          this.dynamics.drift / 2,
        ys: Math.random() * this.dynamics.fall + this.dynamics.fall
      });
    }

    return droplets;
  }

  /**
   * Animates each drop in the droplet array, by first making a copy of the current droplets held in state (immutability).
   *
   * For each drop, it will move the origin of painting (x and y) by the amount specified by the horizontal (xs) and vertical (ys) displacements ('speed').
   * If the drop will leave the canvas (defined by width and height), then:
   *  --> move the drop to '-20' in the y plane (above the canvas, to prevent drops from 'popping').
   *  --> move the drop to a new random position on the x plane.
   *
   * Then immutably update the state with the new positions of the droplets (will invoke render()) and requests the next animation frame.
   */
  animate() {
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

  /**
   * Main render function (called by React.Component).
   * Returns an instance of the DrawPrecipitation component.
   */
  render() {
    return (
      <DrawPrecipitation
        droplets={this.state.droplets}
        style={this.style}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

export default Precipitation;
