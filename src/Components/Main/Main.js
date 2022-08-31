import React from "react";
import ReactDOM from "react-dom";
import { withSnackbar } from "notistack";

import "./Main.css";

import ActionBlock from "../ActionBlock/ActionBlock";
import ReferenceBlock from "../ReferenceBlock/ReferenceBlock";
import DecisionBlock from "../DecisionBlock/DecisionBlock";

import { reorderArray } from "../../Utils/arrayHelpers";

import {
  actionBlock,
  referenceBlock,
  decisionBlock,
  selectInputBlock,
  textInputBlock,
  integerInputBlock,
  floatInputBlock,
  information,
  configurationPopover,
  settingsPopover,
  phrasesInputForm,
  labeledTextInputForm,
  labeledIntegerInputForm,
  labeledFloatInputForm,
  parameterInputForm,
  conditionInputForm,
} from "../../Utils/ComponentInitialData";

class Main extends React.Component {
  constructor(props) {
    super(props);

    // a reference to the action block
    this.actionBlockRef = React.createRef();
    // a reference to the reference block
    this.referenceBlockRef = React.createRef();
    // a reference to the decision block
    this.decisionBlockRef = React.createRef();

    this.state = {
      // All the information regarding the block model
      // are stored in this component's state.
      hasBlock: { blockType: "none" },
    };
    // BINDING
    this.setBlock = this.setBlock.bind(this);
    this.renderBlock = this.renderBlock.bind(this);
    this.deleteBlock = this.deleteBlock.bind(this);
    this.setInformation = this.setInformation.bind(this);
    this.deleteInformation = this.deleteInformation.bind(this);
    this.setActionBlock = this.setActionBlock.bind(this);
    this.setReferenceBlock = this.setReferenceBlock.bind(this);
    this.setDecisionBlock = this.setDecisionBlock.bind(this);
    this.setTextInputBlock = this.setTextInputBlock.bind(this);
    this.setIntegerInputBlock = this.setIntegerInputBlock.bind(this);
    this.setFloatInputBlock = this.setFloatInputBlock.bind(this);
    this.setSelectInputBlock = this.setSelectInputBlock.bind(this);
    this.deleteInputBlock = this.deleteInputBlock.bind(this);
    this.reorderInputBlocks = this.reorderInputBlocks.bind(this);
    this.addBranch = this.addBranch.bind(this);
    this.removeBranch = this.removeBranch.bind(this);
    this.setConfigurationPopover = this.setConfigurationPopover.bind(this);
    this.setSettingsPopover = this.setSettingsPopover.bind(this);
    this.setLabeledTextInputForm = this.setLabeledTextInputForm.bind(this);
    this.setLabeledIntegerInputForm =
      this.setLabeledIntegerInputForm.bind(this);
    this.setLabeledFloatInputForm = this.setLabeledFloatInputForm.bind(this);
    this.setParameterInputForm = this.setParameterInputForm.bind(this);
    this.setConditionInputForm = this.setConditionInputForm.bind(this);
    this.setPhrasesInputForm = this.setPhrasesInputForm.bind(this);
    this.deleteSettingsPopoverForm = this.deleteSettingsPopoverForm.bind(this);
    this.deleteSettingsPopover = this.deleteSettingsPopover.bind(this);
    this.deleteConfigurationPopover =
      this.deleteConfigurationPopover.bind(this);
    this.newBlockHandler = this.newBlockHandler.bind(this);
  }

  /**A setter for the information block. Sets the Component state accordingly
   * so that any changes to the information block are saved.
   */
  setInformation(textEL, textEN, cursor, errors) {
    this.setState((prevState) => {
      return {
        hasBlock: {
          ...prevState.hasBlock,
          hasInfo: {
            informationTextEL: textEL,
            informationTextEN: textEN,
            cursor: cursor,
            errors: errors,
          },
        },
      };
    });
    this.props.setValidated(false);
  }

  /**
   * A method that deletes the information block, by setting "hasInfo" state variable
   * to none.
   */
  deleteInformation() {
    this.setState((prevState) => {
      return {
        hasBlock: {
          ...prevState.hasBlock,
          hasInfo: null,
        },
      };
    });
    this.props.setValidated(false);
  }

  /**A method that deletes the block being edited from the palette. */
  deleteBlock() {
    this.setState({ hasBlock: { blockType: "none" } });
    this.props.setValidated(false);
  }

  setBlock(block) {
    this.setState({ hasBlock: block });
  }

  /**A setter for the action block. Sets the Component state accordingly
   * so that any changes to the action block are saved.
   */
  setActionBlock({
    blockTitleEN,
    blockTitleEL,
    type,
    blockNameEN,
    blockNameEL,
    category,
    backroundColor,
    titleBackroundColor,
    blockImage,
    hasPopover,
    popoverIcon,
    popoverHelpTextEL,
    popoverHelpTextEN,
    errors,
  } = {}) {
    // check of the input provided has any data regarding the block's popover.
    if (hasPopover) {
      // Data regarding the block's popover were provided. Check if the block
      // already has a popover.
      if (
        this.state.hasBlock.hasSettingsPopover === null ||
        this.state.hasBlock.hasSettingsPopover === undefined ||
        (Object.keys(this.state.hasBlock.hasSettingsPopover).length === 0 &&
          this.state.hasBlock.hasSettingsPopover.constructor === Object)
      ) {
        // the block does not have a popover. Use the data provided, to create
        // a popover, plus save any changes recorded to the block.
        this.setState((curState) => {
          return {
            hasBlock: {
              ...curState.hasBlock,
              blockNameEN: blockNameEN,
              blockNameEL: blockNameEL,
              blockTitleEN: blockTitleEN,
              blockTitleEL: blockTitleEL,
              type: type,
              category: category,
              backroundColor: backroundColor,
              titleBackroundColor: titleBackroundColor,
              blockImage: blockImage,
              hasPopover: hasPopover,
              popoverIcon: popoverIcon,
              popoverHelpTextEL: popoverHelpTextEL,
              popoverHelpTextEN: popoverHelpTextEN,
              hasSettingsPopover: settingsPopover,
              errors: errors,
            },
          };
        });
      } else {
        // the block already has a popover. Use the data provided, to edit
        // the popover, plus save any changes recorded to the block.
        this.setState((curState) => {
          return {
            hasBlock: {
              ...curState.hasBlock,
              blockNameEN: blockNameEN,
              blockNameEL: blockNameEL,
              blockTitleEN: blockTitleEN,
              blockTitleEL: blockTitleEL,
              type: type,
              category: category,
              backroundColor: backroundColor,
              titleBackroundColor: titleBackroundColor,
              blockImage: blockImage,
              hasPopover: hasPopover,
              popoverIcon: popoverIcon,
              popoverHelpTextEL: popoverHelpTextEL,
              popoverHelpTextEN: popoverHelpTextEN,
              hasSettingsPopover: curState.hasBlock.hasSettingsPopover,
              errors: errors,
            },
          };
        });
      }
    } else {
      // Data regarding the block's popover were NOT provided. Check if the block
      // already has a popover.
      if (
        this.state.hasBlock.hasSettingsPopover === null ||
        this.state.hasBlock.hasSettingsPopover === undefined ||
        (Object.keys(this.state.hasBlock.hasSettingsPopover).length === 0 &&
          this.state.hasBlock.hasSettingsPopover.constructor === Object)
      ) {
        // the block does not have a popover. Use the data provided, just to
        // save any changes recorded to the block.
        this.setState((curState) => {
          return {
            hasBlock: {
              ...curState.hasBlock,
              blockNameEN: blockNameEN,
              blockNameEL: blockNameEL,
              blockTitleEN: blockTitleEN,
              blockTitleEL: blockTitleEL,
              type: type,
              category: category,
              backroundColor: backroundColor,
              titleBackroundColor: titleBackroundColor,
              blockImage: blockImage,
              hasPopover: hasPopover,
              errors: errors,
            },
          };
        });
      } else {
        // the block already has a popover and no popover data were provided.
        // That means we want to delete the popover. Do so, by setting popover
        // related state variables to null.
        this.setState((curState) => {
          return {
            hasBlock: {
              ...curState.hasBlock,
              blockNameEN: blockNameEN,
              blockNameEL: blockNameEL,
              blockTitleEN: blockTitleEN,
              blockTitleEL: blockTitleEL,
              type: type,
              category: category,
              backroundColor: backroundColor,
              titleBackroundColor: titleBackroundColor,
              blockImage: blockImage,
              hasPopover: hasPopover,
              popoverIcon: null,
              popoverHelpTextEL: null,
              popoverHelpTextEN: null,
              hasSettingsPopover: null,
              errors: errors,
            },
          };
        });
      }
    }
    this.props.setValidated(false);
  }

  /**A setter for the reference block. Sets the Component state accordingly
   * so that any changes to the reference block are saved.
   */
  setReferenceBlock({
    blockNameEN,
    blockNameEL,
    blockTitleEN,
    blockTitleEL,
    type,
    category,
    backroundColor,
    blockImage,
    imageBackroundShape,
    imageBackroundShapeColor,
    hasNextBlock,
    imageCursor,
    errors,
  } = {}) {
    this.setState((curState) => {
      return {
        hasBlock: {
          ...curState.hasBlock,
          blockNameEN: blockNameEN,
          blockNameEL: blockNameEL,
          blockTitleEN: blockTitleEN,
          blockTitleEL: blockTitleEL,
          type: type,
          category: category,
          backroundColor: backroundColor,
          blockImage: blockImage,
          imageBackroundShape: imageBackroundShape,
          imageBackroundShapeColor: imageBackroundShapeColor,
          hasNextBlock: hasNextBlock,
          imageCursor: imageCursor,
          errors: errors,
        },
      };
    });
    this.props.setValidated(false);
  }

  /**A setter for the decision block. Sets the Component state accordingly
   * so that any changes to the decision block are saved.
   */
  setDecisionBlock({
    type,
    blockNameEN,
    blockNameEL,
    category,
    backroundColor,
    blockImage,
    numberOfBranches,
    numberOfColumns,
    blockImageCursor,
    errors,
  } = {}) {
    this.setState((curState) => {
      return {
        hasBlock: {
          ...curState.hasBlock,
          blockNameEN: blockNameEN,
          blockNameEL: blockNameEL,
          type: type,
          category: category,
          backroundColor: backroundColor,
          blockImage: blockImage,
          numberOfBranches: numberOfBranches,
          numberOfColumns: numberOfColumns,
          blockImageCursor: blockImageCursor,
          errors: errors,
        },
      };
    });
    this.props.setValidated(false);
  }

  /**A setter for the text input block. Sets the Component state accordingly
   * so that any changes to the text input block are saved. Since both the
   * action block and the configuration popover can contain a text input block
   * use the "mode" input variable to set the state properly
   */
  setTextInputBlock({
    mode,
    index,
    image,
    infoTextEL,
    infoTextEN,
    iconCursor,
    variableName,
    defaultValueEL,
    defaultValueEN,
    errors,
  } = {}) {
    if (mode === "action") {
      this.setState((curState) => {
        return {
          hasBlock: {
            ...curState.hasBlock,
            hasInput: [
              ...curState.hasBlock.hasInput.slice(0, index),
              {
                id: curState.hasBlock.hasInput[index].id,
                type: curState.hasBlock.hasInput[index].type,
                image: image,
                infoTextEL: infoTextEL,
                infoTextEN: infoTextEN,
                iconCursor: iconCursor,
                variableName: variableName,
                defaultValueEL: defaultValueEL,
                defaultValueEN: defaultValueEN,
                errors: errors,
              },
              ...curState.hasBlock.hasInput.slice(index + 1),
            ],
          },
        };
      });
    } else if (mode === "configuration") {
      this.setState((curState) => {
        return {
          hasBlock: {
            ...curState.hasBlock,
            hasConfigurationPopover: {
              ...curState.hasBlock.hasConfigurationPopover,
              hasInput: [
                ...curState.hasBlock.hasConfigurationPopover.hasInput.slice(
                  0,
                  index
                ),
                {
                  id: curState.hasBlock.hasConfigurationPopover.hasInput[index]
                    .id,
                  type: curState.hasBlock.hasConfigurationPopover.hasInput[
                    index
                  ].type,
                  image: image,
                  infoTextEL: infoTextEL,
                  infoTextEN: infoTextEN,
                  iconCursor: iconCursor,
                  variableName: variableName,
                  defaultValueEL: defaultValueEL,
                  defaultValueEN: defaultValueEN,
                  errors: errors,
                },
                ...curState.hasBlock.hasConfigurationPopover.hasInput.slice(
                  index + 1
                ),
              ],
            },
          },
        };
      });
    }
    this.props.setValidated(false);
  }

  /**A setter for the integer input block. Sets the Component state accordingly
   * so that any changes to the integer input block are saved. Since both the
   * action block and the configuration popover can contain a integer input block
   * use the "mode" input variable to set the state properly
   */
  setIntegerInputBlock({
    mode,
    index,
    image,
    infoTextEL,
    infoTextEN,
    iconCursor,
    variableName,
    minValue,
    maxValue,
    defaultValue,
    errors,
  } = {}) {
    if (mode === "action") {
      this.setState((curState) => {
        return {
          hasBlock: {
            ...curState.hasBlock,
            hasInput: [
              ...curState.hasBlock.hasInput.slice(0, index),
              {
                id: curState.hasBlock.hasInput[index].id,
                type: curState.hasBlock.hasInput[index].type,
                image: image,
                infoTextEL: infoTextEL,
                infoTextEN: infoTextEN,
                iconCursor: iconCursor,
                variableName: variableName,
                minValue,
                maxValue,
                defaultValue,
                errors: errors,
              },
              ...curState.hasBlock.hasInput.slice(index + 1),
            ],
          },
        };
      });
    } else if (mode === "configuration") {
      this.setState((curState) => {
        return {
          hasBlock: {
            ...curState.hasBlock,
            hasConfigurationPopover: {
              ...curState.hasBlock.hasConfigurationPopover,
              hasInput: [
                ...curState.hasBlock.hasConfigurationPopover.hasInput.slice(
                  0,
                  index
                ),
                {
                  id: curState.hasBlock.hasConfigurationPopover.hasInput[index]
                    .id,
                  type: curState.hasBlock.hasConfigurationPopover.hasInput[
                    index
                  ].type,
                  image: image,
                  infoTextEL: infoTextEL,
                  infoTextEN: infoTextEN,
                  iconCursor: iconCursor,
                  variableName: variableName,
                  minValue,
                  maxValue,
                  defaultValue,
                  errors: errors,
                },
                ...curState.hasBlock.hasConfigurationPopover.hasInput.slice(
                  index + 1
                ),
              ],
            },
          },
        };
      });
    }
    this.props.setValidated(false);
  }

  /**A setter for the float input block. Sets the Component state accordingly
   * so that any changes to the float input block are saved. Since both the
   * action block and the configuration popover can contain a float input block
   * use the "mode" input variable to set the state properly
   */
  setFloatInputBlock({
    mode,
    index,
    image,
    infoTextEL,
    infoTextEN,
    iconCursor,
    variableName,
    minValue,
    maxValue,
    defaultValue,
    errors,
  } = {}) {
    if (mode === "action") {
      this.setState((curState) => {
        return {
          hasBlock: {
            ...curState.hasBlock,
            hasInput: [
              ...curState.hasBlock.hasInput.slice(0, index),
              {
                id: curState.hasBlock.hasInput[index].id,
                type: curState.hasBlock.hasInput[index].type,
                image: image,
                infoTextEL: infoTextEL,
                infoTextEN: infoTextEN,
                iconCursor: iconCursor,
                variableName: variableName,
                minValue,
                maxValue,
                defaultValue,
                errors: errors,
              },
              ...curState.hasBlock.hasInput.slice(index + 1),
            ],
          },
        };
      });
    } else if (mode === "configuration") {
      this.setState((curState) => {
        return {
          hasBlock: {
            ...curState.hasBlock,
            hasConfigurationPopover: {
              ...curState.hasBlock.hasConfigurationPopover,
              hasInput: [
                ...curState.hasBlock.hasConfigurationPopover.hasInput.slice(
                  0,
                  index
                ),
                {
                  id: curState.hasBlock.hasConfigurationPopover.hasInput[index]
                    .id,
                  type: curState.hasBlock.hasConfigurationPopover.hasInput[
                    index
                  ].type,
                  image: image,
                  infoTextEL: infoTextEL,
                  infoTextEN: infoTextEN,
                  iconCursor: iconCursor,
                  variableName: variableName,
                  minValue,
                  maxValue,
                  defaultValue,
                  errors: errors,
                },
                ...curState.hasBlock.hasConfigurationPopover.hasInput.slice(
                  index + 1
                ),
              ],
            },
          },
        };
      });
    }
    this.props.setValidated(false);
  }

  /**A setter for the select input block. Sets the Component state accordingly
   * so that any changes to the select input block are saved. Since both the
   * action block and the configuration popover can contain a select input block
   * use the "mode" input variable to set the state properly. */
  setSelectInputBlock({
    mode,
    index,
    image,
    infoTextEL,
    infoTextEN,
    iconCursor,
    variableName,
    hasOptions,
    errors,
  } = {}) {
    if (mode === "action") {
      this.setState((curState) => {
        return {
          hasBlock: {
            ...curState.hasBlock,
            hasInput: [
              ...curState.hasBlock.hasInput.slice(0, index),
              {
                id: curState.hasBlock.hasInput[index].id,
                type: curState.hasBlock.hasInput[index].type,
                image: image,
                infoTextEL: infoTextEL,
                infoTextEN: infoTextEN,
                iconCursor: iconCursor,
                variableName: variableName,
                hasOptions: hasOptions,
                errors: errors,
              },
              ...curState.hasBlock.hasInput.slice(index + 1),
            ],
          },
        };
      });
    } else if (mode === "configuration") {
      this.setState((curState) => {
        return {
          hasBlock: {
            ...curState.hasBlock,
            hasConfigurationPopover: {
              ...curState.hasBlock.hasConfigurationPopover,
              hasInput: [
                ...curState.hasBlock.hasConfigurationPopover.hasInput.slice(
                  0,
                  index
                ),
                {
                  id: curState.hasBlock.hasConfigurationPopover.hasInput[index]
                    .id,
                  type: curState.hasBlock.hasConfigurationPopover.hasInput[
                    index
                  ].type,
                  image: image,
                  infoTextEL: infoTextEL,
                  infoTextEN: infoTextEN,
                  iconCursor: iconCursor,
                  variableName: variableName,
                  hasOptions: hasOptions,
                  errors: errors,
                },
                ...curState.hasBlock.hasConfigurationPopover.hasInput.slice(
                  index + 1
                ),
              ],
            },
          },
        };
      });
    }
    this.props.setValidated(false);
  }

  /**
   * A method that deletes an input block from either the action block or the
   * configuration popover. The input block to be deleted is identified by "index"
   * input. Mode defines whether the block to be deleted belongs to the action block
   * or to the configuration popover.
   */
  deleteInputBlock(mode, index) {
    if (mode === "action") {
      this.setState((curState) => {
        return {
          hasBlock: {
            ...curState.hasBlock,
            hasInput: [
              ...curState.hasBlock.hasInput.slice(0, index),
              ...curState.hasBlock.hasInput.slice(index + 1),
            ],
          },
        };
      });
    } else if (mode === "configuration") {
      this.setState((curState) => {
        return {
          hasBlock: {
            ...curState.hasBlock,
            hasConfigurationPopover: {
              ...curState.hasBlock.hasConfigurationPopover,
              hasInput: [
                ...curState.hasBlock.hasConfigurationPopover.hasInput.slice(
                  0,
                  index
                ),
                ...curState.hasBlock.hasConfigurationPopover.hasInput.slice(
                  index + 1
                ),
              ],
            },
          },
        };
      });
    }
    this.props.setValidated(false);
  }

  /**
   * A method that reorders the input blocks of either the configuration popover,
   * or the action block. Specifically, reorders the array of inputs so that the
   * input with index sourceIdx moves to the position with index destinationIdx.
   */
  reorderInputBlocks(mode, sourceIdx, destinationIdx) {
    if (mode === "action") {
      let { hasInput } = this.state.hasBlock;

      hasInput = reorderArray(hasInput, sourceIdx, destinationIdx);

      this.setState((currentState) => {
        return {
          hasBlock: {
            ...currentState.hasBlock,
            hasInput: hasInput,
          },
        };
      });
    } else if (mode === "configuration") {
      let { hasInput } = this.state.hasBlock.hasConfigurationPopover;

      hasInput = reorderArray(hasInput, sourceIdx, destinationIdx);

      this.setState((currentState) => {
        return {
          hasBlock: {
            ...currentState.hasBlock,
            hasConfigurationPopover: {
              ...currentState.hasBlock.hasConfigurationPopover,
              hasInput,
            },
          },
        };
      });
    }
    this.props.setValidated(false);
  }

  /**Adds a new inner branch the the decision block */
  addBranch() {
    if (this.state.hasBlock.numberOfBranches < 5) {
      this.setState((currentState) => ({
        hasBlock: {
          ...currentState.hasBlock,
          numberOfBranches: currentState.hasBlock.numberOfBranches + 1,
        },
      }));
    }
    this.props.setValidated(false);
  }

  /**Removes a branch from the decision block. */
  removeBranch() {
    if (this.state.hasBlock.numberOfBranches <= 1) {
      this.deleteBlock();
    } else {
      this.setState((currentState) => ({
        hasBlock: {
          ...currentState.hasBlock,
          numberOfBranches: currentState.hasBlock.numberOfBranches - 1,
        },
      }));
    }
    this.props.setValidated(false);
  }

  /**A setter for the configuration popover. Sets the Component state accordingly
   * so that any changes to the configuration popover are saved.*/
  setConfigurationPopover(popoverTitleEL, popoverTitleEN, errors) {
    this.setState((currentState) => ({
      hasBlock: {
        ...currentState.hasBlock,
        hasConfigurationPopover: {
          ...currentState.hasBlock.hasConfigurationPopover,
          popoverTitleEL: popoverTitleEL,
          popoverTitleEN: popoverTitleEN,
          errors: errors,
        },
      },
    }));
    this.props.setValidated(false);
  }

  /**A setter for the settings popover. Sets the Component state accordingly
   * so that any changes to the settings popover are saved.*/
  setSettingsPopover(popoverTitleEL, popoverTitleEN, errors) {
    this.setState((currentState) => ({
      hasBlock: {
        ...currentState.hasBlock,
        hasSettingsPopover: {
          ...currentState.hasBlock.hasSettingsPopover,
          popoverTitleEL: popoverTitleEL,
          popoverTitleEN: popoverTitleEN,
          errors: errors,
        },
      },
    }));
    this.props.setValidated(false);
  }

  /**A setter for the labeled text input form. Sets the Component state
   * accordingly so that any changes to the labeled text input form are saved.*/
  setLabeledTextInputForm({
    variableLabelEL,
    variableLabelEN,
    defaultValueEL,
    defaultValueEN,
    errors,
  } = {}) {
    this.setState((currentState) => ({
      hasBlock: {
        ...currentState.hasBlock,
        hasSettingsPopover: {
          ...currentState.hasBlock.hasSettingsPopover,
          hasForm: {
            type: currentState.hasBlock.hasSettingsPopover.hasForm.type,
            variableLabelEL: variableLabelEL,
            variableLabelEN: variableLabelEN,
            defaultValueEL: defaultValueEL,
            defaultValueEN: defaultValueEN,
            errors: errors,
          },
        },
      },
    }));
    this.props.setValidated(false);
  }

  /**A setter for the labeled integer input form. Sets the Component state
   * accordingly so that any changes to the labeled integer input form are saved.*/
  setLabeledIntegerInputForm({
    variableLabelEL,
    variableLabelEN,
    minValue,
    maxValue,
    defaultValue,
    errors,
  } = {}) {
    this.setState((currentState) => ({
      hasBlock: {
        ...currentState.hasBlock,
        hasSettingsPopover: {
          ...currentState.hasBlock.hasSettingsPopover,
          hasForm: {
            type: currentState.hasBlock.hasSettingsPopover.hasForm.type,
            variableLabelEL: variableLabelEL,
            variableLabelEN: variableLabelEN,
            minValue: minValue,
            maxValue: maxValue,
            defaultValue: defaultValue,
            errors: errors,
          },
        },
      },
    }));
    this.props.setValidated(false);
  }

  /**A setter for the labeled float input form. Sets the Component state
   * accordingly so that any changes to the labeled float input form are saved.*/
  setLabeledFloatInputForm({
    variableLabelEL,
    variableLabelEN,
    minValue,
    maxValue,
    defaultValue,
    errors,
  } = {}) {
    this.setState((currentState) => ({
      hasBlock: {
        ...currentState.hasBlock,
        hasSettingsPopover: {
          ...currentState.hasBlock.hasSettingsPopover,
          hasForm: {
            type: currentState.hasBlock.hasSettingsPopover.hasForm.type,
            variableLabelEL: variableLabelEL,
            variableLabelEN: variableLabelEN,
            minValue: minValue,
            maxValue: maxValue,
            defaultValue: defaultValue,
            errors: errors,
          },
        },
      },
    }));
    this.props.setValidated(false);
  }

  /**A setter for the parameter input form. Sets the Component state
   * accordingly so that any changes to the parameter input form are saved.*/
  setParameterInputForm({
    defaultValueEL,
    defaultValueEN,
    hasOptions,
    errors,
  } = {}) {
    this.setState((currentState) => ({
      hasBlock: {
        ...currentState.hasBlock,
        hasSettingsPopover: {
          ...currentState.hasBlock.hasSettingsPopover,
          hasForm: {
            type: currentState.hasBlock.hasSettingsPopover.hasForm.type,
            defaultValueEL: defaultValueEL,
            defaultValueEN: defaultValueEN,
            hasOptions: hasOptions,
            errors: errors,
          },
        },
      },
    }));
    this.props.setValidated(false);
  }

  /**A setter for the condition input form. Sets the Component state
   * accordingly so that any changes to the condition input form are saved.*/
  setConditionInputForm(options, errors) {
    this.setState((currentState) => {
      return {
        hasBlock: {
          ...currentState.hasBlock,
          hasSettingsPopover: {
            ...currentState.hasBlock.hasSettingsPopover,
            hasForm: {
              type: currentState.hasBlock.hasSettingsPopover.hasForm.type,
              hasOptions: options,
              errors,
            },
          },
        },
      };
    });
    this.props.setValidated(false);
  }

  /**A setter for the phrases input form. Sets the Component state
   * accordingly so that any changes to the phrases input form are saved.*/
  setPhrasesInputForm(placeEL, placeEN, errors) {
    this.setState((currentState) => {
      return {
        hasBlock: {
          ...currentState.hasBlock,
          hasSettingsPopover: {
            ...currentState.hasBlock.hasSettingsPopover,
            hasForm: {
              type: currentState.hasBlock.hasSettingsPopover.hasForm.type,
              placeholderEL: placeEL,
              placeholderEN: placeEN,
              errors,
            },
          },
        },
      };
    });
    this.props.setValidated(false);
  }

  /**A method tha deletes any form that the settings popover may contain. It does
   * so by, setting the form type of the popover to "none"
   */
  deleteSettingsPopoverForm() {
    this.setState((currentState) => {
      return {
        hasBlock: {
          ...currentState.hasBlock,
          hasSettingsPopover: {
            ...currentState.hasBlock.hasSettingsPopover,
            hasForm: {
              type: "none",
            },
          },
        },
      };
    });
    this.props.setValidated(false);
  }

  /**A method that deletes the settings popover from either the decision block or
   * the action block. It does so, by setting the appropriate variables of the current
   * component to null
   */
  deleteSettingsPopover(mode) {
    if (mode === "action") {
      this.setState((currentState) => {
        return {
          hasBlock: {
            ...currentState.hasBlock,
            hasSettingsPopover: null,
            hasPopover: false,
            popoverHelpTextEL: null,
            popoverHelpTextEN: null,
            popoverIcon: null,
          },
        };
      });
    } else if (mode === "decision") {
      this.setState((currentState) => {
        return {
          hasBlock: {
            ...currentState.hasBlock,
            hasSettingsPopover: null,
          },
        };
      });
    }
    this.props.setValidated(false);
  }

  /**A method that deletes the settings popover from either the decision block or
   * the action block. It does so, by setting the appropriate variables of the current
   * component to null
   */
  deleteConfigurationPopover() {
    this.setState((currentState) => {
      return {
        hasBlock: {
          ...currentState.hasBlock,
          hasConfigurationPopover: null,
        },
      };
    });
    this.props.setValidated(false);
  }

  /**
   * The main function of the component. Handles all the drag and drop events form the
   * minibar to the "Main" component(App palette).
   *
   * Type: The component type that was dropped.
   *
   * position: The position that the new component was dropped.
   *
   * minibar: the coordinates of the app's minibar.
   */
  newBlockHandler(type, position, minibar) {
    let message = "";

    // Check the type of the component dropped.
    switch (type) {
      case "action-block":
        // An action block was dropped. Make sure that the block was
        // dropped inside the main Component
        if (position.y > minibar.bottom) {
          // Check if a block is already in the design palette.
          // If so, display an error message and return, otherwise
          // set the component's state with the action block initial
          // data.
          if (
            this.state.hasBlock.blockType === "none" ||
            this.state.hasBlock.blockType === null ||
            this.state.hasBlock.blockType === undefined ||
            (Object.keys(this.state.hasBlock).length === 0 &&
              this.state.hasBlock.constructor === Object)
          ) {
            this.setState({ hasBlock: actionBlock });
            break;
          } else {
            message =
              this.props.language === "EL"
                ? "Υπάρχει Ήδη Μπλοκ στην Παλέτα Σχεδίασης."
                : "Design Panel Already Has a Block";
            this.props.enqueueSnackbar(message, { variant: "error" });
            break;
          }
        }
        break;

      case "reference-block":
        // A reference block was dropped. Make sure that the block was
        // dropped inside the main Component
        if (position.y > minibar.bottom) {
          // Check if a block is already in the design palette.
          // If so, display an error message and return, otherwise
          // set the component's state with the reference block initial
          // data.
          if (
            this.state.hasBlock.blockType === "none" ||
            this.state.hasBlock.blockType === null ||
            this.state.hasBlock.blockType === undefined ||
            (Object.keys(this.state.hasBlock).length === 0 &&
              this.state.hasBlock.constructor === Object)
          ) {
            this.setState({ hasBlock: referenceBlock });
            break;
          } else {
            message =
              this.props.language === "EL"
                ? "Υπάρχει Ήδη Μπλοκ στην Παλέτα Σχεδίασης."
                : "Design Panel Already Has a Block";
            this.props.enqueueSnackbar(message, { variant: "error" });
            break;
          }
        }
        break;

      case "decision-block":
        // A decision block was dropped. Make sure that the block was
        // dropped inside the main Component
        if (position.y > minibar.bottom) {
          // Check if a block is already in the design palette.
          // If so, display an error message and return, otherwise
          // set the component's state with the decision block initial
          // data.
          if (
            this.state.hasBlock.blockType === "none" ||
            this.state.hasBlock.blockType === null ||
            this.state.hasBlock.blockType === undefined ||
            (Object.keys(this.state.hasBlock).length === 0 &&
              this.state.hasBlock.constructor === Object)
          ) {
            this.setState({ hasBlock: decisionBlock });
            break;
          } else {
            message =
              this.props.language === "EL"
                ? "Υπάρχει Ήδη Μπλοκ στην Παλέτα Σχεδίασης."
                : "Design Panel Already Has a Block";
            this.props.enqueueSnackbar(message, { variant: "error" });
            break;
          }
        }
        break;

      case "select-input-block":
        // An action block's select input block was dropped. Check if the palette
        // has a block an if not return.
        if (this.state.hasBlock.blockType === "none") {
          // TO BE REVIEWED
          return;
        }

        if (this.state.hasBlock.blockType !== "action-block") {
          // The palette has a block, but it is not an action block.
          // Display an error message, and return.
          message =
            this.props.language === "EL"
              ? "Τα Στοιχεία Εισόδου Μπορούν να Τοποθετηθούν μόνο σε Μπλοκ Δράσης."
              : "Input Components can Only be Placed on Action Blocks";
          this.props.enqueueSnackbar(message, { variant: "error" });
          break;
        } else {
          // the palette has an action block. Make sure that the new block was dropped
          // inside the action block. If so, set the state to include the new input to
          // the block input. otherwise return.
          const actionBlockRect = ReactDOM.findDOMNode(
            this.actionBlockRef.current
          ).getBoundingClientRect();
          if (
            position.x >= actionBlockRect.left &&
            position.x <= actionBlockRect.right &&
            position.y >= actionBlockRect.top &&
            position.y <= actionBlockRect.bottom
          ) {
            if (
              this.state.hasBlock.hasInput === undefined &&
              this.state.hasBlock.hasInput === null &&
              this.state.hasBlock.hasInput.length === 0
            ) {
              this.setState((currentState) => {
                return {
                  hasBlock: {
                    ...currentState.hasBlock,
                    hasInput: [selectInputBlock],
                  },
                };
              });
              return;
            } else {
              this.setState((currentState) => {
                return {
                  hasBlock: {
                    ...currentState.hasBlock,
                    hasInput: [
                      ...currentState.hasBlock.hasInput,
                      selectInputBlock,
                    ],
                  },
                };
              });
              return;
            }
          }
        }

        break;

      case "text-input-block":
        // An action block's text input block was dropped. Check if the palette
        // has a block an if not return.
        if (this.state.hasBlock.blockType === "none") {
          // TO BE REVIEWED
          return;
        }

        if (this.state.hasBlock.blockType !== "action-block") {
          // The palette has a block, but it is not an action block.
          // Display an error message, and return.
          message =
            this.props.language === "EL"
              ? "Τα Στοιχεία Εισόδου Μπορούν να Τοποθετηθούν μόνο σε Μπλοκ Δράσης."
              : "Input Components can Only be Placed on Action Blocks";
          this.props.enqueueSnackbar(message, { variant: "error" });
          break;
        } else {
          // the palette has an action block. Make sure that the new block was dropped
          // inside the action block. If so, set the state to include the new input to
          // the block input. otherwise return.
          const actionBlockRect = ReactDOM.findDOMNode(
            this.actionBlockRef.current
          ).getBoundingClientRect();
          if (
            position.x >= actionBlockRect.left &&
            position.x <= actionBlockRect.right &&
            position.y >= actionBlockRect.top &&
            position.y <= actionBlockRect.bottom
          ) {
            if (
              this.state.hasBlock.hasInput === undefined &&
              this.state.hasBlock.hasInput === null &&
              this.state.hasBlock.hasInput.length === 0
            ) {
              this.setState((currentState) => {
                return {
                  hasBlock: {
                    ...currentState.hasBlock,
                    hasInput: [textInputBlock],
                  },
                };
              });
              return;
            } else {
              this.setState((currentState) => {
                return {
                  hasBlock: {
                    ...currentState.hasBlock,
                    hasInput: [
                      ...currentState.hasBlock.hasInput,
                      textInputBlock,
                    ],
                  },
                };
              });
              return;
            }
          }
        }

        break;

      case "integer-input-block":
        // An action block's integer input block was dropped. Check if the palette
        // has a block an if not return.
        if (this.state.hasBlock.blockType === "none") {
          // TO BE REVIEWED
          return;
        }

        if (this.state.hasBlock.blockType !== "action-block") {
          // The palette has a block, but it is not an action block.
          // Display an error message, and return.
          message =
            this.props.language === "EL"
              ? "Τα Στοιχεία Εισόδου Μπορούν να Τοποθετηθούν μόνο σε Μπλοκ Δράσης."
              : "Input Components can Only be Placed on Action Blocks";
          this.props.enqueueSnackbar(message, { variant: "error" });
          break;
        } else {
          // the palette has an action block. Make sure that the new block was dropped
          // inside the action block. If so, set the state to include the new input to
          // the block input. otherwise return.
          const actionBlockRect = ReactDOM.findDOMNode(
            this.actionBlockRef.current
          ).getBoundingClientRect();
          if (
            position.x >= actionBlockRect.left &&
            position.x <= actionBlockRect.right &&
            position.y >= actionBlockRect.top &&
            position.y <= actionBlockRect.bottom
          ) {
            if (
              this.state.hasBlock.hasInput === undefined &&
              this.state.hasBlock.hasInput === null &&
              this.state.hasBlock.hasInput.length === 0
            ) {
              this.setState((currentState) => {
                return {
                  hasBlock: {
                    ...currentState.hasBlock,
                    hasInput: [integerInputBlock],
                  },
                };
              });
              return;
            } else {
              this.setState((currentState) => {
                return {
                  hasBlock: {
                    ...currentState.hasBlock,
                    hasInput: [
                      ...currentState.hasBlock.hasInput,
                      integerInputBlock,
                    ],
                  },
                };
              });
              return;
            }
          }
        }
        break;

      case "float-input-block":
        // An action block's float input block was dropped. Check if the palette
        // has a block an if not return.
        if (this.state.hasBlock.blockType === "none") {
          // TO BE REVIEWED
          return;
        }

        if (this.state.hasBlock.blockType !== "action-block") {
          // The palette has a block, but it is not an action block.
          // Display an error message, and return.
          message =
            this.props.language === "EL"
              ? "Τα Στοιχεία Εισόδου Μπορούν να Τοποθετηθούν μόνο σε Μπλοκ Δράσης."
              : "Input Components can Only be Placed on Action Blocks";
          this.props.enqueueSnackbar(message, { variant: "error" });
          break;
        } else {
          // the palette has an action block. Make sure that the new block was dropped
          // inside the action block. If so, set the state to include the new input to
          // the block input. otherwise return.
          const actionBlockRect = ReactDOM.findDOMNode(
            this.actionBlockRef.current
          ).getBoundingClientRect();
          if (
            position.x >= actionBlockRect.left &&
            position.x <= actionBlockRect.right &&
            position.y >= actionBlockRect.top &&
            position.y <= actionBlockRect.bottom
          ) {
            if (
              this.state.hasBlock.hasInput === undefined &&
              this.state.hasBlock.hasInput === null &&
              this.state.hasBlock.hasInput.length === 0
            ) {
              this.setState((currentState) => {
                return {
                  hasBlock: {
                    ...currentState.hasBlock,
                    hasInput: [floatInputBlock],
                  },
                };
              });
              return;
            } else {
              this.setState((currentState) => {
                return {
                  hasBlock: {
                    ...currentState.hasBlock,
                    hasInput: [
                      ...currentState.hasBlock.hasInput,
                      floatInputBlock,
                    ],
                  },
                };
              });
              return;
            }
          }
        }
        break;

      case "information":
        // An information component was dropped. Check if the palette
        // has a block an if not return.
        if (this.state.hasBlock.blockType === "none") {
          // TO BE REVIEWED
          break;
        }
        if (this.state.hasBlock.blockType === "decision-block") {
          // if the block is a decision block, display an error message
          // and then return.
          message =
            this.props.language === "EL"
              ? "Το Στοιχείο Πληροφορίας Μπορεί να Τοποθετηθεί είτε σε Μπλοκ Δράσης, είτε σε Μπλοκ Αναφοράς."
              : "Information Component can Only be Placed either on Action Blocks or on Reference Blocks";
          this.props.enqueueSnackbar(message, { variant: "error" });
          break;
        }
        if (this.state.hasBlock.blockType === "action-block") {
          // the palette has an action block. Make sure that the new component was dropped
          // inside the action block. If so, set the state to include the new component
          // in the block's components. Otherwise, return.
          const actionBlockRect = ReactDOM.findDOMNode(
            this.actionBlockRef.current
          ).getBoundingClientRect();
          if (
            position.x >= actionBlockRect.left &&
            position.x <= actionBlockRect.right &&
            position.y >= actionBlockRect.top &&
            position.y <= actionBlockRect.bottom
          ) {
            if (
              this.state.hasBlock.hasInfo === null ||
              this.state.hasBlock.hasInfo === undefined ||
              (Object.keys(this.state.hasBlock.hasInfo).length === 0 &&
                this.state.hasBlock.hasInfo.constructor === Object)
            ) {
              this.setState((currentState) => {
                if (
                  currentState.hasBlock.errors === null ||
                  currentState.hasBlock.errors === undefined ||
                  (Object.keys(currentState.hasBlock.errors).length === 0 &&
                    currentState.hasBlock.errors.constructor === Object)
                ) {
                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasInfo: information,
                    },
                  };
                } else {
                  let er = {};
                  for (const e in currentState.hasBlock.errors) {
                    if (e !== "hasInfo") {
                      er[e] = currentState.hasBlock.errors[e];
                    }
                  }

                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasInfo: information,
                      errors: er,
                    },
                  };
                }
              });
            } else {
              message =
                this.props.language === "EL"
                  ? "Το Μπλοκ Έχει ήδη ένα Στοιχείο Πληροφορίας"
                  : "Block Already has an Information Component";
              this.props.enqueueSnackbar(message, { variant: "error" });
            }
          }
        }

        if (this.state.hasBlock.blockType === "reference-block") {
          // the palette has an reference block. Make sure that the new component was dropped
          // inside the action block. If so, set the state to include the new component
          // in the block's components. Otherwise, return.
          const referenceBlockRect = ReactDOM.findDOMNode(
            this.referenceBlockRef.current
          ).getBoundingClientRect();
          if (
            position.x >= referenceBlockRect.left &&
            position.x <= referenceBlockRect.right &&
            position.y >= referenceBlockRect.top &&
            position.y <= referenceBlockRect.bottom
          ) {
            if (
              this.state.hasBlock.hasInfo === null ||
              this.state.hasBlock.hasInfo === undefined ||
              (Object.keys(this.state.hasBlock.hasInfo).length === 0 &&
                this.state.hasBlock.hasInfo.constructor === Object)
            ) {
              this.setState((currentState) => {
                if (
                  currentState.hasBlock.errors === null ||
                  currentState.hasBlock.errors === undefined ||
                  (Object.keys(currentState.hasBlock.errors).length === 0 &&
                    currentState.hasBlock.errors.constructor === Object)
                ) {
                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasInfo: information,
                    },
                  };
                } else {
                  let er = {};
                  for (const e in currentState.hasBlock.errors) {
                    if (e !== "hasInfo") {
                      er[e] = currentState.hasBlock.errors[e];
                    }
                  }

                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasInfo: information,
                      errors: er,
                    },
                  };
                }
              });
            } else {
              message =
                this.props.language === "EL"
                  ? "Το Μπλοκ Έχει ήδη ένα Στοιχείο Πληροφορίας"
                  : "Block Already has an Information Component";
              this.props.enqueueSnackbar(message, { variant: "error" });
            }
          }
        }

        break;

      case "configuration-popover":
        // A configuration component was dropped.  Check if the palette
        // has a block an if not return.
        if (this.state.hasBlock.blockType === "none") {
          // TO BE REVIEWED
          return;
        }
        if (this.state.hasBlock.blockType !== "decision-block") {
          // the palette has a block, but it is not a decision block.
          // Display an error message, and return.
          message =
            this.props.language === "EL"
              ? "Το Παράθυρο Διαμόρφωσης Μπορεί να Τοποθετηθεί μόνο σε Μπλοκ Απόφασης."
              : "Configuration Popover can only be placed on Decision Blocks.";
          this.props.enqueueSnackbar(message, { variant: "error" });
          break;
        }

        // the palette has a decision block. Make sure that the new block was dropped
        // inside the decision block. If so, set the state to include the new popover to
        // the block's components. otherwise return.
        const decisionBlockRect = ReactDOM.findDOMNode(
          this.decisionBlockRef.current
        ).getBoundingClientRect();
        if (
          position.x >= decisionBlockRect.left &&
          position.x <= decisionBlockRect.right &&
          position.y >= decisionBlockRect.top &&
          position.y <= decisionBlockRect.bottom
        ) {
          if (
            this.state.hasBlock.hasConfigurationPopover === null ||
            this.state.hasBlock.hasConfigurationPopover === undefined ||
            (Object.keys(this.state.hasBlock.hasConfigurationPopover).length ===
              0 &&
              this.state.hasBlock.hasConfigurationPopover.constructor ===
                Object)
          ) {
            this.setState((currentState) => {
              return {
                hasBlock: {
                  ...currentState.hasBlock,
                  hasConfigurationPopover: configurationPopover,
                },
              };
            });
          } else {
            message =
              this.props.language === "EL"
                ? "Το Μπλοκ Έχει ήδη ένα Παράθυρο Διαμόρφωσης."
                : "Block Already has a Configuration Popover.";
            this.props.enqueueSnackbar(message, { variant: "error" });
          }
        }
        break;

      case "settings-popover":
        // A settings component was dropped.  Check if the palette
        // has a block an if not return.
        if (this.state.hasBlock.blockType === "none") {
          // TO BE REVIEWED
          return;
        }
        if (this.state.hasBlock.blockType === "reference-block") {
          // the palette has a block, but it is a reference block.
          // Display an error message, and return.
          message =
            this.props.language === "EL"
              ? "Το Παράθυρο Ρύθμισης Μπορεί να Τοποθετηθεί είτε σε Μπλοκ Δράσης, είτε σε Μπλοκ Απόφασης."
              : "Settings Popover can only be placed either on Action or Decision Blocks.";
          this.props.enqueueSnackbar(message, { variant: "error" });
          break;
        }

        if (this.state.hasBlock.blockType === "action-block") {
          // the palette has a action block. Make sure that the new block was dropped
          // inside the action block. If so, set the state to include the new popover to
          // the block's components. otherwise return.
          const actionBlockRect = ReactDOM.findDOMNode(
            this.actionBlockRef.current
          ).getBoundingClientRect();
          if (
            position.x >= actionBlockRect.left &&
            position.x <= actionBlockRect.right &&
            position.y >= actionBlockRect.top &&
            position.y <= actionBlockRect.bottom
          ) {
            if (
              this.state.hasBlock.hasSettingsPopover === null ||
              this.state.hasBlock.hasSettingsPopover === undefined ||
              (Object.keys(this.state.hasBlock.hasSettingsPopover).length ===
                0 &&
                this.state.hasBlock.hasSettingsPopover.constructor === Object)
            ) {
              this.setState((currentState) => {
                return {
                  hasBlock: {
                    ...currentState.hasBlock,
                    hasPopover: true,
                    hasSettingsPopover: settingsPopover,
                  },
                };
              });
              if (
                this.actionBlockRef.current.state.settingsPopoverOpen === false
              ) {
                this.actionBlockRef.current.toggleSettingsPopover();
              }
              break;
            } else {
              message =
                this.props.language === "EL"
                  ? "Το Μπλοκ Έχει ήδη ένα Παράθυρο Ρύθμισης."
                  : "Block Already has a Settings Popover.";
              this.props.enqueueSnackbar(message, { variant: "error" });
            }
          } else {
            break;
          }
        }

        if (this.state.hasBlock.blockType === "decision-block") {
          // the palette has a decision block. Make sure that the new block was dropped
          // inside the decision block. If so, set the state to include the new popover to
          // the block's components. otherwise return.
          const decisionBlockRect = ReactDOM.findDOMNode(
            this.decisionBlockRef.current
          ).getBoundingClientRect();
          if (
            position.x >= decisionBlockRect.left &&
            position.x <= decisionBlockRect.right &&
            position.y >= decisionBlockRect.top &&
            position.y <= decisionBlockRect.bottom
          ) {
            if (
              this.state.hasBlock.hasSettingsPopover === null ||
              this.state.hasBlock.hasSettingsPopover === undefined ||
              (Object.keys(this.state.hasBlock.hasSettingsPopover).length ===
                0 &&
                this.state.hasBlock.hasSettingsPopover.constructor === Object)
            ) {
              // this.setState((currentState) => {
              //   return {
              //     hasBlock: {
              //       ...currentState.hasBlock,
              //       hasSettingsPopover: settingsPopover,
              //     },
              //   };
              // });

              this.setState((currentState) => {
                if (
                  currentState.hasBlock.errors === null ||
                  currentState.hasBlock.errors === undefined ||
                  (Object.keys(currentState.hasBlock.errors).length === 0 &&
                    currentState.hasBlock.errors.constructor === Object)
                ) {
                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasSettingsPopover: settingsPopover,
                    },
                  };
                } else {
                  let er = {};
                  for (const e in currentState.hasBlock.errors) {
                    if (e !== "hasSettingsPopover") {
                      er[e] = currentState.hasBlock.errors[e];
                    }
                  }

                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasSettingsPopover: settingsPopover,
                      errors: er,
                    },
                  };
                }
              });
              break;
            } else {
              message =
                this.props.language === "EL"
                  ? "Το Μπλοκ Έχει ήδη ένα Παράθυρο Ρύθμισης."
                  : "Block Already has a Settings Popover.";
              this.props.enqueueSnackbar(message, { variant: "error" });
            }
          } else {
            break;
          }
        }
        break;

      case "configuration-select-input-block":
        // An configuration popovers's select input block was dropped. Check if
        // the palette has a block and if not return.
        if (this.state.hasBlock.blockType === "none") {
          // TO BE REVIEWED
          return;
        }
        if (this.state.hasBlock.blockType !== "decision-block") {
          // The palette has a block that is not a decision block.
          // display an error message, and return.
          message =
            this.props.language === "EL"
              ? "Το παρών στοιχείο Μπορεί να τοποθετηθεί μόνο σε Παράθυρο Διαμόρφωσης του Μπλοκ Απόφασης."
              : "Component can only be Placed on a Configuration Popover of a Decision Block.";
          this.props.enqueueSnackbar(message, { variant: "error" });
          break;
        }

        // Palette has a decision block. Check if that block has a configuration popover,
        // and if not, display an error message, and return.
        if (
          this.state.hasBlock.hasConfigurationPopover === null ||
          this.state.hasBlock.hasConfigurationPopover === undefined ||
          (Object.keys(this.state.hasBlock.hasConfigurationPopover).length ===
            0 &&
            this.state.hasBlock.hasConfigurationPopover.constructor === Object)
        ) {
          message =
            this.props.language === "EL"
              ? "Το Μπλοκ δεν έχει Παράθυρο Διαμόρφωσης. Παρακαλούμε, προσθέστε πρώτα ένα παράθυρο διαμόρφωσης."
              : "Block has no configuration Popover. Please add first a configuration popover.";
          this.props.enqueueSnackbar(message, { variant: "error" });
          break;
        }
        if (
          this.decisionBlockRef.current.mainColumnRef.current.state
            .configurationPopoverOpen
        ) {
          // the palette has an decision block with an OPEN Configuration popover.
          // Make sure that the new input was dropped
          // inside the popover. If so, set the state to include the new input to
          // the popover input. otherwise return.
          const configurationPopoverRect = ReactDOM.findDOMNode(
            this.decisionBlockRef.current.mainColumnRef.current
              .configurationPopoverRef.current
          ).getBoundingClientRect();

          if (
            position.x >= configurationPopoverRect.left &&
            position.x <= configurationPopoverRect.right &&
            position.y >= configurationPopoverRect.top &&
            position.y <= configurationPopoverRect.bottom
          ) {
            this.setState((currentState) => {
              if (
                currentState.hasBlock.hasConfigurationPopover.errors === null ||
                currentState.hasBlock.hasConfigurationPopover.errors ===
                  undefined ||
                (Object.keys(
                  currentState.hasBlock.hasConfigurationPopover.errors
                ).length === 0 &&
                  currentState.hasBlock.hasConfigurationPopover.errors
                    .constructor === Object)
              ) {
                return {
                  hasBlock: {
                    ...currentState.hasBlock,
                    hasConfigurationPopover: {
                      ...currentState.hasBlock.hasConfigurationPopover,
                      errors: {},
                      hasInput: [
                        selectInputBlock,
                        ...currentState.hasBlock.hasConfigurationPopover
                          .hasInput,
                      ],
                    },
                  },
                };
              } else {
                if (
                  currentState.hasBlock.hasConfigurationPopover.errors
                    .hasInput === null ||
                  currentState.hasBlock.hasConfigurationPopover.errors
                    .hasInput === undefined ||
                  (Object.keys(
                    currentState.hasBlock.hasConfigurationPopover.errors
                      .hasInput
                  ).length === 0 &&
                    currentState.hasBlock.hasConfigurationPopover.errors
                      .hasInput.constructor === Object)
                ) {
                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasConfigurationPopover: {
                        ...currentState.hasBlock.hasConfigurationPopover,
                        errors: {
                          ...currentState.hasBlock.hasConfigurationPopover
                            .errors,
                          // hasInput: {},
                        },
                        hasInput: [
                          selectInputBlock,
                          ...currentState.hasBlock.hasConfigurationPopover
                            .hasInput,
                        ],
                      },
                    },
                  };
                } else {
                  let er = {};
                  for (const e in currentState.hasBlock.hasConfigurationPopover
                    .errors) {
                    if (e !== "hasInput") {
                      er[e] =
                        currentState.hasBlock.hasConfigurationPopover.errors[e];
                    }
                  }
                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasConfigurationPopover: {
                        ...currentState.hasBlock.hasConfigurationPopover,
                        errors: er,
                        hasInput: [
                          selectInputBlock,
                          ...currentState.hasBlock.hasConfigurationPopover
                            .hasInput,
                        ],
                      },
                    },
                  };
                }
              }
            });
          } else {
            break;
          }
        } else {
          break;
        }
        break;

      case "configuration-text-input-block":
        // An configuration popovers's text input block was dropped. Check if
        // the palette has a block and if not return.
        if (this.state.hasBlock.blockType === "none") {
          // TO BE REVIEWED
          return;
        }
        if (this.state.hasBlock.blockType !== "decision-block") {
          // The palette has a block that is not a decision block.
          // display an error message, and return.
          message =
            this.props.language === "EL"
              ? "Το παρών στοιχείο Μπορεί να τοποθετηθεί μόνο σε Παράθυρο Διαμόρφωσης του Μπλοκ Απόφασης."
              : "Component can only be Placed on a Configuration Popover of a Decision Block.";
          this.props.enqueueSnackbar(message, { variant: "error" });
          break;
        }
        // Palette has a decision block. Check if that block has a configuration popover,
        // and if not, display an error message, and return.
        if (
          this.state.hasBlock.hasConfigurationPopover === null ||
          this.state.hasBlock.hasConfigurationPopover === undefined ||
          (Object.keys(this.state.hasBlock.hasConfigurationPopover).length ===
            0 &&
            this.state.hasBlock.hasConfigurationPopover.constructor === Object)
        ) {
          message =
            this.props.language === "EL"
              ? "Το Μπλοκ δεν έχει Παράθυρο Διαμόρφωσης. Παρακαλούμε, προσθέστε πρώτα ένα παράθυρο διαμόρφωσης."
              : "Block has no configuration Popover. Please add first a configuration popover.";
          this.props.enqueueSnackbar(message, { variant: "error" });
          break;
        }
        if (
          this.decisionBlockRef.current.mainColumnRef.current.state
            .configurationPopoverOpen
        ) {
          // the palette has an decision block with an OPEN Configuration popover.
          // Make sure that the new input was dropped
          // inside the popover. If so, set the state to include the new input to
          // the popover input. otherwise return.
          const configurationPopoverRect = ReactDOM.findDOMNode(
            this.decisionBlockRef.current.mainColumnRef.current
              .configurationPopoverRef.current
          ).getBoundingClientRect();

          if (
            position.x >= configurationPopoverRect.left &&
            position.x <= configurationPopoverRect.right &&
            position.y >= configurationPopoverRect.top &&
            position.y <= configurationPopoverRect.bottom
          ) {
            this.setState((currentState) => {
              if (
                currentState.hasBlock.hasConfigurationPopover.errors === null ||
                currentState.hasBlock.hasConfigurationPopover.errors ===
                  undefined ||
                (Object.keys(
                  currentState.hasBlock.hasConfigurationPopover.errors
                ).length === 0 &&
                  currentState.hasBlock.hasConfigurationPopover.errors
                    .constructor === Object)
              ) {
                return {
                  hasBlock: {
                    ...currentState.hasBlock,
                    hasConfigurationPopover: {
                      ...currentState.hasBlock.hasConfigurationPopover,
                      errors: {},
                      hasInput: [
                        textInputBlock,
                        ...currentState.hasBlock.hasConfigurationPopover
                          .hasInput,
                      ],
                    },
                  },
                };
              } else {
                if (
                  currentState.hasBlock.hasConfigurationPopover.errors
                    .hasInput === null ||
                  currentState.hasBlock.hasConfigurationPopover.errors
                    .hasInput === undefined ||
                  (Object.keys(
                    currentState.hasBlock.hasConfigurationPopover.errors
                      .hasInput
                  ).length === 0 &&
                    currentState.hasBlock.hasConfigurationPopover.errors
                      .hasInput.constructor === Object)
                ) {
                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasConfigurationPopover: {
                        ...currentState.hasBlock.hasConfigurationPopover,
                        errors: {
                          ...currentState.hasBlock.hasConfigurationPopover
                            .errors,
                          // hasInput: {},
                        },
                        hasInput: [
                          textInputBlock,
                          ...currentState.hasBlock.hasConfigurationPopover
                            .hasInput,
                        ],
                      },
                    },
                  };
                } else {
                  let er = {};
                  for (const e in currentState.hasBlock.hasConfigurationPopover
                    .errors) {
                    if (e !== "hasInput") {
                      er[e] =
                        currentState.hasBlock.hasConfigurationPopover.errors[e];
                    }
                  }
                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasConfigurationPopover: {
                        ...currentState.hasBlock.hasConfigurationPopover,
                        errors: er,
                        hasInput: [
                          textInputBlock,
                          ...currentState.hasBlock.hasConfigurationPopover
                            .hasInput,
                        ],
                      },
                    },
                  };
                }
              }
            });
          } else {
            break;
          }
        } else {
          break;
        }
        break;

      case "configuration-integer-input-block":
        // A configuration popovers's integer input block was dropped. Check if
        // the palette has a block and if not return.
        if (this.state.hasBlock.blockType === "none") {
          // TO BE REVIEWED
          return;
        }
        if (this.state.hasBlock.blockType !== "decision-block") {
          // The palette has a block that is not a decision block.
          // display an error message, and return.
          message =
            this.props.language === "EL"
              ? "Το παρών στοιχείο Μπορεί να τοποθετηθεί μόνο σε Παράθυρο Διαμόρφωσης του Μπλοκ Απόφασης."
              : "Component can only be Placed on a Configuration Popover of a Decision Block.";
          this.props.enqueueSnackbar(message, { variant: "error" });
          break;
        }
        // Palette has a decision block. Check if that block has a configuration popover,
        // and if not, display an error message, and return.
        if (
          this.state.hasBlock.hasConfigurationPopover === null ||
          this.state.hasBlock.hasConfigurationPopover === undefined ||
          (Object.keys(this.state.hasBlock.hasConfigurationPopover).length ===
            0 &&
            this.state.hasBlock.hasConfigurationPopover.constructor === Object)
        ) {
          message =
            this.props.language === "EL"
              ? "Το Μπλοκ δεν έχει Παράθυρο Διαμόρφωσης. Παρακαλούμε, προσθέστε πρώτα ένα παράθυρο διαμόρφωσης."
              : "Block has no configuration Popover. Please add first a configuration popover.";
          this.props.enqueueSnackbar(message, { variant: "error" });
          break;
        }
        if (
          this.decisionBlockRef.current.mainColumnRef.current.state
            .configurationPopoverOpen
        ) {
          // the palette has an decision block with an OPEN Configuration popover.
          // Make sure that the new input was dropped
          // inside the popover. If so, set the state to include the new input to
          // the popover input. otherwise return.
          const configurationPopoverRect = ReactDOM.findDOMNode(
            this.decisionBlockRef.current.mainColumnRef.current
              .configurationPopoverRef.current
          ).getBoundingClientRect();

          if (
            position.x >= configurationPopoverRect.left &&
            position.x <= configurationPopoverRect.right &&
            position.y >= configurationPopoverRect.top &&
            position.y <= configurationPopoverRect.bottom
          ) {
            this.setState((currentState) => {
              if (
                currentState.hasBlock.hasConfigurationPopover.errors === null ||
                currentState.hasBlock.hasConfigurationPopover.errors ===
                  undefined ||
                (Object.keys(
                  currentState.hasBlock.hasConfigurationPopover.errors
                ).length === 0 &&
                  currentState.hasBlock.hasConfigurationPopover.errors
                    .constructor === Object)
              ) {
                return {
                  hasBlock: {
                    ...currentState.hasBlock,
                    hasConfigurationPopover: {
                      ...currentState.hasBlock.hasConfigurationPopover,
                      errors: {},
                      hasInput: [
                        integerInputBlock,
                        ...currentState.hasBlock.hasConfigurationPopover
                          .hasInput,
                      ],
                    },
                  },
                };
              } else {
                if (
                  currentState.hasBlock.hasConfigurationPopover.errors
                    .hasInput === null ||
                  currentState.hasBlock.hasConfigurationPopover.errors
                    .hasInput === undefined ||
                  (Object.keys(
                    currentState.hasBlock.hasConfigurationPopover.errors
                      .hasInput
                  ).length === 0 &&
                    currentState.hasBlock.hasConfigurationPopover.errors
                      .hasInput.constructor === Object)
                ) {
                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasConfigurationPopover: {
                        ...currentState.hasBlock.hasConfigurationPopover,
                        errors: {
                          ...currentState.hasBlock.hasConfigurationPopover
                            .errors,
                          // hasInput: {},
                        },
                        hasInput: [
                          integerInputBlock,
                          ...currentState.hasBlock.hasConfigurationPopover
                            .hasInput,
                        ],
                      },
                    },
                  };
                } else {
                  let er = {};
                  for (const e in currentState.hasBlock.hasConfigurationPopover
                    .errors) {
                    if (e !== "hasInput") {
                      er[e] =
                        currentState.hasBlock.hasConfigurationPopover.errors[e];
                    }
                  }
                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasConfigurationPopover: {
                        ...currentState.hasBlock.hasConfigurationPopover,
                        errors: er,
                        hasInput: [
                          integerInputBlock,
                          ...currentState.hasBlock.hasConfigurationPopover
                            .hasInput,
                        ],
                      },
                    },
                  };
                }
              }
            });
          } else {
            break;
          }
        } else {
          break;
        }
        break;

      case "configuration-float-input-block":
        // An configuration popovers's float input block was dropped. Check if
        // the palette has a block and if not return.
        if (this.state.hasBlock.blockType === "none") {
          // TO BE REVIEWED
          return;
        }
        if (this.state.hasBlock.blockType !== "decision-block") {
          // The palette has a block that is not a decision block.
          // display an error message, and return.
          message =
            this.props.language === "EL"
              ? "Το παρών στοιχείο Μπορεί να τοποθετηθεί μόνο σε Παράθυρο Διαμόρφωσης του Μπλοκ Απόφασης."
              : "Component can only be Placed on a Configuration Popover of a Decision Block.";
          this.props.enqueueSnackbar(message, { variant: "error" });
          break;
        }

        // Palette has a decision block. Check if that block has a configuration popover,
        // and if not, display an error message, and return.
        if (
          this.state.hasBlock.hasConfigurationPopover === null ||
          this.state.hasBlock.hasConfigurationPopover === undefined ||
          (Object.keys(this.state.hasBlock.hasConfigurationPopover).length ===
            0 &&
            this.state.hasBlock.hasConfigurationPopover.constructor === Object)
        ) {
          message =
            this.props.language === "EL"
              ? "Το Μπλοκ δεν έχει Παράθυρο Διαμόρφωσης. Παρακαλούμε, προσθέστε πρώτα ένα παράθυρο διαμόρφωσης."
              : "Block has no configuration Popover. Please add first a configuration popover.";
          this.props.enqueueSnackbar(message, { variant: "error" });
          break;
        }
        if (
          this.decisionBlockRef.current.mainColumnRef.current.state
            .configurationPopoverOpen
        ) {
          // the palette has an decision block with an OPEN Configuration popover.
          // Make sure that the new input was dropped
          // inside the popover. If so, set the state to include the new input to
          // the popover input. otherwise return.
          const configurationPopoverRect = ReactDOM.findDOMNode(
            this.decisionBlockRef.current.mainColumnRef.current
              .configurationPopoverRef.current
          ).getBoundingClientRect();

          if (
            position.x >= configurationPopoverRect.left &&
            position.x <= configurationPopoverRect.right &&
            position.y >= configurationPopoverRect.top &&
            position.y <= configurationPopoverRect.bottom
          ) {
            this.setState((currentState) => {
              if (
                currentState.hasBlock.hasConfigurationPopover.errors === null ||
                currentState.hasBlock.hasConfigurationPopover.errors ===
                  undefined ||
                (Object.keys(
                  currentState.hasBlock.hasConfigurationPopover.errors
                ).length === 0 &&
                  currentState.hasBlock.hasConfigurationPopover.errors
                    .constructor === Object)
              ) {
                return {
                  hasBlock: {
                    ...currentState.hasBlock,
                    hasConfigurationPopover: {
                      ...currentState.hasBlock.hasConfigurationPopover,
                      errors: {},
                      hasInput: [
                        floatInputBlock,
                        ...currentState.hasBlock.hasConfigurationPopover
                          .hasInput,
                      ],
                    },
                  },
                };
              } else {
                if (
                  currentState.hasBlock.hasConfigurationPopover.errors
                    .hasInput === null ||
                  currentState.hasBlock.hasConfigurationPopover.errors
                    .hasInput === undefined ||
                  (Object.keys(
                    currentState.hasBlock.hasConfigurationPopover.errors
                      .hasInput
                  ).length === 0 &&
                    currentState.hasBlock.hasConfigurationPopover.errors
                      .hasInput.constructor === Object)
                ) {
                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasConfigurationPopover: {
                        ...currentState.hasBlock.hasConfigurationPopover,
                        errors: {
                          ...currentState.hasBlock.hasConfigurationPopover
                            .errors,
                          // hasInput: {},
                        },
                        hasInput: [
                          floatInputBlock,
                          ...currentState.hasBlock.hasConfigurationPopover
                            .hasInput,
                        ],
                      },
                    },
                  };
                } else {
                  let er = {};
                  for (const e in currentState.hasBlock.hasConfigurationPopover
                    .errors) {
                    if (e !== "hasInput") {
                      er[e] =
                        currentState.hasBlock.hasConfigurationPopover.errors[e];
                    }
                  }

                  // delete .hasInput;
                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasConfigurationPopover: {
                        ...currentState.hasBlock.hasConfigurationPopover,
                        errors: er,
                        hasInput: [
                          floatInputBlock,
                          ...currentState.hasBlock.hasConfigurationPopover
                            .hasInput,
                        ],
                      },
                    },
                  };
                }
              }
            });
          } else {
            break;
          }
        } else {
          break;
        }
        break;

      case "phrases-input-form":
        // A phrases ipnut form was dropped. Check if
        // the palette has a block and if not return.
        if (this.state.hasBlock.blockType === "none") {
          // TO BE REVIEWED
          return;
        }
        // The palette has a block, but it is a reference block.
        // Display an error message and return.
        if (this.state.hasBlock.blockType === "reference-block") {
          message =
            this.props.language === "EL"
              ? "Το παρών στοιχείο Μπορεί να τοποθετηθεί μόνο σε Παράθυρο Ρύθμισης των μπλοκ δράσης και απόφασης."
              : "Component can only be Placed on a Setting Popover of either a Decision Block or an Action Block.";
          this.props.enqueueSnackbar(message, { variant: "error" });
          break;
        }

        // The palette has an action block. Check if the block has a settings popover.
        // If not, display an error message, and return.
        if (this.state.hasBlock.blockType === "action-block") {
          if (
            this.state.hasBlock.hasSettingsPopover === null ||
            this.state.hasBlock.hasSettingsPopover === undefined ||
            (Object.keys(this.state.hasBlock.hasSettingsPopover).length === 0 &&
              this.state.hasBlock.hasSettingsPopover.constructor === Object)
          ) {
            message =
              this.props.language === "EL"
                ? "Το Μπλοκ δεν έχει Παράθυρο ρύθμισης. Παρακαλούμε, προσθέστε πρώτα ένα παράθυρο ρύθμισης."
                : "Block has no settings Popover. Please add first a settings popover.";
            this.props.enqueueSnackbar(message, { variant: "error" });
            break;
          }
          // The palette has an action block and an open settings popover.
          // Check if that poover is open, an if so get its coordinates.
          if (this.actionBlockRef.current.state.settingsPopoverOpen) {
            if (
              this.state.hasBlock.hasSettingsPopover.hasForm === null ||
              this.state.hasBlock.hasSettingsPopover.hasForm === undefined ||
              (Object.keys(this.state.hasBlock.hasSettingsPopover.hasForm)
                .length === 0 &&
                this.state.hasBlock.hasSettingsPopover.hasForm.constructor ===
                  Object) ||
              this.state.hasBlock.hasSettingsPopover.hasForm.type === "none"
            ) {
              const settingsPopoverRect = ReactDOM.findDOMNode(
                this.actionBlockRef.current.settingsPopoverRef.current
              ).getBoundingClientRect();
              // Make sure that the new form was dropped
              // inside the popover. If so, set the state to include the new form as
              // the popover form. otherwise return.
              if (
                position.x >= settingsPopoverRect.left &&
                position.x <= settingsPopoverRect.right &&
                position.y >= settingsPopoverRect.top &&
                position.y <= settingsPopoverRect.bottom
              ) {
                this.setState((currentState) => {
                  if (
                    currentState.hasBlock.hasSettingsPopover.errors === null ||
                    currentState.hasBlock.hasSettingsPopover.errors ===
                      undefined ||
                    (Object.keys(
                      currentState.hasBlock.hasSettingsPopover.errors
                    ).length === 0 &&
                      currentState.hasBlock.hasSettingsPopover.errors
                        .constructor === Object)
                  ) {
                    return {
                      hasBlock: {
                        ...currentState.hasBlock,
                        hasSettingsPopover: {
                          ...currentState.hasBlock.hasSettingsPopover,
                          hasForm: phrasesInputForm,
                        },
                      },
                    };
                  } else {
                    let er = {};
                    for (const e in currentState.hasBlock.hasSettingsPopover
                      .errors) {
                      if (e !== "hasForm") {
                        er[e] =
                          currentState.hasBlock.hasSettingsPopover.errors[e];
                      }
                    }

                    return {
                      hasBlock: {
                        ...currentState.hasBlock,
                        hasSettingsPopover: {
                          ...currentState.hasBlock.hasSettingsPopover,
                          hasForm: phrasesInputForm,

                          errors: er,
                        },
                      },
                    };
                  }
                });
                break;
              }
            } else {
              message =
                this.props.language === "EL"
                  ? "Το Μπλοκ Παράθυρο ρύθμισης έχει ήδη μία φόρμα εισόδου."
                  : "Setting Popover already has an input form";
              this.props.enqueueSnackbar(message, { variant: "error" });
              break;
            }
          }

          break;
        }

        if (this.state.hasBlock.blockType === "decision-block") {
          if (
            this.state.hasBlock.hasSettingsPopover === null ||
            this.state.hasBlock.hasSettingsPopover === undefined ||
            (Object.keys(this.state.hasBlock.hasSettingsPopover).length === 0 &&
              this.state.hasBlock.hasSettingsPopover.constructor === Object)
          ) {
            message =
              this.props.language === "EL"
                ? "Το Μπλοκ δεν έχει Παράθυρο ρύθμισης. Παρακαλούμε, προσθέστε πρώτα ένα παράθυρο ρύθμισης."
                : "Block has no settings Popover. Please add first a settings popover.";
            this.props.enqueueSnackbar(message, { variant: "error" });
            break;
          }

          if (
            this.decisionBlockRef.current.mainColumnRef.current.state.settingsPopoverOpen.find(
              (e) => e === true
            )
          ) {
            if (
              this.state.hasBlock.hasSettingsPopover.hasForm === null ||
              this.state.hasBlock.hasSettingsPopover.hasForm === undefined ||
              (Object.keys(this.state.hasBlock.hasSettingsPopover.hasForm)
                .length === 0 &&
                this.state.hasBlock.hasSettingsPopover.hasForm.constructor ===
                  Object) ||
              this.state.hasBlock.hasSettingsPopover.hasForm.type === "none"
            ) {
              this.setState((currentState) => {
                if (
                  currentState.hasBlock.hasSettingsPopover.errors === null ||
                  currentState.hasBlock.hasSettingsPopover.errors ===
                    undefined ||
                  (Object.keys(currentState.hasBlock.hasSettingsPopover.errors)
                    .length === 0 &&
                    currentState.hasBlock.hasSettingsPopover.errors
                      .constructor === Object)
                ) {
                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasSettingsPopover: {
                        ...currentState.hasBlock.hasSettingsPopover,
                        hasForm: phrasesInputForm,
                      },
                    },
                  };
                } else {
                  let er = {};
                  for (const e in currentState.hasBlock.hasSettingsPopover
                    .errors) {
                    if (e !== "hasForm") {
                      er[e] =
                        currentState.hasBlock.hasSettingsPopover.errors[e];
                    }
                  }

                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasSettingsPopover: {
                        ...currentState.hasBlock.hasSettingsPopover,
                        hasForm: phrasesInputForm,

                        errors: er,
                      },
                    },
                  };
                }
              });
              break;
            } else {
              message =
                this.props.language === "EL"
                  ? "Το Μπλοκ Παράθυρο ρύθμισης έχει ήδη μία φόρμα εισόδου."
                  : "Setting Popover already has an input form";
              this.props.enqueueSnackbar(message, { variant: "error" });
              break;
            }
          }

          break;
        }
        break;

      case "labeled-text-input-form":
        if (this.state.hasBlock.blockType === "none") {
          // TO BE REVIEWED
          return;
        }
        if (this.state.hasBlock.blockType === "reference-block") {
          message =
            this.props.language === "EL"
              ? "Το παρών στοιχείο Μπορεί να τοποθετηθεί μόνο σε Παράθυρο Ρύθμισης των μπλοκ δράσης και απόφασης."
              : "Component can only be Placed on a Setting Popover of either a Decision Block or an Action Block.";
          this.props.enqueueSnackbar(message, { variant: "error" });
          break;
        }

        if (this.state.hasBlock.blockType === "action-block") {
          if (
            this.state.hasBlock.hasSettingsPopover === null ||
            this.state.hasBlock.hasSettingsPopover === undefined ||
            (Object.keys(this.state.hasBlock.hasSettingsPopover).length === 0 &&
              this.state.hasBlock.hasSettingsPopover.constructor === Object)
          ) {
            message =
              this.props.language === "EL"
                ? "Το Μπλοκ δεν έχει Παράθυρο ρύθμισης. Παρακαλούμε, προσθέστε πρώτα ένα παράθυρο ρύθμισης."
                : "Block has no settings Popover. Please add first a settings popover.";
            this.props.enqueueSnackbar(message, { variant: "error" });
            break;
          }

          if (this.actionBlockRef.current.state.settingsPopoverOpen) {
            if (
              this.state.hasBlock.hasSettingsPopover.hasForm === null ||
              this.state.hasBlock.hasSettingsPopover.hasForm === undefined ||
              (Object.keys(this.state.hasBlock.hasSettingsPopover.hasForm)
                .length === 0 &&
                this.state.hasBlock.hasSettingsPopover.hasForm.constructor ===
                  Object) ||
              this.state.hasBlock.hasSettingsPopover.hasForm.type === "none"
            ) {
              const settingsPopoverRect = ReactDOM.findDOMNode(
                this.actionBlockRef.current.settingsPopoverRef.current
              ).getBoundingClientRect();

              if (
                position.x >= settingsPopoverRect.left &&
                position.x <= settingsPopoverRect.right &&
                position.y >= settingsPopoverRect.top &&
                position.y <= settingsPopoverRect.bottom
              ) {
                this.setState((currentState) => {
                  if (
                    currentState.hasBlock.hasSettingsPopover.errors === null ||
                    currentState.hasBlock.hasSettingsPopover.errors ===
                      undefined ||
                    (Object.keys(
                      currentState.hasBlock.hasSettingsPopover.errors
                    ).length === 0 &&
                      currentState.hasBlock.hasSettingsPopover.errors
                        .constructor === Object)
                  ) {
                    return {
                      hasBlock: {
                        ...currentState.hasBlock,
                        hasSettingsPopover: {
                          ...currentState.hasBlock.hasSettingsPopover,
                          hasForm: labeledTextInputForm,
                        },
                      },
                    };
                  } else {
                    let er = {};
                    for (const e in currentState.hasBlock.hasSettingsPopover
                      .errors) {
                      if (e !== "hasForm") {
                        er[e] =
                          currentState.hasBlock.hasSettingsPopover.errors[e];
                      }
                    }

                    return {
                      hasBlock: {
                        ...currentState.hasBlock,
                        hasSettingsPopover: {
                          ...currentState.hasBlock.hasSettingsPopover,
                          hasForm: labeledTextInputForm,

                          errors: er,
                        },
                      },
                    };
                  }
                });
                break;
              }
            } else {
              message =
                this.props.language === "EL"
                  ? "Το Μπλοκ Παράθυρο ρύθμισης έχει ήδη μία φόρμα εισόδου."
                  : "Setting Popover already has an input form";
              this.props.enqueueSnackbar(message, { variant: "error" });
              break;
            }
          }

          break;
        }

        if (this.state.hasBlock.blockType === "decision-block") {
          if (
            this.state.hasBlock.hasSettingsPopover === null ||
            this.state.hasBlock.hasSettingsPopover === undefined ||
            (Object.keys(this.state.hasBlock.hasSettingsPopover).length === 0 &&
              this.state.hasBlock.hasSettingsPopover.constructor === Object)
          ) {
            message =
              this.props.language === "EL"
                ? "Το Μπλοκ δεν έχει Παράθυρο ρύθμισης. Παρακαλούμε, προσθέστε πρώτα ένα παράθυρο ρύθμισης."
                : "Block has no settings Popover. Please add first a settings popover.";
            this.props.enqueueSnackbar(message, { variant: "error" });
            break;
          }

          if (
            this.decisionBlockRef.current.mainColumnRef.current.state.settingsPopoverOpen.find(
              (e) => e === true
            )
          ) {
            if (
              this.state.hasBlock.hasSettingsPopover.hasForm === null ||
              this.state.hasBlock.hasSettingsPopover.hasForm === undefined ||
              (Object.keys(this.state.hasBlock.hasSettingsPopover.hasForm)
                .length === 0 &&
                this.state.hasBlock.hasSettingsPopover.hasForm.constructor ===
                  Object) ||
              this.state.hasBlock.hasSettingsPopover.hasForm.type === "none"
            ) {
              // const settingsPopoverIndex = this.decisionBlockRef.current.mainColumnRef.current.state.settingsPopoverOpen.findIndex(
              //   (e) => e === true
              // );
              // const settingsPopoverRect = ReactDOM.findDOMNode(
              //   this.decisionBlockRef.current.mainColumnRef.current.state
              //     .branchRefs[settingsPopoverIndex].current.settingsPopoverRef
              //     .current
              // ).getBoundingClientRect();
              // if (
              //   position.x >= settingsPopoverRect.left &&
              //   position.x <= settingsPopoverRect.right &&
              //   position.y >= settingsPopoverRect.top &&
              //   position.y <= settingsPopoverRect.bottom
              // ) {
              this.setState((currentState) => {
                if (
                  currentState.hasBlock.hasSettingsPopover.errors === null ||
                  currentState.hasBlock.hasSettingsPopover.errors ===
                    undefined ||
                  (Object.keys(currentState.hasBlock.hasSettingsPopover.errors)
                    .length === 0 &&
                    currentState.hasBlock.hasSettingsPopover.errors
                      .constructor === Object)
                ) {
                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasSettingsPopover: {
                        ...currentState.hasBlock.hasSettingsPopover,
                        hasForm: labeledTextInputForm,
                      },
                    },
                  };
                } else {
                  let er = {};
                  for (const e in currentState.hasBlock.hasSettingsPopover
                    .errors) {
                    if (e !== "hasForm") {
                      er[e] =
                        currentState.hasBlock.hasSettingsPopover.errors[e];
                    }
                  }

                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasSettingsPopover: {
                        ...currentState.hasBlock.hasSettingsPopover,
                        hasForm: labeledTextInputForm,

                        errors: er,
                      },
                    },
                  };
                }
              });
              break;
              // }
            } else {
              message =
                this.props.language === "EL"
                  ? "Το Μπλοκ Παράθυρο ρύθμισης έχει ήδη μία φόρμα εισόδου."
                  : "Setting Popover already has an input form";
              this.props.enqueueSnackbar(message, { variant: "error" });
              break;
            }
          }

          break;
        }
        break;

      case "labeled-integer-input-form":
        if (this.state.hasBlock.blockType === "none") {
          // TO BE REVIEWED
          return;
        }
        if (this.state.hasBlock.blockType === "reference-block") {
          message =
            this.props.language === "EL"
              ? "Το παρών στοιχείο Μπορεί να τοποθετηθεί μόνο σε Παράθυρο Ρύθμισης των μπλοκ δράσης και απόφασης."
              : "Component can only be Placed on a Setting Popover of either a Decision Block or an Action Block.";
          this.props.enqueueSnackbar(message, { variant: "error" });
          break;
        }

        if (this.state.hasBlock.blockType === "action-block") {
          if (
            this.state.hasBlock.hasSettingsPopover === null ||
            this.state.hasBlock.hasSettingsPopover === undefined ||
            (Object.keys(this.state.hasBlock.hasSettingsPopover).length === 0 &&
              this.state.hasBlock.hasSettingsPopover.constructor === Object)
          ) {
            message =
              this.props.language === "EL"
                ? "Το Μπλοκ δεν έχει Παράθυρο ρύθμισης. Παρακαλούμε, προσθέστε πρώτα ένα παράθυρο ρύθμισης."
                : "Block has no settings Popover. Please add first a settings popover.";
            this.props.enqueueSnackbar(message, { variant: "error" });
            break;
          }

          if (this.actionBlockRef.current.state.settingsPopoverOpen) {
            if (
              this.state.hasBlock.hasSettingsPopover.hasForm === null ||
              this.state.hasBlock.hasSettingsPopover.hasForm === undefined ||
              (Object.keys(this.state.hasBlock.hasSettingsPopover.hasForm)
                .length === 0 &&
                this.state.hasBlock.hasSettingsPopover.hasForm.constructor ===
                  Object) ||
              this.state.hasBlock.hasSettingsPopover.hasForm.type === "none"
            ) {
              const settingsPopoverRect = ReactDOM.findDOMNode(
                this.actionBlockRef.current.settingsPopoverRef.current
              ).getBoundingClientRect();

              if (
                position.x >= settingsPopoverRect.left &&
                position.x <= settingsPopoverRect.right &&
                position.y >= settingsPopoverRect.top &&
                position.y <= settingsPopoverRect.bottom
              ) {
                this.setState((currentState) => {
                  if (
                    currentState.hasBlock.hasSettingsPopover.errors === null ||
                    currentState.hasBlock.hasSettingsPopover.errors ===
                      undefined ||
                    (Object.keys(
                      currentState.hasBlock.hasSettingsPopover.errors
                    ).length === 0 &&
                      currentState.hasBlock.hasSettingsPopover.errors
                        .constructor === Object)
                  ) {
                    return {
                      hasBlock: {
                        ...currentState.hasBlock,
                        hasSettingsPopover: {
                          ...currentState.hasBlock.hasSettingsPopover,
                          hasForm: labeledIntegerInputForm,
                        },
                      },
                    };
                  } else {
                    let er = {};
                    for (const e in currentState.hasBlock.hasSettingsPopover
                      .errors) {
                      if (e !== "hasForm") {
                        er[e] =
                          currentState.hasBlock.hasSettingsPopover.errors[e];
                      }
                    }

                    return {
                      hasBlock: {
                        ...currentState.hasBlock,
                        hasSettingsPopover: {
                          ...currentState.hasBlock.hasSettingsPopover,
                          hasForm: labeledIntegerInputForm,

                          errors: er,
                        },
                      },
                    };
                  }
                });
                break;
              }
            } else {
              message =
                this.props.language === "EL"
                  ? "Το Μπλοκ Παράθυρο ρύθμισης έχει ήδη μία φόρμα εισόδου."
                  : "Setting Popover already has an input form";
              this.props.enqueueSnackbar(message, { variant: "error" });
              break;
            }
          }

          break;
        }

        if (this.state.hasBlock.blockType === "decision-block") {
          if (
            this.state.hasBlock.hasSettingsPopover === null ||
            this.state.hasBlock.hasSettingsPopover === undefined ||
            (Object.keys(this.state.hasBlock.hasSettingsPopover).length === 0 &&
              this.state.hasBlock.hasSettingsPopover.constructor === Object)
          ) {
            message =
              this.props.language === "EL"
                ? "Το Μπλοκ δεν έχει Παράθυρο ρύθμισης. Παρακαλούμε, προσθέστε πρώτα ένα παράθυρο ρύθμισης."
                : "Block has no settings Popover. Please add first a settings popover.";
            this.props.enqueueSnackbar(message, { variant: "error" });
            break;
          }

          if (
            this.decisionBlockRef.current.mainColumnRef.current.state.settingsPopoverOpen.find(
              (e) => e === true
            )
          ) {
            if (
              this.state.hasBlock.hasSettingsPopover.hasForm === null ||
              this.state.hasBlock.hasSettingsPopover.hasForm === undefined ||
              (Object.keys(this.state.hasBlock.hasSettingsPopover.hasForm)
                .length === 0 &&
                this.state.hasBlock.hasSettingsPopover.hasForm.constructor ===
                  Object) ||
              this.state.hasBlock.hasSettingsPopover.hasForm.type === "none"
            ) {
              this.setState((currentState) => {
                if (
                  currentState.hasBlock.hasSettingsPopover.errors === null ||
                  currentState.hasBlock.hasSettingsPopover.errors ===
                    undefined ||
                  (Object.keys(currentState.hasBlock.hasSettingsPopover.errors)
                    .length === 0 &&
                    currentState.hasBlock.hasSettingsPopover.errors
                      .constructor === Object)
                ) {
                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasSettingsPopover: {
                        ...currentState.hasBlock.hasSettingsPopover,
                        hasForm: labeledIntegerInputForm,
                      },
                    },
                  };
                } else {
                  let er = {};
                  for (const e in currentState.hasBlock.hasSettingsPopover
                    .errors) {
                    if (e !== "hasForm") {
                      er[e] =
                        currentState.hasBlock.hasSettingsPopover.errors[e];
                    }
                  }

                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasSettingsPopover: {
                        ...currentState.hasBlock.hasSettingsPopover,
                        hasForm: labeledIntegerInputForm,

                        errors: er,
                      },
                    },
                  };
                }
              });
              break;
            } else {
              message =
                this.props.language === "EL"
                  ? "Το Μπλοκ Παράθυρο ρύθμισης έχει ήδη μία φόρμα εισόδου."
                  : "Setting Popover already has an input form";
              this.props.enqueueSnackbar(message, { variant: "error" });
              break;
            }
          }

          break;
        }
        break;

      case "labeled-float-input-form":
        if (this.state.hasBlock.blockType === "none") {
          // TO BE REVIEWED
          return;
        }
        if (this.state.hasBlock.blockType === "reference-block") {
          message =
            this.props.language === "EL"
              ? "Το παρών στοιχείο Μπορεί να τοποθετηθεί μόνο σε Παράθυρο Ρύθμισης των μπλοκ δράσης και απόφασης."
              : "Component can only be Placed on a Setting Popover of either a Decision Block or an Action Block.";
          this.props.enqueueSnackbar(message, { variant: "error" });
          break;
        }

        if (this.state.hasBlock.blockType === "action-block") {
          if (
            this.state.hasBlock.hasSettingsPopover === null ||
            this.state.hasBlock.hasSettingsPopover === undefined ||
            (Object.keys(this.state.hasBlock.hasSettingsPopover).length === 0 &&
              this.state.hasBlock.hasSettingsPopover.constructor === Object)
          ) {
            message =
              this.props.language === "EL"
                ? "Το Μπλοκ δεν έχει Παράθυρο ρύθμισης. Παρακαλούμε, προσθέστε πρώτα ένα παράθυρο ρύθμισης."
                : "Block has no settings Popover. Please add first a settings popover.";
            this.props.enqueueSnackbar(message, { variant: "error" });
            break;
          }

          if (this.actionBlockRef.current.state.settingsPopoverOpen) {
            if (
              this.state.hasBlock.hasSettingsPopover.hasForm === null ||
              this.state.hasBlock.hasSettingsPopover.hasForm === undefined ||
              (Object.keys(this.state.hasBlock.hasSettingsPopover.hasForm)
                .length === 0 &&
                this.state.hasBlock.hasSettingsPopover.hasForm.constructor ===
                  Object) ||
              this.state.hasBlock.hasSettingsPopover.hasForm.type === "none"
            ) {
              const settingsPopoverRect = ReactDOM.findDOMNode(
                this.actionBlockRef.current.settingsPopoverRef.current
              ).getBoundingClientRect();

              if (
                position.x >= settingsPopoverRect.left &&
                position.x <= settingsPopoverRect.right &&
                position.y >= settingsPopoverRect.top &&
                position.y <= settingsPopoverRect.bottom
              ) {
                this.setState((currentState) => {
                  if (
                    currentState.hasBlock.hasSettingsPopover.errors === null ||
                    currentState.hasBlock.hasSettingsPopover.errors ===
                      undefined ||
                    (Object.keys(
                      currentState.hasBlock.hasSettingsPopover.errors
                    ).length === 0 &&
                      currentState.hasBlock.hasSettingsPopover.errors
                        .constructor === Object)
                  ) {
                    return {
                      hasBlock: {
                        ...currentState.hasBlock,
                        hasSettingsPopover: {
                          ...currentState.hasBlock.hasSettingsPopover,
                          hasForm: labeledFloatInputForm,
                        },
                      },
                    };
                  } else {
                    let er = {};
                    for (const e in currentState.hasBlock.hasSettingsPopover
                      .errors) {
                      if (e !== "hasForm") {
                        er[e] =
                          currentState.hasBlock.hasSettingsPopover.errors[e];
                      }
                    }

                    return {
                      hasBlock: {
                        ...currentState.hasBlock,
                        hasSettingsPopover: {
                          ...currentState.hasBlock.hasSettingsPopover,
                          hasForm: labeledFloatInputForm,

                          errors: er,
                        },
                      },
                    };
                  }
                });
                break;
              }
            } else {
              message =
                this.props.language === "EL"
                  ? "Το Μπλοκ Παράθυρο ρύθμισης έχει ήδη μία φόρμα εισόδου."
                  : "Setting Popover already has an input form";
              this.props.enqueueSnackbar(message, { variant: "error" });
              break;
            }
          }

          break;
        }

        if (this.state.hasBlock.blockType === "decision-block") {
          if (
            this.state.hasBlock.hasSettingsPopover === null ||
            this.state.hasBlock.hasSettingsPopover === undefined ||
            (Object.keys(this.state.hasBlock.hasSettingsPopover).length === 0 &&
              this.state.hasBlock.hasSettingsPopover.constructor === Object)
          ) {
            message =
              this.props.language === "EL"
                ? "Το Μπλοκ δεν έχει Παράθυρο ρύθμισης. Παρακαλούμε, προσθέστε πρώτα ένα παράθυρο ρύθμισης."
                : "Block has no settings Popover. Please add first a settings popover.";
            this.props.enqueueSnackbar(message, { variant: "error" });
            break;
          }

          if (
            this.decisionBlockRef.current.mainColumnRef.current.state.settingsPopoverOpen.find(
              (e) => e === true
            )
          ) {
            if (
              this.state.hasBlock.hasSettingsPopover.hasForm === null ||
              this.state.hasBlock.hasSettingsPopover.hasForm === undefined ||
              (Object.keys(this.state.hasBlock.hasSettingsPopover.hasForm)
                .length === 0 &&
                this.state.hasBlock.hasSettingsPopover.hasForm.constructor ===
                  Object) ||
              this.state.hasBlock.hasSettingsPopover.hasForm.type === "none"
            ) {
              this.setState((currentState) => {
                if (
                  currentState.hasBlock.hasSettingsPopover.errors === null ||
                  currentState.hasBlock.hasSettingsPopover.errors ===
                    undefined ||
                  (Object.keys(currentState.hasBlock.hasSettingsPopover.errors)
                    .length === 0 &&
                    currentState.hasBlock.hasSettingsPopover.errors
                      .constructor === Object)
                ) {
                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasSettingsPopover: {
                        ...currentState.hasBlock.hasSettingsPopover,
                        hasForm: labeledFloatInputForm,
                      },
                    },
                  };
                } else {
                  let er = {};
                  for (const e in currentState.hasBlock.hasSettingsPopover
                    .errors) {
                    if (e !== "hasForm") {
                      er[e] =
                        currentState.hasBlock.hasSettingsPopover.errors[e];
                    }
                  }

                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasSettingsPopover: {
                        ...currentState.hasBlock.hasSettingsPopover,
                        hasForm: labeledFloatInputForm,

                        errors: er,
                      },
                    },
                  };
                }
              });
              break;
            } else {
              message =
                this.props.language === "EL"
                  ? "Το Μπλοκ Παράθυρο ρύθμισης έχει ήδη μία φόρμα εισόδου."
                  : "Setting Popover already has an input form";
              this.props.enqueueSnackbar(message, { variant: "error" });
              break;
            }
          }

          break;
        }
        break;

      case "parameter-input-form":
        if (this.state.hasBlock.blockType === "none") {
          // TO BE REVIEWED
          return;
        }
        if (this.state.hasBlock.blockType === "reference-block") {
          message =
            this.props.language === "EL"
              ? "Το παρών στοιχείο Μπορεί να τοποθετηθεί μόνο σε Παράθυρο Ρύθμισης των μπλοκ δράσης και απόφασης."
              : "Component can only be Placed on a Setting Popover of either a Decision Block or an Action Block.";
          this.props.enqueueSnackbar(message, { variant: "error" });
          break;
        }

        if (this.state.hasBlock.blockType === "action-block") {
          if (
            this.state.hasBlock.hasSettingsPopover === null ||
            this.state.hasBlock.hasSettingsPopover === undefined ||
            (Object.keys(this.state.hasBlock.hasSettingsPopover).length === 0 &&
              this.state.hasBlock.hasSettingsPopover.constructor === Object)
          ) {
            message =
              this.props.language === "EL"
                ? "Το Μπλοκ δεν έχει Παράθυρο ρύθμισης. Παρακαλούμε, προσθέστε πρώτα ένα παράθυρο ρύθμισης."
                : "Block has no settings Popover. Please add first a settings popover.";
            this.props.enqueueSnackbar(message, { variant: "error" });
            break;
          }

          if (this.actionBlockRef.current.state.settingsPopoverOpen) {
            if (
              this.state.hasBlock.hasSettingsPopover.hasForm === null ||
              this.state.hasBlock.hasSettingsPopover.hasForm === undefined ||
              (Object.keys(this.state.hasBlock.hasSettingsPopover.hasForm)
                .length === 0 &&
                this.state.hasBlock.hasSettingsPopover.hasForm.constructor ===
                  Object) ||
              this.state.hasBlock.hasSettingsPopover.hasForm.type === "none"
            ) {
              const settingsPopoverRect = ReactDOM.findDOMNode(
                this.actionBlockRef.current.settingsPopoverRef.current
              ).getBoundingClientRect();

              if (
                position.x >= settingsPopoverRect.left &&
                position.x <= settingsPopoverRect.right &&
                position.y >= settingsPopoverRect.top &&
                position.y <= settingsPopoverRect.bottom
              ) {
                this.setState((currentState) => {
                  if (
                    currentState.hasBlock.hasSettingsPopover.errors === null ||
                    currentState.hasBlock.hasSettingsPopover.errors ===
                      undefined ||
                    (Object.keys(
                      currentState.hasBlock.hasSettingsPopover.errors
                    ).length === 0 &&
                      currentState.hasBlock.hasSettingsPopover.errors
                        .constructor === Object)
                  ) {
                    return {
                      hasBlock: {
                        ...currentState.hasBlock,
                        hasSettingsPopover: {
                          ...currentState.hasBlock.hasSettingsPopover,
                          hasForm: parameterInputForm,
                        },
                      },
                    };
                  } else {
                    let er = {};
                    for (const e in currentState.hasBlock.hasSettingsPopover
                      .errors) {
                      if (e !== "hasForm") {
                        er[e] =
                          currentState.hasBlock.hasSettingsPopover.errors[e];
                      }
                    }

                    return {
                      hasBlock: {
                        ...currentState.hasBlock,
                        hasSettingsPopover: {
                          ...currentState.hasBlock.hasSettingsPopover,
                          hasForm: parameterInputForm,

                          errors: er,
                        },
                      },
                    };
                  }
                });
                break;
              }
            } else {
              message =
                this.props.language === "EL"
                  ? "Το Μπλοκ Παράθυρο ρύθμισης έχει ήδη μία φόρμα εισόδου."
                  : "Setting Popover already has an input form";
              this.props.enqueueSnackbar(message, { variant: "error" });
              break;
            }
          }

          break;
        }

        if (this.state.hasBlock.blockType === "decision-block") {
          if (
            this.state.hasBlock.hasSettingsPopover === null ||
            this.state.hasBlock.hasSettingsPopover === undefined ||
            (Object.keys(this.state.hasBlock.hasSettingsPopover).length === 0 &&
              this.state.hasBlock.hasSettingsPopover.constructor === Object)
          ) {
            message =
              this.props.language === "EL"
                ? "Το Μπλοκ δεν έχει Παράθυρο ρύθμισης. Παρακαλούμε, προσθέστε πρώτα ένα παράθυρο ρύθμισης."
                : "Block has no settings Popover. Please add first a settings popover.";
            this.props.enqueueSnackbar(message, { variant: "error" });
            break;
          }

          if (
            this.decisionBlockRef.current.mainColumnRef.current.state.settingsPopoverOpen.find(
              (e) => e === true
            )
          ) {
            if (
              this.state.hasBlock.hasSettingsPopover.hasForm === null ||
              this.state.hasBlock.hasSettingsPopover.hasForm === undefined ||
              (Object.keys(this.state.hasBlock.hasSettingsPopover.hasForm)
                .length === 0 &&
                this.state.hasBlock.hasSettingsPopover.hasForm.constructor ===
                  Object) ||
              this.state.hasBlock.hasSettingsPopover.hasForm.type === "none"
            ) {
              this.setState((currentState) => {
                if (
                  currentState.hasBlock.hasSettingsPopover.errors === null ||
                  currentState.hasBlock.hasSettingsPopover.errors ===
                    undefined ||
                  (Object.keys(currentState.hasBlock.hasSettingsPopover.errors)
                    .length === 0 &&
                    currentState.hasBlock.hasSettingsPopover.errors
                      .constructor === Object)
                ) {
                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasSettingsPopover: {
                        ...currentState.hasBlock.hasSettingsPopover,
                        hasForm: parameterInputForm,
                      },
                    },
                  };
                } else {
                  let er = {};
                  for (const e in currentState.hasBlock.hasSettingsPopover
                    .errors) {
                    if (e !== "hasForm") {
                      er[e] =
                        currentState.hasBlock.hasSettingsPopover.errors[e];
                    }
                  }

                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasSettingsPopover: {
                        ...currentState.hasBlock.hasSettingsPopover,
                        hasForm: parameterInputForm,

                        errors: er,
                      },
                    },
                  };
                }
              });
              break;
            } else {
              message =
                this.props.language === "EL"
                  ? "Το Μπλοκ Παράθυρο ρύθμισης έχει ήδη μία φόρμα εισόδου."
                  : "Setting Popover already has an input form";
              this.props.enqueueSnackbar(message, { variant: "error" });
              break;
            }
          }

          break;
        }
        break;

      case "condition-input-form":
        if (this.state.hasBlock.blockType === "none") {
          // TO BE REVIEWED
          return;
        }
        if (this.state.hasBlock.blockType === "reference-block") {
          message =
            this.props.language === "EL"
              ? "Το παρών στοιχείο Μπορεί να τοποθετηθεί μόνο σε Παράθυρο Ρύθμισης των μπλοκ δράσης και απόφασης."
              : "Component can only be Placed on a Setting Popover of either a Decision Block or an Action Block.";
          this.props.enqueueSnackbar(message, { variant: "error" });
          break;
        }

        if (this.state.hasBlock.blockType === "action-block") {
          if (
            this.state.hasBlock.hasSettingsPopover === null ||
            this.state.hasBlock.hasSettingsPopover === undefined ||
            (Object.keys(this.state.hasBlock.hasSettingsPopover).length === 0 &&
              this.state.hasBlock.hasSettingsPopover.constructor === Object)
          ) {
            message =
              this.props.language === "EL"
                ? "Το Μπλοκ δεν έχει Παράθυρο ρύθμισης. Παρακαλούμε, προσθέστε πρώτα ένα παράθυρο ρύθμισης."
                : "Block has no settings Popover. Please add first a settings popover.";
            this.props.enqueueSnackbar(message, { variant: "error" });
            break;
          }

          if (this.actionBlockRef.current.state.settingsPopoverOpen) {
            if (
              this.state.hasBlock.hasSettingsPopover.hasForm === null ||
              this.state.hasBlock.hasSettingsPopover.hasForm === undefined ||
              (Object.keys(this.state.hasBlock.hasSettingsPopover.hasForm)
                .length === 0 &&
                this.state.hasBlock.hasSettingsPopover.hasForm.constructor ===
                  Object) ||
              this.state.hasBlock.hasSettingsPopover.hasForm.type === "none"
            ) {
              const settingsPopoverRect = ReactDOM.findDOMNode(
                this.actionBlockRef.current.settingsPopoverRef.current
              ).getBoundingClientRect();

              if (
                position.x >= settingsPopoverRect.left &&
                position.x <= settingsPopoverRect.right &&
                position.y >= settingsPopoverRect.top &&
                position.y <= settingsPopoverRect.bottom
              ) {
                this.setState((currentState) => {
                  if (
                    currentState.hasBlock.hasSettingsPopover.errors === null ||
                    currentState.hasBlock.hasSettingsPopover.errors ===
                      undefined ||
                    (Object.keys(
                      currentState.hasBlock.hasSettingsPopover.errors
                    ).length === 0 &&
                      currentState.hasBlock.hasSettingsPopover.errors
                        .constructor === Object)
                  ) {
                    return {
                      hasBlock: {
                        ...currentState.hasBlock,
                        hasSettingsPopover: {
                          ...currentState.hasBlock.hasSettingsPopover,
                          hasForm: conditionInputForm,
                        },
                      },
                    };
                  } else {
                    let er = {};
                    for (const e in currentState.hasBlock.hasSettingsPopover
                      .errors) {
                      if (e !== "hasForm") {
                        er[e] =
                          currentState.hasBlock.hasSettingsPopover.errors[e];
                      }
                    }

                    return {
                      hasBlock: {
                        ...currentState.hasBlock,
                        hasSettingsPopover: {
                          ...currentState.hasBlock.hasSettingsPopover,
                          hasForm: conditionInputForm,

                          errors: er,
                        },
                      },
                    };
                  }
                });
                break;
              }
            } else {
              message =
                this.props.language === "EL"
                  ? "Το Μπλοκ Παράθυρο ρύθμισης έχει ήδη μία φόρμα εισόδου."
                  : "Setting Popover already has an input form";
              this.props.enqueueSnackbar(message, { variant: "error" });
              break;
            }
          }

          break;
        }

        if (this.state.hasBlock.blockType === "decision-block") {
          if (
            this.state.hasBlock.hasSettingsPopover === null ||
            this.state.hasBlock.hasSettingsPopover === undefined ||
            (Object.keys(this.state.hasBlock.hasSettingsPopover).length === 0 &&
              this.state.hasBlock.hasSettingsPopover.constructor === Object)
          ) {
            message =
              this.props.language === "EL"
                ? "Το Μπλοκ δεν έχει Παράθυρο ρύθμισης. Παρακαλούμε, προσθέστε πρώτα ένα παράθυρο ρύθμισης."
                : "Block has no settings Popover. Please add first a settings popover.";
            this.props.enqueueSnackbar(message, { variant: "error" });
            break;
          }

          if (
            this.decisionBlockRef.current.mainColumnRef.current.state.settingsPopoverOpen.find(
              (e) => e === true
            )
          ) {
            if (
              this.state.hasBlock.hasSettingsPopover.hasForm === null ||
              this.state.hasBlock.hasSettingsPopover.hasForm === undefined ||
              (Object.keys(this.state.hasBlock.hasSettingsPopover.hasForm)
                .length === 0 &&
                this.state.hasBlock.hasSettingsPopover.hasForm.constructor ===
                  Object) ||
              this.state.hasBlock.hasSettingsPopover.hasForm.type === "none"
            ) {
              this.setState((currentState) => {
                if (
                  currentState.hasBlock.hasSettingsPopover.errors === null ||
                  currentState.hasBlock.hasSettingsPopover.errors ===
                    undefined ||
                  (Object.keys(currentState.hasBlock.hasSettingsPopover.errors)
                    .length === 0 &&
                    currentState.hasBlock.hasSettingsPopover.errors
                      .constructor === Object)
                ) {
                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasSettingsPopover: {
                        ...currentState.hasBlock.hasSettingsPopover,
                        hasForm: conditionInputForm,
                      },
                    },
                  };
                } else {
                  let er = {};
                  for (const e in currentState.hasBlock.hasSettingsPopover
                    .errors) {
                    if (e !== "hasForm") {
                      er[e] =
                        currentState.hasBlock.hasSettingsPopover.errors[e];
                    }
                  }

                  return {
                    hasBlock: {
                      ...currentState.hasBlock,
                      hasSettingsPopover: {
                        ...currentState.hasBlock.hasSettingsPopover,
                        hasForm: conditionInputForm,

                        errors: er,
                      },
                    },
                  };
                }
              });
              break;
            } else {
              message =
                this.props.language === "EL"
                  ? "Το Μπλοκ Παράθυρο ρύθμισης έχει ήδη μία φόρμα εισόδου."
                  : "Setting Popover already has an input form";
              this.props.enqueueSnackbar(message, { variant: "error" });
              break;
            }
          }

          break;
        }
        break;

      default:
        return;
    }
  }

  renderBlock() {
    switch (this.state.hasBlock.blockType) {
      case "action-block":
        return (
          <ActionBlock
            ref={this.actionBlockRef}
            language={this.props.language}
            blockNameEN={this.state.hasBlock.blockNameEN}
            blockNameEL={this.state.hasBlock.blockNameEL}
            blockTitleEL={this.state.hasBlock.blockTitleEL}
            blockTitleEN={this.state.hasBlock.blockTitleEN}
            type={this.state.hasBlock.type}
            category={this.state.hasBlock.category}
            backroundColor={this.state.hasBlock.backroundColor}
            titleBackroundColor={this.state.hasBlock.titleBackroundColor}
            blockImage={this.state.hasBlock.blockImage}
            hasPopover={this.state.hasBlock.hasPopover}
            popoverIcon={this.state.hasBlock.popoverIcon}
            popoverHelpTextEL={this.state.hasBlock.popoverHelpTextEL}
            popoverHelpTextEN={this.state.hasBlock.popoverHelpTextEN}
            errors={this.state.hasBlock.errors}
            hasInfo={this.state.hasBlock.hasInfo}
            hasInput={this.state.hasBlock.hasInput}
            hasSettingsPopover={this.state.hasBlock.hasSettingsPopover}
            deleteBlock={this.deleteBlock}
            setActionBlock={this.setActionBlock}
            setInformation={this.setInformation}
            deleteInformation={this.deleteInformation}
            setTextInputBlock={this.setTextInputBlock}
            setIntegerInputBlock={this.setIntegerInputBlock}
            setFloatInputBlock={this.setFloatInputBlock}
            setSelectInputBlock={this.setSelectInputBlock}
            deleteInputBlock={this.deleteInputBlock}
            reorderInputBlocks={this.reorderInputBlocks}
            setSettingsPopover={this.setSettingsPopover}
            setLabeledTextInputForm={this.setLabeledTextInputForm}
            setLabeledIntegerInputForm={this.setLabeledIntegerInputForm}
            setLabeledFloatInputForm={this.setLabeledFloatInputForm}
            setParameterInputForm={this.setParameterInputForm}
            setConditionInputForm={this.setConditionInputForm}
            setPhrasesInputForm={this.setPhrasesInputForm}
            deleteSettingsPopoverForm={this.deleteSettingsPopoverForm}
            deleteSettingsPopover={this.deleteSettingsPopover}
          />
        );
      case "reference-block":
        return (
          <ReferenceBlock
            ref={this.referenceBlockRef}
            language={this.props.language}
            blockNameEN={this.state.hasBlock.blockNameEN}
            blockNameEL={this.state.hasBlock.blockNameEL}
            blockTitleEN={this.state.hasBlock.blockTitleEN}
            blockTitleEL={this.state.hasBlock.blockTitleEL}
            type={this.state.hasBlock.type}
            category={this.state.hasBlock.category}
            backroundColor={this.state.hasBlock.backroundColor}
            blockImage={this.state.hasBlock.blockImage}
            imageBackroundShape={this.state.hasBlock.imageBackroundShape}
            imageBackroundShapeColor={
              this.state.hasBlock.imageBackroundShapeColor
            }
            hasNextBlock={this.state.hasBlock.hasNextBlock}
            imageCursor={this.state.hasBlock.imageCursor}
            hasInfo={this.state.hasBlock.hasInfo}
            errors={this.state.hasBlock.errors}
            deleteBlock={this.deleteBlock}
            setReferenceBlock={this.setReferenceBlock}
            setInformation={this.setInformation}
            deleteInformation={this.deleteInformation}
          />
        );
      case "decision-block":
        return (
          <DecisionBlock
            ref={this.decisionBlockRef}
            language={this.props.language}
            blockNameEN={this.state.hasBlock.blockNameEN}
            blockNameEL={this.state.hasBlock.blockNameEL}
            type={this.state.hasBlock.type}
            category={this.state.hasBlock.category}
            backroundColor={this.state.hasBlock.backroundColor}
            blockImage={this.state.hasBlock.blockImage}
            numberOfBranches={this.state.hasBlock.numberOfBranches}
            numberOfColumns={this.state.hasBlock.numberOfColumns}
            blockImageCursor={this.state.hasBlock.blockImageCursor}
            errors={this.state.hasBlock.errors}
            hasConfigurationPopover={
              this.state.hasBlock.hasConfigurationPopover
            }
            hasSettingsPopover={this.state.hasBlock.hasSettingsPopover}
            setDecisionBlock={this.setDecisionBlock}
            setTextInputBlock={this.setTextInputBlock}
            setIntegerInputBlock={this.setIntegerInputBlock}
            setFloatInputBlock={this.setFloatInputBlock}
            setSelectInputBlock={this.setSelectInputBlock}
            deleteInputBlock={this.deleteInputBlock}
            reorderInputBlocks={this.reorderInputBlocks}
            deleteBlock={this.deleteBlock}
            addBranch={this.addBranch}
            removeBranch={this.removeBranch}
            setConfigurationPopover={this.setConfigurationPopover}
            setSettingsPopover={this.setSettingsPopover}
            setLabeledTextInputForm={this.setLabeledTextInputForm}
            setLabeledIntegerInputForm={this.setLabeledIntegerInputForm}
            setLabeledFloatInputForm={this.setLabeledFloatInputForm}
            setParameterInputForm={this.setParameterInputForm}
            setConditionInputForm={this.setConditionInputForm}
            setPhrasesInputForm={this.setPhrasesInputForm}
            deleteSettingsPopoverForm={this.deleteSettingsPopoverForm}
            deleteSettingsPopover={this.deleteSettingsPopover}
            deleteConfigurationPopover={this.deleteConfigurationPopover}
          />
        );
      default:
        return null;
    }
  }

  componentDidMount() {
    // An introductory message! Because we CAN!
    const message =
      this.props.language === "EL"
        ? "Καλωσήρθατε! Μπορείτε να ξεκινήσετε προσθέτοντας ένα μπλοκ στην παλέτα σχεδίασης."
        : "Welcome! You can beging by adding a block to the palette.";
    this.props.enqueueSnackbar(message, {
      variant: "info",
      autoHideDuration: 3000000,
    });
  }

  render() {
    return <div className="Main">{this.renderBlock()}</div>;
  }
}

export default withSnackbar(Main);
