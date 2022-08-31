import React from "react";
import { v4 as uuid } from "uuid";

import Chip from "@material-ui/core/Chip";
import Popover from "@material-ui/core/Popover";

import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";

import "./PhrasesInputForm.css";

import PhrasesInputFormEditor from "../PhrasesInputFormEditor/PhrasesInputFormEditor";

class PhrasesInputForm extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.state = {
      // An array, that holds the phrases of the form.
      phrases: [],
      // All the state variables below are being used in order to manage the popover
      // of the component.
      popoverId: "phrases-input-form-popover",
      popoverOpen: false,
      anchorEl: null,
    };
    // BINDING
    this.handleOnDelete = this.handleOnDelete.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.clearPhrases = this.clearPhrases.bind(this);
    this.handleOnPopoverClick = this.handleOnPopoverClick.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
  }

  /**A method that when executed, sets the state variables that
   * render the block's popover visible.*/
  handleOnPopoverClick(e) {
    this.inputRef.current.blur();
    this.setState({ anchorEl: e.target, popoverOpen: true });
  }

  /**A method that when executed, sets the state variables that
   * make the block's popover hidden.*/
  handleOnClose() {
    this.setState({ anchorEl: null, popoverOpen: false });
  }

  /**A method that deletes a phrase (an element from the state
   * variable "phrases")*/
  handleOnDelete(key) {
    this.setState((curState) => {
      return {
        phrases: curState.phrases.filter((data) => {
          return data.key !== key;
        }),
      };
    });
  }

  handleOnClick(e) {
    this.inputRef.current.focus();
  }

  clearPhrases() {
    this.setState({ phrases: [] });
  }

  handleKeyDown(e) {
    if (e.key === "Enter") {
      if (e.target.value !== "") {
        this.setState(
          (curState) => {
            return {
              phrases: [
                ...curState.phrases,
                { key: uuid(), label: e.target.value },
              ],
            };
          },
          () => {
            this.inputRef.current.value = "";
          }
        );
      }
    }
  }

  renderChips() {
    return this.state.phrases.map((data, idx) => {
      return (
        <Chip
          key={data.key}
          size="small"
          label={data.label}
          onDelete={() => this.handleOnDelete(data.key)}
        />
      );
    });
  }

  /**A method  that manages the color of the badge that appears on the top-right
   * of the block. If the block has an error, the method returns the keyword "error",
   * else, returns the keyword "primary".*/
  handleBadgeColor() {
    if (
      this.props.errors === null ||
      this.props.errors === undefined ||
      (Object.keys(this.props.errors).length === 0 &&
        this.props.errors.constructor === Object)
    ) {
      return "primary";
    } else {
      return "error";
    }
  }

  /**A method  that manages the content i.e. the visibility of the block's badge.
   * If the block has an error, the badge is visible. If at least one of the required
   * attributes of the block is not filled out, the badge is visible. Otherwise, the
   * badge does not appear.
   */
  handleBadgeContent() {
    if (
      this.props.errors === null ||
      this.props.errors === undefined ||
      (Object.keys(this.props.errors).length === 0 &&
        this.props.errors.constructor === Object)
    ) {
      // if (
      //   this.props.placeholderEL === null ||
      //   this.props.placeholderEL === undefined ||
      //   this.props.placeholderEL === "" ||
      //   this.props.placeholderEN === null ||
      //   this.props.placeholderEN === undefined ||
      //   this.props.placeholderEN === ""
      // ) {
      //   return "";
      // } else {
      //   return 0;
      // }
      return 0;
    } else {
      return "";
    }
  }

  render() {
    return (
      <div className="PhrasesInputForm">
        <Badge
          badgeContent={this.handleBadgeContent()}
          color={this.handleBadgeColor()}
          variant="dot"
        ></Badge>
        <div className="form-content" onClick={this.handleOnClick}>
          {this.renderChips()}
          <input
            type="text"
            name="phrase"
            value={this.state.phrase}
            ref={this.inputRef}
            placeholder={
              this.state.phrases.length > 0
                ? null
                : this.props.language === "EL"
                ? this.props.placeholderEL
                : this.props.placeholderEN
            }
            onKeyDown={this.handleKeyDown}
          />
        </div>
        {this.state.phrases.length > 0 ? (
          <IconButton
            size="small"
            className="close-button"
            onClick={this.clearPhrases}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        ) : null}
        <Popover
          id={this.state.popoverId}
          open={this.state.popoverOpen}
          anchorEl={this.state.anchorEl}
          onClose={this.handleOnClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <PhrasesInputFormEditor
            language={this.props.language}
            handleOnClose={this.handleOnClose}
            errors={this.props.errors}
            placeholderEL={this.props.placeholderEL}
            placeholderEN={this.props.placeholderEN}
            setPhrasesInputForm={this.props.setPhrasesInputForm}
          />
        </Popover>
        <div className="controller">
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined primary button group"
          >
            <Tooltip
              title={
                this.props.language === "EL"
                  ? "Επεξεργασία Φόρμας"
                  : "Edit Form"
              }
            >
              <IconButton
                onClick={this.handleOnPopoverClick}
                className="icon-button"
              >
                <EditIcon className="icons" />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={
                this.props.language === "EL" ? "Διαγραφή Φόρμας" : "Delete Form"
              }
            >
              <IconButton
                onClick={this.props.deleteSettingsPopoverForm}
                className="icon-button"
              >
                <DeleteIcon className="icons" />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

export default PhrasesInputForm;
