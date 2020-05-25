import React from "react";
import { fade, withStyles, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "60px",
    height: "10px",
    paddingLeft: "10px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(0),
  },
}));

function Inputfield(props) {
  const classes = useStyles();
  return (
    <FormControlLabel
      className={classes.margin}
      control={
        <BootstrapInput
          value={props.value}
          id={props.name}
          type={props.type}
          onChange={props.handleChange}
          autoComplete="off"
          InputProps={{ min: 0 }}
          style={{ paddingLeft: "5px" }}
        />
      }
      label={props.label}
      labelPlacement="start"
    />
  );
}

export default Inputfield;
