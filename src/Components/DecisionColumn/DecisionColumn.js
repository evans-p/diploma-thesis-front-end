import React from "react";
import { v4 as uuid } from "uuid";

import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";

import PhotoIcon from "@material-ui/icons/Photo";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import "./DecisionColumn.css";

import DecisionBranch from "../DecisionBranch/DecisionBranch";
import ConfigurationPopover from "../ConfigurationPopover/ConfigurationPopover";

class DecisionColumn extends React.Component {
  constructor(props) {
    super(props);

    // A reference to the block's configuratiopn popover.
    this.configurationPopoverRef = React.createRef();

    this.state = {
      // A boolean that determines whether the block's configuration popover
      // is open or not.
      configurationPopoverOpen: true,
      // An array of booleans that determines whether the branch's settings
      // popover is open or not.
      settingsPopoverOpen: this.setSettingsPopoverOpen(
        this.props.numberOfBranches
      ),
    };
    // BINDING
    this.renderBranches = this.renderBranches.bind(this);
    this.toggleSettingsPopover = this.toggleSettingsPopover.bind(this);
    this.toggleConfigurationPopover =
      this.toggleConfigurationPopover.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.numberOfBranches !== this.props.numberOfBranches) {
      this.setState({
        settingsPopoverOpen: this.setSettingsPopoverOpen(
          this.props.numberOfBranches
        ),
      });
    }
  }

  setSettingsPopoverOpen(number) {
    return new Array(number).fill(false);
  }

  /** Togles the visibility of a branches settings popoover.*/
  toggleSettingsPopover(idx) {
    this.setState((currState) => ({
      settingsPopoverOpen: [
        ...currState.settingsPopoverOpen.slice(0, idx),
        !currState.settingsPopoverOpen[idx],
        ...currState.settingsPopoverOpen.slice(idx + 1),
      ],
    }));
  }

  /** Togles the visibility of the block's configuration popover.*/
  toggleConfigurationPopover() {
    this.setState((currState) => ({
      configurationPopoverOpen: !currState.configurationPopoverOpen,
    }));
  }

  /**
   * A method that renders the JSX elements required to prepresent the block's
   * branches. If The column is a secondary column i.e. this.props.secondary===true
   * render just one branch. Otherwise, render a number a branches equal to 
    this.props.numberOfBranches
    */
  renderBranches() {
    if (this.props.secondary) {
      return (
        <DecisionBranch
          secondary={this.props.secondary}
          backroundColor={this.props.backroundColor}
        />
      );
    } else {
      let branches = [];

      for (let i = 0; i < this.props.numberOfBranches; i++) {
        branches.push(
          <DecisionBranch
            key={uuid()}
            language={this.props.language}
            branchNumber={i + 1}
            numberOfColumns={this.props.numberOfColumns}
            errors={this.props.errors}
            secondary={this.props.secondary}
            settingsPopoverOpen={this.state.settingsPopoverOpen}
            removeBranch={this.props.removeBranch}
            hasSettingsPopover={this.props.hasSettingsPopover}
            setSettingsPopover={this.props.setSettingsPopover}
            setLabeledTextInputForm={this.props.setLabeledTextInputForm}
            setLabeledIntegerInputForm={this.props.setLabeledIntegerInputForm}
            setLabeledFloatInputForm={this.props.setLabeledFloatInputForm}
            setParameterInputForm={this.props.setParameterInputForm}
            setConditionInputForm={this.props.setConditionInputForm}
            setPhrasesInputForm={this.props.setPhrasesInputForm}
            deleteSettingsPopoverForm={this.props.deleteSettingsPopoverForm}
            deleteSettingsPopover={this.props.deleteSettingsPopover}
            toggleSettingsPopover={this.toggleSettingsPopover}
          />
        );
      }
      return branches;
    }
  }

  /**
   * A method  that manages the color of the badge that appears on the top-right
   * of the block image. If the block has a configuration popover, and that popover
   * has an error, retuns the keyword "error". Otherwise retuns the keyword "primary"
   */
  handleConfigurationPopoverBadgeColor() {
    if (
      this.props.hasConfigurationPopover === undefined ||
      this.props.hasConfigurationPopover === null
    ) {
      return "primary";
    }

    if (
      this.props.hasConfigurationPopover.errors === null ||
      this.props.hasConfigurationPopover.errors === undefined ||
      (Object.keys(this.props.hasConfigurationPopover.errors).length === 0 &&
        this.props.hasConfigurationPopover.errors.constructor === Object)
    ) {
      if (this.props.hasConfigurationPopover.hasInput) {
        for (
          let i = 0;
          i < this.props.hasConfigurationPopover.hasInput.length;
          i++
        ) {
          if (
            !(
              this.props.hasConfigurationPopover.hasInput[i].errors === null ||
              this.props.hasConfigurationPopover.hasInput[i].errors ===
                undefined ||
              (Object.keys(
                this.props.hasConfigurationPopover.hasInput[i].errors
              ).length === 0 &&
                this.props.hasConfigurationPopover.hasInput[i].errors
                  .constructor === Object)
            )
          ) {
            return "error";
          }
        }
      }
      return "primary";
    } else {
      return "error";
    }
  }

  /**A method  that manages the content i.e. the visibility of the badge that appears
   * on the top-right of the block image. If the block has a configuration popover, and
   * that popover has an error, or at least one of the required attributes of the popover
   * is not filled out, the badge is visible. If the block has an error, the badge is
   * visible Otherwise, the badge does not appear.*/
  handleConfigurationPopoverBadgeContent() {
    if (
      this.props.hasConfigurationPopover === undefined ||
      this.props.hasConfigurationPopover === null
    ) {
      return 0;
    } else {
      if (
        !(
          this.props.hasConfigurationPopover.errors === null ||
          this.props.hasConfigurationPopover.errors === undefined ||
          (Object.keys(this.props.hasConfigurationPopover.errors).length ===
            0 &&
            this.props.hasConfigurationPopover.errors.constructor === Object)
        )
      ) {
        return "";
      }

      if (
        this.props.hasConfigurationPopover.popoverTitleEL === null ||
        this.props.hasConfigurationPopover.popoverTitleEL === undefined ||
        this.props.hasConfigurationPopover.popoverTitleEL === "" ||
        this.props.hasConfigurationPopover.popoverTitleEN === null ||
        this.props.hasConfigurationPopover.popoverTitleEN === undefined ||
        this.props.hasConfigurationPopover.popoverTitleEN === "" ||
        this.props.hasConfigurationPopover.hasInput === null ||
        this.props.hasConfigurationPopover.hasInput === undefined ||
        this.props.hasConfigurationPopover.hasInput.length === 0
      ) {
        return "";
      }

      for (
        let i = 0;
        i < this.props.hasConfigurationPopover.hasInput.length;
        i++
      ) {
        if (
          !(
            this.props.hasConfigurationPopover.hasInput[i].errors === null ||
            this.props.hasConfigurationPopover.hasInput[i].errors ===
              undefined ||
            (Object.keys(this.props.hasConfigurationPopover.hasInput[i].errors)
              .length === 0 &&
              this.props.hasConfigurationPopover.hasInput[i].errors === Object)
          )
        ) {
          return "";
        }
        if (
          this.props.hasConfigurationPopover.hasInput[i].image === null ||
          this.props.hasConfigurationPopover.hasInput[i].image === undefined ||
          this.props.hasConfigurationPopover.hasInput[i].infoTextEL === null ||
          this.props.hasConfigurationPopover.hasInput[i].infoTextEL ===
            undefined ||
          this.props.hasConfigurationPopover.hasInput[i].infoTextEN === null ||
          this.props.hasConfigurationPopover.hasInput[i].infoTextEN ===
            undefined ||
          this.props.hasConfigurationPopover.hasInput[i].variableName ===
            null ||
          this.props.hasConfigurationPopover.hasInput[i].variableName ===
            undefined
        ) {
          return "";
        }
        if (
          this.props.hasConfigurationPopover.hasInput[i].type ===
          "select-input-block"
        ) {
          if (
            this.props.hasConfigurationPopover.hasInput[i].hasOptions ===
              null ||
            this.props.hasConfigurationPopover.hasInput[i].hasOptions ===
              undefined ||
            this.props.hasConfigurationPopover.hasInput[i].hasOptions.length ===
              0
          ) {
            return "";
          }
        }
      }
      return 0;
    }
  }

  render() {
    return (
      <div
        className="DecisionColumn"
        style={{ backgroundColor: this.props.backroundColor }}
      >
        <div className="block-image justify-align-center">
          <Badge
            badgeContent={this.handleConfigurationPopoverBadgeContent()}
            color={this.handleConfigurationPopoverBadgeColor()}
            variant="dot"
          >
            {this.props.blockImage === null ? (
              <Tooltip
                arrow
                title={
                  this.props.language === "EL"
                    ? "Δεν Υπάρχει Eικόνα Μπλόκ..."
                    : "No Block Image..."
                }
              >
                <Avatar
                  style={{ cursor: "pointer" }}
                  onClick={this.toggleConfigurationPopover}
                >
                  <PhotoIcon />
                </Avatar>
              </Tooltip>
            ) : (
              <Tooltip
                arrow
                title={
                  this.props.language === "EL" ? "Eικόνα Μπλόκ" : "Block Image"
                }
              >
                <Avatar
                  src={URL.createObjectURL(this.props.blockImage)}
                  style={{ cursor: "pointer" }}
                  onClick={this.toggleConfigurationPopover}
                />
                {/* <img
                  src={URL.createObjectURL(this.props.blockImage)}
                  alt="..."
                  onClick={this.toggleConfigurationPopover}
                /> */}
              </Tooltip>
            )}
          </Badge>
          {this.props.hasConfigurationPopover === undefined ||
          this.props.hasConfigurationPopover === null ? null : this.state
              .configurationPopoverOpen ? (
            <ConfigurationPopover
              ref={this.configurationPopoverRef}
              open={this.state.configurationPopoverOpen}
              setTextInputBlock={this.props.setTextInputBlock}
              setIntegerInputBlock={this.props.setIntegerInputBlock}
              setFloatInputBlock={this.props.setFloatInputBlock}
              setSelectInputBlock={this.props.setSelectInputBlock}
              deleteInputBlock={this.props.deleteInputBlock}
              reorderInputBlocks={this.props.reorderInputBlocks}
              language={this.props.language}
              toggleConfigurationPopover={this.toggleConfigurationPopover}
              setConfigurationPopover={this.props.setConfigurationPopover}
              deleteConfigurationPopover={this.props.deleteConfigurationPopover}
              {...this.props.hasConfigurationPopover}
            />
          ) : null}
        </div>
        <div className="branch-section">{this.renderBranches()}</div>

        <div
          className="add-branch justify-align-center"
          style={{
            backgroundColor: this.props.secondary ? "inherit" : "black",
          }}
        >
          {!this.props.secondary ? (
            <AddCircleIcon
              onClick={this.props.addBranch}
              style={{ color: "white", cursor: "pointer" }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default DecisionColumn;
