import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Popover from "@material-ui/core/Popover";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import "./ParameterInputForm.css";

import ParameterInputRow from "../ParameterInputRow/ParameterInputRow";
import ParameterInputFormEditor from "../ParameterInputFormEditor/ParameterInputFormEditor";

import { reorderArray } from "../../Utils/arrayHelpers";

class ParameterInputForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // An array that holds the data that represent each of
      // the block's rows
      rows: [],
      // All the state variables below are being used in order to manage the popover
      // of the component.
      popoverId: "parameter-input-form-popover",
      popoverOpen: false,
      anchorEl: null,
    };

    this.deleteParameterInputRow = this.deleteParameterInputRow.bind(this);
    this.addParameterInputRow = this.addParameterInputRow.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.hadleOnClose = this.hadleOnClose.bind(this);
  }

  /**
   * A method that uses the state parameter "row" to produce the JSX elements
   * required to represent the rows of the component.
   */
  renderParameterInputRows() {
    return this.state.rows.map((val, idx) => (
      <ParameterInputRow
        mode={val}
        index={idx}
        id={`parameter-input-row-${val}-${idx}`}
        key={`parameter-input-row-${val}-${idx}`}
        language={this.props.language}
        defaultValueEL={this.props.defaultValueEL}
        defaultValueEN={this.props.defaultValueEN}
        hasOptions={this.props.hasOptions}
        deleteParameterInputRow={this.deleteParameterInputRow}
      />
    ));
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
   * Adds a new row to the component, by adding a new element to the state
   * variable "rows"
   */
  addParameterInputRow(mode) {
    this.setState((currentState) => ({ rows: [...currentState.rows, mode] }));
  }

  /**
   * Deletes a row from the component, by filtering the state variable "rows".
   */
  deleteParameterInputRow(idx) {
    this.setState((currentState) => {
      return { rows: currentState.rows.filter((val, i) => i !== idx) };
    });
  }

  /**A method that gets called when the dragging event of an input block ends
   * (the block gets droped). Make sure that the blocks position has been changed,
   * and if it did, call a method  to reorder the input blocks, so that they match
   * the new order.
   * */
  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    this.setState((currentState) => ({
      rows: reorderArray(
        currentState.rows,
        result.source.index,
        result.destination.index
      ),
    }));
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
        this.props.hasOptions === null ||
        this.props.hasOptions === undefined ||
        this.props.hasOptions.length === 0
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
      <div className="ParameterInputForm">
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

        <div className="form-content">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId={"parameter-input-form-dnd-content"}>
              {(provided) => {
                return (
                  <div
                    className="form-content"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {this.renderParameterInputRows()}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="buttons justify-align-center">
          <button
            onClick={() => {
              this.addParameterInputRow("text");
            }}
          >
            {this.props.language === "EL" ? "Κείμενο" : "Text"}
          </button>
          <Badge
            badgeContent={this.handleBadgeContent()}
            color={this.handleBadgeColor()}
            variant="dot"
          >
            <button
              onClick={() => {
                this.addParameterInputRow("select");
              }}
            >
              {this.props.language === "EL" ? "Μεταβλητή" : "Variable"}
            </button>
          </Badge>
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
          <ParameterInputFormEditor
            language={this.props.language}
            defaultValueEL={this.props.defaultValueEL}
            defaultValueEN={this.props.defaultValueEN}
            hasOptions={this.props.hasOptions}
            errors={this.props.errors}
            setParameterInputForm={this.props.setParameterInputForm}
            hadleOnClose={this.hadleOnClose}
          />
        </Popover>
      </div>
    );
  }
}

export default ParameterInputForm;
