import React from "react";

import { withSnackbar } from "notistack";
import Button from "@material-ui/core/Button";

import "./PhrasesInputFormEditor.css";

import { renderTextFieldWithAbornment } from "../../Utils/formHelpers";

import EL from "../../Assets/images/language/rectangle/EL.png";
import EN from "../../Assets/images/language/rectangle/EN.png";

class PhrasesInputFormEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // The placeholder of the input element of the parent Component
      // (PhrasesInputForm), in greek.
      placeholderEL: this.props.placeholderEL,
      // The placeholder of the input element of the parent Component
      // (PhrasesInputForm), in english.
      placeholderEN: this.props.placeholderEN,
      // the errors of the parent component (PhrasesInputForm).
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
   * form. Delete all the errors from the
   * "error" state object that were corrected, and after that, call "setPhrasesInputForm"
   * method, to apply the changes to the parent Component(PhrasesInputForm).
   * TO BE REVIEWED!!!!!*/
  handleOnSubmit() {
    if (
      this.props.placeholderEL === this.state.placeholderEL &&
      this.props.placeholderEN === this.state.placeholderEN
    ) {
      this.props.handleOnClose();
      return;
    }

    let message =
      this.props.language === "EL"
        ? "Η είσοδος Τροποποιήθηκε Επιτυχώς!"
        : "Input Was Successfully Configured!";

    let { errors } = this.state;

    for (const error in errors) {
      if (
        Object.keys(errors[error]).length === 0 &&
        errors[error].constructor === Object
      ) {
        delete errors[error];
      }
    }

    this.props.setPhrasesInputForm(
      this.state.placeholderEL,
      this.state.placeholderEN,
      errors
    );

    this.props.enqueueSnackbar(message, { variant: "success" });
    this.props.handleOnClose();
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
      <div className="PhrasesInputFormEditor">
        <div className="row title">
          {this.props.language === "EL"
            ? "Ρυθμίσεις Φόρμας Φράσεων"
            : "Phrases Form Settings"}
        </div>
        <div className="row">
          {renderTextFieldWithAbornment({
            name: "placeholderEL",
            onChange: this.handleOnChange,
            labelEL: "Placeholder",
            labelEN: "Placeholder",
            value: this.state.placeholderEL,
            abornment: <img src={EL} style={{ width: 20 }} alt="..." />,
            language: this.props.language,
            helperTextEL: "*Για Απουσία Placeholder, αφήστε το κενό",
            helperTextEN: "*Leave Empty for no Placeholder",
            className: "max-width",
            error: this.renderError("placeholderEL"),
            errorMessage: this.renderErrorContent("placeholderEL"),
          })}
        </div>
        <div className="row">
          {renderTextFieldWithAbornment({
            name: "placeholderEN",
            onChange: this.handleOnChange,
            labelEL: "Placeholder",
            labelEN: "Placeholder",
            value: this.state.placeholderEN,
            abornment: <img src={EN} style={{ width: 20 }} alt="..." />,
            language: this.props.language,
            helperTextEL: "*Για Απουσία Placeholder, αφήστε το κενό",
            helperTextEN: "*Leave Empty for no Placeholder",
            className: "max-width",
            error: this.renderError("placeholderEN"),
            errorMessage: this.renderErrorContent("placeholderEN"),
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
            onClick={this.props.handleOnClose}
            className="submit cancel-color"
          >
            {this.props.language === "EL" ? "Ακύρωση" : "Cancel"}
          </Button>
        </div>
      </div>
    );
  }
}

export default withSnackbar(PhrasesInputFormEditor);
