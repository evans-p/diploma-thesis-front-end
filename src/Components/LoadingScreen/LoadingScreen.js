import React from "react";

import "./LoadingScreen.css";
class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scaledDot: 0,
    };
  }

  componentDidMount() {
    this.interval = setInterval(
      () =>
        this.setState((currentState) => {
          return {
            scaledDot: currentState.scaledDot + 1,
          };
        }),
      200
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  dotClass(dotNumber) {
    if (this.state.scaledDot % 3 === dotNumber) {
      return "dot scale";
    } else {
      return "dot";
    }
  }

  render() {
    return (
      <div className="LoadingScreen">
        <p className="loading">
          {this.props.language === "EL" ? "Αποστολή.." : "Posting..."}
        </p>
        <div className="dots">
          <div className={this.dotClass(0)}></div>
          <div className={this.dotClass(1)}></div>
          <div className={this.dotClass(2)}></div>
        </div>
      </div>
    );
  }
}

export default LoadingScreen;
