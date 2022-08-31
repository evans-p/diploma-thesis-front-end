import React from "react";
import "./ControlSectionButton.css";

class ControlSectionButton extends React.Component {
  constructor(props) {
    super(props);
    // BINDING
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.open
      ? this.props.toggleControlSection(false)
      : this.props.toggleControlSection(true);
  }
  render() {
    return (
      <div
        className="justify-align-center dark-shadow ControlSectionButton"
        onClick={this.handleOnClick}
      >
        <i className="fas fa-sliders-h"></i>
      </div>
    );
  }
}

export default ControlSectionButton;
