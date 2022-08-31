import React from "react";
// import axios from "axios";
// import { uuid4 as uuid } from "uuid";

import { ColorPicker } from "material-ui-color";
import { withSnackbar } from "notistack";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";

import PhotoIcon from "@material-ui/icons/Photo";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
// import FingerprintIcon from "@material-ui/icons/Fingerprint";

import "./ActionBlockForm.css";

import EL from "../../Assets/images/language/rectangle/EL.png";
import EN from "../../Assets/images/language/rectangle/EN.png";

class ActionBlockForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // An identifier the block. For example, in TekTrain, the "movement"
      // Block has type of "move".
      type: this.props.type,
      // The category to witch the block belongs to.
      category: this.props.category,
      // The block's name, to be displayed on TekTrain platform (In English)
      blockNameEN: this.props.blockNameEN,
      // The block's name, to be displayed on TekTrain platform (In Greek)
      blockNameEL: this.props.blockNameEL,
      // The block Title in Greek
      blockTitleEL: this.props.blockTitleEL,
      // The block Title in English
      blockTitleEN: this.props.blockTitleEN,
      // The color of the block's upper body.
      backroundColor: this.props.backroundColor,
      // The backround color of the block's title.
      titleBackroundColor: this.props.titleBackroundColor,
      // Block Image
      blockImage: this.props.blockImage,
      // Whether the block has a popover or not.
      hasPopover: this.props.hasPopover,
      // The icon of the button that makes the popover appear.
      popoverIcon: this.props.popoverIcon,
      // The Help Text of the button that makes the popover appear.
      popoverHelpTextEL: this.props.popoverHelpTextEL,
      popoverHelpTextEN: this.props.popoverHelpTextEN,
      // errors that the block may have.
      errors: this.props.errors,
    };
    // BINDING
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handlePopoverChecked = this.handlePopoverChecked.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnReturnClick = this.handleOnReturnClick.bind(this);
    this.handleTitleBackroundColorChange =
      this.handleTitleBackroundColorChange.bind(this);
    this.handleBackroundColorChange =
      this.handleBackroundColorChange.bind(this);
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
  /** A handler to track changes the "titleBackroundColor" state variable.*/
  handleTitleBackroundColorChange(e) {
    this.setState((currentState) => {
      return {
        titleBackroundColor: `#${e.hex}`,
        errors: {
          ...currentState.errors,
          titleBackroundColor: {},
        },
      };
    });
  }
  /** A handler to manage Image uploads.*/
  handleImageUpload(e) {
    if (e.target.files.length > 0) {
      // this.postImage(e.target.files[0]);

      this.setState((currentState) => {
        return {
          // [e.target.name]: e.target.files[0],
          [e.target.name]: e.target.files[0],
          errors: {
            ...currentState.errors,
            [e.target.name]: {},
          },
        };
      });
    }
  }

  // postImage(file) {
  //   const data = new FormData();
  //   const backendURL = "http://localhost:8080";
  //   const url = backendURL + "/image-upload";

  //   data.append("file", file);
  //   console.log(data);
  //   axios.post(url, data).then((res) => {
  //     console.log(res);
  //   });
  // }

  /** A handler to track changes to checkbox type inputs.*/
  handlePopoverChecked(e) {
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
   * Component.Closes the block edit panel.*/
  handleOnReturnClick() {
    this.props.toggleEditPanel(false);
  }

  /* A method that that executes when the user hits the "Submit" Button of the
   * form. If no change to the current component's state has taken place,
   * close the edit panel and return. Otherwise, delete all the errors from the
   * "error" state object that were corrected, and after that, call "setActionBlock"
   * method, to apply the changes to the parent Component(Action Block), then display
   * a success message (as a snack bar) and then return.
   * TO BE REVIEWED!!!!!*/
  handleSubmit(e) {
    e.preventDefault();
    if (
      this.state.blockTitleEN === this.props.blockTitleEN &&
      this.state.blockTitleEL === this.props.blockTitleEL &&
      this.state.blockNameEN === this.props.blockNameEN &&
      this.state.blockNameEL === this.props.blockNameEL &&
      this.state.type === this.props.type &&
      this.state.category === this.props.category &&
      this.state.backroundColor === this.props.backroundColor &&
      this.state.titleBackroundColor === this.props.titleBackroundColor &&
      this.state.blockImage === this.props.blockImage &&
      this.state.hasPopover === this.props.hasPopover &&
      this.state.popoverIcon === this.props.popoverIcon &&
      this.state.popoverHelpTextEL === this.props.popoverHelpTextEL &&
      this.state.popoverHelpTextEN === this.props.popoverHelpTextEN
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

    this.props.setActionBlock({
      blockTitleEN: this.state.blockTitleEN,
      blockTitleEL: this.state.blockTitleEL,
      type: this.state.type,
      blockNameEN: this.state.blockNameEN,
      blockNameEL: this.state.blockNameEL,
      category: this.state.category,
      backroundColor: this.state.backroundColor,
      titleBackroundColor: this.state.titleBackroundColor,
      blockImage: this.state.blockImage,
      hasPopover: this.state.hasPopover,
      popoverIcon: this.state.popoverIcon,
      popoverHelpTextEL: this.state.popoverHelpTextEL,
      popoverHelpTextEN: this.state.popoverHelpTextEN,
      errors: errors,
    });

    this.props.toggleEditPanel(false);

    this.props.enqueueSnackbar(message, { variant: "success" });
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
      <form className="ActionBlockForm" onSubmit={this.handleSubmit}>
        <div className="inputs">
          {/* <div className="row">
            <TextField
              name="type"
              onChange={this.handleOnChange}
              label={
                this.props.language === "EL"
                  ? "Αναγνωριστικό Μπλοκ"
                  : "Block Identifier"
              }
              value={this.state.type}
              className="max-width"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FingerprintIcon />
                  </InputAdornment>
                ),
              }}
              error={this.renderError("type")}
              helperText={this.renderErrorContent("type")}
            />
          </div> */}
          <div className="row">
            <FormControl
              className="max-width"
              error={this.renderError("category")}
            >
              <InputLabel id="category-label">
                {this.props.language === "EL"
                  ? "Κατηγορία Μπλοκ"
                  : "Block Category"}
              </InputLabel>
              <Select
                labelId="category-label"
                name="category"
                value={this.state.category}
                onChange={this.handleOnChange}
              >
                <MenuItem value="MOVE">
                  {this.props.language === "EL" ? "Κίνηση" : "Movement"}
                </MenuItem>
                <MenuItem value="DETECTION">
                  {this.props.language === "EL" ? "Ανίχνευση" : "Detection"}
                </MenuItem>
                <MenuItem value="SOUND">
                  {this.props.language === "EL" ? "Ήχος" : "Sound"}
                </MenuItem>
                <MenuItem value="TOOLS">
                  {this.props.language === "EL" ? "Εργαλεία" : "Tools"}
                </MenuItem>
                <MenuItem value="VARIOUS">
                  {this.props.language === "EL" ? "Διάφορα" : "Various"}
                </MenuItem>
              </Select>
              {this.renderErrorContent("category") === "" ? null : (
                <FormHelperText>
                  {this.renderErrorContent("category")}
                </FormHelperText>
              )}
            </FormControl>
          </div>

          <div className="row">
            <TextField
              name="blockNameEL"
              onChange={this.handleOnChange}
              label={
                this.props.language === "EL" ? "Όνομα Μπλοκ" : "Block Name"
              }
              value={this.state.blockNameEL}
              className="max-width"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={EL} style={{ width: 20 }} alt="..." />
                  </InputAdornment>
                ),
              }}
              error={this.renderError("blockNameEL")}
              helperText={this.renderErrorContent("blockNameEL")}
            />
          </div>
          <div className="row">
            <TextField
              name="blockNameEN"
              onChange={this.handleOnChange}
              label={
                this.props.language === "EL" ? "Όνομα Μπλοκ" : "Block Name"
              }
              value={this.state.blockNameEN}
              className="max-width"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={EN} style={{ width: 20 }} alt="..." />
                  </InputAdornment>
                ),
              }}
              error={this.renderError("blockNameEN")}
              helperText={this.renderErrorContent("blockNameEN")}
            />
          </div>
          <div className="row">
            <TextField
              name="blockTitleEL"
              onChange={this.handleOnChange}
              label={
                this.props.language === "EL" ? "Επιγραφή Μπλοκ" : "Block Label"
              }
              value={this.state.blockTitleEL}
              className="max-width"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={EL} style={{ width: 20 }} alt="..." />
                  </InputAdornment>
                ),
              }}
              error={this.renderError("blockTitleEL")}
              helperText={this.renderErrorContent("blockTitleEL")}
            />
          </div>
          <div className="row">
            <TextField
              name="blockTitleEN"
              onChange={this.handleOnChange}
              label={
                this.props.language === "EL" ? "Επιγραφή Μπλοκ" : "Block Label"
              }
              value={this.state.blockTitleEN}
              className="max-width"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={EN} style={{ width: 20 }} alt="..." />
                  </InputAdornment>
                ),
              }}
              error={this.renderError("blockTitleEN")}
              helperText={this.renderErrorContent("blockTitleEN")}
            />
          </div>
          <div className="row flex">
            <InputLabel
              style={
                this.renderError("backroundColor")
                  ? { width: "50%", color: "#f21d3c" }
                  : { width: "50%" }
              }
            >
              {this.props.language === "EL" ? "Χρώμα Μπλοκ:" : "Block Color:"}
              {this.renderError("backroundColor") ? <br /> : null}
              {this.renderError("backroundColor") ? (
                <span className="action-error">
                  {this.renderErrorContent("backroundColor")}
                </span>
              ) : null}
            </InputLabel>
            <ColorPicker
              deferred={true}
              hideTextfield={true}
              disableAlpha
              inputFormats={["hex"]}
              value={this.state.backroundColor}
              onChange={this.handleBackroundColorChange}
            />
          </div>
          <div className="row flex">
            <InputLabel
              style={
                this.renderError("titleBackroundColor")
                  ? { width: "50%", color: "#f21d3c" }
                  : { width: "50%" }
              }
            >
              {this.props.language === "EL"
                ? "Χρώμα Επιγραφής:"
                : "Label Color:"}
              {this.renderError("titleBackroundColor") ? <br /> : null}
              {this.renderError("titleBackroundColor") ? (
                <span className="action-error">
                  {this.renderErrorContent("titleBackroundColor")}
                </span>
              ) : null}
            </InputLabel>
            <ColorPicker
              deferred={true}
              hideTextfield={true}
              disableAlpha
              inputFormats={["hex"]}
              value={this.state.titleBackroundColor}
              onChange={this.handleTitleBackroundColorChange}
            />
          </div>
          <div className="row flex">
            <InputLabel
              style={
                this.renderError("blockImage")
                  ? { width: "20%", color: "#f21d3c" }
                  : { width: "20%" }
              }
            >
              {this.props.language === "EL" ? "Εικόνα Μπλοκ:" : "Block Image:"}
              {this.renderError("blockImage") ? <br /> : null}
              {this.renderError("blockImage") ? (
                <span className="action-error">
                  {this.renderErrorContent("blockImage")}
                </span>
              ) : null}
            </InputLabel>
            {this.state.blockImage === null ||
            this.state.blockImage === undefined ? (
              <Avatar>
                <PhotoIcon />
              </Avatar>
            ) : (
              <Avatar src={URL.createObjectURL(this.state.blockImage)} />
            )}
            <Tooltip
              arrow
              title={
                this.props.language === "EL" ? "Προσθήκη Εικόνας" : "Add Image"
              }
            >
              <IconButton
                variant="contained"
                style={
                  this.renderError("blockImage") ? { color: "#f21d3c" } : {}
                }
                color="primary"
                component="label"
              >
                <AddPhotoAlternateIcon />
                <input
                  type="file"
                  accept=".png, .gif, .jpg"
                  hidden
                  name="blockImage"
                  onChange={this.handleImageUpload}
                />
              </IconButton>
            </Tooltip>
          </div>
          <div className="row flex">
            <InputLabel
              style={
                this.renderError("hasPopover")
                  ? { width: "50%", color: "#f21d3c" }
                  : { width: "50%" }
              }
            >
              {this.props.language === "EL"
                ? "Έχει Αναδυόμενο Παράθυρο:"
                : "Has Popover:"}
              {this.renderError("hasPopover") ? <br /> : null}
              {this.renderError("hasPopover") ? (
                <span className="action-error">
                  {this.renderErrorContent("hasPopover")}
                </span>
              ) : null}
            </InputLabel>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item> {this.props.language === "EL" ? "Όχι" : "Νο"}</Grid>
                <Grid item>
                  <Switch
                    checked={this.state.hasPopover}
                    onChange={this.handlePopoverChecked}
                    name="hasPopover"
                    color={
                      this.renderError("hasPopover") ? "secondary" : "primary"
                    }
                  />
                </Grid>
                <Grid item>{this.props.language === "EL" ? "Ναι" : "Yes"}</Grid>
              </Grid>
            </Typography>
          </div>
          {!this.state.hasPopover ? null : (
            <div className="row flex">
              <InputLabel
                style={
                  this.renderError("popoverIcon")
                    ? { width: "20%", color: "#f21d3c" }
                    : { width: "20%" }
                }
              >
                {this.props.language === "EL"
                  ? "Εικόνα Αναδ. Παραθ.:"
                  : "Popover Icon:"}
                {this.renderError("popoverIcon") ? <br /> : null}
                {this.renderError("popoverIcon") ? (
                  <span className="action-error">
                    {this.renderErrorContent("popoverIcon")}
                  </span>
                ) : null}
              </InputLabel>

              {this.state.popoverIcon === null ||
              this.state.popoverIcon === undefined ? (
                <Avatar>
                  <PhotoIcon />
                </Avatar>
              ) : (
                <Avatar src={URL.createObjectURL(this.state.popoverIcon)} />
              )}
              <Tooltip
                arrow
                title={
                  this.props.language === "EL"
                    ? "Προσθήκη Εικόνας"
                    : "Add Image"
                }
              >
                <IconButton
                  variant="contained"
                  color="primary"
                  component="label"
                  style={
                    this.renderError("popoverIcon") ? { color: "#f21d3c" } : {}
                  }
                >
                  <AddPhotoAlternateIcon />
                  <input
                    type="file"
                    accept=".png, .gif, .jpg"
                    hidden
                    name="popoverIcon"
                    onChange={this.handleImageUpload}
                  />
                </IconButton>
              </Tooltip>
            </div>
          )}
          {!this.state.hasPopover ? null : (
            <div className="row">
              {/* <InputLabel
                style={
                  this.renderError("popoverHelpTextEL")
                    ? { color: "#f21d3c" }
                    : {}
                }
              >
                {this.props.language === "EL"
                  ? "Βοηθητικό Κείμενο Παραθύρου(EL):"
                  : "Popover Help Text(EL):"}
              </InputLabel> */}
              <TextField
                className="max-width"
                name="popoverHelpTextEL"
                value={this.state.popoverHelpTextEL}
                multiline
                onChange={this.handleOnChange}
                rows={5}
                rowsMax={5}
                label={
                  this.props.language === "EL"
                    ? "Βοηθητικό Κείμενο Παραθύρου"
                    : "Popover Help Text"
                }
                placeholder={
                  this.props.language === "EL"
                    ? "Προσθέστε Κείμενο εδώ..."
                    : "Add Text Here..."
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={EL} style={{ width: 20 }} alt="..." />
                    </InputAdornment>
                  ),
                }}
                error={this.renderError("popoverHelpTextEL")}
                helperText={this.renderErrorContent("popoverHelpTextEL")}
              />
            </div>
          )}
          {!this.state.hasPopover ? null : (
            <div className="row">
              <TextField
                className="max-width"
                name="popoverHelpTextEN"
                value={this.state.popoverHelpTextEN}
                multiline
                onChange={this.handleOnChange}
                rows={5}
                rowsMax={5}
                label={
                  this.props.language === "EL"
                    ? "Βοηθητικό Κείμενο Παραθύρου"
                    : "Popover Help Text"
                }
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
                error={this.renderError("popoverHelpTextEN")}
                helperText={this.renderErrorContent("popoverHelpTextEN")}
              />
            </div>
          )}
        </div>
        <div className="row">
          <Button
            key="action-block-submit-1"
            variant="contained"
            type="submit"
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

export default withSnackbar(ActionBlockForm);
