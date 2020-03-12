import React, { Component } from "react";

class TyprProgressBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 1
    }
  }

  componentDidMount() {
    this.setState({
      width: this.refs.child.parentNode.clientWidth
    })
  }

  render() {
    var {
      percent = 0, // a number between 0 and 1, inclusive
      width = this.state.width, // the overall width
      height = 10, // the overall height
      rounded = true, // if true, use rounded corners
      color = "RGB(100,100,100)", // the fill color
      animate = true, // if true, animate when the percent changes
      label = null // a label to describe the contents (for accessibility)
    } = this.props;

    var r = rounded ? Math.ceil(height / 2) : 0;
    var w = percent ? Math.max(height, width * Math.min(percent, 1)) : 0;
    var style = animate ? { transition: "width 1000ms, fill 500ms" } : null;

    return (
      <div ref="child">
        <svg width={width} height={height} aria-label={label} data-tooltip={label}>
          <rect width={width} height={height} fill="#ccc" rx={r} ry={r} />
          <rect
            width={w}
            height={height}
            fill={color}
            rx={r}
            ry={r}
            style={style}
          />
        </svg>
      </div>
    )
  }
};

export default TyprProgressBar;
