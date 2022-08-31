import React from "react";
import { withSnackbar } from "notistack";
import { v4 as uuid } from "uuid";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import "./AddOptionsForm.css";

import {
  renderList,
  renderTextFieldWithAbornment,
} from "../../Utils/formHelpers";

import EL from "../../Assets/images/language/rectangle/EL.png";
import EN from "../../Assets/images/language/rectangle/EN.png";

class AddOptionsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // The array of options to be managed my the Component
      options: this.props.options,
      optionTextEL: "",
      optionTextELError: false,
      optionTextEN: "",
      optionTextENError: false,
    };

    // BINDING
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnAddClick = this.handleOnAddClick.bind(this);
    this.handleOnDeleteClick = this.handleOnDeleteClick.bind(this);
  }

  /** A generic handler for the input components */
  handleOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.name + "Error"]: false,
    });
  }

  /**A method that exe*/
  handleOnDeleteClick(idx) {
    this.props.deleteOption(idx);
    this.setState((currentState) => {
      return {
        options: currentState.options.filter((option) => option.id !== idx),
      };
    });
  }

  handleOnAddClick(e) {
    let errors = { EL: false, EN: false };
    // Check if both text fields have been filled.
    if (this.state.optionTextEL === "") {
      errors.EL = true;
    }
    if (this.state.optionTextEN === "") {
      errors.EN = true;
    }
    // At least one of the text fields has not been filled.
    // Display an error message and return.
    if (errors.EL === true || errors.EN === true) {
      this.setState({
        optionTextELError: errors.EL,
        optionTextENError: errors.EN,
      });
      return;
    }
    // Check if the option provided already exists.
    if (
      this.state.options.filter((option) => {
        return (
          option.optionTextEL === this.state.optionTextEL ||
          option.optionTextEL === this.state.optionTextEN ||
          option.optionTextEN === this.state.optionTextEL ||
          option.optionTextEN === this.state.optionTextEN
        );
      }).length > 0
    ) {
      // The option provided already exists. Display an error message
      // and return.
      let message =
        this.props.language === "EL"
          ? "Η επιλογή Υπάρχει Ήδη"
          : "Option Already Exists..";
      this.props.enqueueSnackbar(message, { variant: "error" });
      return;
    }
    // Create a new option.
    let option = {
      id: uuid(),
      textEL: this.state.optionTextEL,
      textEN: this.state.optionTextEN,
    };
    // Add the option created above to this component's option array,
    // and call "addOption" method to add this option to the option list of
    // the parent component.
    this.props.addOption({
      id: option.id,
      textEL: option.textEL,
      textEN: option.textEN,
    });
    this.setState((currentState) => {
      return {
        options: [
          {
            id: option.id,
            optionTextEL: option.textEL,
            optionTextEN: option.textEN,
          },
          ...currentState.options,
        ],
        optionTextEL: "",
        optionTextEN: "",
      };
    });
  }

  render() {
    return (
      <div className="AddOptionsForm">
        <div className="title">
          {this.props.language === "EL" ? "Επιλογές" : "Options"}
        </div>
        {renderList({
          options: this.state.options,
          language: this.props.language,
          onDelete: this.handleOnDeleteClick,
          className: "list",
        })}
        <div className="add-option">
          {renderTextFieldWithAbornment({
            name: "optionTextEL",
            onChange: this.handleOnChange,
            labelEL: "Κείμενο Επιλογής",
            labelEN: "Option Text",
            value: this.state.optionTextEL,
            abornment: <img src={EL} style={{ width: 20 }} alt="..." />,
            language: this.props.language,
            error: this.state.optionTextELError,
            className: "textfield",
            errorMessage:
              this.props.language === "EL"
                ? "Παρακαλώ Συμπληρώστε την Παραπάνω Επιλογή"
                : "Please Fill the option Above",
          })}
          {renderTextFieldWithAbornment({
            name: "optionTextEN",
            onChange: this.handleOnChange,
            labelEL: "Κείμενο Επιλογής",
            labelEN: "Option Text",
            value: this.state.optionTextEN,
            abornment: <img src={EN} style={{ width: 20 }} alt="..." />,
            language: this.props.language,
            error: this.state.optionTextENError,
            className: "textfield",
            errorMessage:
              this.props.language === "EL"
                ? "Παρακαλώ Συμπληρώστε την Παραπάνω Επιλογή"
                : "Please Fill the option Above",
          })}
          <Button
            className="btn submit-color"
            variant="contained"
            color="primary"
            onClick={this.handleOnAddClick}
            endIcon={<AddIcon />}
          >
            {this.props.language === "EL" ? "Προσθήκη Επιλογής" : "Add Option"}
          </Button>
          <Button
            className="btn cancel-color"
            variant="contained"
            onClick={this.props.hidePopover}
          >
            {this.props.language === "EL" ? "Κλείσιμο" : "Close"}
          </Button>
        </div>
      </div>
    );
  }
}

export default withSnackbar(AddOptionsForm);
