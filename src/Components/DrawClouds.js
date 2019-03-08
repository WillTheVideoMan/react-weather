import React, { Component } from "react";
import Stackable from "./Stackable";

class DrawClouds extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.ctx = null;
  }

  componentDidMount() {
    this.ctx = this.canvas.current.getContext("2d");
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { width, height, clouds, style } = this.props;

      this.ctx.fillStyle = style.colour;
      this.ctx.clearRect(0, 0, width, height);

      clouds.forEach(cloud => {
        this.ctx.beginPath();
        this.ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
        this.ctx.fill();
      });
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
