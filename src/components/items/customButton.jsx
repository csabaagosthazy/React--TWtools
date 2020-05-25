import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const BootstrapButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: "12px",
    color: "white",
    padding: "10px",
    border: "1px solid ",
    borderRadius: "5px",
    lineHeight: 1,
    background: "linear-gradient(to bottom, #947a62 0%,#7b5c3d 22%,#6c4824 30%,#6c4824 100%)",
    borderColor: "#000",
    fontFamily: ["Verdana", "Arial"].join(","),
    "&:hover": {
      background: "linear-gradient(to bottom, #947a62 0%,#7b5c3d 22%,#6c4824 30%,#6c4824 100%)",
      borderColor: "#d2c09e",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#d2c09e",
    },
  },
})(Button);

const CustomButton = (props) => {
  return <BootstrapButton onClick={props.onClick}>{props.text}</BootstrapButton>;
};

export default CustomButton;
