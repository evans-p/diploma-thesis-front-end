import React from "react";
import "./ComponentCategory.css";

class ComponentCategory extends React.Component {
  constructor(props) {
    super(props);

    // BINDING
    this.renderCategoryName = this.renderCategoryName.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  /**Handles the event of clicking on the Category Icon.*/
  handleOnClick() {
    if (this.props.minibarOpen === false) {
      // the minibar is closed. Open the minibar and set Active category to
      // the id of the clicked component.
      this.props.setActiveCategory(this.props.id);
      this.props.toggleMinibar(true);
    } else {
      if (this.props.activeCategory === this.props.id) {
        // the minibar is open, and the active category is the same with the clicked
        // category. Set ActiveCategory to none, and close the minibar.
        this.props.setActiveCategory("");
        this.props.toggleMinibar(false);
      } else {
        // the minibar is open, but the active category is NOT the same with the clicked
        // category. Set ActiveCategory to Clicked Category.
        this.props.setActiveCategory(this.props.id);
      }
    }
  }
  /**Desides in which language the category name should be displayed, based
   * on the "language" prop.*/
  renderCategoryName() {
    return this.props.language === "EL" ? this.props.nameEL : this.props.nameEN;
  }

  /** A handler for the component' classes. */
  handleComponentclasses() {
    if (this.props.activeCategory === "") {
      return {
        component: "justify-align-center ComponentCategory",
        icon: "category-icon justify-align-center dark-shadow",
        name: "category-name",
        arrow: "arrow invisible",
      };
    } else {
      if (this.props.activeCategory === this.props.id) {
        return {
          component: "justify-align-center ComponentCategory",
          icon: "category-icon justify-align-center white-shadow",
          name: "category-name",
          arrow: "arrow",
        };
      } else {
        return {
          component: "justify-align-center ComponentCategory inactive",
          icon: "category-icon justify-align-center",
          name: "category-name",
          arrow: "arrow invisible",
        };
      }
    }
  }

  render() {
    const classes = this.handleComponentclasses();
    return (
      <div className={classes.component} onClick={this.handleOnClick}>
        <div className={classes.icon}>{this.props.icon}</div>
        <p className={classes.name}>{this.renderCategoryName()}</p>
        <div className={classes.arrow}></div>
      </div>
    );
  }
}

export default ComponentCategory;
