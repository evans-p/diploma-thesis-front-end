import React from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import PhotoIcon from "@material-ui/icons/Photo";
import FilterFramesIcon from "@material-ui/icons/FilterFrames";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import "./ActionBlock.css";

import { computeFontColor } from "../../Utils/colorHelpers";

import Overlay from "../Overlay/Overlay";
import Information from "../Information/Information";
import TextInputBlock from "../TextInputBlock/TextInputBlock";
import IntegerInputBlock from "../IntegerInputBlock/IntegerInputBlock";
import FloatInputBlock from "../FloatInputBlock/FloatInputBlock";
import SelectInputBlock from "../SelectInputBlock/SelectInputBlock";
import SettingsPopover from "../SettingsPopover/SettingsPopover";

class ActionBlock extends React.Component {
  constructor(props) {
    super(props);

    this.settingsPopoverRef = React.createRef();

    this.state = {
      // The block's name, to be displayed on TekTrain platform (In English)
      blockNameEN: this.props.blockNameEN,
      // The block's name, to be displayed on TekTrain platform (In Greek)
      blockNameEL: this.props.blockNameEL,
      // The block Title in English
      blockTitleEN: this.props.blockTitleEN,
      // The block Title in Greek
      blockTitleEL: this.props.blockTitleEL,
      // An identifier the block. For example, in TekTrain, the "movement"
      // Block has type of "move".
      type: this.props.type,
      // The category to witch the block belongs to.
      category: this.props.category,
      // An object to manage the component's dynamic styling
      style: {
        // The color of the block's upper body.
        backroundColor: this.props.backroundColor,
        // The backround color of the block's title.
        titleBackroundColor: this.props.titleBackroundColor,
      },
      // Block Image
      blockImage: this.props.blockImage,
      // Whether the block has a popover or not.
      hasPopover: this.props.hasPopover,
      // The icon of the button that makes the popover appear.
      popoverIcon: this.props.popoverIcon,
      // The Help Text of the button that makes the popover appear.
      popoverHelpTextEL: this.props.popoverHelpTextEL,
      popoverHelpTextEN: this.props.popoverHelpTextEN,
      // A boolean variable to keep track of whether the edit panel is
      // open or not
      editPanelOpen: false,
      // A boolean variable to keep track of whether the settinngs Popover is
      // open or not
      settingsPopoverOpen: true,
    };

    // BINDING
    this.toggleEditPanel = this.toggleEditPanel.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.renderInputBlocks = this.renderInputBlocks.bind(this);
    this.toggleSettingsPopover = this.toggleSettingsPopover.bind(this);
    this.handleBadgeContent = this.handleBadgeContent.bind(this);
    this.handleBadgeColor = this.handleBadgeColor.bind(this);
  }
  /** A method that manages the visibility of the settings popover of the block.*/
  toggleSettingsPopover() {
    this.setState((currState) => ({
      settingsPopoverOpen: !currState.settingsPopoverOpen,
    }));
  }

  componentDidUpdate(prevProps) {
    /**
     * Check whether the Component's props were updated, and if they did,
     * set the component's state accordingly
     */
    if (
      prevProps.blockTitleEN !== this.props.blockTitleEN ||
      prevProps.blockNameEN !== this.props.blockNameEN ||
      prevProps.blockNameEL !== this.props.blockNameEL ||
      prevProps.blockTitleEL !== this.props.blockTitleEL ||
      prevProps.category !== this.props.category ||
      prevProps.backroundColor !== this.props.backroundColor ||
      prevProps.titleBackroundColor !== this.props.titleBackroundColor ||
      prevProps.blockImage !== this.props.blockImage ||
      prevProps.hasPopover !== this.props.hasPopover ||
      prevProps.popoverIcon !== this.props.popoverIcon ||
      prevProps.popoverHelpTextEL !== this.props.popoverHelpTextEL ||
      prevProps.popoverHelpTextEN !== this.props.popoverHelpTextEN
    ) {
      this.setState({
        blockTitleEN: this.props.blockTitleEN,
        blockTitleEL: this.props.blockTitleEL,
        blockNameEN: this.props.blockNameEN,
        blockNameEL: this.props.blockNameEL,
        type: this.props.type,
        category: this.props.category,
        style: {
          backroundColor: this.props.backroundColor,
          titleBackroundColor: this.props.titleBackroundColor,
        },
        blockImage: this.props.blockImage,
        hasPopover: this.props.hasPopover,
        popoverIcon: this.props.popoverIcon,
        popoverHelpTextEL: this.props.popoverHelpTextEL,
        popoverHelpTextEN: this.props.popoverHelpTextEN,
      });
    }
  }

  /**
   * A method that uses the "hasInput" prop, whitch is an array of objects,
   * to produce the JSX elements required in order to represent all the
   * block's Input Blocks.
   */
  renderInputBlocks() {
    return this.props.hasInput.map((val, idx) => {
      switch (val.type) {
        case "text-input-block":
          return (
            <TextInputBlock
              mode="action"
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
              mode="action"
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
              mode="action"
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
              mode="action"
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

  /** Toogles the visibility of the block options Panel, by changing the
   * "editPanelOpen" state variable.*/
  toggleEditPanel(visible) {
    this.setState({ editPanelOpen: visible });
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
      "action",
      result.source.index,
      result.destination.index
    );
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
      if (this.state.hasPopover === false) {
        if (
          // this.state.type === null ||
          // this.state.type === undefined ||
          this.state.category === null ||
          this.state.category === undefined ||
          this.state.style.backroundColor === null ||
          this.state.style.backroundColor === undefined ||
          this.state.blockTitleEL === null ||
          this.state.blockTitleEL === undefined ||
          this.state.blockTitleEL === "" ||
          this.state.blockNameEN === null ||
          this.state.blockNameEN === undefined ||
          this.state.blockNameEN === "" ||
          this.state.blockNameEL === null ||
          this.state.blockNameEL === undefined ||
          this.state.blockNameEL === "" ||
          this.state.blockTitleEN === null ||
          this.state.blockTitleEN === undefined ||
          this.state.blockTitleEN === "" ||
          this.state.blockImage === null ||
          this.state.blockImage === undefined ||
          this.state.hasPopover === null ||
          this.state.hasPopover === undefined
        ) {
          return "";
        } else {
          return 0;
        }
      } else if (this.state.hasPopover === true) {
        if (
          // this.state.type === null ||
          // this.state.type === undefined ||
          this.state.category === null ||
          this.state.category === undefined ||
          this.state.style.backroundColor === null ||
          this.state.style.backroundColor === undefined ||
          this.state.blockTitleEL === null ||
          this.state.blockTitleEL === undefined ||
          this.state.blockTitleEN === null ||
          this.state.blockTitleEN === undefined ||
          this.state.blockNameEN === null ||
          this.state.blockNameEN === undefined ||
          this.state.blockNameEN === "" ||
          this.state.blockNameEL === null ||
          this.state.blockNameEL === undefined ||
          this.state.blockNameEL === "" ||
          this.state.blockImage === null ||
          this.state.blockImage === undefined ||
          this.state.hasPopover === null ||
          this.state.hasPopover === undefined ||
          this.state.popoverIcon === null ||
          this.state.popoverIcon === undefined
        ) {
          return "";
        } else {
          return 0;
        }
      }
    } else {
      return "";
    }
  }

  /**A method  that manages the content i.e. the visibility of the block's settings
   * popover badge. If the popover has an error, the badge is visible. If at least one
   * of the popover's required attributes in not filled out, the badge is visible.
   * If the Popover contains a form, and that form either has an error, or at least one
   * of the forms's required attributes in not filled out, the badge is visble. Otheriwse
   * the bagde does not appear.
   */
  handleSettingsBadgeContent() {
    if (
      this.props.hasSettingsPopover === undefined ||
      this.props.hasSettingsPopover === null ||
      (Object.keys(this.props.hasSettingsPopover).length === 0 &&
        this.props.hasSettingsPopover.constructor === Object)
    ) {
      return 0;
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

  /**A method  that manages the color of the badge that appears on the top-right
   * of the block's settings popover. If the popover has an error, the method
   * returns the keyword "error". if the popover contains a form, and that form
   * has an error,returns the keyword "error". Otherwise, returns the keyword "primary"
   * */
  handleSettingsBadgeColor() {
    if (
      this.props.hasSettingsPopover === undefined ||
      this.props.hasSettingsPopover === null ||
      (Object.keys(this.props.hasSettingsPopover).length === 0 &&
        this.props.hasSettingsPopover.constructor === Object)
    ) {
      return "primary";
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

  displayInfoErrors() {
    if (
      !(
        this.props.errors === null ||
        this.props.errors === undefined ||
        (Object.keys(this.props.errors).length === 0 &&
          this.props.errors.constructor === Object)
      )
    ) {
      if (
        !(
          this.props.errors.hasInfo === null ||
          this.props.errors.hasInfo === undefined ||
          (Object.keys(this.props.errors.hasInfo).length === 0 &&
            this.props.errors.hasInfo.constructor === Object)
        )
      ) {
        return (
          <Tooltip
            arrow
            title={
              this.props.language === "EL"
                ? this.props.errors.hasInfo.EL
                : this.props.errors.hasInfo.EN
            }
          >
            {/* <Avatar style={{ marginLeft: 10 }}>
                  <PhotoIcon />
                </Avatar> */}
            <div className="info-error"></div>
          </Tooltip>
        );
      }
    }
    return null;
  }

  render() {
    return (
      <Badge
        badgeContent={this.handleBadgeContent()}
        color={this.handleBadgeColor()}
      >
        <div className="ActionBlock dark-shadow">
          <div
            className="block-icons"
            style={{ backgroundColor: this.state.style.backroundColor }}
          >
            {this.state.blockImage === null ||
            this.state.blockImage === undefined ? (
              <Tooltip
                arrow
                title={
                  this.props.language === "EL"
                    ? "Δεν Υπάρχει Eικόνα Μπλόκ..."
                    : "No Block Image..."
                }
              >
                <Avatar style={{ marginLeft: 10 }}>
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
                  src={URL.createObjectURL(this.state.blockImage)}
                  style={{ cursor: this.state.iconCursor, marginLeft: 5 }}
                  onClick={this.openEditPanel}
                />
              </Tooltip>
            )}
            {this.props.hasInfo === null ||
            this.props.hasInfo === undefined ? null : (
              <Information
                language={this.props.language}
                cursor={this.props.hasInfo.cursor}
                informationTextEL={this.props.hasInfo.informationTextEL}
                informationTextEN={this.props.hasInfo.informationTextEN}
                errors={this.props.hasInfo.errors}
                setInformation={this.props.setInformation}
                deleteInformation={this.props.deleteInformation}
              />
            )}
            {this.displayInfoErrors()}
          </div>
          <div
            className="block-label justify-align-center"
            style={{
              backgroundColor: this.state.style.titleBackroundColor,
              color: computeFontColor(this.state.style.titleBackroundColor),
            }}
          >
            {this.props.language === "EL"
              ? this.state.blockTitleEL
              : this.state.blockTitleEN}
          </div>
          <div className="block-content justify-align-center">
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable
                droppableId={"action-block-dnd-content"}
                direction="horizontal"
              >
                {(provided) => {
                  return (
                    <div
                      className="content"
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
            {this.state.hasPopover ? (
              <div className="popover">
                <Badge
                  badgeContent={this.handleSettingsBadgeContent()}
                  color={this.handleSettingsBadgeColor()}
                  variant="dot"
                >
                  {this.state.popoverHelpTextEL === null ||
                  this.state.popoverHelpTextEL === undefined ||
                  this.state.popoverHelpTextEL === "" ||
                  this.state.popoverHelpTextEN === null ||
                  this.state.popoverHelpTextEN === undefined ||
                  this.state.popoverHelpTextEN === "" ? (
                    this.state.popoverIcon === null ||
                    this.state.popoverIcon === undefined ? (
                      <IconButton
                        className="popover-icon"
                        onClick={this.toggleSettingsPopover}
                      >
                        <FilterFramesIcon style={{ width: 20, height: 20 }} />
                      </IconButton>
                    ) : (
                      <Avatar
                        src={URL.createObjectURL(this.state.popoverIcon)}
                        onClick={this.toggleSettingsPopover}
                      />
                      // <img
                      //   src={this.state.popoverIcon}
                      //   onClick={this.toggleSettingsPopover}
                      //   className="popover-icon"
                      //   alt="..."
                      // />
                    )
                  ) : (
                    <Tooltip
                      arrow
                      title={
                        this.props.language === "EL"
                          ? this.state.popoverHelpTextEL
                          : this.state.popoverHelpTextEN
                      }
                    >
                      {this.state.popoverIcon === null ||
                      this.state.popoverIcon === undefined ? (
                        <IconButton
                          className="popover-icon"
                          onClick={this.toggleSettingsPopover}
                        >
                          <FilterFramesIcon />
                        </IconButton>
                      ) : (
                        // <img
                        //   src={this.state.popoverIcon}
                        //   onClick={this.toggleSettingsPopover}
                        //   className="popover-image"
                        //   alt="..."
                        // />
                        <Avatar
                          src={URL.createObjectURL(this.state.popoverIcon)}
                          onClick={this.toggleSettingsPopover}
                        />
                      )}
                    </Tooltip>
                  )}
                </Badge>
                {this.props.hasSettingsPopover === undefined ||
                this.props.hasSettingsPopover === null ||
                (Object.keys(this.props.hasSettingsPopover).length === 0 &&
                  this.props.hasSettingsPopover.constructor ===
                    Object) ? null : this.state.settingsPopoverOpen ? (
                  <SettingsPopover
                    ref={this.settingsPopoverRef}
                    mode={"action"}
                    language={this.props.language}
                    toggleSettingsPopover={this.toggleSettingsPopover}
                    setSettingsPopover={this.props.setSettingsPopover}
                    setLabeledTextInputForm={this.props.setLabeledTextInputForm}
                    setLabeledIntegerInputForm={
                      this.props.setLabeledIntegerInputForm
                    }
                    setLabeledFloatInputForm={
                      this.props.setLabeledFloatInputForm
                    }
                    setParameterInputForm={this.props.setParameterInputForm}
                    setConditionInputForm={this.props.setConditionInputForm}
                    setPhrasesInputForm={this.props.setPhrasesInputForm}
                    deleteSettingsPopoverForm={
                      this.props.deleteSettingsPopoverForm
                    }
                    deleteSettingsPopover={this.props.deleteSettingsPopover}
                    {...this.props.hasSettingsPopover}
                  />
                ) : null}
              </div>
            ) : null}
          </div>
          <div className="block-control">
            <ButtonGroup
              orientation="vertical"
              aria-label="vertical outlined primary button group"
            >
              <Tooltip
                title={
                  this.props.language === "EL"
                    ? "Επεξεργασία Μπλοκ"
                    : "Edit Block"
                }
              >
                <IconButton
                  onClick={() => {
                    this.toggleEditPanel(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={
                  this.props.language === "EL"
                    ? "Διαγραφή Μπλοκ"
                    : "Delete Block"
                }
              >
                <IconButton onClick={this.props.deleteBlock}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ButtonGroup>
          </div>
          {this.state.editPanelOpen ? (
            <Overlay
              mode={"action-block"}
              titleEL={"Επιλογές Μπλοκ Δράσης"}
              titleEN={"Action Block Options"}
              open={this.state.editPanelOpen}
              language={this.props.language}
              blockNameEN={this.state.blockNameEN}
              blockNameEL={this.state.blockNameEL}
              blockTitleEN={this.state.blockTitleEN}
              blockTitleEL={this.state.blockTitleEL}
              type={this.state.type}
              category={this.state.category}
              backroundColor={this.state.style.backroundColor}
              titleBackroundColor={this.state.style.titleBackroundColor}
              blockImage={this.state.blockImage}
              hasPopover={this.state.hasPopover}
              popoverIcon={this.state.popoverIcon}
              popoverHelpTextEL={this.state.popoverHelpTextEL}
              popoverHelpTextEN={this.state.popoverHelpTextEN}
              errors={this.props.errors}
              toggleEditPanel={this.toggleEditPanel}
              setActionBlock={this.props.setActionBlock}
            />
          ) : null}
        </div>
      </Badge>
    );
  }
}

export default ActionBlock;
