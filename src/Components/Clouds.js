import React, { Component } from "react";
import DrawClouds from "./DrawClouds";

class Clouds extends Component {
  constructor(props) {
    super(props);
    this.state = { clouds: [] };
    this.style = { color: "" };
    this.animate = this.animate.bind(this);
  }
  componentDidMount() {
    this.updateAttributes();
    requestAnimationFrame(this.animate);
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.width !== this.props.width ||
      prevProps.height !== this.props.height
    ) {
      this.setState({ ...this.state, clouds: this.newCloudArray() }, () => {
        console.log(this.state);
      });
    }
    if (prevProps.rain !== this.props.rain) {
      this.updateAttributes();
    }
  }
  updateAttributes() {
    const newVal =
      150 * (1 - (1 - this.props.rain)) +
      (255 * (1 - this.props.rain - 0)) / (1 - 0);
    this.style.color =
      "rgba(" + newVal + "," + newVal + "," + newVal + ",0.25)";
    console.log(this.style.color);
  }
  newCloudArray() {
    const { width, height, cover, wind } = this.props;
    let clouds = [];

    for (let i = 0; i < 40 * cover; i++) {
      const diameter = Math.random() * Math.sqrt(width * height) * 0.75;
      if (diameter < 20) diameter = 20;
      clouds.push({
        x: -width + Math.random() * width * 2,
        y: (Math.random() * height) / 4 - diameter,
        size: diameter,
        speed: (25 / diameter) * wind
      });
    }
    return clouds;
  }
  animate() {
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
