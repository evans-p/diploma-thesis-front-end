import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
// import fileDownload from "js-file-download";
import { withSnackbar } from "notistack";

import Overlay from "./Components/Overlay/Overlay";
import Navbar from "./Components/Navbar/Navbar";
import Minibar from "./Components/Minibar/Minibar";
import Main from "./Components/Main/Main";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen";
import DownloadButton from "./Components/DownloadButton/DownloadButton";

// import Footer from "./Components/Footer/Footer";

class App extends React.Component {
  constructor(props) {
    super(props);

    // A reference to the main component.
    this.mainRef = React.createRef();
    // A reference to the main component.
    this.minibarRef = React.createRef();
    // The url of the backend.
    this.backendURL = " http://localhost:8080";

    this.state = {
      // The App's language. Can be either EN(English) or EL(Greek).
      language: "EL",
      // A variable that tracks whether the minibar is open or not.
      minibarOpen: false,
      // A variable that tracks whether the settings Panel is open or not.
      settingsPanelOpen: false,
      // A variable that tracks which category's content is being displayed inside the minibar.
      activeCategory: "",
      // A variable that tracks whether a block is being dagged or not.
      // 0 for no draggging 1 for dragging an main block and 2 for dragging
      // a toolbar block.
      isDragModeOn: 0,

      validated: false,
      posting: false,
      deployed: false,
      fileName: "",
    };
    // BINDING
    this.toggleMinibar = this.toggleMinibar.bind(this);
    this.toggleSettingsPanel = this.toggleSettingsPanel.bind(this);
    this.setActiveCategory = this.setActiveCategory.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
    this.handleDragMode = this.handleDragMode.bind(this);
    this.handleBlockDrop = this.handleBlockDrop.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.setValidated = this.setValidated.bind(this);
    this.deploy = this.deploy.bind(this);
    this.validate = this.validate.bind(this);
    this.downloadZipFile = this.downloadZipFile.bind(this);
  }

  /** ON/OFF handler for Drag Mode.
   * Cases:
   *  isDragModeOn === 0: Dragging is turned OFF
   *  isDragModeOn === 1: Dragging is ON and a BlockArea block is being dragged
   *  isDragModeOn === 2: Dragging is ON and a Toolbar block is being dragged
   */
  handleDragMode(newDragMode) {
    this.setState({ isDragModeOn: newDragMode });
  }

  setValidated(val) {
    this.setState({ validated: val, deployed: false, fileName: "" });
  }

  /** Hadle the event of a new Block being dropped on the Block Area */
  handleBlockDrop(type, position) {
    const minibar = ReactDOM.findDOMNode(
      this.minibarRef.current
    ).getBoundingClientRect();
    this.mainRef.current.newBlockHandler(type, position, minibar);

    this.setState({ validated: false, deployed: false, fileName: "" });
  }

  /**A setter for the "activeCategory" state variable. */
  setActiveCategory(category) {
    this.setState({ activeCategory: category });
  }

  /**A setter for the app's language setting. */
  setLanguage(language) {
    this.setState({ language: language });
  }

  /** Toogles the visibility of the minibar, by changing the "minibarOpen" state variable*/
  toggleMinibar(visible) {
    this.setState({ minibarOpen: visible });
  }

  /** Toogles the visibility of the settings Panel, by changing the
   * "settingsPanelOpen" state variable.*/
  toggleSettingsPanel(visible) {
    this.setState({ settingsPanelOpen: visible });
  }

  clearAll() {
    this.mainRef.current.deleteBlock();
    this.setState({ validated: false, deployed: false, fileName: "" });
  }

  postReferenceBlock(refBlock) {
    const url = this.backendURL + "/reference-block";
    let message = "";

    axios
      .post(url, refBlock)
      .then((response) => {
        // console.log("Status: ", response.status);

        const block = this.reformatReferenceBlock(response.data);

        if (this.getBlockErrors(block)) {
          message =
            this.state.language === "EL"
              ? "Εμφανίστηκαν λάθη στο υπο σχεδίαση μπλοκ. Παρακαλούμε διορθώστε τα λάθη αυτά πρωτού προχωρήσετε."
              : "Errors were found on the designed block. Please correct those errors, berore continuing.";
          this.props.enqueueSnackbar(message, { variant: "error" });
        } else {
          this.setState({ validated: true });
          message =
            this.state.language === "EL"
              ? "Το μπλοκ επικυρώθηκε επιτυχώς. Για να συνεχίσετε, πατήστε το κουμπί 'Εκτέλεση'."
              : "Block was validated succesfully. To continue, please press the 'Deploy' button.";
          this.props.enqueueSnackbar(message, { variant: "success" });
        }

        this.mainRef.current.setBlock(block);
        // console.log("Data: ", block);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  postActionBlock(aBlock) {
    const url = this.backendURL + "/action-block";
    let message = "";

    axios
      .post(url, aBlock)
      .then((response) => {
        // console.log("Status: ", response.status);

        const block = this.reformatActionBlock(response.data);
        if (this.getBlockErrors(block)) {
          message =
            this.state.language === "EL"
              ? "Εμφανίστηκαν λάθη στο υπο σχεδίαση μπλοκ. Παρακαλούμε διορθώστε τα λάθη αυτά πρωτού προχωρήσετε."
              : "Errors were found on the designed block. Please correct those errors, berore continuing.";
          this.props.enqueueSnackbar(message, { variant: "error" });
        } else {
          this.setState({ validated: true });
          message =
            this.state.language === "EL"
              ? "Το μπλοκ επικυρώθηκε επιτυχώς. Για να συνεχίσετε, πατήστε το κουμπί 'Εκτέλεση'."
              : "Block was validated succesfully. To continue, please press the 'Deploy' button.";
          this.props.enqueueSnackbar(message, { variant: "success" });
        }

        this.mainRef.current.setBlock(block);
        // console.log("Data: ", block);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  postDecisionBlock(dBlock) {
    const url = this.backendURL + "/decision-block";
    let message = "";
    // console.log(JSON.stringify(dBlock));
    axios
      .post(url, dBlock)
      .then((response) => {
        // console.log("Status: ", response.status);
        // console.log(JSON.stringify(response.data));
        const block = this.reformatDecisionBlock(response.data);

        if (this.getBlockErrors(block)) {
          message =
            this.state.language === "EL"
              ? "Εμφανίστηκαν λάθη στο υπο σχεδίαση μπλοκ. Παρακαλούμε διορθώστε τα λάθη αυτά πρωτού προχωρήσετε."
              : "Errors were found on the designed block. Please correct those errors, berore continuing.";
          this.props.enqueueSnackbar(message, { variant: "error" });
        } else {
          this.setState({ validated: true });
          message =
            this.state.language === "EL"
              ? "Το μπλοκ επικυρώθηκε επιτυχώς. Για να συνεχίσετε, πατήστε το κουμπί 'Εκτέλεση'."
              : "Block was validated succesfully. To continue, please press the 'Deploy' button.";
          this.props.enqueueSnackbar(message, { variant: "success" });
        }

        this.mainRef.current.setBlock(block);
        // console.log("Data: ", block);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  reformatReferenceBlock(block) {
    // Reformat the block's errors.
    block.errors = this.reformatErrors(block.errors);

    block.blockImage = this.mainRef.current.state.hasBlock.blockImage;

    if (
      !(
        block.hasInfo === null ||
        block.hasInfo === undefined ||
        (Object.keys(block.hasInfo).length === 0 &&
          block.hasInfo.constructor === Object)
      )
    ) {
      block.hasInfo.errors = this.reformatErrors(block.hasInfo.errors);
    }
    return block;
  }

  reformatDecisionBlock(block) {
    // Reformat the block's errors.
    block.errors = this.reformatErrors(block.errors);

    block.blockImage = this.mainRef.current.state.hasBlock.blockImage;

    if (block.hasConfigurationPopover) {
      for (let i = 0; i < block.hasConfigurationPopover.hasInput.length; i++) {
        if (block.hasConfigurationPopover.hasInput[i].image) {
          block.hasConfigurationPopover.hasInput[i].image =
            this.mainRef.current.state.hasBlock.hasConfigurationPopover.hasInput[
              i
            ].image;
        }
      }
    }

    if (
      !(
        block.hasSettingsPopover === null ||
        block.hasSettingsPopover === undefined ||
        (Object.keys(block.hasSettingsPopover).length === 0 &&
          block.hasSettingsPopover.constructor === Object)
      )
    ) {
      block.hasSettingsPopover.errors = this.reformatErrors(
        block.hasSettingsPopover.errors
      );
      if (
        !(
          block.hasSettingsPopover.hasForm === null ||
          block.hasSettingsPopover.hasForm === undefined ||
          (Object.keys(block.hasSettingsPopover.hasForm).length === 0 &&
            block.hasSettingsPopover.hasForm.constructor === Object)
        )
      ) {
        this.reformatForm(block.hasSettingsPopover.hasForm);
      }
    }

    if (
      !(
        block.hasConfigurationPopover === null ||
        block.hasConfigurationPopover === undefined ||
        (Object.keys(block.hasConfigurationPopover).length === 0 &&
          block.hasConfigurationPopover.constructor === Object)
      )
    ) {
      block.hasConfigurationPopover.errors = this.reformatErrors(
        block.hasConfigurationPopover.errors
      );

      if (
        !(
          block.hasConfigurationPopover.hasInput === null ||
          block.hasConfigurationPopover.hasInput === undefined ||
          block.hasConfigurationPopover.hasInput.length <= 0
        )
      ) {
        for (
          let i = 0;
          i < block.hasConfigurationPopover.hasInput.length;
          i++
        ) {
          this.reformatInputBlock(block.hasConfigurationPopover.hasInput[i]);
        }
      }
    }
    return block;
  }

  reformatActionBlock(block) {
    // Reformat the block's errors.
    block.errors = this.reformatErrors(block.errors);

    block.blockImage = this.mainRef.current.state.hasBlock.blockImage;

    if (block.popoverIcon) {
      block.popoverIcon = this.mainRef.current.state.hasBlock.popoverIcon;
    }

    for (let i = 0; i < block.hasInput.length; i++) {
      if (block.hasInput[i].image) {
        block.hasInput[i].image =
          this.mainRef.current.state.hasBlock.hasInput[i].image;
      }
    }

    if (block.hasPopover === false) {
      delete block.hasSettingsPopover;
      delete block.popoverHelpTextEL;
      delete block.popoverHelpTextEN;
      delete block.popoverIcon;
    } else {
      block.hasSettingsPopover.errors = this.reformatErrors(
        block.hasSettingsPopover.errors
      );
      if (
        !(
          block.hasSettingsPopover.hasForm === null ||
          block.hasSettingsPopover.hasForm === undefined ||
          (Object.keys(block.hasSettingsPopover.hasForm).length === 0 &&
            block.hasSettingsPopover.hasForm.constructor === Object)
        )
      ) {
        this.reformatForm(block.hasSettingsPopover.hasForm);
      }
    }

    if (
      !(
        block.hasInfo === null ||
        block.hasInfo === undefined ||
        (Object.keys(block.hasInfo).length === 0 &&
          block.hasInfo.constructor === Object)
      )
    ) {
      block.hasInfo.errors = this.reformatErrors(block.hasInfo.errors);
    }

    if (
      !(
        block.hasInput === null ||
        block.hasInput === undefined ||
        block.hasInput.length <= 0
      )
    ) {
      for (let i = 0; i < block.hasInput.length; i++) {
        this.reformatInputBlock(block.hasInput[i]);
      }
    }
    return block;
  }

  reformatForm(form) {
    form.errors = this.reformatErrors(form.errors);

    if (form.type === "phrases-input") {
      delete form.conditionHasOptions;

      delete form.hasOptions;

      delete form.defaultValue;
      delete form.minValue;
      delete form.maxValue;

      delete form.noMaxValue;
      delete form.noMinValue;
      delete form.noDefaultValue;

      delete form.defaultValueEL;
      delete form.defaultValueEN;

      delete form.variableLabelEL;
      delete form.variableLabelEN;

      // delete form.placeholderEL;
      // delete form.placeholderEN;
    } else if (form.type === "labeled-text-input") {
      delete form.conditionHasOptions;

      delete form.hasOptions;

      delete form.defaultValue;
      delete form.minValue;
      delete form.maxValue;

      delete form.noMaxValue;
      delete form.noMinValue;
      delete form.noDefaultValue;

      // delete form.defaultValueEL;
      // delete form.defaultValueEN;

      // delete form.variableLabelEL;
      // delete form.variableLabelEN;

      delete form.placeholderEL;
      delete form.placeholderEN;
    } else if (
      form.type === "labeled-integer-input" ||
      form.type === "labeled-float-input"
    ) {
      delete form.conditionHasOptions;

      delete form.hasOptions;

      // delete form.defaultValue;
      // delete form.minValue;
      // delete form.maxValue;

      if (form.noDefaultValue) {
        form.defaultValue = null;
      }
      if (form.noMinValue) {
        form.minValue = null;
      }
      if (form.noMaxValue) {
        form.maxValue = null;
      }

      delete form.noMaxValue;
      delete form.noMinValue;
      delete form.noDefaultValue;

      delete form.defaultValueEL;
      delete form.defaultValueEN;

      // delete form.variableLabelEL;
      // delete form.variableLabelEN;

      delete form.placeholderEL;
      delete form.placeholderEN;
    } else if (form.type === "parameter-input") {
      delete form.conditionHasOptions;

      // delete form.hasOptions;

      delete form.defaultValue;
      delete form.minValue;
      delete form.maxValue;

      delete form.noMaxValue;
      delete form.noMinValue;
      delete form.noDefaultValue;

      // delete form.defaultValueEL;
      // delete form.defaultValueEN;

      delete form.variableLabelEL;
      delete form.variableLabelEN;

      delete form.placeholderEL;
      delete form.placeholderEN;
    } else if (form.type === "condition-input") {
      // delete form.conditionHasOptions;

      // delete form.hasOptions;

      delete form.defaultValue;
      delete form.minValue;
      delete form.maxValue;

      delete form.noMaxValue;
      delete form.noMinValue;
      delete form.noDefaultValue;

      delete form.defaultValueEL;
      delete form.defaultValueEN;

      delete form.variableLabelEL;
      delete form.variableLabelEN;

      delete form.placeholderEL;
      delete form.placeholderEN;

      for (let i = 0; i < form.conditionHasOptions.length; i++) {
        form.conditionHasOptions[i].errors = this.reformatErrors(
          form.conditionHasOptions[i].errors
        );
      }

      form.hasOptions = form.conditionHasOptions;
      delete form.conditionHasOptions;
    }
  }

  reformatInputBlock(block) {
    block.errors = this.reformatErrors(block.errors);
    if (block.type === "select-input-block") {
      delete block.defaultValueEL;
      delete block.defaultValueEN;

      delete block.defaultValue;
      delete block.minValue;
      delete block.maxValue;

      delete block.noDefaultValue;
      delete block.noMinValue;
      delete block.noMaxValue;

      // delete block.hasOptions;
    } else if (block.type === "text-input-block") {
      // delete block.defaultValueEL;
      // delete block.defaultValueEN;

      delete block.defaultValue;
      delete block.minValue;
      delete block.maxValue;

      delete block.noDefaultValue;
      delete block.noMinValue;
      delete block.noMaxValue;

      delete block.hasOptions;
    } else if (
      block.type === "integer-input-block" ||
      block.type === "float-input-block"
    ) {
      delete block.defaultValueEL;
      delete block.defaultValueEN;

      // delete block.defaultValue;
      // delete block.minValue;
      // delete block.maxValue;

      if (block.noDefaultValue) {
        block.defaultValue = null;
      }
      if (block.noMinValue) {
        block.minValue = null;
      }
      if (block.noMaxValue) {
        block.maxValue = null;
      }

      delete block.noDefaultValue;
      delete block.noMinValue;
      delete block.noMaxValue;

      delete block.hasOptions;
    }
  }

  reformatErrors(errorArray) {
    let errors = {};

    for (let e of errorArray) {
      errors[e.name] = {
        EL: e.el,
        EN: e.en,
      };
    }
    return errors;
  }

  getBlockErrors(block) {
    if (
      !(
        block.errors === null ||
        block.errors === undefined ||
        (Object.keys(block.errors).length === 0 &&
          block.errors.constructor === Object)
      )
    ) {
      return true;
    }

    if (block.hasInfo) {
      if (
        !(
          block.hasInfo.errors === null ||
          block.hasInfo.errors === undefined ||
          (Object.keys(block.hasInfo.errors).length === 0 &&
            block.hasInfo.errors.constructor === Object)
        )
      ) {
        return true;
      }
    }

    if (block.hasInput) {
      for (let i = 0; i < block.hasInput.length; i++) {
        if (
          !(
            block.hasInput[i].errors === null ||
            block.hasInput[i].errors === undefined ||
            (Object.keys(block.hasInput[i].errors).length === 0 &&
              block.hasInput[i].errors.constructor === Object)
          )
        ) {
          return true;
        }
      }
    }

    if (block.hasConfigurationPopover) {
      if (
        !(
          block.hasConfigurationPopover.errors === null ||
          block.hasConfigurationPopover.errors === undefined ||
          (Object.keys(block.hasConfigurationPopover.errors).length === 0 &&
            block.hasConfigurationPopover.errors.constructor === Object)
        )
      ) {
        return true;
      }

      if (block.hasConfigurationPopover.hasInput) {
        for (
          let i = 0;
          i < block.hasConfigurationPopover.hasInput.length;
          i++
        ) {
          if (
            !(
              block.hasConfigurationPopover.hasInput[i].errors === null ||
              block.hasConfigurationPopover.hasInput[i].errors === undefined ||
              (Object.keys(block.hasConfigurationPopover.hasInput[i].errors)
                .length === 0 &&
                block.hasConfigurationPopover.hasInput[i].errors.constructor ===
                  Object)
            )
          ) {
            return true;
          }
        }
      }
    }

    if (block.hasSettingsPopover) {
      if (
        !(
          block.hasSettingsPopover.errors === null ||
          block.hasSettingsPopover.errors === undefined ||
          (Object.keys(block.hasSettingsPopover.errors).length === 0 &&
            block.hasSettingsPopover.errors.constructor === Object)
        )
      ) {
        return true;
      }
      if (block.hasSettingsPopover.hasForm) {
        if (
          !(
            block.hasSettingsPopover.hasForm.errors === null ||
            block.hasSettingsPopover.hasForm.errors === undefined ||
            (Object.keys(block.hasSettingsPopover.hasForm.errors).length ===
              0 &&
              block.hasSettingsPopover.hasForm.errors.constructor === Object)
          )
        ) {
          return true;
        }
        if (block.hasSettingsPopover.hasForm.type === "condition-input") {
          if (block.hasSettingsPopover.hasForm.hasOptions.length > 0) {
            for (
              let t = 0;
              t < block.hasSettingsPopover.hasForm.hasOptions.length;
              t++
            ) {
              if (
                !(
                  block.hasSettingsPopover.hasForm.hasOptions[t].errors ===
                    null ||
                  block.hasSettingsPopover.hasForm.hasOptions[t].errors ===
                    undefined ||
                  (Object.keys(
                    block.hasSettingsPopover.hasForm.hasOptions[t].errors
                  ).length === 0 &&
                    block.hasSettingsPopover.hasForm.hasOptions[t].errors
                      .constructor === Object)
                )
              ) {
                return true;
              }
            }
          }
        }
      }
    }

    return false;
  }

  validationAction(block) {
    if (block.blockType === "reference-block") {
      // The block on the design pallette is a reference block. Format the block data, so they
      // can be send to the back-end.
      this.formatReferenceBlock(block);
      this.postReferenceBlock(block);
    } else if (block.blockType === "action-block") {
      // The block on the design pallette is an action block. Format the block data, so they
      // can be send to the back-end.
      this.formatActionBlock(block);
      this.postActionBlock(block);
    } else if (block.blockType === "decision-block") {
      // The block on the design pallette is a Decision block. Format the block data, so they
      // can be send to the back-end.
      this.formatDecisionBlock(block);
      this.postDecisionBlock(block);
    }

    this.setState({ posting: false });
  }

  validate() {
    // let block = Object.assign({}, this.mainRef.current.state.hasBlock);
    let block = JSON.parse(JSON.stringify(this.mainRef.current.state.hasBlock));
    let message = "";

    // Check if there is a block on the design pallette. If not, display an error message,
    // and return.
    if (block.blockType === "none") {
      message =
        this.state.language === "EL"
          ? "Δεν υπάρχει μπλοκ στην παλέτα σχεδίασης. Παρακαλούμε, σχεδιάστε ένα μπλοκ πρωτού προχωρήσετε."
          : "No block was found on the design palette. Begin by designing a new block before continuing";
      this.props.enqueueSnackbar(message, { variant: "error" });

      return;
    }

    // Check if the block has any errors on it. If so, display an error message,
    // and return.
    if (this.getBlockErrors(block)) {
      message =
        this.state.language === "EL"
          ? "Εμφανίστηκαν λάθη στο υπο σχεδίαση μπλοκ. Παρακαλούμε διορθώστε τα λάθη αυτά πρωτού προχωρήσετε."
          : "Errors were found on the designed block. Please correct those errors, berore continuing.";
      this.props.enqueueSnackbar(message, { variant: "error" });

      return;
    }

    if (block.blockImage !== null) {
      block.blockImage = this.mainRef.current.state.hasBlock.blockImage.name;
    }

    if (block.blockType === "action-block") {
      if (block.popoverIcon) {
        block.popoverIcon =
          this.mainRef.current.state.hasBlock.popoverIcon.name;
      }

      for (let i = 0; i < block.hasInput.length; i++) {
        if (block.hasInput[i].image) {
          block.hasInput[i].image =
            this.mainRef.current.state.hasBlock.hasInput[i].image.name;
        }
      }
    }

    if (block.blockType === "decision-block") {
      if (block.hasConfigurationPopover) {
        for (
          let i = 0;
          i < block.hasConfigurationPopover.hasInput.length;
          i++
        ) {
          if (block.hasConfigurationPopover.hasInput[i].image) {
            block.hasConfigurationPopover.hasInput[i].image =
              this.mainRef.current.state.hasBlock.hasConfigurationPopover.hasInput[
                i
              ].image.name;
          }
        }
      }
    }

    this.setState({ posting: true }, () => {
      this.validationAction(block);
    });
  }

  formatDecisionBlock(block) {
    for (const element in block) {
      if (block[element] === "" || block[element] === undefined) {
        block[element] = null;
      }
    }

    if (block.hasSettingsPopover) {
      this.formatSettingsPopover(block.hasSettingsPopover);
    }

    block.errors = [];

    if (block.hasConfigurationPopover) {
      this.formatConfigurationPopover(block.hasConfigurationPopover);
    }

    // console.log(block);
  }

  formatActionBlock(block) {
    for (const element in block) {
      if (block[element] === "" || block[element] === undefined) {
        block[element] = null;
      }
    }

    block.errors = [];

    // if (block.hasPopover === false) {
    //   console.log("deleting");

    //   delete block.hasSettingsPopover;
    //   delete block.popoverHelpTextEL;
    //   delete block.popoverHelpTextEN;
    //   delete block.popoverIcon;
    // }

    for (var input of block.hasInput) {
      // Format the block's Input Blocks
      this.formatInputBlock(input);
    }

    if (block.hasInfo) {
      // Format the block's Information block
      this.formatInformation(block.hasInfo);
    }

    if (block.hasSettingsPopover) {
      this.formatSettingsPopover(block.hasSettingsPopover);
    }
  }

  formatConfigurationPopover(popover) {
    // Set all the empty fields to null
    for (const i in popover) {
      if (popover[i] === "" || popover[i] === undefined) {
        popover[i] = null;
      }
    }

    popover.errors = [];

    for (var input of popover.hasInput) {
      // Format the popover's Input Blocks
      this.formatInputBlock(input);
    }
  }

  formatSettingsPopover(popover) {
    // Set all the empty fields to null
    for (const i in popover) {
      if (popover[i] === "" || popover[i] === undefined) {
        popover[i] = null;
      }
    }
    popover.errors = [];

    if (popover.hasForm) {
      if (!(popover.hasForm.type === "none")) {
        popover.hasForm.errors = [];

        if (
          popover.hasForm.type === "labeled-float-input" ||
          popover.hasForm.type === "labeled-integer-input"
        ) {
          if (popover.hasForm.minValue === null) {
            popover.hasForm["noMinValue"] = true;
          } else {
            popover.hasForm["noMinValue"] = false;
          }

          if (popover.hasForm.maxValue === null) {
            popover.hasForm["noMaxValue"] = true;
          } else {
            popover.hasForm["noMaxValue"] = false;
          }

          if (popover.hasForm.defaultValue === null) {
            popover.hasForm["noDefaultValue"] = true;
          } else {
            popover.hasForm["noDefaultValue"] = false;
          }
        } else if (popover.hasForm.type === "condition-input") {
          if (popover.hasForm.hasOptions.length > 0) {
            for (let t = 0; t < popover.hasForm.hasOptions.length; t++) {
              popover.hasForm.hasOptions[t].errors = [];
            }
          }
          popover.hasForm["conditionHasOptions"] = popover.hasForm.hasOptions;
          delete popover.hasForm.hasOptions;
        }
      } else {
        popover.hasForm.type = null;
      }
    }
  }

  formatInputBlock(input) {
    // Make the error object to an array. For posting via REST.
    input.errors = [];

    // Set all the empty fields to null
    for (const i in input) {
      if (input[i] === "" || input[i] === undefined) {
        input[i] = null;
      }
    }

    if (
      input.type === "float-input-block" ||
      input.type === "integer-input-block"
    ) {
      if (input.minValue === null) {
        input["noMinValue"] = true;
      } else {
        input["noMinValue"] = false;
      }

      if (input.maxValue === null) {
        input["noMaxValue"] = true;
      } else {
        input["noMaxValue"] = false;
      }

      if (input.defaultValue === null) {
        input["noDefaultValue"] = true;
      } else {
        input["noDefaultValue"] = false;
      }
    }
  }

  formatReferenceBlock(block) {
    // Set all the empty fields to null
    for (const element in block) {
      if (block[element] === "" || block[element] === undefined) {
        block[element] = null;
      }
    }
    // Make the error object to an array. For posting via REST.
    block.errors = [];

    if (block.hasInfo) {
      // Format the block's Information block
      this.formatInformation(block.hasInfo);
    }
  }

  formatInformation(information) {
    for (const info in information) {
      if (information[info] === "" || information[info] === undefined) {
        information[info] = null;
      }
    }

    information.errors = [];
  }

  deploy() {
    if (this.state.validated === false) {
      let message =
        this.state.language === "EL"
          ? "Το υπο σχεδίαση μπλοκ δεν είναι επικυρωμένο. Παρακαλούμε επικυρώστε πρώτα το μπλοκ, πατώντας το κουμπί 'Επικύρωση'."
          : "Designed block is not Validate. Please validate the block first, by pressing the 'Validate' button.";
      this.props.enqueueSnackbar(message, { variant: "error" });
      return;
    }

    this.setState({ posting: true }, () => {
      let block = JSON.parse(
        JSON.stringify(this.mainRef.current.state.hasBlock)
      );

      if (block.blockImage !== null) {
        block.blockImage = this.mainRef.current.state.hasBlock.blockImage.name;
      }

      if (block.blockType === "action-block") {
        if (block.popoverIcon) {
          block.popoverIcon =
            this.mainRef.current.state.hasBlock.popoverIcon.name;
        }

        for (let i = 0; i < block.hasInput.length; i++) {
          if (block.hasInput[i].image) {
            block.hasInput[i].image =
              this.mainRef.current.state.hasBlock.hasInput[i].image.name;
          }
        }
      }

      if (block.blockType === "decision-block") {
        if (block.hasConfigurationPopover) {
          for (
            let i = 0;
            i < block.hasConfigurationPopover.hasInput.length;
            i++
          ) {
            if (block.hasConfigurationPopover.hasInput[i].image) {
              block.hasConfigurationPopover.hasInput[i].image =
                this.mainRef.current.state.hasBlock.hasConfigurationPopover.hasInput[
                  i
                ].image.name;
            }
          }
        }
      }

      if (block.blockType === "action-block") {
        // this.setState({ posting: true }, () => {
        let name = "";

        name =
          block.blockNameEN.toLowerCase().replace(/\s+/g, "") + "BlockImage";

        this.postFile(
          this.mainRef.current.state.hasBlock.blockImage,
          name,
          "ActionBlock"
        );
        for (
          let i = 0;
          i < this.mainRef.current.state.hasBlock.hasInput.length;
          i++
        ) {
          name = this.mainRef.current.state.hasBlock.hasInput[i].variableName
            .toLowerCase()
            .replace(/\s+/g, "");

          this.postFile(
            this.mainRef.current.state.hasBlock.hasInput[i].image,
            name,
            "ActionBlock"
          );
        }
        // });
      }

      if (block.blockType === "reference-block") {
        // this.setState({ posting: true }, () => {
        let name = "";

        name =
          block.blockNameEN.toLowerCase().replace(/\s+/g, "") + "BlockImage";

        this.postFile(
          this.mainRef.current.state.hasBlock.blockImage,
          name,
          "ReferenceBlock"
        );
        // });
      }

      if (block.blockType === "decision-block") {
        // this.setState({ posting: true }, () => {
        let name = "";

        name =
          block.blockNameEN.toLowerCase().replace(/\s+/g, "") + "BlockImage";

        this.postFile(
          this.mainRef.current.state.hasBlock.blockImage,
          name,
          "DecisionBlock"
        );

        if (block.hasConfigurationPopover) {
          for (
            let i = 0;
            i <
            this.mainRef.current.state.hasBlock.hasConfigurationPopover.hasInput
              .length;
            i++
          ) {
            name =
              this.mainRef.current.state.hasBlock.hasConfigurationPopover.hasInput[
                i
              ].variableName
                .toLowerCase()
                .replace(/\s+/g, "");

            this.postFile(
              this.mainRef.current.state.hasBlock.hasConfigurationPopover
                .hasInput[i].image,
              name,
              "DecisionBlock"
            );
          }
        }
        // });
      }

      this.deploymentAction(block);
    });
  }

  postFile(file, name, blockType) {
    const url = this.backendURL + "/image-upload";
    const data = new FormData();

    data.append("file", file);
    data.append("name", name);
    data.append("blockType", blockType);

    // var object = {};
    // data.forEach(function (value, key) {
    //   object[key] = value;
    // });
    // console.log(JSON.stringify(object));

    axios
      .post(url, data)
      .then((res) => {
        // console.log(JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deploymentAction(block) {
    if (block.blockType === "reference-block") {
      // The block on the design pallette is a reference block. Format the block data, so they
      // can be send to the back-end.
      this.formatReferenceBlock(block);
      this.deployReferenceBlock(block);
    } else if (block.blockType === "action-block") {
      // The block on the design pallette is an action block. Format the block data, so they
      // can be send to the back-end.
      this.formatActionBlock(block);
      this.deployActionBlock(block);
    } else if (block.blockType === "decision-block") {
      // The block on the design pallette is a Decision block. Format the block data, so they
      // can be send to the back-end.
      this.formatDecisionBlock(block);
      this.deployDecisionBlock(block);
    }

    let message =
      this.state.language === "EL"
        ? "Ο κώδικας του μπλοκ δημιουργήθηκε επιτυχώς! Τώρα, μπορείτε να πατήσετε το κουμπί 'Λήψη' για να κατεβάσετε τον κώδικα, και να τον χρησιμοποιήσετε για να προσθέσετε το μπλοκ στην πλατφόρμα του TekTrain."
        : "Block code was succesfully created! Now, you can press the 'Download' button, in order to download the code, and use it to add the newly created block to the TekTrain platform.";
    this.props.enqueueSnackbar(message, {
      variant: "success",
      autoHideDuration: 3000000,
    });

    this.setState({ posting: false });
  }

  deployReferenceBlock(refBlock) {
    const url = this.backendURL + "/deploy-reference-block";

    axios
      .post(url, refBlock)
      .then((response) => {
        this.setState({ deployed: true, fileName: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deployActionBlock(aBlock) {
    const url = this.backendURL + "/deploy-action-block";
    // console.log(JSON.stringify(aBlock));
    axios
      .post(url, aBlock)
      .then((response) => {
        this.setState({ deployed: true, fileName: response.data });
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deployDecisionBlock(dBlock) {
    const url = this.backendURL + "/deploy-decision-block";
    console.log(JSON.stringify(dBlock));
    axios
      .post(url, dBlock)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        this.setState({ deployed: true, fileName: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  downloadZipFile() {
    axios({
      method: "get",
      url: this.backendURL + "/download/" + this.state.fileName,
      responseType: "arraybuffer",
    })
      .then((response) => {
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/octet-stream" })
        );
        link.download = this.state.fileName;

        document.body.appendChild(link);

        link.click();
        setTimeout(function () {
          window.URL.revokeObjectURL(link);
        }, 200);
      })
      .catch((error) => {});
  }

  render() {
    return (
      <div className="App">
        {this.state.posting ? (
          <LoadingScreen language={this.state.language} />
        ) : null}
        <Navbar
          minibarOpen={this.state.minibarOpen}
          activeCategory={this.state.activeCategory}
          validated={this.state.validated}
          language={this.state.language}
          clearAll={this.clearAll}
          deploy={this.deploy}
          validate={this.validate}
          toggleSettingsPanel={this.toggleSettingsPanel}
          toggleMinibar={this.toggleMinibar}
          setActiveCategory={this.setActiveCategory}
        />

        <Minibar
          ref={this.minibarRef}
          language={this.state.language}
          open={this.state.minibarOpen}
          category={this.state.activeCategory}
          handleDragMode={this.handleDragMode}
          newBlockHandler={this.handleBlockDrop}
        />
        {this.state.settingsPanelOpen ? (
          <Overlay
            mode={"settings"}
            open={this.state.settingsPanelOpen}
            titleEL={"Ρυθμίσεις"}
            titleEN={"Settings"}
            language={this.state.language}
            toggleSettingsPanel={this.toggleSettingsPanel}
            setLanguage={this.setLanguage}
          />
        ) : null}
        <Main
          language={this.state.language}
          ref={this.mainRef}
          setValidated={this.setValidated}
        />
        {this.state.deployed === true ? (
          <DownloadButton
            language={this.state.language}
            downloadZipFile={this.downloadZipFile}
          />
        ) : null}
        {/* <Footer /> */}
      </div>
    );
  }
}

export default withSnackbar(App);
