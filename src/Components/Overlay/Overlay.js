import React from "react";
import "./Overlay.css";
import SettingsPanelForm from "../SettingsPanelForm/SettingsPanelForm";
import ActionBlockForm from "../ActionBlockForm/ActionBlockForm";
import ReferenceBlockForm from "../ReferenceBlockForm/ReferenceBlockForm";
import DecisionBlockForm from "../DecisionBlockForm/DecisionBlockForm";
import TextInputBlockForm from "../TextInputBlockForm/TextInputBlockForm";
import IntegerInputBlockForm from "../IntegerInputBlockForm/IntegerInputBlockForm";
import FloatInputBlockForm from "../FloatInputBlockForm/FloatInputBlockForm";
import SelectInputBlockForm from "../SelectInputBlockForm/SelectInputBlockForm";

class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  /** Selects which child Components should be rendered, based on the value of
   * the prop "mode"*/
  renderContent() {
    switch (this.props.mode) {
      case "settings":
        return (
          <SettingsPanelForm
            language={this.props.language}
            toggleSettingsPanel={this.props.toggleSettingsPanel}
            setLanguage={this.props.setLanguage}
          />
        );
      case "select-input-block":
        return (
          <SelectInputBlockForm
            componentMode={this.props.componentMode}
            language={this.props.language}
            image={this.props.image}
            infoTextEL={this.props.infoTextEL}
            infoTextEN={this.props.infoTextEN}
            iconCursor={this.props.iconCursor}
            variableName={this.props.variableName}
            hasOptions={this.props.hasOptions}
            closeEditPanel={this.props.closeEditPanel}
            index={this.props.index}
            errors={this.props.errors}
            setSelectInputBlock={this.props.setSelectInputBlock}
            deleteInputBlock={this.props.deleteInputBlock}
          />
        );
      case "integer-input-block":
        return (
          <IntegerInputBlockForm
            componentMode={this.props.componentMode}
            language={this.props.language}
            image={this.props.image}
            infoTextEL={this.props.infoTextEL}
            infoTextEN={this.props.infoTextEN}
            iconCursor={this.props.iconCursor}
            variableName={this.props.variableName}
            minValue={this.props.minValue}
            maxValue={this.props.maxValue}
            defaultValue={this.props.defaultValue}
            closeEditPanel={this.props.closeEditPanel}
            index={this.props.index}
            errors={this.props.errors}
            setIntegerInputBlock={this.props.setIntegerInputBlock}
            deleteInputBlock={this.props.deleteInputBlock}
          />
        );
      case "float-input-block":
        return (
          <FloatInputBlockForm
            componentMode={this.props.componentMode}
            language={this.props.language}
            image={this.props.image}
            infoTextEL={this.props.infoTextEL}
            infoTextEN={this.props.infoTextEN}
            iconCursor={this.props.iconCursor}
            variableName={this.props.variableName}
            minValue={this.props.minValue}
            maxValue={this.props.maxValue}
            defaultValue={this.props.defaultValue}
            closeEditPanel={this.props.closeEditPanel}
            index={this.props.index}
            errors={this.props.errors}
            setFloatInputBlock={this.props.setFloatInputBlock}
            deleteInputBlock={this.props.deleteInputBlock}
          />
        );
      case "text-input-block":
        return (
          <TextInputBlockForm
            componentMode={this.props.componentMode}
            language={this.props.language}
            image={this.props.image}
            infoTextEL={this.props.infoTextEL}
            infoTextEN={this.props.infoTextEN}
            iconCursor={this.props.iconCursor}
            variableName={this.props.variableName}
            defaultValueEL={this.props.defaultValueEL}
            defaultValueEN={this.props.defaultValueEN}
            closeEditPanel={this.props.closeEditPanel}
            index={this.props.index}
            errors={this.props.errors}
            setTextInputBlock={this.props.setTextInputBlock}
            deleteInputBlock={this.props.deleteInputBlock}
          />
        );
      case "action-block":
        return (
          <ActionBlockForm
            language={this.props.language}
            blockNameEN={this.props.blockNameEN}
            blockNameEL={this.props.blockNameEL}
            blockTitleEN={this.props.blockTitleEN}
            blockTitleEL={this.props.blockTitleEL}
            type={this.props.type}
            category={this.props.category}
            backroundColor={this.props.backroundColor}
            titleBackroundColor={this.props.titleBackroundColor}
            blockImage={this.props.blockImage}
            hasPopover={this.props.hasPopover}
            popoverIcon={this.props.popoverIcon}
            popoverHelpTextEL={this.props.popoverHelpTextEL}
            popoverHelpTextEN={this.props.popoverHelpTextEN}
            errors={this.props.errors}
            toggleEditPanel={this.props.toggleEditPanel}
            setActionBlock={this.props.setActionBlock}
          />
        );
      case "reference-block":
        return (
          <ReferenceBlockForm
            language={this.props.language}
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
            toggleEditPanel={this.props.toggleEditPanel}
            setReferenceBlock={this.props.setReferenceBlock}
          />
        );
      case "decision-block":
        return (
          <DecisionBlockForm
            language={this.props.language}
            type={this.props.type}
            blockNameEN={this.props.blockNameEN}
            blockNameEL={this.props.blockNameEL}
            category={this.props.category}
            backroundColor={this.props.backroundColor}
            blockImage={this.props.blockImage}
            numberOfBranches={this.props.numberOfBranches}
            numberOfColumns={this.props.numberOfColumns}
            blockImageCursor={this.props.blockImageCursor}
            errors={this.props.errors}
            toggleEditPanel={this.props.toggleEditPanel}
            setDecisionBlock={this.props.setDecisionBlock}
          />
        );
      default:
        console.log("Unknown Mode... Will do nothing...");
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ visible: true });
    }, 0);
  }

  render() {
    return (
      <div
        className={
          this.state.visible
            ? "Overlay justify-align-center overlay-visible"
            : "Overlay justify-align-center"
        }
      >
        <div className="panel dark-shadow">
          <div className="title">
            {this.props.language === "EL"
              ? this.props.titleEL
              : this.props.titleEN}
          </div>
          <div className="content">{this.renderContent()}</div>
        </div>
      </div>
    );
  }
}

export default Overlay;
