import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./ControlSection.css";

class ControlSection extends React.Component {
  constructor(props) {
    super(props);

    // BINDING
    this.handleSettingsOnClick = this.handleSettingsOnClick.bind(this);
    this.renderControlSectionComponents =
      this.renderControlSectionComponents.bind(this);
    this.fetchControlSectionComponents =
      this.fetchControlSectionComponents.bind(this);
  }

  /*Handler for the click event on the settings component. Display the settings
  Panel.*/
  handleSettingsOnClick() {
    this.props.toggleSettingsPanel(true);
  }

  /*Renders Each of ControlSection's Components. Accepts an array of objects,
  each one following the format below:
  format = {
    className: String,
    onClickFunction: function,
    icon: Font Awesome JSX_element,
    textEL: String,
    textEN: String,
  }.
  To be Used by render().
  */
  renderControlSectionComponents(components) {
    return components.map((value) => {
      return (
        <div
          className={`${value.className} justify-align-center control`}
          key={uuidv4()}
          draggable={false}
        >
          <div
            className="icon justify-align-center"
            draggable={false}
            onClick={value.onClickFunction}
          >
            {value.icon}
          </div>
          <p draggable={false}>
            {this.props.language === "EL" ? value.textEL : value.textEN}
          </p>
        </div>
      );
    });
  }

  /*
  To be used by renderControlSectionComponents method. Returns the required info
  of each componetnt contained in ControlSection.
  */
  fetchControlSectionComponents() {
    return [
      {
        className: "settings",
        onClickFunction: this.handleSettingsOnClick,
        icon: <i className="fas fa-cog"></i>,
        textEL: "Ρυθμίσεις",
        textEN: "Settings",
      },
      {
        className: "validation",
        onClickFunction: this.props.validate,
        icon: <i className="fas fa-check-circle"></i>,
        textEL: "Eπικύρωση",
        textEN: "Validate",
      },
      {
        className: "clear",
        onClickFunction: this.props.clearAll,
        icon: <i className="fas fa-minus-circle"></i>,
        textEL: "Εκκαθάριση Όλων",
        textEN: "Clear All",
      },
      {
        className: this.props.validated ? "deploy" : "deploy inactive",
        onClickFunction: this.props.deploy,
        icon: <i className="fas fa-play-circle"></i>,
        textEL: "Εκτέλεση",
        textEN: "Deploy",
      },
    ];
  }

  render() {
    if (window.innerWidth > 820) {
      return (
        <div
          className={this.props.open ? "ControlSection open" : "ControlSection"}
          draggable={false}
        >
          {this.renderControlSectionComponents(
            this.fetchControlSectionComponents()
          )}
        </div>
      );
    } else {
      return (
        <div
          className={
            this.props.open
              ? "ControlSection dark-shadow open"
              : "ControlSection"
          }
          draggable={false}
        >
          {this.renderControlSectionComponents(
            this.fetchControlSectionComponents()
          )}
        </div>
      );
    }
  }
}

export default ControlSection;
