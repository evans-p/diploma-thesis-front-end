import React from "react";
import { v4 as uuid } from "uuid";

import Popover from "@material-ui/core/Popover";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import ConditionInputFormEditor from "../ConditionInputFormEditor/ConditionInputFormEditor";

import "./ConditionInputForm.css";

class ConditionInputForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // A variable to track which option from the prop Array "hasOptions" is currently
      // being displayed.
      index: this.props.hasOptions ? 0 : null,
      // All the state variables below are being used in order to manage the popover
      // of the component.
      popoverId: "labeled-input-form-popover",
      popoverOpen: false,
      anchorEl: null,
    };

    // BINDING
    this.handleOnChange = this.handleOnChange.bind(this);
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

  /** A generic handler for the input components */
  handleOnChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
      if (
        this.props.hasOptions === null ||
        this.props.hasOptions === undefined ||
        this.props.hasOptions.length === 0
      ) {
        return "primary";
      } else {
        for (let i = 0; i < this.props.hasOptions.length; i++) {
          if (
            !(
              this.props.hasOptions[i].errors === null ||
              this.props.hasOptions[i].errors === undefined ||
              (Object.keys(this.props.hasOptions[i].errors).length === 0 &&
                this.props.hasOptions[i].errors.constructor === Object)
            )
          ) {
            return "error";
          }
        }
        return "primary";
      }
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
        this.props.hasOptions === null ||
        this.props.hasOptions === undefined ||
        this.props.hasOptions.length === 0
      ) {
        return "";
      } else {
        for (let i = 0; i < this.props.hasOptions.length; i++) {
          if (
            !(
              this.props.hasOptions[i].errors === null ||
              this.props.hasOptions[i].errors === undefined ||
              (Object.keys(this.props.hasOptions[i].errors).length === 0 &&
                this.props.hasOptions[i].errors.constructor === Object)
            )
          ) {
            return "";
          }

          if (
            this.props.hasOptions[i].optionTextEL === null ||
            this.props.hasOptions[i].optionTextEL === "" ||
            this.props.hasOptions[i].optionTextEL === undefined ||
            this.props.hasOptions[i].optionTextEN === null ||
            this.props.hasOptions[i].optionTextEN === "" ||
            this.props.hasOptions[i].optionTextEN === undefined
          ) {
            return "";
          }

          if (this.props.hasOptions[i].comparisonType !== "none") {
            if (
              this.props.hasOptions[i].comparators === null ||
              this.props.hasOptions[i].comparators === undefined ||
              this.props.hasOptions[i].comparators.length === 0 ||
              (this.props.hasOptions[i].comparators.length === 1 &&
                this.props.hasOptions[i].comparators[0] === "")
            ) {
              return "";
            }
          }

          if (this.props.hasOptions[i].comparisonType === "select") {
            if (
              this.props.hasOptions[i].hasOptions === null ||
              this.props.hasOptions[i].hasOptions === undefined ||
              this.props.hasOptions[i].hasOptions.length === 0
            ) {
              return "";
            }
          }
        }
        return 0;
      }
    } else {
      return "";
    }
  }

  /**A method that renders the biggest portion of the block's JSX elements.
   * Seperated from "render" method for readability
   */
  renderContent() {
    return (
      <div className="content max-width">
        <select
          value={this.state.index}
          name="index"
          onChange={this.handleOnChange}
          className={
            this.props.hasOptions[this.state.index].comparisonType === "none"
              ? "max-width"
              : "width-30"
          }
        >
          {this.props.hasOptions.map((val, idx) => {
            return (
              <option value={idx} key={uuid()}>
                {this.props.language === "EL"
                  ? val.optionTextEL
                  : val.optionTextEN}
              </option>
            );
          })}
        </select>
        {this.props.hasOptions ? (
          this.props.hasOptions[this.state.index].comparisonType !== "none" ? (
            <select>
              {this.props.hasOptions[this.state.index].comparators.map(
                (val) => {
                  return <option key={uuid()}>{val}</option>;
                }
              )}
            </select>
          ) : null
        ) : null}
        {this.props.hasOptions[this.state.index].comparisonType !== "none" ? (
          this.props.hasOptions[this.state.index].comparisonType ===
          "select" ? (
            <select>
              {this.props.hasOptions[this.state.index].hasOptions.map(
                (val, idx) => {
                  return (
                    <option key={uuid()}>
                      {this.props.language === "EL"
                        ? val.optionTextEL
                        : val.optionTextEN}
                    </option>
                  );
                }
              )}
            </select>
          ) : (
            <input type="text" />
          )
        ) : null}
      </div>
    );
  }

  render() {
    return (
      <div className="ConditionInputForm">
        <Badge
          badgeContent={this.handleBadgeContent()}
          color={this.handleBadgeColor()}
          variant="dot"
          className="width-85"
        >
          {this.props.hasOptions ? (
            this.props.hasOptions.length > 0 ? (
              this.renderContent()
            ) : (
              <select className="max-width"></select>
            )
          ) : null}
        </Badge>
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
          <ConditionInputFormEditor
            language={this.props.language}
            hasOptions={this.props.hasOptions}
            errors={this.props.errors}
            hadleOnClose={this.hadleOnClose}
            setConditionInputForm={this.props.setConditionInputForm}
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
      </div>
    );
  }
}

export default ConditionInputForm;
