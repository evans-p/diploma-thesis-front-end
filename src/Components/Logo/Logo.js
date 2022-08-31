import React from "react";
import "./Logo.css";

import logo from "../../Assets/images/logo/BlockApp.png";

class Logo extends React.Component {
  render() {
    return (
      <div className="Logo">
        <img src={logo} alt="Block App" />
        {window.innerWidth >= 400 ? <h1>DeGraCom</h1> : null}
      </div>
    );
  }
}

export default Logo;
