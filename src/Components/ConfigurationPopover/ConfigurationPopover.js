import React from "react";

import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Popover from "@material-ui/core/Popover";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import FormHelperText from "@material-ui/core/FormHelperText";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import "./ConfigurationPopover.css";

import PopoverForm from "../PopoverForm/PopoverForm";

import TextInputBlock from "../TextInputBlock/TextInputBlock";
import IntegerInputBlock from "../IntegerInputBlock/IntegerInputBlock";
import FloatInputBlock from "../FloatInputBlock/FloatInputBlock";
import SelectInputBlock from "../SelectInputBlock/SelectInputBlock";

class ConfigurationPopover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // a boolean that indicates whether the popover is open or not.
      open: false,
      // All the state variables below are being used in order to manage the popover
      // of the component.
      popoverId: "configuration-popover",
      popoverOpen: false,
      anchorEl: null,
    };
    // BINDING
    this.onDragEnd = this.onDragEnd.bind(this);
    this.hadleOnClick = this.hadleOnClick.bind(this);
    this.hadleOnClose = this.hadleOnClose.bind(this);
  }

  /**A method that when executed, sets the state variables that
   * render the block's popover visible.*/
  hadleOnClick(e) {
    this.setState({ anchorEl: e.target, popoverOpen: true });
  }

  /**A method that when executed, sets the state variables that
   * make the block's popover hidden.*/
  hadleOnClose() {
    this.setState({ anchorEl: null, popoverOpen: false });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ open: true });
    }, 0);
  }

  /** Uses the "hasInput" prop array to produce the JSX elements required
   * to represent the input blocks of the configuration popover */
  renderInputBlocks() {
    return this.props.hasInput.map((val, idx) => {
      switch (val.type) {
        case "text-input-block":
          return (
            <TextInputBlock
              mode="configuration"
              language={this.props.language}
              key={uuid()}
              index={idx}
              id={val.id}
              type={val.type}
              image={val.image}
              infoTextEL={val.infoTextEL}
              infoTextEN={val.infoTextEN}
              iconCursor={val.iconCursor}
              variableName={val.variableName}
              defaultValueEL={val.defaultValueEL}
              defaultValueEN={val.defaultValueEN}
              errors={val.errors}
              setTextInputBlock={this.props.setTextInputBlock}
              deleteInputBlock={this.props.deleteInputBlock}
            />
          );
        case "integer-input-block":
          return (
            <IntegerInputBlock
              mode="configuration"
              language={this.props.language}
              key={uuid()}
              index={idx}
              id={val.id}
              type={val.type}
              image={val.image}
              infoTextEL={val.infoTextEL}
              infoTextEN={val.infoTextEN}
              iconCursor={val.iconCursor}
              variableName={val.variableName}
              minValue={val.minValue}
              maxValue={val.maxValue}
              defaultValue={val.defaultValue}
              errors={val.errors}
              setIntegerInputBlock={this.props.setIntegerInputBlock}
              deleteInputBlock={this.props.deleteInputBlock}
            />
          );
        case "float-input-block":
          return (
            <FloatInputBlock
              mode="configuration"
              language={this.props.language}
              key={uuid()}
              index={idx}
              id={val.id}
              type={val.type}
              image={val.image}
              infoTextEL={val.infoTextEL}
              infoTextEN={val.infoTextEN}
              iconCursor={val.iconCursor}
              variableName={val.variableName}
              minValue={val.minValue}
              maxValue={val.maxValue}
              defaultValue={val.defaultValue}
              errors={val.errors}
              setFloatInputBlock={this.props.setFloatInputBlock}
              deleteInputBlock={this.props.deleteInputBlock}
            />
          );
        case "select-input-block":
          return (
            <SelectInputBlock
              mode="configuration"
              language={this.props.language}
              key={uuid()}
              index={idx}
              id={val.id}
              type={val.type}
              image={val.image}
              infoTextEL={val.infoTextEL}
              infoTextEN={val.infoTextEN}
              iconCursor={val.iconCursor}
              variableName={val.variableName}
              hasOptions={val.hasOptions}
              errors={val.errors}
              setSelectInputBlock={this.props.setSelectInputBlock}
              deleteInputBlock={this.props.deleteInputBlock}
            />
          );
        default:
          console.log("Unknown Input Block. Will return null.....");
          return null;
      }
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

    this.props.reorderInputBlocks(
      "configuration",
      result.source.index,
      result.destination.index
    );
  }

  /**A method  that manages the color of the badge that appears on the top-right
   * of the popover. If the popover has an error, the method returns the keyword
   * "error", else, returns the keyword "primary".*/
  handleBadgeColor() {
    if (
      this.props.errors === null ||
      this.props.errors === undefined ||
      (Object.keys(this.props.errors).length === 0 &&
        this.props.errors.constructor === Object)
    ) {
      if (this.props.hasInput) {
        for (let i = 0; i < this.props.hasInput.length; i++) {
          if (
            !(
              this.props.hasInput[i].errors === null ||
              this.props.hasInput[i].errors === undefined ||
              (Object.keys(this.props.hasInput[i].errors).length === 0 &&
                this.props.hasInput[i].errors.constructor === Object)
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

  /**A method  that manages the content i.e. the visibility of the popover's badge.
   * If the popover has an error, the badge is visible. If at least one of the required
   * attributes of the popover is not filled out, the badge is visible. Otherwise, the
   * badge does not appear.*/
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
        this.props.popoverTitleEN === "" ||
        this.props.hasInput === null ||
        this.props.hasInput === undefined ||
        this.props.hasInput.length === 0
      ) {
        return "";
      }

      for (let i = 0; i < this.props.hasInput.length; i++) {
        if (
          !(
            this.props.hasInput[i].errors === null ||
            this.props.hasInput[i].errors === undefined ||
            (Object.keys(this.props.hasInput[i].errors).length === 0 &&
              this.props.hasInput[i].errors === Object)
          )
        ) {
          return "";
        }
        if (
          this.props.hasInput[i].image === null ||
          this.props.hasInput[i].image === undefined ||
          this.props.hasInput[i].infoTextEL === null ||
          this.props.hasInput[i].infoTextEL === undefined ||
          this.props.hasInput[i].infoTextEN === null ||
          this.props.hasInput[i].infoTextEN === undefined ||
          this.props.hasInput[i].variableName === null ||
          this.props.hasInput[i].variableName === undefined
        ) {
          return "";
        }
        if (this.props.hasInput[i].type === "select-input-block") {
          if (
            this.props.hasInput[i].hasOptions === null ||
            this.props.hasInput[i].hasOptions === undefined ||
            this.props.hasInput[i].hasOptions.length === 0
          ) {
            return "";
          }
        }
      }

      return 0;
    } else {
      return "";
    }
  }

  render() {
    return (
      <div
        className={
          this.state.open
            ? "ConfigurationPopover visible"
            : "ConfigurationPopover invisible"
        }
      >
        <div className="arrow"></div>
        <Badge
          badgeContent={this.handleBadgeContent()}
          color={this.handleBadgeColor()}
          style={{ position: "relative", width: "100%" }}
        >
          <div className="popover-title justify-align-center">
            {this.props.language === "EL"
              ? this.props.popoverTitleEL
              : this.props.popoverTitleEN}
          </div>
        </Badge>
        <div className="block-control">
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
              <IconButton onClick={this.hadleOnClick}>
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
              <IconButton onClick={this.props.deleteConfigurationPopover}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        </div>
        <div className="content">
          <div
            className="input-blocks"
            style={
              this.props.errors === null ||
              this.props.errors === undefined ||
              (Object.keys(this.props.errors).length === 0 &&
                this.props.errors.constructor === Object)
                ? null
                : this.props.errors.hasInput === null ||
                  this.props.errors.hasInput === undefined ||
                  (Object.keys(this.props.errors.hasInput).length === 0 &&
                    this.props.errors.hasInput.constructor === Object)
                ? null
                : { background: "#f44336" }
            }
          >
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable
                droppableId={"configuration-popover-dnd-content"}
                direction="horizontal"
              >
                {(provided) => {
                  return (
                    <div
                      className="input-blocks-content"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {this.renderInputBlocks()}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </DragDropContext>
          </div>

          {this.props.errors === null ||
          this.props.errors === undefined ||
          (Object.keys(this.props.errors).length === 0 &&
            this.props.errors.constructor === Object) ? null : this.props.errors
              .hasInput === null ||
            this.props.errors.hasInput === undefined ||
            (Object.keys(this.props.errors.hasInput).length === 0 &&
              this.props.errors.hasInput.constructor === Object) ? null : (
            <FormHelperText style={{ color: "#f44336" }}>
              {this.props.language === "EL"
                ? this.props.errors.hasInput.EL
                : this.props.errors.hasInput.EN}
            </FormHelperText>
          )}

          <button
            className="apply"
            onClick={this.props.toggleConfigurationPopover}
          >
            {this.props.language === "EL" ? "Εφαρμογή" : "Apply"}
          </button>
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
            mode="configuration"
            language={this.props.language}
            popoverTitleEL={this.props.popoverTitleEL}
            popoverTitleEN={this.props.popoverTitleEN}
            errors={this.props.errors}
            setConfigurationPopover={this.props.setConfigurationPopover}
            hadleOnClose={this.hadleOnClose}
          />
        </Popover>
      </div>
    );
  }
}

export default ConfigurationPopover;
