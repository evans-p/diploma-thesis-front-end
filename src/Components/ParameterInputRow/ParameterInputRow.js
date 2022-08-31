import React from "react";

import { v4 as uuid } from "uuid";

import { Draggable } from "react-beautiful-dnd";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

import "./ParameterInputRow.css";

class ParameterInputRow extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.deleteParameterInputRow(this.props.index);
  }

  renderInputType() {
    if (this.props.mode === "text") {
      return (
        <input
          type="text"
          placeholder={
            this.props.language === "EL"
              ? this.props.defaultValueEL
              : this.props.defaultValueEN
          }
          defaultValue={
            this.props.language === "EL"
              ? this.props.defaultValueEL
              : this.props.defaultValueEN
          }
        />
      );
    } else if (this.props.mode === "select") {
      return (
        <select>
          {this.props.hasOptions.map((val, idx) => (
            <option key={uuid()}>
              {this.props.language === "EL"
                ? val.optionTextEL
                : val.optionTextEN}
            </option>
          ))}
        </select>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <Draggable
        key={this.props.id}
        draggableId={this.props.id}
        index={this.props.index}
      >
        {(provided, snapshot) => (
          <div
            className="ParameterInputRow"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <DragIndicatorIcon style={{ cursor: "grab" }} />
            {this.renderInputType()}
            <IconButton
              size="small"
              className="icon-button"
              onClick={this.handleOnClick}
            >
              <CloseIcon fontSize="small" className="icon" />
            </IconButton>
          </div>
        )}
      </Draggable>
    );
  }
}

export default ParameterInputRow;
