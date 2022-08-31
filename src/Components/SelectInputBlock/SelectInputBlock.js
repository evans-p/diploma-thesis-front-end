import React from "react";

import { v4 as uuid } from "uuid";
import { Draggable } from "react-beautiful-dnd";

import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";

import "./SelectInputBlock.css";

import Overlay from "../Overlay/Overlay";

import { optionArraysEqual } from "../../Utils/arrayHelpers";

class SelectInputBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // The block' image.
      image: this.props.image,
      // The help texh that appears when the user hovers over the block's
      // image
      infoTextEL: this.props.infoTextEL,
      infoTextEN: this.props.infoTextEN,
      // The mouse cursor of the block's image
      iconCursor: this.props.iconCursor,
      // The variable that the current block controls.
      variableName: this.props.variableName,
      // An array with the block options
      hasOptions: this.props.hasOptions,
      editPanelOpen: false,
    };

    // BINDING
    this.openEditPanel = this.openEditPanel.bind(this);
    this.closeEditPanel = this.closeEditPanel.bind(this);
  }

  componentDidUpdate(prevProps) {
    /**
     * Check whether the Component's props were updated, and if they did,
     * set the component's state accordingly
     */
    if (
      prevProps.image !== this.props.image ||
      prevProps.infoTextEL !== this.props.infoTextEL ||
      prevProps.infoTextEN !== this.props.infoTextEN ||
      prevProps.iconCursor !== this.props.iconCursor ||
      prevProps.variableName !== this.props.variableName ||
      !optionArraysEqual(
        prevProps.hasOptions.length,
        this.props.hasOptions.length
      )
    ) {
      this.setState({
        image: this.props.image,
        infoTextEL: this.props.infoTextEL,
        infoTextEN: this.props.infoTextEN,
        iconCursor: this.props.iconCursor,
        variableName: this.props.variableName,
        hasOptions: this.props.hasOptions,
      });
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
        this.state.image === null ||
        this.state.image === undefined ||
        this.state.infoTextEL === null ||
        this.state.infoTextEL === undefined ||
        this.state.infoTextEN === null ||
        this.state.infoTextEN === undefined ||
        this.state.variableName === null ||
        this.state.variableName === undefined ||
        this.state.hasOptions === null ||
        this.state.hasOptions === undefined ||
        this.state.hasOptions === []
      ) {
        return "";
      } else {
        return 0;
      }
    } else {
      return "";
    }
  }

  /** Opens the block's edit Panel, by changing the
   * "editPanelOpen" state variable to true.*/
  openEditPanel() {
    this.setState({ editPanelOpen: true });
  }

  /** Closes the block's edit Panel, by changing the
   * "editPanelOpen" state variable to false.*/
  closeEditPanel() {
    this.setState({ editPanelOpen: false });
  }

  render() {
    return (
      <Draggable
        key={this.props.id}
        draggableId={this.props.id}
        index={this.props.index}
      >
        {(provided, snapshot) => {
          return (
            <div
              className="SelectInputBlock"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Badge
                badgeContent={this.handleBadgeContent()}
                color={this.handleBadgeColor()}
                variant="dot"
              >
                {this.state.infoTextEL === null ||
                this.state.infoTextEL === undefined ||
                this.state.infoTextEL === "" ||
                this.state.infoTextEN === null ||
                this.state.infoTextEN === undefined ||
                this.state.infoTextEN === "" ? (
                  this.state.image === null ? (
                    <Avatar
                      onClick={this.openEditPanel}
                      style={{ cursor: this.state.iconCursor }}
                    >
                      S
                    </Avatar>
                  ) : (
                    // <Avatar
                    //   src={this.state.image}
                    //   style={{ cursor: this.state.iconCursor }}
                    //   onClick={this.openEditPanel}
                    // />
                    <Avatar
                      src={URL.createObjectURL(this.state.image)}
                      style={{ cursor: this.state.iconCursor }}
                      onClick={this.openEditPanel}
                    />
                  )
                ) : (
                  <Tooltip
                    arrow
                    title={
                      this.props.language === "EL"
                        ? this.state.infoTextEL
                        : this.state.infoTextEN
                    }
                  >
                    {this.state.image === null ? (
                      <Avatar
                        onClick={this.openEditPanel}
                        style={{ cursor: this.state.iconCursor }}
                      >
                        S
                      </Avatar>
                    ) : (
                      <Avatar
                        src={URL.createObjectURL(this.state.image)}
                        style={{ cursor: this.state.iconCursor }}
                        onClick={this.openEditPanel}
                      />
                    )}
                  </Tooltip>
                )}
              </Badge>
              <select className="input">
                {this.state.hasOptions.map((option) => {
                  return (
                    <option key={uuid()}>
                      {this.props.language === "EL"
                        ? option.optionTextEL
                        : option.optionTextEN}
                    </option>
                  );
                })}
              </select>
              {this.state.editPanelOpen ? (
                <Overlay
                  componentMode={this.props.mode}
                  mode="select-input-block"
                  titleEL={"Επιλογές Εισόδου Επιλογής"}
                  titleEN={"Select Input Options"}
                  language={this.props.language}
                  open={this.state.editPanelOpen}
                  image={this.state.image}
                  infoTextEL={this.state.infoTextEL}
                  infoTextEN={this.state.infoTextEN}
                  iconCursor={this.state.iconCursor}
                  variableName={this.state.variableName}
                  hasOptions={this.state.hasOptions}
                  closeEditPanel={this.closeEditPanel}
                  applyChanges={this.applyChanges}
                  index={this.props.index}
                  errors={this.props.errors}
                  setSelectInputBlock={this.props.setSelectInputBlock}
                  deleteInputBlock={this.props.deleteInputBlock}
                />
              ) : null}
            </div>
          );
        }}
      </Draggable>
    );
  }
}

export default SelectInputBlock;
