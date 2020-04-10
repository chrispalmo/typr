import { connect } from "react-redux";
import React, { Component } from "react";
import { setFlashMessage, clearFlashMessage } from "../../actions";
import "./FlashMessage.css";

class FlashMessage extends Component {
  render() {
    let className;
    if (!this.props.flashMessage.hidden) {
      className = "ui message floatabove " + this.props.flashMessage.type;
    } else {
      className = "ui message floatabove hidden";
    }
    return (
      <div slidein="true" className={className} onClick={this.props.clearFlashMessage}>
        <p>{this.props.flashMessage.text}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    flashMessage: state.flashMessage,
  };
};

export default connect(mapStateToProps, {
  setFlashMessage,
  clearFlashMessage,
})(FlashMessage);
