import React from "react";

import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";

import CancelIcon from "@material-ui/icons/Cancel";

import SettingsPopover from "../SettingsPopover/SettingsPopover";

import "./DecisionBranch.css";

class DecisionBranch extends React.Component {
  /**A method  that manages the color of the badge that appears on the top-right
   * of the branch. If the block has a settings popover, and that popover has an error,
   * retuns the keyword "error". If the popover has a form, and that form has an error,
   * retuns the keyword "error". otherwise retuns the keyword "primary"*/
  handleBadgeColor() {
    if (
      this.props.hasSettingsPopover === undefined ||
      this.props.hasSettingsPopover === null ||
      (Object.keys(this.props.hasSettingsPopover).length === 0 &&
        this.props.hasSettingsPopover.constructor === Object)
    ) {
      if (
        this.props.errors.hasSettingsPopover === undefined ||
        this.props.errors.hasSettingsPopover === null ||
        (Object.keys(this.props.errors.hasSettingsPopover).length === 0 &&
          this.props.errors.hasSettingsPopover.constructor === Object)
      ) {
        return "primary";
      } else {
        return "error";
      }
    }

    if (
      this.props.hasSettingsPopover.errors === undefined ||
      this.props.hasSettingsPopover.errors === null ||
      (Object.keys(this.props.hasSettingsPopover.errors).length === 0 &&
        this.props.hasSettingsPopover.errors.constructor === Object)
    ) {
      if (
        this.props.hasSettingsPopover.hasForm === undefined ||
        this.props.hasSettingsPopover.hasForm === null ||
        (Object.keys(this.props.hasSettingsPopover.hasForm).length === 0 &&
          this.props.hasSettingsPopover.hasForm.constructor === Object) ||
        this.props.hasSettingsPopover.hasForm.type === "none"
      ) {
        return "primary";
      } else {
        if (
          this.props.hasSettingsPopover.hasForm.errors === undefined ||
          this.props.hasSettingsPopover.hasForm.errors === null ||
          (Object.keys(this.props.hasSettingsPopover.hasForm.errors).length ===
            0 &&
            this.props.hasSettingsPopover.hasForm.errors.constructor === Object)
        ) {
          if (
            this.props.hasSettingsPopover.hasForm.type === "condition-input"
          ) {
            if (this.props.hasSettingsPopover.hasForm.hasOptions.length > 0) {
              console.log("Checking Options...");
              for (
                let i = 0;
                i < this.props.hasSettingsPopover.hasForm.hasOptions.length;
                i++
              ) {
                console.log("Checking Option No." + i);
                if (
                  !(
                    this.props.hasSettingsPopover.hasForm.hasOptions[i]
                      .errors === undefined ||
                    this.props.hasSettingsPopover.hasForm.hasOptions[i]
                      .errors === null ||
                    (Object.keys(
                      this.props.hasSettingsPopover.hasForm.hasOptions[i].errors
                    ).length === 0 &&
                      this.props.hasSettingsPopover.hasForm.hasOptions[i].errors
                        .constructor === Object)
                  )
                ) {
                  return "error";
                }
              }
            }
          }
          return "primary";
        } else {
          return "error";
        }
      }
    } else {
      return "error";
    }
  }

  /**A method  that manages the content i.e. the visibility of the branches badge. If
   * the block has a settings popover, and that popover has an error, or at least one
   * if its required attributes in not filled out, the badge is visible. If the popover
   * has a form, and that form has an error,or at least one of its required attributes
   * in not filled out, the badge is visible. otherwise the badge does not appear.*/
  handleBadgeContent() {
    if (this.props.numberOfColumns === 2) {
      if (
        this.props.hasSettingsPopover === undefined ||
        this.props.hasSettingsPopover === null ||
        (Object.keys(this.props.hasSettingsPopover).length === 0 &&
          this.props.hasSettingsPopover.constructor === Object)
      ) {
        return 0;
      }
    }

    if (
      this.props.hasSettingsPopover === undefined ||
      this.props.hasSettingsPopover === null ||
      (Object.keys(this.props.hasSettingsPopover).length === 0 &&
        this.props.hasSettingsPopover.constructor === Object)
    ) {
      return "";
    }

    if (
      this.props.hasSettingsPopover.errors === undefined ||
      this.props.hasSettingsPopover.errors === null ||
      (Object.keys(this.props.hasSettingsPopover.errors).length === 0 &&
        this.props.hasSettingsPopover.errors.constructor === Object)
    ) {
      if (
        this.props.hasSettingsPopover.popoverTitleEL === null ||
        this.props.hasSettingsPopover.popoverTitleEL === undefined ||
        this.props.hasSettingsPopover.popoverTitleEL === "" ||
        this.props.hasSettingsPopover.popoverTitleEN === null ||
        this.props.hasSettingsPopover.popoverTitleEN === undefined ||
        this.props.hasSettingsPopover.popoverTitleEN === ""
      ) {
        return "";
      }

      if (
        this.props.hasSettingsPopover.hasForm === undefined ||
        this.props.hasSettingsPopover.hasForm === null ||
        (Object.keys(this.props.hasSettingsPopover.hasForm).length === 0 &&
          this.props.hasSettingsPopover.hasForm.constructor === Object) ||
        this.props.hasSettingsPopover.hasForm.type === "none"
      ) {
        return "";
      } else {
        if (
          this.props.hasSettingsPopover.hasForm.errors === undefined ||
          this.props.hasSettingsPopover.hasForm.errors === null ||
          (Object.keys(this.props.hasSettingsPopover.hasForm.errors).length ===
            0 &&
            this.props.hasSettingsPopover.hasForm.errors.constructor === Object)
        ) {
          switch (this.props.hasSettingsPopover.hasForm.type) {
            case "labeled-text-input":
              if (
                this.props.hasSettingsPopover.hasForm.variableLabelEL ===
                  null ||
                this.props.hasSettingsPopover.hasForm.variableLabelEL ===
                  undefined ||
                this.props.hasSettingsPopover.hasForm.variableLabelEL === "" ||
                this.props.hasSettingsPopover.hasForm.variableLabelEN ===
                  null ||
                this.props.hasSettingsPopover.hasForm.variableLabelEN ===
                  undefined ||
                this.props.hasSettingsPopover.hasForm.variableLabelEN === ""
              ) {
                return "";
              } else {
                return 0;
              }

            case "labeled-integer-input":
              if (
                this.props.hasSettingsPopover.hasForm.variableLabelEL ===
                  null ||
                this.props.hasSettingsPopover.hasForm.variableLabelEL ===
                  undefined ||
                this.props.hasSettingsPopover.hasForm.variableLabelEL === "" ||
                this.props.hasSettingsPopover.hasForm.variableLabelEN ===
                  null ||
                this.props.hasSettingsPopover.hasForm.variableLabelEN ===
                  undefined ||
                this.props.hasSettingsPopover.hasForm.variableLabelEN === ""
              ) {
                return "";
              } else {
                return 0;
              }

            case "labeled-float-input":
              if (
                this.props.hasSettingsPopover.hasForm.variableLabelEL ===
                  null ||
                this.props.hasSettingsPopover.hasForm.variableLabelEL ===
                  undefined ||
                this.props.hasSettingsPopover.hasForm.variableLabelEL === "" ||
                this.props.hasSettingsPopover.hasForm.variableLabelEN ===
                  null ||
                this.props.hasSettingsPopover.hasForm.variableLabelEN ===
                  undefined ||
                this.props.hasSettingsPopover.hasForm.variableLabelEN === ""
              ) {
                return "";
              } else {
                return 0;
              }

            case "parameter-input":
              if (
                this.props.hasSettingsPopover.hasForm.hasOptions === null ||
                this.props.hasSettingsPopover.hasForm.hasOptions ===
                  undefined ||
                this.props.hasSettingsPopover.hasForm.hasOptions.length === 0
              ) {
                return "";
              } else {
                return 0;
              }

            case "condition-input":
              if (
                this.props.hasSettingsPopover.hasForm.hasOptions === null ||
                this.props.hasSettingsPopover.hasForm.hasOptions ===
                  undefined ||
                this.props.hasSettingsPopover.hasForm.hasOptions.length === 0
              ) {
                return "";
              }
              for (
                let i = 0;
                i < this.props.hasSettingsPopover.hasForm.hasOptions.length;
                i++
              ) {
                if (
                  !(
                    this.props.hasSettingsPopover.hasForm.hasOptions[i]
                      .errors === undefined ||
                    this.props.hasSettingsPopover.hasForm.hasOptions[i]
                      .errors === null ||
                    (Object.keys(
                      this.props.hasSettingsPopover.hasForm.hasOptions[i].errors
                    ).length === 0 &&
                      this.props.hasSettingsPopover.hasForm.hasOptions[i].errors
                        .constructor === Object)
                  )
                ) {
                  return "";
                }

                if (
                  this.props.hasSettingsPopover.hasForm.hasOptions[i]
                    .optionTextEL === null ||
                  this.props.hasSettingsPopover.hasForm.hasOptions[i]
                    .optionTextEL === "" ||
                  this.props.hasSettingsPopover.hasForm.hasOptions[i]
                    .optionTextEL === undefined ||
                  this.props.hasSettingsPopover.hasForm.hasOptions[i]
                    .optionTextEN === null ||
                  this.props.hasSettingsPopover.hasForm.hasOptions[i]
                    .optionTextEN === "" ||
                  this.props.hasSettingsPopover.hasForm.hasOptions[i]
                    .optionTextEN === undefined
                ) {
                  return "";
                }

                if (
                  this.props.hasSettingsPopover.hasForm.hasOptions[i]
                    .comparisonType !== "none"
                ) {
                  if (
                    this.props.hasSettingsPopover.hasForm.hasOptions[i]
                      .comparators === null ||
                    this.props.hasSettingsPopover.hasForm.hasOptions[i]
                      .comparators === undefined ||
                    this.props.hasSettingsPopover.hasForm.hasOptions[i]
                      .comparators.length === 0 ||
                    (this.props.hasSettingsPopover.hasForm.hasOptions[i]
                      .comparators.length === 1 &&
                      this.props.hasSettingsPopover.hasForm.hasOptions[i]
                        .comparators[0] === "")
                  ) {
                    return "";
                  }
                }

                if (
                  this.props.hasSettingsPopover.hasForm.hasOptions[i]
                    .comparisonType === "select"
                ) {
                  if (
                    this.props.hasSettingsPopover.hasForm.hasOptions[i]
                      .hasOptions === null ||
                    this.props.hasSettingsPopover.hasForm.hasOptions[i]
                      .hasOptions === undefined ||
                    this.props.hasSettingsPopover.hasForm.hasOptions[i]
                      .hasOptions.length === 0
                  ) {
                    return "";
                  }
                }
              }
              return 0;
            default:
              return 0;
          }
        } else {
          return "";
        }
      }
    } else {
      return "";
    }
  }

  renderBranchNumber() {
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
          this.props.errors.hasSettingsPopover === undefined ||
          this.props.errors.hasSettingsPopover === null ||
          (Object.keys(this.props.errors.hasSettingsPopover).length === 0 &&
            this.props.errors.hasSettingsPopover.constructor === Object)
        )
      ) {
        return (
          <Tooltip
            arrow
            title={
              this.props.language === "EL"
                ? this.props.errors.hasSettingsPopover.EL
                : this.props.errors.hasSettingsPopover.EN
            }
          >
            <section
              className="branch-number justify-align-center"
              onClick={() => {
                this.props.toggleSettingsPopover(this.props.branchNumber - 1);
              }}
            >
              {this.props.branchNumber}
            </section>
          </Tooltip>
        );
      }
    }
    return (
      <section
        className="branch-number justify-align-center"
        onClick={() => {
          this.props.toggleSettingsPopover(this.props.branchNumber - 1);
        }}
      >
        {this.props.branchNumber}
      </section>
    );
  }

  render() {
    return !this.props.secondary ? (
      <div className="DecisionBranch">
        <Badge
          color={this.handleBadgeColor()}
          badgeContent={this.handleBadgeContent()}
        >
          <section className="branch-close-icon justify-align-center">
            <CancelIcon
              style={{ cursor: "pointer", zIndex: 3 }}
              onClick={this.props.removeBranch}
            />
          </section>
          {this.renderBranchNumber()}
          {/* <section
            className="branch-number justify-align-center"
            onClick={() => {
              this.props.toggleSettingsPopover(this.props.branchNumber - 1);
            }}
          >
            {this.props.branchNumber}
          </section> */}
        </Badge>
        {this.props.hasSettingsPopover === undefined ||
        this.props.hasSettingsPopover === null ||
        (Object.keys(this.props.hasSettingsPopover).length === 0 &&
          this.props.hasSettingsPopover.constructor === Object) ? null : this
            .props.settingsPopoverOpen[this.props.branchNumber - 1] ? (
          <SettingsPopover
            mode={"decision"}
            index={this.props.branchNumber - 1}
            language={this.props.language}
            toggleSettingsPopover={this.props.toggleSettingsPopover}
            setSettingsPopover={this.props.setSettingsPopover}
            setLabeledTextInputForm={this.props.setLabeledTextInputForm}
            setLabeledIntegerInputForm={this.props.setLabeledIntegerInputForm}
            setLabeledFloatInputForm={this.props.setLabeledFloatInputForm}
            setParameterInputForm={this.props.setParameterInputForm}
            setConditionInputForm={this.props.setConditionInputForm}
            setPhrasesInputForm={this.props.setPhrasesInputForm}
            deleteSettingsPopover={this.props.deleteSettingsPopover}
            deleteSettingsPopoverForm={this.props.deleteSettingsPopoverForm}
            {...this.props.hasSettingsPopover}
          />
        ) : null}
      </div>
    ) : (
      <div className="DecisionBranch">
        <section
          className="branch-number justify-align-center"
          style={{ backgroundColor: this.props.backroundColor }}
        ></section>
      </div>
    );
  }
}

export default DecisionBranch;
