import React from "react";
import Button from "@material-ui/core/Button";
import { withSnackbar } from "notistack";
import "./ReferenceBlockForm.css";

// import FingerprintIcon from "@material-ui/icons/Fingerprint";

import {
  renderTextFieldWithAbornment,
  renderSelect,
  renderImageUpload,
  renderColorPicker,
  renderSwich,
} from "../../Utils/formHelpers";

import EL from "../../Assets/images/language/rectangle/EL.png";
import EN from "../../Assets/images/language/rectangle/EN.png";

class ReferenceBlockForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // The block's name, to be displayed on TekTrain platform (In English)
      blockNameEN: this.props.blockNameEN,
      // The block's name, to be displayed on TekTrain platform (In Greek)
      blockNameEL: this.props.blockNameEL,
      // The block Title in English
      blockTitleEN: this.props.blockTitleEN,
      // The block Title in Greek
      blockTitleEL: this.props.blockTitleEL,
      // An identifier the block. For example, in TekTrain, the "movement"
      // Block has type of "move".
      type: this.props.type,
      // The category to witch the block belongs to.
      category: this.props.category,
      // The color of the block's body.
      backroundColor: this.props.backroundColor,
      // Block Image
      blockImage: this.props.blockImage,
      // The shape that contains the block Image
      imageBackroundShape: this.props.imageBackroundShape,
      // The color of the shapeshape that contains the block Image
      imageBackroundShapeColor: this.props.imageBackroundShapeColor,
      // A boolean that dictates whether an other block can be placed after
      // the current one.
      hasNextBlock: this.props.hasNextBlock,
      //   The cursor that appears when the user hovers over the Block image.
      imageCursor: this.props.imageCursor,
      // Errors of the parent Component.
      errors: this.props.errors,
    };

    // BINDING
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.handleOnReturnClick = this.handleOnReturnClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBackroundColorChange =
      this.handleBackroundColorChange.bind(this);
    this.handleImageBackroundShapeColorChange =
      this.handleImageBackroundShapeColorChange.bind(this);
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
  handleBackroundColorChange(e) {
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

  /** A handler to track changes the "backroundColor" state variable.*/
  handleImageBackroundShapeColorChange(e) {
    this.setState((currentState) => {
      return {
        imageBackroundShapeColor: `#${e.hex}`,
        errors: {
          ...currentState.errors,
          imageBackroundShapeColor: {},
        },
      };
    });
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

  /** A handler to track changes to checkbox type inputs.*/
  handleChecked(e) {
    this.setState((currentState) => {
      return {
        [e.target.name]: e.target.checked,
        errors: {
          ...currentState.errors,
          [e.target.name]: {},
        },
      };
    });
  }
  /** A method that that executes when the user hits the "Return" Button of the
   * Component. Closes the block edit panel.*/
  handleOnReturnClick() {
    this.props.toggleEditPanel(false);
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

  /* A method that that executes when the user hits the "Submit" Button of the
   * Component. If no change to the current component's state has taken place,
   * close the edit panel and return. Otherwise, call "setReferenceBlock" method,
   * to apply the changes to the parent Component(ReferenceBlock), then display
   * a success message (as a snack bar) and then return.
   * TO BE REVIEWED!!!!!*/
  handleSubmit(e) {
    e.preventDefault();

    if (
      this.state.blockTitleEN === this.props.blockTitleEN &&
      this.state.blockTitleEL === this.props.blockTitleEL &&
      this.state.blockNameEN === this.props.blockNameEN &&
      this.state.blockNameEL === this.props.blockNameEL &&
      this.state.category === this.props.category &&
      this.state.backroundColor === this.props.backroundColor &&
      this.state.blockImage === this.props.blockImage &&
      this.state.imageBackroundShape === this.props.imageBackroundShape &&
      this.state.imageBackroundShapeColor ===
        this.props.imageBackroundShapeColor &&
      this.state.hasNextBlock === this.props.hasNextBlock &&
      this.state.imageCursor === this.props.imageCursor
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

    this.props.setReferenceBlock({
      blockTitleEN: this.state.blockTitleEN,
      blockTitleEL: this.state.blockTitleEL,
      blockNameEN: this.state.blockNameEN,
      blockNameEL: this.state.blockNameEL,
      type: this.state.type,
      category: this.state.category,
      backroundColor: this.state.backroundColor,
      blockImage: this.state.blockImage,
      imageBackroundShape: this.state.imageBackroundShape,
      imageBackroundShapeColor: this.state.imageBackroundShapeColor,
      hasNextBlock: this.state.hasNextBlock,
      imageCursor: this.state.imageCursor,
      errors: errors,
    });

    this.props.toggleEditPanel(false);

    this.props.enqueueSnackbar(message, { variant: "success" });
  }

  render() {
    return (
      <form className="ReferenceBlockForm" onSubmit={this.handleSubmit}>
        <div className="inputs">
          {/* <div className="row">
            {renderTextFieldWithAbornment({
              name: "type",
              onChange: this.handleOnChange,
              labelEL: "Αναγνωριστικό Μπλοκ",
              labelEN: "Block Identifier",
              value: this.state.type,
              abornment: <FingerprintIcon />,
              language: this.props.language,
              className: "max-width",
              error: this.renderError("type"),
              errorMessage: this.renderErrorContent("type"),
            })}
          </div> */}
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
              abornment: <img src={EL} style={{ width: 20 }} alt="..." />,
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
              abornment: <img src={EN} style={{ width: 20 }} alt="..." />,
              language: this.props.language,
              className: "max-width",
              error: this.renderError("blockNameEN"),
              errorMessage: this.renderErrorContent("blockNameEN"),
            })}
          </div>
          <div className="row">
            {renderTextFieldWithAbornment({
              name: "blockTitleEL",
              onChange: this.handleOnChange,
              labelEL: "Επιγραφή Μπλοκ",
              labelEN: "Block Label",
              value: this.state.blockTitleEL,
              abornment: <img src={EL} style={{ width: 20 }} alt="..." />,
              language: this.props.language,
              className: "max-width",
              error: this.renderError("blockTitleEL"),
              errorMessage: this.renderErrorContent("blockTitleEL"),
            })}
          </div>
          <div className="row">
            {renderTextFieldWithAbornment({
              name: "blockTitleEN",
              onChange: this.handleOnChange,
              labelEL: "Επιγραφή Μπλοκ",
              labelEN: "Block Label",
              value: this.state.blockTitleEN,
              abornment: <img src={EN} style={{ width: 20 }} alt="..." />,
              language: this.props.language,
              className: "max-width",
              error: this.renderError("blockTitleEN"),
              errorMessage: this.renderErrorContent("blockTitleEN"),
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
              onChange: this.handleBackroundColorChange,
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
          <div className="row">
            {renderSelect({
              language: this.props.language,
              formClassName: "max-width",
              labelEL: "Σχήμα Παρασκηνίου Εικόνας",
              labelEN: "Image Backround Shape",
              name: "imageBackroundShape",
              value: this.state.imageBackroundShape,
              onChange: this.handleOnChange,
              error: this.renderError("imageBackroundShape"),
              errorMessage: this.renderErrorContent("imageBackroundShape"),
              options: [
                {
                  value: "circle",
                  textEL: "Κύκλος",
                  textEN: "Circle",
                },
                {
                  value: "square",
                  textEL: "Τετράγωνο",
                  textEN: "Square",
                },
                {
                  value: "hexagon",
                  textEL: "Εξάγωνο",
                  textEN: "Hexagon",
                },
                {
                  value: "octagon",
                  textEL: "Οκτάγωνο",
                  textEN: "Octagon",
                },
              ],
            })}
          </div>
          <div className="row">
            {renderColorPicker({
              className: "flex max-width",
              language: this.props.language,
              labelEL: "Χρώμα Παρασκηνίου Εικόνας:",
              labelEN: "Image Backround Color:",
              deferred: true,
              value: this.state.imageBackroundShapeColor,
              onChange: this.handleImageBackroundShapeColorChange,
              error: this.renderError("imageBackroundShapeColor"),
              errorMessage: this.renderErrorContent("imageBackroundShapeColor"),
            })}
          </div>
          <div className="row">
            {renderSwich({
              className: "flex max-width",
              labelEL: "Έχει Επόμενο Μπλοκ:",
              labelEN: "Has Next Block",
              language: this.props.language,
              name: "hasNextBlock",
              value: this.state.hasNextBlock,
              onChange: this.handleChecked,
              error: this.renderError("hasNextBlock"),
              errorMessage: this.renderErrorContent("hasNextBlock"),
            })}
          </div>
          <div className="row">
            {renderSelect({
              language: this.props.language,
              formClassName: "max-width",
              labelEL: "Επιλογή Δρομέα Εικόνας",
              labelEN: "Select Image Cursor",
              name: "imageCursor",
              value: this.state.imageCursor,
              onChange: this.handleOnChange,
              error: this.renderError("imageCursor"),
              errorMessage: this.renderErrorContent("imageCursor"),
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
            key="action-block-submit-1"
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
            {this.props.language === "EL" ? "Ακύρωση" : "Cancel"}
          </Button>
        </div>
      </form>
    );
  }
}

export default withSnackbar(ReferenceBlockForm);
