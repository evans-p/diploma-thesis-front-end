import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import "./index.css";
import App from "./App";

// add action to all snackbars
const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

ReactDOM.render(
  <SnackbarProvider
    maxSnack={4}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    preventDuplicate
    ref={notistackRef}
    dense
    autoHideDuration={2000}
    style={{ display: "flex", flexWrap: "nowrap" }}
    action={(key) => (
      <IconButton
        onClick={onClickDismiss(key)}
        size="small"
        aria-label="close"
        color="inherit"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    )}
  >
    <App />
  </SnackbarProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
