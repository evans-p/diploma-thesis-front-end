import React from "react";

import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import FormHelperText from "@material-ui/core/FormHelperText";

import AddOptionsForm from "../AddOptionsForm/AddOptionsForm";

import "./ConditionOptionForm.css";

import {
  renderSelect,
  renderTextFieldWithAbornment,
} from "../../Utils/formHelpers";

import EL from "../../Assets/images/language/rectangle/EL.png";
import EN from "../../Assets/images/language/rectangle/EN.png";

class ConditionOptionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // The errors associated with the condition option.
      errors: this.props.errors,
      // Greek text of the condition Option
      optionTextEL: this.props.optionTextEL,
      // English text of the condition Option
      optionTextEN: this.props.optionTextEN,
      // Comparison Type, associated with the condition option
      comparisonType: this.props.comparisonType,
      // A string of all the comparators associated with the
      // condition option, separated my a comma(,).
      comparators: this.props.comparators
        ? this.props.comparators.toString()
        : "",
      // A list(array) of options, that the condition option can be
      // compared with.
      hasOptions: this.props.hasOptions ? this.props.hasOptions : [],
      // All the state variables below are being used to handle the
      // Component's Popover
      popoverId: "condition-option-form-popover",
      popoverOpen: false,
      anchorEl: null,
    };

    // BINDING
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.hadleOnClose = this.hadleOnClose.bind(this);
    this.deleteOption = this.deleteOption.bind(this);
    this.addOption = this.addOption.bind(this);
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

  /**A method that when executed, sets the state variables that
   * render the block's popover visible.*/
  handleOnClick(e) {
    this.setState({ anchorEl: e.target, popoverOpen: true });
  }

  /**A method that when executed, sets the state variables that
   * make the block's popover hidden.*/
  hadleOnClose() {
    this.setState({ anchorEl: null, popoverOpen: false });
  }

  /**A method to manage the event of deleting an option (an element of
   * the "hasOptions" state variable).*/
  deleteOption(idx) {
    this.setState((currentState) => {
      return {
        hasOptions: currentState.hasOptions.filter((val) => val.id !== idx),
      };
    });
  }

  /**A method to manage the event of adding an option (an element to
   * the "hasOptions" state variable).*/
  addOption({ id, textEL, textEN } = {}) {
    this.setState((currentState) => ({
      hasOptions: [
        { id: id, optionTextEL: textEL, optionTextEN: textEN },
        ...currentState.hasOptions,
      ],
      errors: {
        ...currentState.errors,
        hasOptions: {},
      },
    }));
  }

  /* A method that that executes when the user hits the "Submit" Button of the
   * form. Delete all the errors from the
   * "error" state object that were corrected, and after that, call "setConditionOption"
   * method, to apply the changes to the parent Component(ConditionInputFormEditor),
   * then display a success message (as a snack bar) and then return.
   * TO BE REVIEWED!!!!!*/
  handleOnSubmit() {
    let { errors } = this.state;

    for (const error in errors) {
      if (
        Object.keys(errors[error]).length === 0 &&
        errors[error].constructor === Object
      ) {
        delete errors[error];
      }
    }

    this.props.setConditionOption({
      idx: this.props.index,
      comparisonType: this.state.comparisonType,
      comparators: this.state.comparators.split(","),
      optionTextEL: this.state.optionTextEL,
      optionTextEN: this.state.optionTextEN,
      hasOptions: this.state.hasOptions,
      errors: errors,
    });

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
      <div className="ConditionOptionForm">
        <div className="row title">
          {this.props.language === "EL"
            ? "Ρυθμίσεις Επιλογής"
            : "Option Settings"}
        </div>
        <div className="inputs">
          <div className="row">
            {renderTextFieldWithAbornment({
              name: "optionTextEL",
              onChange: this.handleOnChange,
              labelEL: "Κείμενο Επιλογής",
              labelEN: "Option Text",
              value: this.state.optionTextEL,
              abornment: <img src={EL} style={{ width: 20 }} alt="..." />,
              language: this.props.language,
              // className,
              error: this.renderError("optionTextEL"),
              errorMessage: this.renderErrorContent("optionTextEL"),
            })}
          </div>
          <div className="row">
            {renderTextFieldWithAbornment({
              name: "optionTextEN",
              onChange: this.handleOnChange,
              labelEL: "Κείμενο Επιλογής",
              labelEN: "Option Text",
              value: this.state.optionTextEN,
              abornment: <img src={EN} style={{ width: 20 }} alt="..." />,
              language: this.props.language,
              // className,
              error: this.renderError("optionTextEN"),
              errorMessage: this.renderErrorContent("optionTextEN"),
            })}
          </div>
          <div className="row">
            {renderSelect({
              language: this.props.language,
              formClassName: "max-width",
              labelEL: "Τύπος Σύγκρισης",
              labelEN: "Comparison Type",
              name: "comparisonType",
              value: this.state.comparisonType,
              onChange: this.handleOnChange,
              error: this.renderError("comparisonType"),
              errorMessage: this.renderErrorContent("comparisonType"),
              options: [
                {
                  value: "none",
                  textEL: "Κανένας",
                  textEN: "None",
                },
                {
                  value: "select",
                  textEL: "Επιλογή",
                  textEN: "Select",
                },
                {
                  value: "input",
                  textEL: "Είσοδος",
                  textEN: "Input",
                },
              ],
            })}
          </div>
          {this.state.comparisonType !== "none" ? (
            <div className="row">
              {renderSelect({
                language: this.props.language,
                formClassName: "max-width",
                labelEL: "Επιλογή Συγκριτών",
                labelEN: "Select Comparators",
                name: "comparators",
                value: this.state.comparators,
                onChange: this.handleOnChange,
                error: this.renderError("comparators"),
                errorMessage: this.renderErrorContent("comparators"),
                options: [
                  {
                    value: ["=", "<>", ">", ">=", "<", "<="].toString(),
                    textEL: "=, <>, >, >=, <, <=",
                    textEN: "=, <>, >, >=, <, <=",
                  },
                  {
                    value: ["=", "<>"].toString(),
                    textEL: "=, <>",
                    textEN: "=, <>",
                  },
                ],
              })}
            </div>
          ) : null}
          {this.state.comparisonType === "select" ? (
            <div className="row">
              <Button
                variant="contained"
                onClick={this.handleOnClick}
                color={this.renderError("hasOptions") ? "secondary" : "primary"}
                className="max-width"
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
          ) : null}
        </div>
        <div className="row buttons">
          <Button
            variant="contained"
            color="primary"
            className="submit submit-color"
            onClick={this.handleOnSubmit}
          >
            {this.props.language === "EL" ? "Υποβολή" : "Submit"}
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

export default ConditionOptionForm;
