import React from "react";

import Popover from "@material-ui/core/Popover";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import "./LabeledIntegerInputForm.css";

import LabeledInputFormEditor from "../LabeledInputFormEditor/LabeledInputFormEditor";

class LabeledIntegerInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // All the state variables below are being used in order to manage the popover
      // of the component.
      popoverId: "labeled-input-form-popover",
      popoverOpen: false,
      anchorEl: null,
    };

    // BINDING
    this.handleOnClick = this.handleOnClick.bind(this);
    this.hadleOnClose = this.hadleOnClose.bind(this);
  }

  /**A method that when executed, sets the state variables that
   * render the form's popover visible.*/
  handleOnClick(e) {
    this.setState({ anchorEl: e.target, popoverOpen: true });
  }

  /**A method that when executed, sets the state variables that
   * make the form's popover hidden.*/
  hadleOnClose() {
    this.setState({ anchorEl: null, popoverOpen: false });
  }

  /**A method  that manages the color of the badge that appears on the top-right
   * of the form. If the form has an error, the method returns the keyword "error",
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

  /**A method  that manages the content i.e. the visibility of the form's badge.
   * If the form has an error, the badge is visible. If at least one of the required
   * attributes of the form is not filled out, the badge is visible. Otherwise, the
   * badge does not appear.
   */
  handleBadgeContent() {
    if (
      this.props.errors === null ||
      this.props.errors === undefined ||
      (Object.keys(this.props.errors).length === 0 &&
        this.props.errors.constructor === Object)
    ) {
      if (
        this.props.variableLabelEL === null ||
        this.props.variableLabelEL === undefined ||
        this.props.variableLabelEL === "" ||
        this.props.variableLabelEN === null ||
        this.props.variableLabelEN === undefined ||
        this.props.variableLabelEN === ""
      ) {
        return "";
      } else {
        return 0;
      }
    } else {
      return "";
    }
  }

  render() {
    return (
      <div className="LabeledIntegerInputForm">
        <div className="form-content">
          <section className="label">
            {this.props.language === "EL"
              ? this.props.variableLabelEL
              : this.props.variableLabelEN}
          </section>
          <Badge
            badgeContent={this.handleBadgeContent()}
            color={this.handleBadgeColor()}
            variant="dot"
            style={{ marginRight: 40 }}
          >
            <input
              type="number"
              defaultValue={this.props.defaultValue}
              placeholder={this.props.defaultValue}
              step={1}
              min={this.props.minValue}
              max={this.props.maxValue}
            />
          </Badge>
        </div>
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
              <IconButton onClick={this.handleOnClick} className="icon-button">
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
          <LabeledInputFormEditor
            mode="integer"
            language={this.props.language}
            variableLabelEL={this.props.variableLabelEL}
            variableLabelEN={this.props.variableLabelEN}
            minValue={this.props.minValue}
            maxValue={this.props.maxValue}
            defaultValue={this.props.defaultValue}
            errors={this.props.errors}
            setLabeledIntegerInputForm={this.props.setLabeledIntegerInputForm}
            hadleOnClose={this.hadleOnClose}
          />
        </Popover>
      </div>
    );
  }
}

export default LabeledIntegerInputForm;
