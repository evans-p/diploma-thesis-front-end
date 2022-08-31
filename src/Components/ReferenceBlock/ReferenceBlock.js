import React from "react";

import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PhotoIcon from "@material-ui/icons/Photo";

import "./ReferenceBlock.css";

import Information from "../Information/Information";
import Overlay from "../Overlay/Overlay";

import { computeFontColor } from "../../Utils/colorHelpers";

class ReferenceBlock extends React.Component {
  constructor(props) {
    super(props);

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
      // The color of the block's body.
      backroundColor: this.props.backroundColor,
      // Block Image
      blockImage: this.props.blockImage,
      // The shape that contains the block Image
      imageBackroundShape: this.props.imageBackroundShape,
      // The color of the shapeshape that contains the block Image
      imageBackroundShapeColor: this.props.imageBackroundShapeColor,
      // A boolean that dictates whether an other block can be placed after
      // the current one.
      hasNextBlock: this.props.hasNextBlock,
      //   The cursor that appears when the user hovers over the Block image.
      imageCursor: this.props.imageCursor,
      // A boolean variable to keep track of whether the edit panel is
      // open or not
      editPanelOpen: false,
    };

    this.toggleEditPanel = this.toggleEditPanel.bind(this);
  }

  componentDidUpdate(prevProps) {
    /**
     * Check whether the Component's props were updated, and if they did,
     * set the component's state accordingly
     */
    if (
      prevProps.blockTitleEN !== this.props.blockTitleEN ||
      prevProps.blockTitleEL !== this.props.blockTitleEL ||
      prevProps.blockNameEN !== this.props.blockNameEN ||
      prevProps.blockNameEL !== this.props.blockNameEL ||
      prevProps.category !== this.props.category ||
      prevProps.backroundColor !== this.props.backroundColor ||
      prevProps.blockImage !== this.props.blockImage ||
      prevProps.imageBackroundShape !== this.props.imageBackroundShape ||
      prevProps.imageBackroundShapeColor !==
        this.props.imageBackroundShapeColor ||
      prevProps.hasNextBlock !== this.props.hasNextBlock ||
      prevProps.imageCursor !== this.props.imageCursor
    ) {
      this.setState({
        blockTitleEN: this.props.blockTitleEN,
        blockTitleEL: this.props.blockTitleEL,
        blockNameEN: this.props.blockNameEN,
        blockNameEL: this.props.blockNameEL,
        type: this.props.type,
        category: this.props.category,
        backroundColor: this.props.backroundColor,
        blockImage: this.props.blockImage,
        imageBackroundShape: this.props.imageBackroundShape,
        imageBackroundShapeColor: this.props.imageBackroundShapeColor,
        hasNextBlock: this.props.hasNextBlock,
        imageCursor: this.props.imageCursor,
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
        this.state.blockTitleEL === null ||
        this.state.blockTitleEL === undefined ||
        this.state.blockTitleEL === "" ||
        this.state.blockTitleEN === null ||
        this.state.blockTitleEN === undefined ||
        this.state.blockTitleEN === "" ||
        this.state.blockImage === null ||
        this.state.blockImage === undefined ||
        this.state.hasNextBlock === null ||
        this.state.hasNextBlock === undefined
      ) {
        return "";
      } else {
        return 0;
      }
    } else {
      return "";
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
      <div className="ReferenceBlock">
        <Badge
          badgeContent={this.handleBadgeContent()}
          color={this.handleBadgeColor()}
        >
          <div
            className={
              !this.state.hasNextBlock
                ? "block"
                : "block round-border dark-shadow"
            }
            style={{ backgroundColor: this.state.backroundColor }}
          >
            <div className="label">
              <div
                className="title"
                style={{ color: computeFontColor(this.state.backroundColor) }}
              >
                {this.props.language === "EL"
                  ? this.state.blockTitleEL
                  : this.state.blockTitleEN}
              </div>
              {this.props.hasInfo === null ||
              this.props.hasInfo === undefined ? null : (
                <Information
                  language={this.props.language}
                  informationTextEL={this.props.hasInfo.informationTextEL}
                  informationTextEN={this.props.hasInfo.informationTextEN}
                  cursor={this.props.hasInfo.cursor}
                  errors={this.props.hasInfo.errors}
                  setInformation={this.props.setInformation}
                  deleteInformation={this.props.deleteInformation}
                />
              )}
              {this.displayInfoErrors()}
            </div>

            <div
              className={`image-container justify-align-center ${this.state.imageBackroundShape}`}
              style={{
                backgroundColor: this.state.imageBackroundShapeColor,
                cursor: this.state.imageCursor,
              }}
            >
              <div
                className={`${this.state.imageBackroundShape}-before`}
                style={{
                  borderBottomColor: this.state.imageBackroundShapeColor,
                  // cursor: this.state.imageCursor,
                }}
              ></div>
              {this.state.blockImage === null ? (
                <Tooltip
                  arrow
                  title={
                    this.props.language === "EL"
                      ? "Δεν Υπάρχει Eικόνα Μπλόκ..."
                      : "No Block Image..."
                  }
                >
                  <Avatar>
                    <PhotoIcon />
                  </Avatar>
                </Tooltip>
              ) : (
                <Tooltip
                  arrow
                  title={
                    this.props.language === "EL"
                      ? "Eικόνα Μπλόκ"
                      : "Block Image"
                  }
                >
                  <Avatar src={URL.createObjectURL(this.state.blockImage)} />
                  {/* <img
                    src={URL.createObjectURL(this.state.blockImage)}
                    className="block-image"
                    alt="..."
                  /> */}
                </Tooltip>
              )}
              <div
                className={`${this.state.imageBackroundShape}-after`}
                style={{
                  borderTopColor: this.state.imageBackroundShapeColor,
                }}
              ></div>
            </div>
          </div>
        </Badge>
        {!this.state.hasNextBlock ? (
          <div
            className="arrow"
            style={{ borderLeftColor: this.state.backroundColor }}
          ></div>
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
                this.props.language === "EL" ? "Διαγραφή Μπλοκ" : "Delete Block"
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
            language={this.props.language}
            open={this.state.editPanelOpen}
            mode={"reference-block"}
            titleEL={"Επιλογές Μπλοκ Αναφοράς"}
            titleEN={"Reference Block Options"}
            blockTitleEN={this.props.blockTitleEN}
            blockTitleEL={this.props.blockTitleEL}
            blockNameEN={this.props.blockNameEN}
            blockNameEL={this.props.blockNameEL}
            type={this.props.type}
            category={this.props.category}
            backroundColor={this.props.backroundColor}
            blockImage={this.props.blockImage}
            imageBackroundShape={this.props.imageBackroundShape}
            imageBackroundShapeColor={this.props.imageBackroundShapeColor}
            hasNextBlock={this.props.hasNextBlock}
            imageCursor={this.props.imageCursor}
            errors={this.props.errors}
            toggleEditPanel={this.toggleEditPanel}
            setReferenceBlock={this.props.setReferenceBlock}
          />
        ) : null}
      </div>
    );
  }
}

export default ReferenceBlock;
