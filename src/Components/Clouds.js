/*
  Clouds.js
  Author: Will Hall

  Clouds:React.Component - 
    Props:
      cover: float,
      --> The amount of cloud coverage in the sky. Changes the number of clouds in the sky. A value between 0 and 1.
      wind: float,
      --> The amount of wind that blows. Changes the horizontal speed of the clouds. A value between 0 and 1.
      precipitation: float,
      --> The amount of precipitation that falls from the sky. Changes the colour of the clouds. A value between 0 and 1.
      width: float,
      height: float,
      --> The width and height of the component. Can be updated after mounting, making the component resizable.
    Children:
      DrawClouds --> Where the painting to canvas actually happens.
*/
import React, { Component } from "react";
import DrawClouds from "./DrawClouds";

class Clouds extends Component {
  constructor(props) {
    super(props);
    this.state = { clouds: [] };
    this.style = { colour: null };
    this.animate = this.animate.bind(this);
  }
  componentDidMount() {
    this.updateAttributes();
    requestAnimationFrame(this.animate);
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (prevProps.precipitation !== this.props.precipitation) {
        this.updateAttributes();
      }
      this.setState({ ...this.state, clouds: this.newCloudArray() });
    }
  }
  updateAttributes() {
    const { precipitation } = this.props;
    const newVal =
      150 * (1 - (1 - precipitation)) +
      (255 * (1 - precipitation - 0)) / (1 - 0);
    this.style.colour =
      "rgba(" + newVal + "," + newVal + "," + newVal + ",0.4)";
  }
  newCloudArray() {
    const { width, height, cover, wind } = this.props;
    let clouds = [];

    for (let i = 0; i < 40 * cover; i++) {
      let diameter = Math.random() * Math.sqrt(width * height) * 0.75;
      if (diameter < 20) diameter = 20;
      clouds.push({
        x: -width + Math.random() * width * 2,
        y: (Math.random() * height) / 4 - diameter,
        size: diameter,
        speed: (75 / diameter) * wind
      });
    }
    return clouds;
  }
  animate() {
    if (this.props.wind !== 0) {
      let { clouds } = { ...this.state };

      clouds.forEach(cloud => {
        cloud.x += cloud.speed;
        if (cloud.x > this.props.width + cloud.size) {
          cloud.x = -cloud.size;
        }
      });

      this.setState({ ...this.state.clouds, ...clouds }, () => {
        requestAnimationFrame(this.animate);
      });
    }
  }
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
