import React from "react";

import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import "./DecisionBlock.css";

import Overlay from "../Overlay/Overlay";
import DecisionColumn from "../DecisionColumn/DecisionColumn";

class DecisionBlock extends React.Component {
  constructor(props) {
    super(props);

    this.mainColumnRef = React.createRef();

    this.state = {
      // An identifier the block. For example, in TekTrain, the "movement"
      // Block has type of "move".
      type: this.props.type,
      // The block's name, to be displayed on TekTrain platform (In English)
      blockNameEN: this.props.blockNameEN,
      // The block's name, to be displayed on TekTrain platform (In Greek)
      blockNameEL: this.props.blockNameEL,
      // The category to witch the block belongs to.
      category: this.props.category,
      // The color of the block's body.
      backroundColor: this.props.backroundColor,
      // Block Image
      blockImage: this.props.blockImage,
      // The number of inner branches that the block has.
      numberOfBranches: this.props.numberOfBranches,
      // The number of columns that the block has.
      numberOfColumns: this.props.numberOfColumns,
      // The cursor that appears when the user hovers over the block Image.
      blockImageCursor: this.props.blockImageCursor,
      // A boolean variable to keep track of whether the edit panel is
      // open or not
      editPanelOpen: false,
    };

    this.toggleEditPanel = this.toggleEditPanel.bind(this);
  }

  componentDidUpdate(prevProps) {
    /** Check whether the Component's props were updated, and if they did,
     * set the component's state accordingly*/
    if (
      // prevProps.type !== this.props.type ||
      prevProps.blockNameEN !== this.props.blockNameEN ||
      prevProps.blockNameEL !== this.props.blockNameEL ||
      prevProps.category !== this.props.category ||
      prevProps.backroundColor !== this.props.backroundColor ||
      prevProps.blockImage !== this.props.blockImage ||
      // prevProps.numberOfBranches !== this.props.numberOfBranches ||
      prevProps.numberOfColumns !== this.props.numberOfColumns ||
      prevProps.blockImageCursor !== this.props.blockImageCursor
    ) {
      this.setState({
        type: this.props.type,
        blockNameEN: this.props.blockNameEN,
        blockNameEL: this.props.blockNameEL,
        category: this.props.category,
        backroundColor: this.props.backroundColor,
        blockImage: this.props.blockImage,
        numberOfBranches: this.props.numberOfBranches,
        numberOfColumns: this.props.numberOfColumns,
        blockImageCursor: this.props.blockImageCursor,
      });
    }
  }

  /** Toogles the visibility of the block options Panel, by changing the
   * "editPanelOpen" state variable.*/
  toggleEditPanel(visible) {
    this.setState({ editPanelOpen: visible });
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
        this.state.blockNameEN === null ||
        this.state.blockNameEN === undefined ||
        this.state.blockNameEN === "" ||
        this.state.blockNameEL === null ||
        this.state.blockNameEL === undefined ||
        this.state.blockNameEL === "" ||
        this.state.category === null ||
        this.state.category === undefined ||
        this.state.backroundColor === null ||
        this.state.backroundColor === undefined ||
        this.state.blockImage === null ||
        this.state.blockImage === undefined ||
        // this.state.numberOfBranches === null ||
        // this.state.numberOfBranches === undefined ||
        this.state.numberOfColumns === null ||
        this.state.numberOfColumns === undefined
      ) {
        return "";
      } else {
        return 0;
      }
    } else {
      return "";
    }
  }

  render() {
    return (
      <Badge
        badgeContent={this.handleBadgeContent()}
        color={this.handleBadgeColor()}
        style={{ marginTop: 50 }}
      >
        <div className="DecisionBlock">
          <DecisionColumn
            ref={this.mainColumnRef}
            language={this.props.language}
            numberOfBranches={this.state.numberOfBranches}
            backroundColor={this.state.backroundColor}
            blockImage={this.state.blockImage}
            numberOfColumns={this.state.numberOfColumns}
            errors={this.props.errors}
            hasConfigurationPopover={this.props.hasConfigurationPopover}
            hasSettingsPopover={this.props.hasSettingsPopover}
            setTextInputBlock={this.props.setTextInputBlock}
            setIntegerInputBlock={this.props.setIntegerInputBlock}
            setFloatInputBlock={this.props.setFloatInputBlock}
            setSelectInputBlock={this.props.setSelectInputBlock}
            deleteInputBlock={this.props.deleteInputBlock}
            reorderInputBlocks={this.props.reorderInputBlocks}
            addBranch={this.props.addBranch}
            removeBranch={this.props.removeBranch}
            setConfigurationPopover={this.props.setConfigurationPopover}
            setSettingsPopover={this.props.setSettingsPopover}
            setLabeledTextInputForm={this.props.setLabeledTextInputForm}
            setLabeledIntegerInputForm={this.props.setLabeledIntegerInputForm}
            setLabeledFloatInputForm={this.props.setLabeledFloatInputForm}
            setParameterInputForm={this.props.setParameterInputForm}
            setConditionInputForm={this.props.setConditionInputForm}
            setPhrasesInputForm={this.props.setPhrasesInputForm}
            deleteConfigurationPopover={this.props.deleteConfigurationPopover}
            deleteSettingsPopover={this.props.deleteSettingsPopover}
            deleteSettingsPopoverForm={this.props.deleteSettingsPopoverForm}
          />
          {this.state.numberOfColumns === 2 ? (
            <DecisionColumn
              secondary
              language={this.props.language}
              numberOfBranches={this.state.numberOfBranches}
              backroundColor={this.state.backroundColor}
              blockImage={this.state.blockImage}
            />
          ) : null}
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
              mode={"decision-block"}
              titleEL={"Επιλογές Μπλοκ Απόφασης"}
              titleEN={"Decision Block Options"}
              open={this.state.editPanelOpen}
              language={this.props.language}
              type={this.state.type}
              blockNameEL={this.state.blockNameEL}
              blockNameEN={this.state.blockNameEN}
              category={this.state.category}
              backroundColor={this.state.backroundColor}
              blockImage={this.state.blockImage}
              numberOfBranches={this.state.numberOfBranches}
              numberOfColumns={this.state.numberOfColumns}
              blockImageCursor={this.state.blockImageCursor}
              errors={this.props.errors}
              toggleEditPanel={this.toggleEditPanel}
              setDecisionBlock={this.props.setDecisionBlock}
            />
          ) : null}
        </div>
      </Badge>
    );
  }
}

export default DecisionBlock;
