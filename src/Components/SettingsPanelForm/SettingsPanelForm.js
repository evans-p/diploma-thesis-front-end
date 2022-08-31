import React from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "@material-ui/core/Button";
import "./SettingsPanelForm.css";
import EL from "../../Assets/images/language/round/EL.png";
import EN from "../../Assets/images/language/round/EN.png";

class SettingsPanelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: this.props.language,
    };
    // BINDING
    this.renderLaguageOptions = this.renderLaguageOptions.bind(this);
    this.renderSettingsRows = this.renderSettingsRows.bind(this);
    this.hadleChange = this.hadleChange.bind(this);
    this.hadleSubmit = this.hadleSubmit.bind(this);
  }

  hadleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.props.setLanguage(e.target.value);
  }
  /** Handles the submission of the settings form. Begins by preventing the default
   * behaviour, end then hides the component.
   */
  hadleSubmit(e) {
    e.preventDefault();
    this.props.toggleSettingsPanel(false);
  }

  /**Called in the language setting row. Mananges the JSX elements that handle
   * the form which controls the App's language setting.*/
  renderLaguageOptions() {
    const images = [EN, EL];
    const languages = [
      { short: "EΝ", full: "English" },
      { short: "EL", full: "Ελληνικά" },
    ];

    return languages.map((val, idx) => {
      return (
        <label className="language-radio" key={uuidv4()}>
          <input
            type="radio"
            checked={val.short === this.state.language}
            name="language"
            value={val.short}
            onChange={this.hadleChange}
          />
          <div className="language-radio-image justify-align-center">
            <img src={images[idx]} alt="..." />
          </div>
          <p>{val.full}</p>
        </label>
      );
    });
  }

  /** Renders the settings Rows that appear in the settings panel. Accepts an
  Array of objects, each of them following the format below:
  settingRowFormat={
      labelEN: String,
      labelEL: String,
      content : JSX Elements,
    }.
    To be used by render().
  */
  renderSettingsRows(settingsRows) {
    return settingsRows.map((value) => {
      return (
        <div className="setting-row justify-align-center" key={uuidv4()}>
          <label className="setting-label">
            {this.props.language === "EL" ? value.labelEL : value.labelEN}
          </label>
          <div className="setting-content">{value.content}</div>
        </div>
      );
    });
  }
  render() {
    const settingsRows = [
      {
        labelEN: "Language:",
        labelEL: "Γλώσσα:",
        content: this.renderLaguageOptions(),
      },
    ];
    return (
      <form className="SettingsPanelForm" onSubmit={this.hadleSubmit}>
        {this.renderSettingsRows(settingsRows)}
        <div className="setting-row justify-align-center">
          <Button variant="contained" type="submit" className="submit">
            {this.props.language === "EL" ? "Επιστροφή" : "Return"}
          </Button>
        </div>
      </form>
    );
  }
}

export default SettingsPanelForm;
