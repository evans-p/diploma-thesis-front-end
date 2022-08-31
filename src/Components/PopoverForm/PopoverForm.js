import React from "react";

import { withSnackbar } from "notistack";
import Button from "@material-ui/core/Button";

import "./PopoverForm.css";

import { renderTextFieldWithAbornment } from "../../Utils/formHelpers";

import EL from "../../Assets/images/language/rectangle/EL.png";
import EN from "../../Assets/images/language/rectangle/EN.png";

class PopoverForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // The title of the popover, in greek
      popoverTitleEL: this.props.popoverTitleEL,
      // The title of the popover, in english
      popoverTitleEN: this.props.popoverTitleEN,
      // The errors, the parent component has.
      errors: this.props.errors,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  /** A generic handler for the input components */
  handleOnChange(e) {
    this.setState((currentState) => {
      return {
        [e.target.name]: e.target.value,
        errors: {
          ...currentState.errors,
          [e.target.name]: {},
        },
      };
    });
  }

  /* A method that that executes when the user hits the "Submit" Button of the
   * form. If no change to the current component's state has taken place,
   * close the edit panel and return. Otherwise, delete all the errors from the
   * "error" state object that were corrected, and after that, call the appropriate
   * method, to apply the changes to the parent Component, then display
   * a success message (as a snack bar) and then return.
   * TO BE REVIEWED!!!!!*/
  handleOnSubmit() {
    if (
      this.props.popoverTitleEN === this.state.popoverTitleEN &&
      this.props.popoverTitleEL === this.state.popoverTitleEL
    ) {
      this.props.hadleOnClose();
      return;
    }
    if (this.props.mode === "configuration") {
      let { errors } = this.state;

      for (const error in errors) {
        if (
          Object.keys(errors[error]).length === 0 &&
          errors[error].constructor === Object
        ) {
          delete errors[error];
        }
      }

      this.props.setConfigurationPopover(
        this.state.popoverTitleEL,
        this.state.popoverTitleEN,
        errors
      );
    } else if (this.props.mode === "settings") {
      let { errors } = this.state;

      for (const error in errors) {
        if (
          Object.keys(errors[error]).length === 0 &&
          errors[error].constructor === Object
        ) {
          delete errors[error];
        }
      }

      this.props.setSettingsPopover(
        this.state.popoverTitleEL,
        this.state.popoverTitleEN,
        errors
      );
    }
    let message =
      this.props.language === "EL"
        ? "Το Παράθυρο Τροποποιήθηκε Επιτυχώς!"
        : "Popover Was Successfully Configured!";
    this.props.enqueueSnackbar(message, { variant: "success" });
    this.props.hadleOnClose();
  }

  /** A method that checks if a state attribute has an error associated with it.
   * If so, renders the appropriate error message to be displayed.*/
  renderErrorContent(key) {
    if (
      this.state.errors === null ||
      this.state.errors === undefined ||
      (Object.keys(this.state.errors).length === 0 &&
        this.state.errors.constructor === Object)
    ) {
      return "";
    } else {
      if (
        this.state.errors[key] === null ||
        this.state.errors[key] === undefined ||
        (Object.keys(this.state.errors[key]).length === 0 &&
          this.state.errors[key].constructor === Object)
      ) {
        return "";
      } else {
        return this.props.language === "EL"
          ? this.state.errors[key].EL
          : this.state.errors[key].EN;
      }
    }
  }

  /** A method that checks if a state attribute has an error associated with it.
   * If so, returns true, otherwise returns false.
   */
  renderError(key) {
    if (
      this.state.errors === null ||
      this.state.errors === undefined ||
      (Object.keys(this.state.errors).length === 0 &&
        this.state.errors.constructor === Object)
    ) {
      return false;
    } else {
      if (
        this.state.errors[key] === null ||
        this.state.errors[key] === undefined ||
        (Object.keys(this.state.errors[key]).length === 0 &&
          this.state.errors[key].constructor === Object)
      ) {
        return false;
      } else {
        return true;
      }
    }
  }

  render() {
    return (
      <div className="PopoverForm">
        <div className="row title">
          {this.props.language === "EL"
            ? "Ρύθμισεις Παραθύρου"
            : "Popover Settings"}
        </div>
        <div className="row">
          {renderTextFieldWithAbornment({
            name: "popoverTitleEL",
            onChange: this.handleOnChange,
            labelEL: "Τίτλος Παραθύρου",
            labelEN: "Block Title",
            value: this.state.popoverTitleEL,
            abornment: <img src={EL} style={{ width: 20 }} alt="..." />,
            language: this.props.language,
            className: "max-width",
            error: this.renderError("popoverTitleEL"),
            errorMessage: this.renderErrorContent("popoverTitleEL"),
          })}
        </div>
        <div className="row">
          {renderTextFieldWithAbornment({
            name: "popoverTitleEN",
            onChange: this.handleOnChange,
            labelEL: "Τίτλος Παραθύρου",
            labelEN: "Block Title",
            value: this.state.popoverTitleEN,
            abornment: <img src={EN} style={{ width: 20 }} alt="..." />,
            language: this.props.language,
            className: "max-width",
            error: this.renderError("popoverTitleEN"),
            errorMessage: this.renderErrorContent("popoverTitleEN"),
          })}
        </div>
        <div className="row buttons">
          <Button
            variant="contained"
            color="primary"
            className="submit submit-color"
            onClick={this.handleOnSubmit}
          >
            {this.props.language === "EL"
              ? "Υποβολή Αλλαγών"
              : "Submit Changes"}
          </Button>
          <Button
            variant="contained"
            onClick={this.props.hadleOnClose}
            className="submit cancel-color"
          >
            {this.props.language === "EL" ? "Ακύρωση" : "Cancel"}
          </Button>
        </div>
      </div>
    );
  }
}

export default withSnackbar(PopoverForm);
