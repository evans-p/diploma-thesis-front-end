import React from "react";

import "./Minibar.css";

import NavbarBlock from "../NavbarBlock/NavbarBlock";

import actionBlock from "../../Assets/images/blocks/ActionBlock.png";
import decisionBlock from "../../Assets/images/blocks/DecisionBlock.png";
import referenceBlock from "../../Assets/images/blocks/ReferenceBlock.png";

import floatInputBlock from "../../Assets/images/block-components/FloatInputBlock.png";
import integerInputBlock from "../../Assets/images/block-components/IntegerInputBlock.png";
import textInputBlock from "../../Assets/images/block-components/TextInputBlock.png";
import selectInputBlock from "../../Assets/images/block-components/SelectInputBlock.png";
import information from "../../Assets/images/block-components/Information.png";

import settingsPopover from "../../Assets/images/popovers/SettingsPopover.png";
import configurationPopover from "../../Assets/images/popovers/ConfigurationPopover.png";

import configurationFloatInputBlock from "../../Assets/images/popover-components/FloatInputBlock.png";
import configurationIntegerInputBlock from "../../Assets/images/popover-components/IntegerInputBlock.png";
import configurationTextInputBlock from "../../Assets/images/popover-components/TextInputBlock.png";
import configurationSelectInputBlock from "../../Assets/images/popover-components/SelectInputBlock.png";

import conditionInputForm from "../../Assets/images/popover-components/ConditionInputForm.png";
import parameterInputForm from "../../Assets/images/popover-components/ParameterInputForm.png";
import phrasesInputForm from "../../Assets/images/popover-components/PhrasesInputForm.png";
import labeledTextInputForm from "../../Assets/images/popover-components/LabeledTextInputForm.png";
import labeledFloatInputForm from "../../Assets/images/popover-components/LabeledFloatInputForm.png";
import labeledIntegerInputForm from "../../Assets/images/popover-components/LabeledIntegerInputForm.png";

class Minibar extends React.Component {
  renderInputBlocks() {
    return [
      <NavbarBlock
        key={"navbar-block-block-components-select-input"}
        type={"select-input-block"}
        category={"block-components"}
        language={this.props.language}
        minibarOpen={this.props.open}
        labelEN={"Select Input"}
        labelEL={"Είσοδος Επιλογής"}
        icon={<img src={selectInputBlock} style={{ width: "60%" }} alt="..." />}
        x={0}
        y={0}
        handleDragMode={this.props.handleDragMode}
        newBlockHandler={this.props.newBlockHandler}
      />,
      <NavbarBlock
        key={"navbar-block-block-components-text-input"}
        type={"text-input-block"}
        category={"block-components"}
        language={this.props.language}
        minibarOpen={this.props.open}
        labelEN={"Text Input"}
        labelEL={"Είσοδος Κειμένου"}
        icon={<img src={textInputBlock} style={{ width: "60%" }} alt="..." />}
        x={0}
        y={0}
        handleDragMode={this.props.handleDragMode}
        newBlockHandler={this.props.newBlockHandler}
      />,
      <NavbarBlock
        key={"navbar-block-block-components-integer-input"}
        type={"integer-input-block"}
        category={"block-components"}
        language={this.props.language}
        minibarOpen={this.props.open}
        labelEN={"Integer Input"}
        labelEL={"Είσοδος Ακεραίου Αρ."}
        icon={
          <img src={integerInputBlock} style={{ width: "60%" }} alt="..." />
        }
        x={0}
        y={0}
        handleDragMode={this.props.handleDragMode}
        newBlockHandler={this.props.newBlockHandler}
      />,
      <NavbarBlock
        key={"navbar-block-block-components-float-input"}
        type={"float-input-block"}
        category={"block-components"}
        language={this.props.language}
        minibarOpen={this.props.open}
        labelEN={"Float Input"}
        labelEL={"Είσοδος Αριθμού Κιν. Υπ."}
        icon={<img src={floatInputBlock} style={{ width: "60%" }} alt="..." />}
        x={0}
        y={0}
        handleDragMode={this.props.handleDragMode}
        newBlockHandler={this.props.newBlockHandler}
      />,
    ];
  }

  renderInformation() {
    return (
      <NavbarBlock
        key={"navbar-block-block-components-information"}
        type={"information"}
        category={"block-components"}
        language={this.props.language}
        minibarOpen={this.props.open}
        labelEN={"Block Information"}
        labelEL={"Πληροφορίες Μπλόκ"}
        icon={<img src={information} style={{ width: "60%" }} alt="..." />}
        x={0}
        y={0}
        handleDragMode={this.props.handleDragMode}
        newBlockHandler={this.props.newBlockHandler}
      />
    );
  }

  renderBlocks() {
    return [
      <NavbarBlock
        key={"navbar-block-blocks-action-block"}
        type={"action-block"}
        category={"blocks"}
        language={this.props.language}
        minibarOpen={this.props.open}
        labelEN={"Action Block"}
        labelEL={"Μπλοκ Δράσης"}
        icon={<img src={actionBlock} style={{ width: "60%" }} alt="..." />}
        x={0}
        y={0}
        handleDragMode={this.props.handleDragMode}
        newBlockHandler={this.props.newBlockHandler}
      />,
      <NavbarBlock
        key={"navbar-block-blocks-reference-block"}
        type={"reference-block"}
        category={"blocks"}
        language={this.props.language}
        minibarOpen={this.props.open}
        labelEN={"Reference Block"}
        labelEL={"Μπλοκ Αναφοράς"}
        icon={<img src={referenceBlock} style={{ width: "60%" }} alt="..." />}
        x={0}
        y={0}
        handleDragMode={this.props.handleDragMode}
        newBlockHandler={this.props.newBlockHandler}
      />,
      <NavbarBlock
        key={"navbar-block-blocks-decision-block"}
        type={"decision-block"}
        category={"blocks"}
        language={this.props.language}
        minibarOpen={this.props.open}
        labelEN={"Decision Block"}
        labelEL={"Μπλοκ Απόφασης"}
        icon={<img src={decisionBlock} style={{ width: "60%" }} alt="..." />}
        x={0}
        y={0}
        handleDragMode={this.props.handleDragMode}
        newBlockHandler={this.props.newBlockHandler}
      />,
    ];
  }

  renderPopovers() {
    return [
      <NavbarBlock
        key={"navbar-block-popovers-configuration-popover"}
        type={"configuration-popover"}
        category={"popovers"}
        language={this.props.language}
        minibarOpen={this.props.open}
        labelEN={"Configuration Popover"}
        labelEL={"Παράθυρο Διαμόρφωσης"}
        icon={
          <img src={configurationPopover} style={{ width: "60%" }} alt="..." />
        }
        x={0}
        y={0}
        handleDragMode={this.props.handleDragMode}
        newBlockHandler={this.props.newBlockHandler}
      />,
      <NavbarBlock
        key={"navbar-block-popovers-settings-popover"}
        type={"settings-popover"}
        category={"popovers"}
        language={this.props.language}
        minibarOpen={this.props.open}
        labelEN={"Settings Popover"}
        labelEL={"Παράθυρο Ρύθμισης"}
        icon={<img src={settingsPopover} style={{ width: "60%" }} alt="..." />}
        x={0}
        y={0}
        handleDragMode={this.props.handleDragMode}
        newBlockHandler={this.props.newBlockHandler}
      />,
    ];
  }

  renderPopoverInputs() {
    return [
      <NavbarBlock
        key={"navbar-block-popover-components-select-input"}
        type={"configuration-select-input-block"}
        category={"popover-components"}
        language={this.props.language}
        minibarOpen={this.props.open}
        labelEN={"Select Input"}
        labelEL={"Είσοδος Επιλογής"}
        icon={
          <img
            src={configurationSelectInputBlock}
            style={{ width: "60%" }}
            alt="..."
          />
        }
        x={0}
        y={0}
        handleDragMode={this.props.handleDragMode}
        newBlockHandler={this.props.newBlockHandler}
      />,
      <NavbarBlock
        key={"navbar-block-popover-components-text-input"}
        type={"configuration-text-input-block"}
        category={"popover-components"}
        language={this.props.language}
        minibarOpen={this.props.open}
        labelEN={"Text Input"}
        labelEL={"Είσοδος Κειμένου"}
        icon={
          <img
            src={configurationTextInputBlock}
            style={{ width: "60%" }}
            alt="..."
          />
        }
        x={0}
        y={0}
        handleDragMode={this.props.handleDragMode}
        newBlockHandler={this.props.newBlockHandler}
      />,
      <NavbarBlock
        key={"navbar-block-popover-components-integer-input"}
        type={"configuration-integer-input-block"}
        category={"popover-components"}
        language={this.props.language}
        minibarOpen={this.props.open}
        labelEN={"Integer Input"}
        labelEL={"Είσοδος Ακεραίου Αρ."}
        icon={
          <img
            src={configurationIntegerInputBlock}
            style={{ width: "60%" }}
            alt="..."
          />
        }
        x={0}
        y={0}
        handleDragMode={this.props.handleDragMode}
        newBlockHandler={this.props.newBlockHandler}
      />,
      <NavbarBlock
        key={"navbar-block-popover-components-float-input"}
        type={"configuration-float-input-block"}
        category={"popover-components"}
        language={this.props.language}
        minibarOpen={this.props.open}
        labelEN={"Float Input"}
        labelEL={"Είσοδος Αριθμού Κιν. Υπ."}
        icon={
          <img
            src={configurationFloatInputBlock}
            style={{ width: "60%" }}
            alt="..."
          />
        }
        x={0}
        y={0}
        handleDragMode={this.props.handleDragMode}
        newBlockHandler={this.props.newBlockHandler}
      />,
    ];
  }

  renderPopoverForms() {
    return [
      <NavbarBlock
        key={"navbar-block-popover-components-phrases-input-form"}
        type={"phrases-input-form"}
        category={"popover-components"}
        language={this.props.language}
        minibarOpen={this.props.open}
        labelEN={"Phrases Form"}
        labelEL={"Φόρμα Φράσεων"}
        icon={<img src={phrasesInputForm} style={{ width: "60%" }} alt="..." />}
        x={0}
        y={0}
        handleDragMode={this.props.handleDragMode}
        newBlockHandler={this.props.newBlockHandler}
      />,
      <NavbarBlock
        key={"navbar-block-popover-components-parameter-input-form"}
        type={"parameter-input-form"}
        category={"popover-components"}
        language={this.props.language}
        minibarOpen={this.props.open}
        labelEN={"Parameter Input Form"}
        labelEL={"Φόρμα Εισόδου Παραμ."}
        icon={
          <img src={parameterInputForm} style={{ width: "60%" }} alt="..." />
        }
        x={0}
        y={0}
        handleDragMode={this.props.handleDragMode}
        newBlockHandler={this.props.newBlockHandler}
      />,

      <NavbarBlock
        key={"navbar-block-popover-components-condition-input-form"}
        type={"condition-input-form"}
        category={"popover-components"}
        language={this.props.language}
        minibarOpen={this.props.open}
        labelEN={"Condition Input Form"}
        labelEL={"Φόρμα Εισόδου Σύγκρισης"}
        icon={
          <img src={conditionInputForm} style={{ width: "60%" }} alt="..." />
        }
        x={0}
        y={0}
        handleDragMode={this.props.handleDragMode}
        newBlockHandler={this.props.newBlockHandler}
      />,

      <NavbarBlock
        key={"navbar-block-popover-components-labeled-text-input-form"}
        type={"labeled-text-input-form"}
        category={"popover-components"}
        language={this.props.language}
        minibarOpen={this.props.open}
        labelEN={"Text Form"}
        labelEL={"Φόρμα Κειμένου"}
        icon={
          <img src={labeledTextInputForm} style={{ width: "60%" }} alt="..." />
        }
        x={0}
        y={0}
        handleDragMode={this.props.handleDragMode}
        newBlockHandler={this.props.newBlockHandler}
      />,

      <NavbarBlock
        key={"navbar-block-popover-components-labeled-integer-input-form"}
        type={"labeled-integer-input-form"}
        category={"popover-components"}
        language={this.props.language}
        minibarOpen={this.props.open}
        labelEN={"Integer Form"}
        labelEL={"Φόρμα Ακεραίου"}
        icon={
          <img
            src={labeledIntegerInputForm}
            style={{ width: "60%" }}
            alt="..."
          />
        }
        x={0}
        y={0}
        handleDragMode={this.props.handleDragMode}
        newBlockHandler={this.props.newBlockHandler}
      />,

      <NavbarBlock
        key={"navbar-block-popover-components-labeled-float-input-form"}
        type={"labeled-float-input-form"}
        category={"popover-components"}
        language={this.props.language}
        minibarOpen={this.props.open}
        labelEN={"Float Form"}
        labelEL={"Φόρμα Αρ. Κιν. Υπ."}
        icon={
          <img src={labeledFloatInputForm} style={{ width: "60%" }} alt="..." />
        }
        x={0}
        y={0}
        handleDragMode={this.props.handleDragMode}
        newBlockHandler={this.props.newBlockHandler}
      />,
    ];
  }

  renderMaxWidthContent() {
    if (this.props.category === "blocks") {
      return this.renderBlocks();
    } else if (this.props.category === "popovers") {
      return this.renderPopovers();
    } else {
      return null;
    }
  }

  handleMinibarClassName() {
    if (this.props.open) {
      if (this.props.category === "popover-components") {
        return "Minibar Minibar-open popover-wrapper";
      }
      return "Minibar Minibar-open";
    } else {
      return "Minibar";
    }
  }

  render() {
    return (
      <div className={this.handleMinibarClassName()}>
        {this.props.category === "blocks" ||
        this.props.category === "popovers" ? (
          <div className="Minibar-content half-width">
            {this.renderMaxWidthContent()}
          </div>
        ) : null}

        {this.props.category === "block-components" ? (
          <div className="Minibar-content block-components-width">
            {this.renderInputBlocks()}
          </div>
        ) : null}

        {this.props.category === "block-components" ? (
          <div className="Minibar-content block-components-width">
            {this.renderInformation()}
          </div>
        ) : null}

        {this.props.category === "popover-components" ? (
          <div className="Minibar-content popover-width">
            {this.renderPopoverForms()}
          </div>
        ) : null}

        {this.props.category === "popover-components" ? (
          <div className="Minibar-content popover-width">
            {this.renderPopoverInputs()}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Minibar;
