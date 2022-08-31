import { v4 as uuid } from "uuid";

const actionBlock = {
  blockType: "action-block",
  blockNameEN: null,
  blockNameEL: null,
  blockTitleEN: "Action",
  blockTitleEL: "Δράση",
  // type: null,
  type: uuid(),
  category: null,
  backroundColor: "#FC9D1D",
  titleBackroundColor: "#975e11",
  blockImage: null,
  hasPopover: false,
  hasInput: [],
  errors: {
    // type: {
    //   EL: "type",
    //   ΕΝ: "type",
    // },
    // category: {
    //   EL: "category",
    //   ΕΝ: "category",
    // },
    // blockTitleEN: {
    //   EL: "blockTitleEN",
    //   ΕΝ: "blockTitleEN",
    // },
    // blockTitleEL: {
    //   EL: "blockTitleEL",
    //   ΕΝ: "blockTitleEL",
    // },
    // backroundColor: {
    //   EL: "backroundColor",
    //   ΕΝ: "backroundColor",
    // },
    // titleBackroundColor: {
    //   EL: "titleBackroundColor",
    //   ΕΝ: "titleBackroundColor",
    // },
    // blockImage: {
    //   EL: "blockImage",
    //   ΕΝ: "blockImage",
    // },
    // hasPopover: {
    //   EL: "hasPopover",
    //   ΕΝ: "hasPopover",
    // },
    // popoverIcon: {
    //   EL: "popoverIcon",
    //   ΕΝ: "popoverIcon",
    // },
    // popoverHelpTextEL: {
    //   EL: "popoverHelpTextEL",
    //   ΕΝ: "popoverHelpTextEL",
    // },
    // popoverHelpTextEN: {
    //   EL: "popoverHelpTextEN",
    //   ΕΝ: "popoverHelpTextEN",
    // },
  },
};

const referenceBlock = {
  blockType: "reference-block",
  blockNameEN: null,
  blockNameEL: null,
  blockTitleEN: "Reference",
  blockTitleEL: "Αναφορά",
  // type: null,
  type: uuid(),
  category: null,
  backroundColor: "#b1ee00",
  blockImage: null,
  imageBackroundShape: "circle",
  imageBackroundShapeColor: "#FFFFFF",
  hasNextBlock: false,
  imageCursor: "help",
  errors: {
    // type: {
    //   EL: "type",
    //   ΕΝ: "type",
    // },
    // category: {
    //   EL: "category",
    //   ΕΝ: "category",
    // },
    // backroundColor: {
    //   EL: "backroundColor",
    //   ΕΝ: "backroundColor",
    // },
    // blockTitleEN: {
    //   EL: "blockTitleEN",
    //   ΕΝ: "blockTitleEN",
    // },
    // blockTitleEL: {
    //   EL: "blockTitleEL",
    //   ΕΝ: "blockTitleEL",
    // },
    // blockImage: {
    //   EL: "blockImage",
    //   ΕΝ: "blockImage",
    // },
    // imageBackroundShape: {
    //   EL: "imageBackroundShape",
    //   ΕΝ: "imageBackroundShape",
    // },
    // imageCursor: {
    //   EL: "imageCursor",
    //   ΕΝ: "imageCursor",
    // },
    // hasNextBlock: {
    //   EL: "hasNextBlock",
    //   ΕΝ: "hasNextBlock",
    // },
    // imageBackroundShapeColor: {
    //   EL: "imageBackroundShapeColor",
    //   ΕΝ: "imageBackroundShapeColor",
    // },
    // hasInfo: {
    //   EL: "hasInfo",
    //   ΕΝ: "hasInfo",
    // },
  },
};

const decisionBlock = {
  blockType: "decision-block",
  blockNameEN: null,
  blockNameEL: null,
  type: uuid(),
  category: null,
  backroundColor: "#3b96f5",
  blockImage: null,
  numberOfBranches: 1,
  numberOfColumns: 1,
  blockImageCursor: "pointer",
  errors: {
    // blockImageCursor: {
    //   EL: "blockImageCursor",
    //   ΕΝ: "blockImageCursor",
    // },
    // type: {
    //   EL: "type",
    //   ΕΝ: "type",
    // },
    // category: {
    //   EL: "category",
    //   ΕΝ: "category",
    // },
    // backroundColor: {
    //   EL: "backroundColor",
    //   ΕΝ: "backroundColor",
    // },
    // blockImage: {
    //   EL: "blockImage",
    //   ΕΝ: "blockImage",
    // },
    // numberOfBranches: {
    //   EL: "numberOfBranches",
    //   ΕΝ: "numberOfBranches",
    // },
    // numberOfColumns: {
    //   EL: "numberOfColumns",
    //   ΕΝ: "numberOfColumns",
    // },
  },
};

const selectInputBlock = {
  id: uuid(),
  type: "select-input-block",
  image: null,
  infoTextEL: null,
  infoTextEN: null,
  iconCursor: "help",
  variableName: null,
  hasOptions: [],
  errors: {
    // image: {
    //   EL: "image image image image image image image image",
    //   ΕΝ: "image",
    // },
    // infoTextEL: {
    //   EL: "infoTextEL",
    //   ΕΝ: "infoTextEL",
    // },
    // infoTextEN: {
    //   EL: "infoTextEN",
    //   ΕΝ: "infoTextEN",
    // },
    // hasOptions: {
    //   EL: "hasOptions",
    //   ΕΝ: "hasOptions",
    // },
    // variableName: {
    //   EL: "variableName",
    //   ΕΝ: "variableName",
    // },
    // iconCursor: {
    //   EL: "iconCursor",
    //   ΕΝ: "iconCursor",
    // },
  },
};

const textInputBlock = {
  id: uuid(),
  type: "text-input-block",
  image: null,
  infoTextEL: null,
  infoTextEN: null,
  iconCursor: "help",
  variableName: null,
  defaultValueEL: null,
  defaultValueEN: null,
  errors: {
    // image: {
    //   EL: "image",
    //   ΕΝ: "image",
    // },
    // infoTextEL: {
    //   EL: "infoTextEL",
    //   ΕΝ: "infoTextEL",
    // },
    // infoTextEN: {
    //   EL: "infoTextEN",
    //   ΕΝ: "infoTextEN",
    // },
    // variableName: {
    //   EL: "variableName",
    //   ΕΝ: "variableName",
    // },
    // iconCursor: {
    //   EL: "iconCursor",
    //   ΕΝ: "iconCursor",
    // },
    // defaultValueEL: {
    //   EL: "defaultValueEL",
    //   ΕΝ: "defaultValueEL",
    // },
    // defaultValueEN: {
    //   EL: "defaultValueEN",
    //   ΕΝ: "defaultValueEN",
    // },
  },
};

const integerInputBlock = {
  id: uuid(),
  type: "integer-input-block",
  image: null,
  infoTextEL: null,
  infoTextEN: null,
  iconCursor: "help",
  variableName: null,
  minValue: null,
  maxValue: null,
  defaultValue: null,
  errors: {
    // image: {
    //   EL: "image",
    //   ΕΝ: "image",
    // },
    // infoTextEL: {
    //   EL: "infoTextEL",
    //   ΕΝ: "infoTextEL",
    // },
    // infoTextEN: {
    //   EL: "infoTextEN",
    //   ΕΝ: "infoTextEN",
    // },
    // variableName: {
    //   EL: "variableName",
    //   ΕΝ: "variableName",
    // },
    // iconCursor: {
    //   EL: "iconCursor",
    //   ΕΝ: "iconCursor",
    // },
    // minValue: {
    //   EL: "minValue",
    //   ΕΝ: "minValue",
    // },
    // maxValue: {
    //   EL: "maxValue",
    //   ΕΝ: "maxValue",
    // },
    // defaultValue: {
    //   EL: "defaultValue",
    //   ΕΝ: "defaultValue",
    // },
  },
};

const floatInputBlock = {
  id: uuid(),
  type: "float-input-block",
  image: null,
  infoTextEL: null,
  infoTextEN: null,
  iconCursor: "help",
  variableName: null,
  minValue: null,
  maxValue: null,
  defaultValue: null,
  errors: {
    // image: {
    //   EL: "image",
    //   ΕΝ: "image",
    // },
    // infoTextEL: {
    //   EL: "infoTextEL",
    //   ΕΝ: "infoTextEL",
    // },
    // infoTextEN: {
    //   EL: "infoTextEN",
    //   ΕΝ: "infoTextEN",
    // },
    // variableName: {
    //   EL: "variableName",
    //   ΕΝ: "variableName",
    // },
    // iconCursor: {
    //   EL: "iconCursor",
    //   ΕΝ: "iconCursor",
    // },
    // minValue: {
    //   EL: "minValue",
    //   ΕΝ: "minValue",
    // },
    // maxValue: {
    //   EL: "maxValue",
    //   ΕΝ: "maxValue",
    // },
    // defaultValue: {
    //   EL: "defaultValue",
    //   ΕΝ: "defaultValue",
    // },
  },
};

const information = {
  informationTextEL: null,
  informationTextEN: null,
  cursor: "help",
  errors: {
    // informationTextEL: {
    //   EL: "informationTextEL",
    //   ΕΝ: "informationTextEL",
    // },
    // informationTextEN: {
    //   EL: "informationTextEN",
    //   ΕΝ: "informationTextEN",
    // },
    // cursor: {
    //   EL: "cursor",
    //   ΕΝ: "cursor",
    // },
  },
};

const configurationPopover = {
  popoverTitleEL: "Παράθυρο Διαμόρφωσης",
  popoverTitleEN: "Configuration Popover",
  hasInput: [],
  errors: {
    // popoverTitleEL: {
    //   EL: "popoverTitleEL",
    //   ΕΝ: "popoverTitleEL",
    // },
    // popoverTitleEN: {
    //   EL: "popoverTitleEN",
    //   ΕΝ: "popoverTitleEN",
    // },
    // hasInput: {
    //   EL: "hasInput",
    //   ΕΝ: "hasInput",
    // },
  },
};

const settingsPopover = {
  popoverTitleEL: "Μπλοκ Ρύθμισης",
  popoverTitleEN: "Settings Popover",
  errors: {
    // popoverTitleEL: {
    //   EL: "popoverTitleEL",
    //   ΕΝ: "popoverTitleEL",
    // },
    // popoverTitleEN: {
    //   EL: "popoverTitleEN",
    //   ΕΝ: "popoverTitleEN",
    // },
  },
};

const phrasesInputForm = {
  type: "phrases-input",
  placeholderEL: "Γειά!",
  placeholderEN: "Hello!",

  errors: {
    // placeholderEL: {
    //   EL: "placeholderEL",
    //   ΕΝ: "placeholderEL",
    // },
    // placeholderEN: {
    //   EL: "placeholderEN",
    //   ΕΝ: "placeholderEN",
    // },
  },
};

const labeledTextInputForm = {
  type: "labeled-text-input",
  variableLabelEL: "Μεταβλητή",
  variableLabelEN: "Variable",
  errors: {
    // variableLabelEL: {
    //   EL: "variableLabelEL",
    //   ΕΝ: "variableLabelEL",
    // },
    // variableLabelEN: {
    //   EL: "variableLabelEN",
    //   ΕΝ: "variableLabelEN",
    // },
    // defaultValueEN: {
    //   EL: "defaultValueEN",
    //   ΕΝ: "defaultValueEN",
    // },
    // defaultValueEL: {
    //   EL: "defaultValueEL",
    //   ΕΝ: "defaultValueEL",
    // },
  },
};

const labeledIntegerInputForm = {
  type: "labeled-integer-input",
  variableLabelEL: "Μεταβλητή",
  variableLabelEN: "Variable",
  errors: {
    // variableLabelEL: {
    //   EL: "variableLabelEL",
    //   ΕΝ: "variableLabelEL",
    // },
    // variableLabelEN: {
    //   EL: "variableLabelEN",
    //   ΕΝ: "variableLabelEN",
    // },
    // minValue: {
    //   EL: "minValue",
    //   ΕΝ: "minValue",
    // },
    // maxValue: {
    //   EL: "maxValue",
    //   ΕΝ: "maxValue",
    // },
    // defaultValue: {
    //   EL: "defaultValue",
    //   ΕΝ: "defaultValue",
    // },
  },
};

const labeledFloatInputForm = {
  type: "labeled-float-input",
  variableLabelEL: "Μεταβλητή",
  variableLabelEN: "Variable",
  errors: {
    // variableLabelEL: {
    //   EL: "variableLabelEL",
    //   ΕΝ: "variableLabelEL",
    // },
    // variableLabelEN: {
    //   EL: "variableLabelEN",
    //   ΕΝ: "variableLabelEN",
    // },
    // minValue: {
    //   EL: "minValue",
    //   ΕΝ: "minValue",
    // },
    // maxValue: {
    //   EL: "maxValue",
    //   ΕΝ: "maxValue",
    // },
    // defaultValue: {
    //   EL: "defaultValue",
    //   ΕΝ: "defaultValue",
    // },
  },
};

const parameterInputForm = {
  type: "parameter-input",
  defaultValueEL: "Κείμενο",
  defaultValueEN: "Text",
  hasOptions: [],
  errors: {
    // defaultValueEL: {
    //   EL: "defaultValueEL",
    //   ΕΝ: "defaultValueEL",
    // },
    // defaultValueEN: {
    //   EL: "defaultValueEN",
    //   ΕΝ: "defaultValueEN",
    // },
    // hasOptions: {
    //   EL: "hasOptions",
    //   ΕΝ: "hasOptions",
    // },
  },
};

const conditionInputForm = {
  type: "condition-input",
  hasOptions: [],
  errors: {
    // hasOptions: {
    //   EL: "hasOptions",
    //   ΕΝ: "hasOptions",
    // },
  },
};

export {
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
};
