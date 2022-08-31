import React from "react";

import "./DownloadButton.css";

import Tooltip from "@material-ui/core/Tooltip";

class DownloadButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: 0,
    };
    // BINDING
    this.downloadFiles = this.downloadFiles.bind(this);
  }

  componentDidMount() {
    setInterval(() => {
      let { opacity } = this.state;

      opacity = opacity + 0.4;

      if (opacity >= 1) {
        this.setState({ opacity: 1 });
        clearInterval();
      } else {
        this.setState({ opacity: opacity });
      }
    }, 20);
  }

  downloadFiles() {
    this.props.downloadZipFile();
  }

  render() {
    return (
      <Tooltip
        arrow
        title={this.props.language === "EL" ? "Λήψη Αρχείων" : "Download Files"}
      >
        <div
          className="justify-align-center dark-shadow DownloadButton"
          style={{ opacity: this.state.opacity, transition: "all 2s ease" }}
          onClick={this.downloadFiles}
        >
          <i class="fas fa-download"></i>
        </div>
      </Tooltip>
    );
  }
}

export default DownloadButton;
