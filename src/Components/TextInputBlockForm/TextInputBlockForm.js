import React from "react";
import { withSnackbar } from "notistack";

import Button from "@material-ui/core/Button";

import "./TextInputBlockForm.css";

import {
  renderImageUpload,
  renderTextField,
  renderTextFieldWithAbornment,
  renderSelect,
} from "../../Utils/formHelpers";

import EL from "../../Assets/images/language/rectangle/EL.png";
import EN from "../../Assets/images/language/rectangle/EN.png";

class TextInputBlockForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // The block' image.
      image: this.props.image,
      // The help texh that appears when the user hovers over the block's
      // image
      infoTextEL: this.props.infoTextEL,
      infoTextEN: this.props.infoTextEN,
      // The mouse cursor of the block's image
      iconCursor: this.props.iconCursor,
      // The variable that the current block controls.
      variableName: this.props.variableName,
      // The default value of the input, in greek
      defaultValueEL: this.props.defaultValueEL,
      // The default value of the input, in english
      defaultValueEN: this.props.defaultValueEN,
      // An object with the errors of the parent component.
      errors: this.props.errors,
    };
    // BINDING
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnReturnClick = this.handleOnReturnClick.bind(this);
  }

  /** A handler to manage Image uploads.*/
  handleImageUpload(e) {
    if (e.target.files.length > 0) {
      this.setState((currentState) => {
        return {
          [e.target.name]: e.target.files[0],
          errors: {
            ...currentState.errors,
            [e.target.name]: {},
          },
        };
      });
    }
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
   * "error" state object that were corrected, and after that, call "setTextInputBlock"
   * method, to apply the changes to the parent Component(TextInputBlock), then display
   * a success message (as a snack bar) and then return.
   * TO BE REVIEWED!!!!!*/
  handleSubmit(e) {
    e.preventDefault();
    if (
      this.state.image === this.props.image &&
      this.state.infoTextEL === this.props.infoTextEL &&
      this.state.infoTextEN === this.props.infoTextEN &&
      this.state.iconCursor === this.props.iconCursor &&
      this.state.variableName === this.props.variableName &&
      this.state.defaultValueEL === this.props.defaultValueEL &&
      this.state.defaultValueEN === this.props.defaultValueEN
    ) {
      this.props.closeEditPanel();
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

    this.props.setTextInputBlock({
      mode: this.props.componentMode,
      index: this.props.index,
      image: this.state.image,
      infoTextEL: this.state.infoTextEL,
      infoTextEN: this.state.infoTextEN,
      iconCursor: this.state.iconCursor,
      variableName: this.state.variableName,
      defaultValueEL: this.state.defaultValueEL,
      defaultValueEN: this.state.defaultValueEN,
      errors: errors,
    });
    this.props.closeEditPanel();
    this.props.enqueueSnackbar(message, { variant: "success" });
  }

  /** A method that that executes when the user hits the "Return" Button of the
   * Component.Closes the block edit panel.*/
  handleOnReturnClick(e) {
    this.props.closeEditPanel();
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
      <form className="TextInputBlockForm" onSubmit={this.handleSubmit}>
        <div className="inputs">
          <div className="row">
            {renderImageUpload({
              language: this.props.language,
              labelEL: "Εικόνα Εισόδου",
              labelEN: "Input Image",
              image: this.state.image,
              name: "image",
              onChange: this.handleImageUpload,
              error: this.renderError("image"),
              errorContent: this.renderErrorContent("image"),
            })}
          </div>
          <div className="row">
            {renderTextFieldWithAbornment({
              name: "infoTextEL",
              onChange: this.handleOnChange,
              labelEL: "Πληροφορίες Εισόδου",
              labelEN: "Input Information",
              value: this.state.infoTextEL,
              abornment: <img src={EL} style={{ width: 20 }} alt="..." />,
              language: this.props.language,
              className: "max-width",
              multiline: true,
              error: this.renderError("infoTextEL"),
              errorMessage: this.renderErrorContent("infoTextEL"),
              placeholderEL: "Προσθέστε Κείμενο εδώ...",
              placeholderEN: "Add Text Here...",
            })}
          </div>
          <div className="row">
            {renderTextFieldWithAbornment({
              name: "infoTextEN",
              onChange: this.handleOnChange,
              labelEL: "Πληροφορίες Εισόδου",
              labelEN: "Input Information",
              value: this.state.infoTextEN,
              abornment: <img src={EN} style={{ width: 20 }} alt="..." />,
              language: this.props.language,
              className: "max-width",
              multiline: true,
              error: this.renderError("infoTextEN"),
              errorMessage: this.renderErrorContent("infoTextEN"),
              placeholderEL: "Προσθέστε Κείμενο εδώ...",
              placeholderEN: "Add Text Here...",
            })}
          </div>
          <div className="row">
            {renderTextField({
              name: "variableName",
              onChange: this.handleOnChange,
              labelEL: "Μεταβλητή Εισόδου",
              labelEN: "Input Variable",
              value: this.state.variableName,
              language: this.props.language,
              error: this.renderError("variableName"),
              errorMessage: this.renderErrorContent("variableName"),
              className: "max-width",
            })}
          </div>
          <div className="row">
            {renderSelect({
              language: this.props.language,
              formClassName: "max-width",
              labelEL: "Επιλογή Δρομέα Εικόνας",
              labelEN: "Select Icon Cursor",
              name: "iconCursor",
              value: this.state.iconCursor,
              onChange: this.handleOnChange,
              error: this.renderError("iconCursor"),
              errorMessage: this.renderErrorContent("iconCursor"),
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
            {renderTextFieldWithAbornment({
              name: "defaultValueEL",
              onChange: this.handleOnChange,
              labelEL: "Προκαθορισμένη Τιμή Εισόδου",
              labelEN: "Default Input Value",
              value: this.state.defaultValueEL,
              abornment: <img src={EL} style={{ width: 20 }} alt="..." />,
              language: this.props.language,
              className: "max-width",
              helperTextEL:
                "*Για Απουσία Προκαθορισμένης τιμής, αφήστε το κενό",
              helperTextEN: "*Leave Empty for no Default Value",
              error: this.renderError("defaultValueEL"),
              errorMessage: this.renderErrorContent("defaultValueEL"),
            })}
          </div>
          <div className="row">
            {renderTextFieldWithAbornment({
              name: "defaultValueEN",
              onChange: this.handleOnChange,
              labelEL: "Προκαθορισμένη Τιμή Εισόδου",
              labelEN: "Default Input Value",
              value: this.state.defaultValueEN,
              abornment: <img src={EN} style={{ width: 20 }} alt="..." />,
              language: this.props.language,
              className: "max-width",
              helperTextEL:
                "*Για Απουσία Προκαθορισμένης τιμής, αφήστε το κενό",
              helperTextEN: "*Leave Empty for no Default Value",
              error: this.renderError("defaultValueEN"),
              errorMessage: this.renderErrorContent("defaultValueEN"),
            })}
          </div>
        </div>
        <div className="row">
          <Button
            variant="contained"
            color="primary"
            className="button submit-color"
            type="submit"
          >
            {this.props.language === "EL"
              ? "Υποβολή Αλλαγών"
              : "Submit Changes"}
          </Button>
          <Button
            variant="contained"
            className="button delete-color"
            color="secondary"
            onClick={() => {
              this.props.deleteInputBlock(
                this.props.componentMode,
                this.props.index
              );
            }}
          >
            {this.props.language === "EL" ? "Διαγραφή Εισόδου" : "Delete Input"}
          </Button>
          <Button
            variant="contained"
            className="button cancel-color"
            onClick={this.handleOnReturnClick}
          >
            {this.props.language === "EL" ? "Ακύρωση" : "Cancel"}
          </Button>
        </div>
      </form>
    );
  }
}

export default withSnackbar(TextInputBlockForm);
