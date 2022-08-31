import React from "react";
import Button from "@material-ui/core/Button";
import { withSnackbar } from "notistack";

import "./DecisionBlockForm.css";

// import FingerprintIcon from "@material-ui/icons/Fingerprint";

import {
  renderTextFieldWithAbornment,
  renderSelect,
  renderImageUpload,
  renderColorPicker,
} from "../../Utils/formHelpers";

import flagEL from "../../Assets/images/language/rectangle/EL.png";
import flagEN from "../../Assets/images/language/rectangle/EN.png";

class DecisionBlockForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // An identifier the parent block. For example, in TekTrain, the "movement"
      // Block has type of "move".
      type: this.props.type,
      // The block's name, to be displayed on TekTrain platform (In English)
      blockNameEN: this.props.blockNameEN,
      // The block's name, to be displayed on TekTrain platform (In Greek)
      blockNameEL: this.props.blockNameEL,
      // The category to witch the parent block belongs to.
      category: this.props.category,
      // The color of the parent block's body.
      backroundColor: this.props.backroundColor,
      // Parent block Image
      blockImage: this.props.blockImage,
      // The number of inner branches that the parent block has.
      numberOfBranches: this.props.numberOfBranches,
      // The number of columns that the parent block has.
      numberOfColumns: this.props.numberOfColumns,
      // The cursor that appears when the user hovers over the parent block Image.
      blockImageCursor: this.props.blockImageCursor,
      // errors of the parent element.
      errors: this.props.errors,
    };

    // BINDING
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnReturnClick = this.handleOnReturnClick.bind(this);
    this.handleBackgroundColorChange =
      this.handleBackgroundColorChange.bind(this);
  }
  /** A method that that executes when the user hits the "Return" Button of the
   * Component. Closes the block edit panel.*/
  handleOnReturnClick() {
    this.props.toggleEditPanel(false);
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

  /** A handler to track changes the "backroundColor" state variable.*/
  handleBackgroundColorChange(e) {
    this.setState((currentState) => {
      return {
        backroundColor: `#${e.hex}`,
        errors: {
          ...currentState.errors,
          backroundColor: {},
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

  /** A method that that executes when the user hits the "Submit" Button of the
   * form. If no change to the current component's state has taken place,
   * close the edit panel and return. Otherwise, delete all the errors from the
   * "error" state object that were corrected, and after that, call "setDecisionBlock"
   * method, to apply the changes to the parent Component(Decision Block), then display
   * a success message (as a snack bar) and then return.
   * TO BE REVIEWED!!!!!*/
  handleSubmit(e) {
    e.preventDefault();
    if (
      // this.state.type === this.props.type &&
      this.state.category === this.props.category &&
      this.state.backroundColor === this.props.backroundColor &&
      this.state.blockImage === this.props.blockImage &&
      this.state.blockNameEN === this.props.blockNameEN &&
      this.state.blockNameEL === this.props.blockNameEL &&
      this.state.numberOfColumns === this.props.numberOfColumns &&
      this.state.blockImageCursor === this.props.blockImageCursor
    ) {
      this.props.toggleEditPanel(false);
      return;
    }

    let message =
      this.props.language === "EL"
        ? "Το Μπλοκ Τροποποιήθηκε Επιτυχώς!"
        : "Block Was Successfully Configured!";

    let { errors } = this.state;

    for (const error in errors) {
      if (
        Object.keys(errors[error]).length === 0 &&
        errors[error].constructor === Object
      ) {
        delete errors[error];
      }
    }

    this.props.setDecisionBlock({
      type: this.state.type,
      category: this.state.category,
      blockNameEN: this.state.blockNameEN,
      blockNameEL: this.state.blockNameEL,
      backroundColor: this.state.backroundColor,
      blockImage: this.state.blockImage,
      numberOfBranches: this.state.numberOfBranches,
      numberOfColumns: this.state.numberOfColumns,
      blockImageCursor: this.state.blockImageCursor,
      errors: errors,
    });

    this.props.enqueueSnackbar(message, { variant: "success" });
    this.props.toggleEditPanel(false);
  }

  render() {
    return (
      <form className="DecisionBlockForm" onSubmit={this.handleSubmit}>
        <div className="inputs">
          <div className="row">
            {renderSelect({
              language: this.props.language,
              formClassName: "max-width",
              labelEL: "Κατηγορία Μπλοκ",
              labelEN: "Block Category",
              name: "category",
              value: this.state.category,
              onChange: this.handleOnChange,
              error: this.renderError("category"),
              errorMessage: this.renderErrorContent("category"),
              options: [
                {
                  value: "MOVE",
                  textEL: "Κίνηση",
                  textEN: "Movement",
                },
                {
                  value: "DETECTION",
                  textEL: "Ανίχνευση",
                  textEN: "Detection",
                },
                {
                  value: "SOUND",
                  textEL: "Ήχος",
                  textEN: "Sound",
                },
                {
                  value: "TOOLS",
                  textEL: "Εργαλεία",
                  textEN: "Tools",
                },
                {
                  value: "VARIOUS",
                  textEL: "Διάφορα",
                  textEN: "Various",
                },
              ],
            })}
          </div>
          <div className="row">
            {renderTextFieldWithAbornment({
              name: "blockNameEL",
              onChange: this.handleOnChange,
              labelEL: "Όνομα Μπλοκ",
              labelEN: "Block Name",
              value: this.state.blockNameEL,
              abornment: <img src={flagEL} style={{ width: 20 }} alt="..." />,
              language: this.props.language,
              className: "max-width",
              error: this.renderError("blockNameEL"),
              errorMessage: this.renderErrorContent("blockNameEL"),
            })}
          </div>
          <div className="row">
            {renderTextFieldWithAbornment({
              name: "blockNameEN",
              onChange: this.handleOnChange,
              labelEL: "Όνομα Μπλοκ",
              labelEN: "Block Name",
              value: this.state.blockNameEN,
              abornment: <img src={flagEN} style={{ width: 20 }} alt="..." />,
              language: this.props.language,
              className: "max-width",
              error: this.renderError("blockNameEN"),
              errorMessage: this.renderErrorContent("blockNameEN"),
            })}
          </div>
          <div className="row">
            {renderColorPicker({
              className: "flex max-width",
              language: this.props.language,
              labelEL: "Χρώμα Μπλοκ:",
              labelEN: "Block Color:",
              deferred: true,
              value: this.state.backroundColor,
              onChange: this.handleBackgroundColorChange,
              error: this.renderError("backroundColor"),
              errorMessage: this.renderErrorContent("backroundColor"),
            })}
          </div>
          <div className="row">
            {renderImageUpload({
              language: this.props.language,
              labelEL: "Εικόνα Μπλοκ:",
              labelEN: "Block Image:",
              image: this.state.blockImage,
              name: "blockImage",
              onChange: this.handleImageUpload,
              error: this.renderError("blockImage"),
              errorContent: this.renderErrorContent("blockImage"),
            })}
          </div>
          {/* <div className="row">
            {renderSelect({
              language: this.props.language,
              formClassName: "max-width",
              labelEL: "Αριθμός Διακλαδώσεων:",
              labelEN: "Number of Branches:",
              name: "numberOfBranches",
              value: this.state.numberOfBranches,
              onChange: this.handleOnChange,
              error: this.renderError("numberOfBranches"),
              errorMessage: this.renderErrorContent("numberOfBranches"),
              options: [
                {
                  value: 1,
                  textEL: "1",
                  textEN: "1",
                },
                {
                  value: 2,
                  textEL: "2",
                  textEN: "2",
                },
                {
                  value: 3,
                  textEL: "3",
                  textEN: "3",
                },
                {
                  value: 4,
                  textEL: "4",
                  textEN: "4",
                },
                {
                  value: 5,
                  textEL: "5",
                  textEN: "5",
                },
              ],
            })}
          </div> */}
          <div className="row">
            {renderSelect({
              language: this.props.language,
              formClassName: "max-width",
              labelEL: "Αριθμός Στηλών:",
              labelEN: "Number Fo Columns:",
              name: "numberOfColumns",
              value: this.state.numberOfColumns,
              onChange: this.handleOnChange,
              error: this.renderError("numberOfColumns"),
              errorMessage: this.renderErrorContent("numberOfColumns"),
              options: [
                {
                  value: 1,
                  textEL: "1",
                  textEN: "1",
                },
                {
                  value: 2,
                  textEL: "2",
                  textEN: "2",
                },
              ],
            })}
          </div>
          <div className="row">
            {renderSelect({
              language: this.props.language,
              formClassName: "max-width",
              labelEL: "Επιλογή Δρομέα Εικόνας",
              labelEN: "Select Icon Cursor",
              name: "blockImageCursor",
              value: this.state.blockImageCursor,
              onChange: this.handleOnChange,
              error: this.renderError("blockImageCursor"),
              errorMessage: this.renderErrorContent("blockImageCursor"),
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
        </div>
        <div className="row">
          <Button
            key="refernce-block-submit-1"
            variant="contained"
            type="submit"
            color="primary"
            className="submit submit-color"
          >
            {this.props.language === "EL"
              ? "Υποβολή Αλλαγών"
              : "Submit Changes"}
          </Button>
          <Button
            key="action-block-submit-2"
            variant="contained"
            className="submit cancel-color"
            onClick={this.handleOnReturnClick}
          >
            {this.props.language === "EL" ? "Επιστροφή" : "Return"}
          </Button>
        </div>
      </form>
    );
  }
}

export default withSnackbar(DecisionBlockForm);
