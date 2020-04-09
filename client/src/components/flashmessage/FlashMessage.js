import classnames from "classnames"
import { connect } from "react-redux";
import React, { Component } from "react";
import { setFlashMessage, clearFlashMessage } from "../../actions";

class FlashMessage extends Component {
  
  render() {
    let className
    if (!this.props.flashMessage.hidden) {
      className="ui message "+this.props.flashMessage.type;    
    } else {
      className="ui message hidden";
    }
    return (
    <div 
      className={className}
      onClick={ this.props.clearFlashMessage }
    >
        <i className="close icon"></i>
        <div className="header">
          {this.props.flashMessage.header}
      </div>
      <p>
        {this.props.flashMessage.text}
      </p>
    </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    flashMessage: state.flashMessage
  };
}

export default connect(
  mapStateToProps,
  {
    setFlashMessage,
    clearFlashMessage
  }
)(FlashMessage);
