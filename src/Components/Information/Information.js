import React from "react";

import Popover from "@material-ui/core/Popover";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";

import "./Information.css";
import InformationForm from "../InformationForm/InformationForm";

class Information extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // All the state variables below are being used in order to manage the popover
      // of the component.
      popoverId: "info-popover",
      popoverOpen: false,
      anchorEl: null,
    };

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
        this.props.informationTextEL === null ||
        this.props.informationTextEL === undefined ||
        this.props.informationTextEL === "" ||
        this.props.informationTextEN === null ||
        this.props.informationTextEN === undefined ||
        this.props.informationTextEN === ""
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
      <div className="Information">
        <Badge
          badgeContent={this.handleBadgeContent()}
          color={this.handleBadgeColor()}
          variant="dot"
        >
          {this.props.language === "EL" ? (
            this.props.informationTextEL === null ||
            this.props.informationTextEL === undefined ||
            this.props.informationTextEL === "" ? (
              <i
                className="fas fa-info-circle"
                aria-describedby={this.state.popoverId}
                onClick={this.hadleOnClick}
                style={{ cursor: this.props.cursor }}
              ></i>
            ) : (
              <Tooltip
                arrow
                placement="right-start"
                title={this.props.informationTextEL}
              >
                <i
                  className="fas fa-info-circle"
                  aria-describedby={this.state.popoverId}
                  onClick={this.hadleOnClick}
                  style={{ cursor: this.props.cursor }}
                ></i>
              </Tooltip>
            )
          ) : this.props.informationTextEN === null ||
            this.props.informationTextEN === undefined ||
            this.props.informationTextEN === "" ? (
            <i
              className="fas fa-info-circle"
              aria-describedby={this.state.popoverId}
              onClick={this.hadleOnClick}
              style={{ cursor: this.props.cursor }}
            ></i>
          ) : (
            <Tooltip
              arrow
              placement="right-start"
              title={this.props.informationTextEN}
            >
              <i
                className="fas fa-info-circle"
                aria-describedby={this.state.popoverId}
                onClick={this.hadleOnClick}
                style={{ cursor: this.props.cursor }}
              ></i>
            </Tooltip>
          )}
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
          <InformationForm
            language={this.props.language}
            informationTextEL={this.props.informationTextEL}
            informationTextEN={this.props.informationTextEN}
            cursor={this.props.cursor}
            errors={this.props.errors}
            hadleOnClose={this.hadleOnClose}
            setInformation={this.props.setInformation}
            deleteInformation={this.props.deleteInformation}
          />
        </Popover>
      </div>
    );
  }
}

export default Information;
