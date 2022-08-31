import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./ComponentSection.css";
import ComponentCategory from "../ComponentCategory/ComponentCategory";

import blocks from "../../Assets/images/categories/blocks.png";
import blockComponents from "../../Assets/images/categories/block-components.png";
import popovers from "../../Assets/images/categories/popovers.png";
import popoverComponents from "../../Assets/images/categories/popover-components.png";

class ComponentSection extends React.Component {
  /** Returns an array which contains the JSX Elements that represent
   * the the Component Cagerories inside the navbar*/
  renderCategories() {
    return [
      <ComponentCategory
        key={uuidv4()}
        id="blocks"
        nameEN="Blocks"
        nameEL="Μπλοκ"
        icon={
          <img
            src={blocks}
            style={{ width: "80%", height: "auto" }}
            alt="..."
          />
        }
        language={this.props.language}
        minibarOpen={this.props.minibarOpen}
        activeCategory={this.props.activeCategory}
        toggleMinibar={this.props.toggleMinibar}
        setActiveCategory={this.props.setActiveCategory}
      />,
      <ComponentCategory
        key={uuidv4()}
        id="block-components"
        nameEN="Block Components"
        nameEL="Στοιχεία Μπλοκ"
        icon={
          <img
            src={blockComponents}
            style={{ width: "80%", height: "auto" }}
            alt="..."
          />
        }
        language={this.props.language}
        minibarOpen={this.props.minibarOpen}
        activeCategory={this.props.activeCategory}
        toggleMinibar={this.props.toggleMinibar}
        setActiveCategory={this.props.setActiveCategory}
      />,
      <ComponentCategory
        key={uuidv4()}
        id="popovers"
        nameEN="Popovers"
        nameEL="Αναδυόμενα Παράθυρα"
        icon={
          <img
            src={popovers}
            style={{ width: "80%", height: "auto" }}
            alt="..."
          />
        }
        language={this.props.language}
        minibarOpen={this.props.minibarOpen}
        activeCategory={this.props.activeCategory}
        toggleMinibar={this.props.toggleMinibar}
        setActiveCategory={this.props.setActiveCategory}
      />,
      <ComponentCategory
        key={uuidv4()}
        id="popover-components"
        nameEN="Popover Components"
        nameEL="Στοιχεία Παραθύρου"
        icon={
          <img
            src={popoverComponents}
            style={{ width: "80%", height: "auto" }}
            alt="..."
          />
        }
        language={this.props.language}
        minibarOpen={this.props.minibarOpen}
        activeCategory={this.props.activeCategory}
        toggleMinibar={this.props.toggleMinibar}
        setActiveCategory={this.props.setActiveCategory}
      />,
    ];
  }
  render() {
    return (
      <div className="ComponentSection" draggable={false}>
        {this.renderCategories()}
      </div>
    );
  }
}

export default ComponentSection;
