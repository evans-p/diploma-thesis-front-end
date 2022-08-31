import React from "react";
import Draggable from "react-draggable";
import "./NavbarBlock.css";

class NavbarBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Starting Position of the component on the DOM. Useful for
      // resetting the Component to its initial position on the DOM.
      initialPosition: {
        x: isNaN(parseInt(props.x, 10)) ? 0 : parseInt(props.x, 10),
        y: isNaN(parseInt(props.y, 10)) ? 0 : parseInt(props.y, 10),
      },
      // Component's current position on the DOM. Used in order to
      // track the component's position while dragging it.
      currentPosition: {
        x: isNaN(parseInt(props.x, 10)) ? 0 : parseInt(props.x, 10),
        y: isNaN(parseInt(props.y, 10)) ? 0 : parseInt(props.y, 10),
      },
      // Marks the Component as the one being dragged.
      isBeingDragged: false,
      // Variables to track the position of the component on the DOM.
      offsetX: 0,
      offsetY: 0,
    };
    // BINDING
    this.handeOnStart = this.handeOnStart.bind(this);
    this.handeOnDrag = this.handeOnDrag.bind(this);
    this.handeOnStop = this.handeOnStop.bind(this);
  }

  convertPosition(e) {
    const { offsetX, offsetY } = this.state;
    const newX = e.pageX - offsetX;
    const newY = e.pageY - offsetY;

    return { x: newX, y: newY };
  }

  /**
   * Handle the START of a dragging event. Sets Drag Mode to (2),
   * and marks the current component as the one being dragged.
   */
  handeOnStart(event, ui) {
    // 0 for no drag mode, 1 for drag of an appblock and 2 for drag of a toolbar block
    this.props.handleDragMode(2);
    this.setState({
      offsetX: event.nativeEvent.offsetX,
      offsetY: event.nativeEvent.offsetY,
      isBeingDragged: true,
    });
  }
  /**
   * Handle the Dragging even of the Current component. Uses the "CurrentPosition"
   * variable of the state to track the compontent's position in the DOM,
   * while it is being dragged around.
   */
  handeOnDrag(event, ui) {
    this.setState((curState) => {
      return {
        currentPosition: {
          x: curState.currentPosition.x + ui.deltaX,
          y: curState.currentPosition.y + ui.deltaY,
        },
      };
    });
  }

  /**
   * Handle the END of a dragging event. Deactivates Drag Mode,
   * then handles the event of a new block being droped in Main.
   * After that resets the current component, by resetting
   * its position to the orginal one.*/
  handeOnStop(event, ui) {
    // Deactivate Drag Mode.
    this.props.handleDragMode(0);
    this.props.newBlockHandler(this.props.type, this.convertPosition(event));
    this.setState({
      currentPosition: {
        x: isNaN(parseInt(this.props.x, 10)) ? 0 : parseInt(this.props.x, 10),
        y: isNaN(parseInt(this.props.y, 10)) ? 0 : parseInt(this.props.y, 10),
      },
      isBeingDragged: false,
    });
  }

  render() {
    let dragProps = {
      grid: [2, 2],
      position: this.state.initialPosition,
      onStart: this.handeOnStart,
      onDrag: this.handeOnDrag,
      onStop: this.handeOnStop,
    };
    return (
      <div
        className={
          this.props.minibarOpen ? " NavbarBlock open" : " NavbarBlock"
        }
      >
        <Draggable {...dragProps}>
          <div className="block-icon justify-align-center">
            {this.props.icon}
          </div>
        </Draggable>
        <label
          className={
            this.state.isBeingDragged ? "block-label invisible" : "block-label"
          }
          draggable={false}
        >
          {this.props.language === "EL"
            ? this.props.labelEL
            : this.props.labelEN}
        </label>
      </div>
    );
  }
}

export default NavbarBlock;
