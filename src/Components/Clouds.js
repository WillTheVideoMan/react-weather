import React, { Component } from "react";
import DrawClouds from "./DrawClouds";

class Clouds extends Component {
  constructor(props) {
    super(props);
    this.state = { clouds: [] };
    this.animate = this.animate.bind(this);
  }
  componentDidMount() {
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
  }
  newCloudArray() {
    const { width, height, cover, wind } = this.props;
    let clouds = [];

    for (let i = 0; i < 20 * cover; i++) {
      const diameter = Math.random() * Math.sqrt(width * height) * 0.75;
      if (diameter < 20) diameter = 20;
      clouds.push({
        x: Math.random() * width,
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
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

export default Clouds;
