import React from "react";

import { Draggable } from "react-beautiful-dnd";

import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";

import "./FloatInputBlock.css";

import Overlay from "../Overlay/Overlay";

class FloatInputBlock extends React.Component {
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
      // The  minimum value of the block's input.
      minValue: this.props.minValue,
      // The  maximum value of the block's input.
      maxValue: this.props.maxValue,
      // The  default value of the block's input.
      defaultValue: this.props.defaultValue,
      // A boolean that controls whether the block's edit Panel
      // is open or not.
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
      prevProps.minValue !== this.props.minValue ||
      prevProps.maxValue !== this.props.maxValue ||
      prevProps.defaultValue !== this.props.defaultValue
    ) {
      this.setState({
        image: this.props.image,
        infoTextEL: this.props.infoTextEL,
        infoTextEN: this.props.infoTextEN,
        iconCursor: this.props.iconCursor,
        variableName: this.props.variableName,
        minValue: this.props.minValue,
        maxValue: this.props.maxValue,
        defaultValue: this.props.defaultValue,
      });
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
        this.state.variableName === undefined
      ) {
        return "";
      } else {
        return 0;
      }
    } else {
      return "";
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
              className="FloatInputBlock"
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
                      F
                    </Avatar>
                  ) : (
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
                        F
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
              <input
                className="input"
                type="number"
                defaultValue={this.state.defaultValue}
                placeholder={this.state.defaultValue}
                min={this.state.minValue}
                max={this.state.maxValue}
              />
              {this.state.editPanelOpen ? (
                <Overlay
                  componentMode={this.props.mode}
                  mode="float-input-block"
                  titleEL={"Επιλογές Εισόδου Αριθμού Κιν. Υπ."}
                  titleEN={"Floating Point Number Input Options"}
                  language={this.props.language}
                  open={this.state.editPanelOpen}
                  image={this.state.image}
                  infoTextEL={this.state.infoTextEL}
                  infoTextEN={this.state.infoTextEN}
                  iconCursor={this.state.iconCursor}
                  variableName={this.state.variableName}
                  minValue={this.state.minValue}
                  maxValue={this.state.maxValue}
                  defaultValue={this.state.defaultValue}
                  closeEditPanel={this.closeEditPanel}
                  index={this.props.index}
                  errors={this.props.errors}
                  setFloatInputBlock={this.props.setFloatInputBlock}
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

export default FloatInputBlock;
