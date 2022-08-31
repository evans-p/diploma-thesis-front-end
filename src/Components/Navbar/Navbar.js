import React from "react";
import "./Navbar.css";
import Logo from "../Logo/Logo";
import ComponentSection from "../ComponentSection/ComponentSection";
import ControlSection from "../ControlSection/ControlSection";
import ControlSectionButton from "../ControlSectionButton/ControlSectionButton";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      controlSectionOpen: false,
    };
    this.toggleControlSection = this.toggleControlSection.bind(this);
  }
  /* Toogles the visibility of ControlSection, by changing the "controlSectionOpen"
   * state variable*/
  toggleControlSection(visible) {
    this.setState({ controlSectionOpen: visible });
  }

  render() {
    return (
      <nav className="Navbar">
        <div className="main-navbar dark-shadow">
          <div className="content">
            <Logo />
            <ComponentSection
              minibarOpen={this.props.minibarOpen}
              activeCategory={this.props.activeCategory}
              language={this.props.language}
              toggleMinibar={this.props.toggleMinibar}
              setActiveCategory={this.props.setActiveCategory}
            />
            <ControlSection
              language={this.props.language}
              open={this.state.controlSectionOpen}
              validated={this.props.validated}
              clearAll={this.props.clearAll}
              deploy={this.props.deploy}
              validate={this.props.validate}
              toggleSettingsPanel={this.props.toggleSettingsPanel}
            />
            <ControlSectionButton
              open={this.state.controlSectionOpen}
              toggleControlSection={this.toggleControlSection}
            />
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
