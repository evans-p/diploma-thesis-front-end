import React from "react";
import { withSnackbar } from "notistack";

import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";

import "./ParameterInputFormEditor.css";

import AddOptionsForm from "../AddOptionsForm/AddOptionsForm";

import { renderTextFieldWithAbornment } from "../../Utils/formHelpers";
import { optionArraysEqual } from "../../Utils/arrayHelpers";

import EL from "../../Assets/images/language/rectangle/EL.png";
import EN from "../../Assets/images/language/rectangle/EN.png";

class ParameterInputFormEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // The default value of the parent Component(ParameterInputForm),
      // in greek.
      defaultValueEL: this.props.defaultValueEL,
      // The default value of the parent Component(ParameterInputForm),
      // in english.
      defaultValueEN: this.props.defaultValueEN,
      // An array of options, of the parent component.
      hasOptions: this.props.hasOptions,
      // An object of errors of the parent component(ParameterInputForm).
      errors: this.props.errors,
      // An array of objects that manage the visibility of each option's
      // popover.
      popoverId: "parameter-input-form-editor-popover",
      popoverOpen: false,
      anchorEl: null,
    };

    // BINDING
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.hadleOnClose = this.hadleOnClose.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.addOption = this.addOption.bind(this);
    this.deleteOption = this.deleteOption.bind(this);
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

  /**A method that when executed, sets the state variables that
   * render the clicked option's popover visible.*/
  handleOnClick(e) {
    this.setState({ anchorEl: e.target, popoverOpen: true });
  }

  /**A method that when executed, sets the state variables that
   * make the clicked option's popover hidden.*/
  hadleOnClose() {
    this.setState({ anchorEl: null, popoverOpen: false });
  }

  /**
   * A method to be provided to "AddOptionsForm" as a prop. Add a new option
   * to the "hasOptions" state array.
   */
  addOption({ id, textEL, textEN }) {
    this.setState((currentState) => {
      return {
        hasOptions: [
          {
            id: id,
            optionTextEL: textEL,
            optionTextEN: textEN,
          },
          ...currentState.hasOptions,
        ],
        errors: {
          ...currentState.errors,
          hasOptions: {},
        },
      };
    });
  }

  /**
   * A method to be provided to "AddOptionsForm" as a prop. Deletes and
   * option from "hasOptions" state array.
   */
  deleteOption(idx) {
    this.setState((currentState) => {
      return {
        hasOptions: currentState.hasOptions.filter(
          (option) => option.id !== idx
        ),
        errors: {
          ...currentState.errors,
          hasOptions: {},
        },
      };
    });
  }

  /* A method that that executes when the user hits the "Submit" Button of the
   * form. Delete all the errors from the
   * "error" state object that were corrected, and after that, call "setParameterInputForm"
   * method, to apply the changes to the parent Component(ParameterInputForm).
   * TO BE REVIEWED!!!!!*/
  handleOnSubmit(e) {
    if (
      this.state.defaultValueEL === this.props.defaultValueEL &&
      this.state.defaultValueEN === this.props.defaultValueEN &&
      optionArraysEqual(this.state.hasOptions, this.props.hasOptions)
    ) {
      this.props.hadleOnClose();
      return;
    }
    let message =
      this.props.language === "EL"
        ? "Η Είσοδος Τροποποιήθηκε Επιτυχώς!"
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

    this.props.setParameterInputForm({
      defaultValueEL: this.state.defaultValueEL,
      defaultValueEN: this.state.defaultValueEN,
      hasOptions: this.state.hasOptions,
      errors: errors,
    });
    this.props.enqueueSnackbar(message, { variant: "success" });
    this.props.hadleOnClose();
    return;
  }

  render() {
    return (
      <div className="ParameterInputFormEditor">
        <div className="row title">
          {this.props.language === "EL"
            ? "Ρυθμίσεις Φόρμας Εισόδου Παραμέτρων"
            : "Condition Input Form Settings"}
        </div>
        <div className="row">
          {renderTextFieldWithAbornment({
            name: "defaultValueEL",
            onChange: this.handleOnChange,
            labelEL: "Προκαθορισμένη Τιμή Κειμένου",
            labelEN: "Text Default Value",
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
            labelEL: "Προκαθορισμένη Τιμή Κειμένου",
            labelEN: "Text Default Value",
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
        <div className="row">
          <Button
            variant="contained"
            className="max-width"
            color={this.renderError("hasOptions") ? "secondary" : "primary"}
            onClick={this.handleOnClick}
            endIcon={<ArrowDropDownCircleIcon />}
          >
            {this.props.language === "EL"
              ? "Διαχείριση Επιλογών"
              : "Manage Options"}
          </Button>
          {this.renderError("hasOptions") ? (
            <FormHelperText style={{ color: "#f21d3c" }}>
              {this.renderErrorContent("hasOptions")}
            </FormHelperText>
          ) : null}
        </div>
        <div className="row buttons">
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleOnSubmit}
            className="submit submit-color"
          >
            {this.props.language === "EL"
              ? "Υποβολή Αλλαγών"
              : "Submit Changes"}
          </Button>
          <Button
            variant="contained"
            className="submit cancel-color"
            onClick={this.props.hadleOnClose}
          >
            {this.props.language === "EL" ? "Ακύρωση" : "Cancel"}
          </Button>
        </div>
        <Popover
          id={this.state.popoverId}
          open={this.state.popoverOpen}
          anchorEl={this.state.anchorEl}
          onClose={this.hadleOnClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <AddOptionsForm
            language={this.props.language}
            options={this.state.hasOptions}
            hidePopover={this.hadleOnClose}
            addOption={this.addOption}
            deleteOption={this.deleteOption}
          />
        </Popover>
      </div>
    );
  }
}

export default withSnackbar(ParameterInputFormEditor);
