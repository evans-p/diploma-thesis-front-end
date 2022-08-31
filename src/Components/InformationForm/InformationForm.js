import React from "react";
import { withSnackbar } from "notistack";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";

import "./InformationForm.css";

import { renderSelect } from "../../Utils/formHelpers";

import EL from "../../Assets/images/language/rectangle/EL.png";
import EN from "../../Assets/images/language/rectangle/EN.png";

class InformationForm extends React.Component {
  constructor(props) {
    super(props);
    console.log("Creating Information Form...");

    this.state = {
      // Information component's Information text, in greek
      informationTextEL: this.props.informationTextEL,
      // Information component's Information text, in english
      informationTextEN: this.props.informationTextEN,
      // Information component's cursor
      cursor: this.props.cursor,
      // A object that contains any errors the parent component has.
      errors: this.props.errors,
      // All the state variables below are being used in order to manage the popover
      // of the component.
      popoverId: "info-popover",
      popoverOpen: false,
      anchorEl: null,
    };

    // BINDING
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
   * "error" state object that were corrected, and after that, call "setInformation"
   * method, to apply the changes to the parent Component(Information).
   * TO BE REVIEWED!!!!!*/
  handleOnSubmit(e) {
    e.preventDefault();

    if (
      this.state.informationTextEL === this.props.informationTextEL &&
      this.state.informationTextEN === this.props.informationTextEN &&
      this.state.cursor === this.props.cursor
    ) {
      this.props.hadleOnClose();
    } else {
      let message =
        this.props.language === "EL"
          ? "Οι πληροφορίες του Μπλοκ Τροποποιήθηκαν Επιτυχώς!"
          : "Block Information Were Successfully Configured!";

      let { errors } = this.state;

      for (const error in errors) {
        if (
          Object.keys(errors[error]).length === 0 &&
          errors[error].constructor === Object
        ) {
          delete errors[error];
        }
      }
      this.props.setInformation(
        this.state.informationTextEL,
        this.state.informationTextEN,
        this.state.cursor,
        errors
      );
      this.props.enqueueSnackbar(message, { variant: "success" });
      this.props.hadleOnClose();
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

  render() {
    return (
      <form className="InformationForm" onSubmit={this.handleOnSubmit}>
        <div className="row title">
          {this.props.language === "EL"
            ? "Πληροφορίες Μπλοκ"
            : "Block Information"}
        </div>
        <div className="row">
          <div className="col">
            <TextField
              label={
                this.props.language === "EL"
                  ? "Πληροφορίες Μπλοκ"
                  : "Block Information"
              }
              name="informationTextEL"
              value={this.state.informationTextEL}
              multiline
              onChange={this.handleOnChange}
              rows={5}
              rowsMax={5}
              placeholder={
                this.props.language === "EL"
                  ? "Προσθέστε Κείμενο εδώ..."
                  : "Add Text Here..."
              }
              className="max-width"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={EL} style={{ width: 20 }} alt="..." />
                  </InputAdornment>
                ),
              }}
              error={this.renderError("informationTextEL")}
              helperText={this.renderErrorContent("informationTextEL")}
            />
          </div>
          <div className="col">
            <TextField
              className="max-width"
              label={
                this.props.language === "EL"
                  ? "Πληροφορίες Μπλοκ"
                  : "Block Information"
              }
              name="informationTextEN"
              value={this.state.informationTextEN}
              multiline
              onChange={this.handleOnChange}
              rows={5}
              rowsMax={5}
              placeholder={
                this.props.language === "EL"
                  ? "Προσθέστε Κείμενο εδώ..."
                  : "Add Text Here..."
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={EN} style={{ width: 20 }} alt="..." />
                  </InputAdornment>
                ),
              }}
              error={this.renderError("informationTextEN")}
              helperText={this.renderErrorContent("informationTextEN")}
            />
          </div>
          {renderSelect({
            language: this.props.language,
            formClassName: "max-width",
            labelEL: "Επιλογή Δρομέα",
            labelEN: "Select Cursor",
            name: "cursor",
            value: this.state.cursor,
            onChange: this.handleOnChange,
            error: this.renderError("cursor"),
            errorMessage: this.renderErrorContent("cursor"),
            options: [
              {
                value: "help",
                style: { cursor: "help" },
                textEL: "Βοήθεια",
                textEN: "Help",
              },
              {
                value: "pointer",
                style: { cursor: "pointer" },
                textEL: "Δείκτης",
                textEN: "Pointer",
              },
              {
                value: "default",
                style: { cursor: "default" },
                textEL: "Προκαθορισμένος",
                textEN: "Default",
              },
            ],
          })}
        </div>
        <div className="row">
          <Button
            variant="contained"
            color="primary"
            className="submit submit-color"
            type="submit"
          >
            {this.props.language === "EL"
              ? "Υποβολή Αλλαγών"
              : "Submit Changes"}
          </Button>
          <Button
            variant="contained"
            className="submit delete-color"
            color="secondary"
            onClick={this.props.deleteInformation}
          >
            {this.props.language === "EL"
              ? "Διαγραφή Στοιχείου"
              : "Delete Component"}
          </Button>
          <Button
            variant="contained"
            className="submit cancel-color"
            onClick={this.props.hadleOnClose}
          >
            {this.props.language === "EL" ? "Ακύρωση" : "Cancel"}
          </Button>
        </div>
      </form>
    );
  }
}

export default withSnackbar(InformationForm);
