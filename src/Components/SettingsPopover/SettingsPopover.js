import React from "react";

import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Popover from "@material-ui/core/Popover";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import PopoverForm from "../PopoverForm/PopoverForm";
import PhrasesInputForm from "../PhrasesInputForm/PhrasesInputForm";
import LabeledTextInputForm from "../LabeledTextInputForm/LabeledTextInputForm";
import LabeledIntegerInputForm from "../LabeledIntegerInputForm/LabeledIntegerInputForm";
import LabeledFloatInputForm from "../LabeledFloatInputForm/LabeledFloatInputForm";
import ParameterInputForm from "../ParameterInputForm/ParameterInputForm";
import ConditionInputForm from "../ConditionInputForm/ConditionInputForm";

import "./SettingsPopover.css";

class SettingsPopover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // All the state variables below are being used in order to manage the popover
      // of the component.
      popoverId: "settings-popover",
      popoverOpen: false,
      anchorEl: null,
    };

    // BINDING
    this.handleOnClick = this.handleOnClick.bind(this);
    this.hadleOnClose = this.hadleOnClose.bind(this);
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

  /**
   * A method that renders the appropriact Popover content, based on the value of
   * of the prop "this.props.hasForm.type".
   */
  renderContent() {
    switch (this.props.hasForm.type) {
      case "labeled-text-input":
        return (
          <LabeledTextInputForm
            language={this.props.language}
            setLabeledTextInputForm={this.props.setLabeledTextInputForm}
            deleteSettingsPopoverForm={this.props.deleteSettingsPopoverForm}
            {...this.props.hasForm}
          />
        );

      case "labeled-integer-input":
        return (
          <LabeledIntegerInputForm
            language={this.props.language}
            setLabeledIntegerInputForm={this.props.setLabeledIntegerInputForm}
            deleteSettingsPopoverForm={this.props.deleteSettingsPopoverForm}
            {...this.props.hasForm}
          />
        );

      case "labeled-float-input":
        return (
          <LabeledFloatInputForm
            language={this.props.language}
            setLabeledFloatInputForm={this.props.setLabeledFloatInputForm}
            deleteSettingsPopoverForm={this.props.deleteSettingsPopoverForm}
            {...this.props.hasForm}
          />
        );

      case "phrases-input":
        return (
          <PhrasesInputForm
            language={this.props.language}
            setPhrasesInputForm={this.props.setPhrasesInputForm}
            deleteSettingsPopoverForm={this.props.deleteSettingsPopoverForm}
            {...this.props.hasForm}
          />
        );

      case "parameter-input":
        return (
          <ParameterInputForm
            language={this.props.language}
            setParameterInputForm={this.props.setParameterInputForm}
            deleteSettingsPopoverForm={this.props.deleteSettingsPopoverForm}
            {...this.props.hasForm}
          />
        );
      case "condition-input":
        return (
          <ConditionInputForm
            language={this.props.language}
            setConditionInputForm={this.props.setConditionInputForm}
            deleteSettingsPopoverForm={this.props.deleteSettingsPopoverForm}
            {...this.props.hasForm}
          />
        );

      default:
        return null;
    }
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
      if (
        this.props.popoverTitleEL === null ||
        this.props.popoverTitleEL === undefined ||
        this.props.popoverTitleEL === "" ||
        this.props.popoverTitleEN === null ||
        this.props.popoverTitleEN === undefined ||
        this.props.popoverTitleEN === ""
      ) {
        return "";
      }

      if (
        this.props.hasForm === undefined ||
        this.props.hasForm === null ||
        (Object.keys(this.props.hasForm).length === 0 &&
          this.props.hasForm.constructor === Object) ||
        this.props.hasForm.type === "none"
      ) {
        return "";
      }
      return 0;
    } else {
      return "";
    }
  }

  displayFormError() {
    if (
      !(
        this.props.errors === undefined ||
        this.props.errors === null ||
        (Object.keys(this.props.errors).length === 0 &&
          this.props.errors.constructor === Object)
      )
    ) {
      if (
        !(
          this.props.errors.hasForm === undefined ||
          this.props.errors.hasForm === null ||
          (Object.keys(this.props.errors.hasForm).length === 0 &&
            this.props.errors.hasForm.constructor === Object)
        )
      ) {
        return (
          <div className="no-form-error">
            <p className="no-form-error-text">
              {this.props.language === "EL"
                ? this.props.errors.hasForm.EL
                : this.props.errors.hasForm.EN}
            </p>
          </div>
        );
      }
    }
    return null;
  }

  render() {
    return (
      <div className={`SettingsPopover ${this.props.mode}`}>
        {this.props.mode === "decision" ? (
          <div className="top-arrow"></div>
        ) : (
          <div className="arrow"></div>
        )}

        <Badge
          badgeContent={this.handleBadgeContent()}
          color={this.handleBadgeColor()}
        >
          <div className="popover-title justify-align-center">
            {this.props.language === "EL"
              ? this.props.popoverTitleEL
              : this.props.popoverTitleEN}
            <div className="control">
              <ButtonGroup
                orientation="vertical"
                aria-label="vertical outlined primary button group"
              >
                <Tooltip
                  title={
                    this.props.language === "EL"
                      ? "Επεξεργασία Παραθύρου"
                      : "Edit Popover"
                  }
                >
                  <IconButton onClick={this.handleOnClick}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={
                    this.props.language === "EL"
                      ? "Διαγραφή Παραθύρου"
                      : "Delete Popover"
                  }
                >
                  <IconButton
                    onClick={() => {
                      this.props.deleteSettingsPopover(this.props.mode);
                    }}
                  >
                    <DeleteIcon />
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
              <PopoverForm
                mode="settings"
                language={this.props.language}
                popoverTitleEL={this.props.popoverTitleEL}
                popoverTitleEN={this.props.popoverTitleEN}
                errors={this.props.errors}
                setSettingsPopover={this.props.setSettingsPopover}
                hadleOnClose={this.hadleOnClose}
              />
            </Popover>
          </div>
        </Badge>
        <div className="content">
          {this.props.hasForm === null || this.props.hasForm === undefined
            ? null
            : this.renderContent()}
          {this.displayFormError()}
        </div>
        <div className="button-group">
          <button>{this.props.language === "EL" ? "Εφαρμογή" : "Apply"}</button>
          <button
            onClick={
              this.props.mode === "decision"
                ? () => {
                    this.props.toggleSettingsPopover(this.props.index);
                  }
                : this.props.toggleSettingsPopover
            }
          >
            {this.props.language === "EL" ? "Ακύρωση" : "Cancel"}
          </button>
        </div>
      </div>
    );
  }
}

export default SettingsPopover;
