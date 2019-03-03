import React, { Component } from "react";
import Stackable from "./Stackable";

class DrawClouds extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }
  componentDidMount() {
    this.ctx = this.canvas.current.getContext("2d");
  }
  componentDidUpdate() {
    const { width, height, clouds, style } = this.props;

    const size = 150;

    this.ctx.fillStyle = "rgba(255,255,255,0.4)";

    this.ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < 70; i++) {
      this.ctx.beginPath();
      this.ctx.arc(
        Math.random() * width,
        -size / 2 + 10,
        Math.random() * size,
        0,
        2 * Math.PI
      );
      this.ctx.fill();
    }
  }
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
