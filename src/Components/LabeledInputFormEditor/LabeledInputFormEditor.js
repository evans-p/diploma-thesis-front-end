import React from "react";
import { withSnackbar } from "notistack";

import Button from "@material-ui/core/Button";

import "./LabeledInputFormEditor.css";

import EL from "../../Assets/images/language/rectangle/EL.png";
import EN from "../../Assets/images/language/rectangle/EN.png";

import {
  renderTextFieldWithAbornment,
  renderTextField,
} from "../../Utils/formHelpers";

class LabeledInputFormEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.handleState();

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

  /**A method that sets the component's state based on the value of
   * the prop "mode". The attributes of the state then become the
   * the attributes that define the parent component.*/
  handleState() {
    switch (this.props.mode) {
      case "text":
        return {
          variableLabelEL: this.props.variableLabelEL,
          variableLabelEN: this.props.variableLabelEN,
          defaultValueEL: this.props.defaultValueEL,
          defaultValueEN: this.props.defaultValueEN,
          errors: this.props.errors,
        };
      case "integer":
        return {
          variableLabelEL: this.props.variableLabelEL,
          variableLabelEN: this.props.variableLabelEN,
          minValue: this.props.minValue,
          maxValue: this.props.maxValue,
          defaultValue: this.props.defaultValue,
          errors: this.props.errors,
        };
      case "float":
        return {
          variableLabelEL: this.props.variableLabelEL,
          variableLabelEN: this.props.variableLabelEN,
          minValue: this.props.minValue,
          maxValue: this.props.maxValue,
          defaultValue: this.props.defaultValue,
          errors: this.props.errors,
        };
      default:
        return {};
    }
  }

  /* A method that that executes when the user hits the "Submit" Button of the
   * form. If no change to the current component's state has taken place,
   * close the edit panel and return. Otherwise, delete all the errors from the
   * "error" state object that were corrected, and after that, call the appropriate
   * method, to apply the changes to the parent Component, then display
   * a success message (as a snack bar) and then return.
   * TO BE REVIEWED!!!!!*/
  handleOnSubmit() {
    let message = "";
    let errors = null;

    switch (this.props.mode) {
      case "text":
        if (
          this.state.variableLabelEL === this.props.variableLabelEL &&
          this.state.variableLabelEN === this.props.variableLabelEN &&
          this.state.defaultValueEL === this.props.defaultValueEL &&
          this.state.defaultValueEN === this.props.defaultValueEN
        ) {
          this.props.hadleOnClose();
          break;
        }

        message =
          this.props.language === "EL"
            ? "Η Είσοδος Τροποποιήθηκε Επιτυχώς!"
            : "Input Was Successfully Configured!";

        errors = this.state.errors;

        for (const error in errors) {
          if (
            Object.keys(errors[error]).length === 0 &&
            errors[error].constructor === Object
          ) {
            delete errors[error];
          }
        }

        this.props.setLabeledTextInputForm({
          variableLabelEL: this.state.variableLabelEL,
          variableLabelEN: this.state.variableLabelEN,
          defaultValueEL: this.state.defaultValueEL,
          defaultValueEN: this.state.defaultValueEN,
          errors: errors,
        });

        this.props.enqueueSnackbar(message, { variant: "success" });
        this.props.hadleOnClose();
        break;
      case "integer":
        if (
          this.state.variableLabelEL === this.props.variableLabelEL &&
          this.state.variableLabelEN === this.props.variableLabelEN &&
          this.state.minValue === this.props.minValue &&
          this.state.maxValue === this.props.maxValue &&
          this.state.defaultValue === this.props.defaultValue
        ) {
          this.props.hadleOnClose();
          break;
        }

        message =
          this.props.language === "EL"
            ? "Η Είσοδος Τροποποιήθηκε Επιτυχώς!"
            : "Input Was Successfully Configured!";

        errors = this.state.errors;

        for (const error in errors) {
          if (
            Object.keys(errors[error]).length === 0 &&
            errors[error].constructor === Object
          ) {
            delete errors[error];
          }
        }

        this.props.setLabeledIntegerInputForm({
          variableLabelEL: this.state.variableLabelEL,
          variableLabelEN: this.state.variableLabelEN,
          minValue: this.state.minValue,
          maxValue: this.state.maxValue,
          defaultValue: this.state.defaultValue,
          errors: errors,
        });

        this.props.enqueueSnackbar(message, { variant: "success" });
        this.props.hadleOnClose();
        break;
      case "float":
        if (
          this.state.variableLabelEL === this.props.variableLabelEL &&
          this.state.variableLabelEN === this.props.variableLabelEN &&
          this.state.minValue === this.props.minValue &&
          this.state.maxValue === this.props.maxValue &&
          this.state.defaultValue === this.props.defaultValue
        ) {
          this.props.hadleOnClose();
          break;
        }

        message =
          this.props.language === "EL"
            ? "Η Είσοδος Τροποποιήθηκε Επιτυχώς!"
            : "Input Was Successfully Configured!";

        errors = this.state.errors;

        for (const error in errors) {
          if (
            Object.keys(errors[error]).length === 0 &&
            errors[error].constructor === Object
          ) {
            delete errors[error];
          }
        }

        this.props.setLabeledFloatInputForm({
          variableLabelEL: this.state.variableLabelEL,
          variableLabelEN: this.state.variableLabelEN,
          minValue: this.state.minValue,
          maxValue: this.state.maxValue,
          defaultValue: this.state.defaultValue,
          errors,
        });

        this.props.enqueueSnackbar(message, { variant: "success" });
        this.props.hadleOnClose();
        break;

      default:
        return null;
    }
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

  /**Renders the JSX elements that define the form to edit the "LabeledTextInputForm"
   * Component */
  renderLabeledTextInputForm() {
    return (
      <div>
        <div className="row title">
          {this.props.language === "EL"
            ? "Ρυθμίσεις Φόρμας Κειμένου"
            : "Text Form Settings"}
        </div>
        <div className="row">
          {renderTextFieldWithAbornment({
            name: "variableLabelEL",
            onChange: this.handleOnChange,
            labelEL: "Όνομα Μεταβλητής",
            labelEN: "Variable Name",
            value: this.state.variableLabelEL,
            abornment: <img src={EL} style={{ width: 20 }} alt="..." />,
            language: this.props.language,
            className: "max-width",
            error: this.renderError("variableLabelEL"),
            errorMessage: this.renderErrorContent("variableLabelEL"),
          })}
        </div>
        <div className="row">
          {renderTextFieldWithAbornment({
            name: "variableLabelEN",
            onChange: this.handleOnChange,
            labelEL: "Όνομα Μεταβλητής",
            labelEN: "Variable Name",
            value: this.state.variableLabelEN,
            abornment: <img src={EN} style={{ width: 20 }} alt="..." />,
            language: this.props.language,
            className: "max-width",
            error: this.renderError("variableLabelEN"),
            errorMessage: this.renderErrorContent("variableLabelEN"),
          })}
        </div>
        <div className="row">
          {renderTextFieldWithAbornment({
            name: "defaultValueEL",
            onChange: this.handleOnChange,
            labelEL: "Προκαθορισμένη Τιμή",
            labelEN: "Default Value",
            value: this.state.defaultValueEL,
            abornment: <img src={EL} style={{ width: 20 }} alt="..." />,
            language: this.props.language,
            className: "max-width",
            helperTextEL: "*Για Απουσία Προκαθορισμένης τιμής, αφήστε το κενό",
            helperTextEN: "*Leave Empty for no Default Value",
            error: this.renderError("defaultValueEL"),
            errorMessage: this.renderErrorContent("defaultValueEL"),
          })}
        </div>
        <div className="row">
          {renderTextFieldWithAbornment({
            name: "defaultValueEN",
            onChange: this.handleOnChange,
            labelEL: "Προκαθορισμένη Τιμή",
            labelEN: "Default Value",
            value: this.state.defaultValueEN,
            abornment: <img src={EN} style={{ width: 20 }} alt="..." />,
            language: this.props.language,
            className: "max-width",
            helperTextEL: "*Για Απουσία Προκαθορισμένης τιμής, αφήστε το κενό",
            helperTextEN: "*Leave Empty for no Default Value",
            error: this.renderError("defaultValueEN"),
            errorMessage: this.renderErrorContent("defaultValueEN"),
          })}
        </div>
      </div>
    );
  }
  /**Renders the JSX elements that define the form to edit both the "LabeledFloatInputForm"
   * and "LabeledIntegerInputForm" Components */
  renderLabeledNumberInputForm() {
    return (
      <div>
        <div className="row title">
          {this.props.mode === "integer"
            ? this.props.language === "EL"
              ? "Ρυθμίσεις Φόρμας Ακεραίου"
              : "Integer Form Settings"
            : this.props.language === "EL"
            ? "Ρυθμίσεις Φόρμας Αρ. Κιν. Υπ."
            : "Float Form Settings"}
        </div>
        <div className="row">
          {renderTextFieldWithAbornment({
            name: "variableLabelEL",
            onChange: this.handleOnChange,
            labelEL: "Όνομα Μεταβλητής",
            labelEN: "Variable Name",
            value: this.state.variableLabelEL,
            abornment: <img src={EL} style={{ width: 20 }} alt="..." />,
            language: this.props.language,
            className: "max-width",
            error: this.renderError("variableLabelEL"),
            errorMessage: this.renderErrorContent("variableLabelEL"),
          })}
        </div>
        <div className="row">
          {renderTextFieldWithAbornment({
            name: "variableLabelEN",
            onChange: this.handleOnChange,
            labelEL: "Όνομα Μεταβλητής",
            labelEN: "Variable Name",
            value: this.state.variableLabelEN,
            abornment: <img src={EN} style={{ width: 20 }} alt="..." />,
            language: this.props.language,
            className: "max-width",
            error: this.renderError("variableLabelEN"),
            errorMessage: this.renderErrorContent("variableLabelEN"),
          })}
        </div>
        <div className="row">
          {renderTextField({
            name: "minValue",
            onChange: this.handleOnChange,
            labelEL: "Ελάχιστη Τιμή Εισόδου",
            labelEN: "Input Minimun Value",
            value: this.state.minValue,
            language: this.props.language,
            className: "max-width",
            helperTextEL: "*Για Απουσία Ελάχιστης τιμής, αφήστε το κενό",
            helperTextEN: "*Leave Empty for no Minimum Value",
            isNumberInput: true,
            error: this.renderError("minValue"),
            errorMessage: this.renderErrorContent("minValue"),
          })}
        </div>
        <div className="row">
          {renderTextField({
            name: "maxValue",
            onChange: this.handleOnChange,
            labelEL: "Μέγιστη Τιμή Εισόδου",
            labelEN: "Input Maximum Value",
            value: this.state.maxValue,
            language: this.props.language,
            className: "max-width",
            helperTextEL: "*Για Απουσία Μέγιστης τιμής, αφήστε το κενό",
            helperTextEN: "*Leave Empty for no Maximum Value",
            isNumberInput: true,
            error: this.renderError("maxValue"),
            errorMessage: this.renderErrorContent("maxValue"),
          })}
        </div>
        <div className="row">
          {renderTextField({
            name: "defaultValue",
            onChange: this.handleOnChange,
            labelEL: "Προκαθορισμένη Τιμή Εισόδου",
            labelEN: "Input Default Value",
            value: this.state.defaultValue,
            language: this.props.language,
            className: "max-width",
            helperTextEL: "*Για Απουσία Προκαθορισμένης τιμής, αφήστε το κενό",
            helperTextEN: "*Leave Empty for no Default Value",
            isNumberInput: true,
            error: this.renderError("defaultValue"),
            errorMessage: this.renderErrorContent("defaultValue"),
          })}
        </div>
      </div>
    );
  }

  renderContent() {
    switch (this.props.mode) {
      case "text":
        return this.renderLabeledTextInputForm();
      case "integer":
        return this.renderLabeledNumberInputForm();
      case "float":
        return this.renderLabeledNumberInputForm();

      default:
        break;
    }
  }

  render() {
    return (
      <div className="LabeledInputFormEditor">
        {this.renderContent()}
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

export default withSnackbar(LabeledInputFormEditor);
