import React from "react";

import { v4 as uuid } from "uuid";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddBoxIcon from "@material-ui/icons/AddBox";

import "./ConditionInputFormEditor.css";

import ConditionOptionForm from "../ConditionOptionForm/ConditionOptionForm";

class ConditionInputFormEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // An array of options, provided by the parent component.
      hasOptions: this.props.hasOptions,
      // An object with the errors of the parent component.
      errors: this.props.errors,
      // An array of objects that manage the visibility of each option's
      // popover.
      popovers: props.hasOptions.map((val, idx) => ({
        popoverId: `condition-option-popover-${idx}`,
        popoverOpen: false,
        anchorEl: null,
      })),
    };

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.deleteConditionOption = this.deleteConditionOption.bind(this);
    this.addConditionOption = this.addConditionOption.bind(this);
    this.setConditionOption = this.setConditionOption.bind(this);
  }

  /* A method that that executes when the user hits the "Submit" Button of the
   * form. Delete all the errors from the
   * "error" state object that were corrected, and after that, call "setConditionInputForm"
   * method, to apply the changes to the parent Component(ConditionInputForm).
   * TO BE REVIEWED!!!!!*/
  handleOnSubmit() {
    this.props.setConditionInputForm(this.state.hasOptions, this.state.errors);
    this.props.hadleOnClose();
  }

  /**A method that when executed, sets the state variables that
   * render the clicked option's popover visible.*/
  handleOnClick(e, idx) {
    this.setState((currentState) => {
      return {
        popovers: [
          ...currentState.popovers.slice(0, idx),
          {
            popoverId: `condition-option-popover-${idx}`,
            popoverOpen: true,
            anchorEl: e.target,
          },
          ...currentState.popovers.slice(idx + 1),
        ],
      };
    });
  }

  /**A method that when executed, sets the state variables that
   * make the clicked option's popover hidden.*/
  handleOnClose(idx) {
    this.setState((currentState) => {
      return {
        popovers: [
          ...currentState.popovers.slice(0, idx),
          {
            popoverId: `condition-option-popover-${idx}`,
            popoverOpen: false,
            anchorEl: null,
          },
          ...currentState.popovers.slice(idx + 1),
        ],
      };
    });
  }

  /**A method to manage the event of deleting a condition option (an element of
   * the "hasOptions" state variable).*/
  deleteConditionOption(idx, index) {
    this.setState((currentState) => {
      return {
        hasOptions: currentState.hasOptions.filter((val) => val.id !== idx),
        popovers: currentState.hasOptions.slice(1).map((val, i) => {
          return {
            popoverId: `condition-option-popover-${i}`,
            popoverOpen: false,
            anchorEl: null,
          };
        }),
        errors: currentState.errors,
      };
    });
  }

  /**A method to be provided to "ConditionOptionForm" component. Called to
   * save all the changes recorded to a "hasOptions" element.(condition option).
   * If the changed option had any errors, delete those errors*/
  setConditionOption({
    idx,
    comparisonType,
    comparators,
    optionTextEL,
    optionTextEN,
    hasOptions,
    errors,
  } = {}) {
    this.setState((currentState) => {
      return {
        hasOptions: [
          ...currentState.hasOptions.slice(0, idx),
          {
            id: currentState.hasOptions[idx].id,
            comparisonType: comparisonType,
            comparators: comparators,
            optionTextEL: optionTextEL,
            optionTextEN: optionTextEN,
            hasOptions: hasOptions,
            errors: errors,
          },
          ...currentState.hasOptions.slice(idx + 1),
        ],
      };
    });
  }

  /**A method to manage the event of adding a condition option (an element of
   * the "hasOptions" state variable).*/
  addConditionOption() {
    this.setState((currentState) => {
      return {
        hasOptions: [
          {
            id: uuid(),
            comparisonType: "none",
            comparators: null,
            optionTextEL: "Νέα Επιλογή",
            optionTextEN: "New Option",
            hasOptions: [],
            errors: {
              // comparators: {
              //   EL: "comparators2",
              //   ΕΝ: "comparators2",
              // },
              // comparisonType: {
              //   EL: "comparisonType2",
              //   ΕΝ: "comparisonType2",
              // },
              // hasOptions: {
              //   EL: "hasOptions2",
              //   ΕΝ: "hasOptions2",
              // },
              // optionTextEL: {
              //   EL: "optionTextEL2",
              //   ΕΝ: "optionTextEL2",
              // },
              // optionTextEN: {
              //   EL: "optionTextEN2",
              //   ΕΝ: "optionTextEN2",
              // },
            },
          },
          ...currentState.hasOptions,
        ],
        popovers: [{}, ...currentState.hasOptions].map((val, i) => {
          return {
            popoverId: `condition-option-popover-${i}`,
            popoverOpen: false,
            anchorEl: null,
          };
        }),
        errors: {},
      };
    });
    return;
  }

  /** A method that checks if a state attribute has an error associated with it.
   * If so, renders the appropriate error message to be displayed.*/
  renderErrorContent(key) {
    if (
      this.state.errors === null ||
      this.state.errors === undefined ||
      (Object.keys(this.state.errors).length === 0 &&
        this.state.errors.constructor === Object)
    ) {
      return "";
    } else {
      if (
        this.state.errors[key] === null ||
        this.state.errors[key] === undefined ||
        (Object.keys(this.state.errors[key]).length === 0 &&
          this.state.errors[key].constructor === Object)
      ) {
        return "";
      } else {
        return this.props.language === "EL"
          ? this.state.errors[key].EL
          : this.state.errors[key].EN;
      }
    }
  }

  /** A method that checks if a state attribute has an error associated with it.
   * If so, returns true, otherwise returns false.
   */
  renderError(key) {
    if (
      this.state.errors === null ||
      this.state.errors === undefined ||
      (Object.keys(this.state.errors).length === 0 &&
        this.state.errors.constructor === Object)
    ) {
      return false;
    } else {
      if (
        this.state.errors[key] === null ||
        this.state.errors[key] === undefined ||
        (Object.keys(this.state.errors[key]).length === 0 &&
          this.state.errors[key].constructor === Object)
      ) {
        return false;
      } else {
        return true;
      }
    }
  }

  /** A handler for the style of the option avatar. If the option
   * has an error asociated with it returns a certain color code,
   * And if it doesnt, returns different one. */
  renderOptionAvatarStyle(option) {
    if (
      option.errors === null ||
      option.errors === undefined ||
      (Object.keys(option.errors).length === 0 &&
        option.errors.constructor === Object)
    ) {
      return option.comparisonType !== "none"
        ? { backgroundColor: "#316dd3" }
        : {};
    } else {
      return { backgroundColor: "#f21d3c" };
    }
  }

  /** A handler for the style of the option text. If the option
   * has an error asociated with it returns a certain color code,
   * And if it doesnt, returns different one. */
  renderOptionTextStyle(option) {
    if (
      option.errors === null ||
      option.errors === undefined ||
      (Object.keys(option.errors).length === 0 &&
        option.errors.constructor === Object)
    ) {
      return { width: 200, marginRight: 50 };
    } else {
      return { width: 200, marginRight: 50, color: "#f21d3c" };
    }
  }

  // /** A method that checks if an option, indentified by the "index" input,
  //  * has any errors associated with it. if so, returns those errors (as an object),
  //  * otherwise, returns an empty object.
  //  */
  // fetchOptionErrors(index) {
  //   if (
  //     this.state.errors === null ||
  //     this.state.errors === undefined ||
  //     (Object.keys(this.state.errors).length === 0 &&
  //       this.state.errors.constructor === Object)
  //   ) {
  //     return {};
  //   }

  //   if (
  //     this.state.errors.optionErrors === null ||
  //     this.state.errors.optionErrors === undefined ||
  //     this.state.errors.optionErrors.length === 0
  //   ) {
  //     return {};
  //   }

  //   if (
  //     this.state.errors.optionErrors[index] === null ||
  //     this.state.errors.optionErrors[index] === undefined ||
  //     (Object.keys(this.state.errors.optionErrors[index]).length === 0 &&
  //       this.state.errors.optionErrors[index].constructor === Object)
  //   ) {
  //     return {};
  //   }

  //   return this.state.errors.optionErrors[index];
  // }

  render() {
    return (
      <div className="ConditionInputFormEditor">
        <div className="row title">
          {this.props.language === "EL"
            ? "Ρυθμίσεις Φόρμας Εισόδου Σύγκρισης"
            : "Condition Input Form Settings"}
        </div>
        <List className="list">
          {this.state.hasOptions.map((val, idx) => {
            return (
              <ListItem key={idx}>
                <ListItemAvatar>
                  <Avatar style={this.renderOptionAvatarStyle(val)}>
                    <CompareArrowsIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    this.props.language === "EL"
                      ? val.optionTextEL
                      : val.optionTextEN
                  }
                  secondary={
                    this.props.language === "EL"
                      ? val.optionTextEN
                      : val.optionTextEL
                  }
                  style={this.renderOptionTextStyle(val)}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={(e) => {
                      this.handleOnClick(e, idx);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <Popover
                    id={this.state.popovers[idx].popoverId}
                    open={this.state.popovers[idx].popoverOpen}
                    anchorEl={this.state.popovers[idx].anchorEl}
                    onClose={() => {
                      this.handleOnClose(idx);
                    }}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <ConditionOptionForm
                      language={this.props.language}
                      index={idx}
                      errors={val.errors}
                      optionTextEL={val.optionTextEL}
                      optionTextEN={val.optionTextEN}
                      comparisonType={val.comparisonType}
                      comparators={val.comparators}
                      hasOptions={val.hasOptions}
                      handleOnClose={() => {
                        this.handleOnClose(idx);
                      }}
                      setConditionOption={this.setConditionOption}
                    />
                  </Popover>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      this.deleteConditionOption(val.id, idx);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
        <div className="row">
          <Button
            variant="contained"
            color={this.renderError("hasOptions") ? "secondary" : "primary"}
            className="max-width"
            endIcon={<AddBoxIcon />}
            onClick={this.addConditionOption}
          >
            {this.props.language === "EL" ? "Προσθήκη Επιλογής" : "Add Option"}
          </Button>
          {this.renderError("hasOptions") ? (
            <FormHelperText style={{ color: "#f21d3c" }}>
              {this.renderErrorContent("hasOptions")}
            </FormHelperText>
          ) : null}
        </div>
        <div className="row buttons">
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleOnSubmit}
            className="submit submit-color"
          >
            {this.props.language === "EL" ? "Υποβολή" : "Submit"}
          </Button>
          <Button
            variant="contained"
            onClick={this.props.hadleOnClose}
            className="submit cancel-color"
          >
            {this.props.language === "EL" ? "Ακύρωση" : "Cancel"}
          </Button>
        </div>
      </div>
    );
  }
}

export default ConditionInputFormEditor;
