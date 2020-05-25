import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { green } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const CheckBoxField = ({ options, handleChange }) => {
  const classes = useStyles();
  const { lazy, humble, clever, great } = options;
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Kinyitott gyűjtögetés szintek</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <GreenCheckbox checked={lazy.checked} onChange={handleChange} name={lazy.name} />
            }
            label={lazy.label}
          />
          <FormControlLabel
            control={
              <GreenCheckbox
                disabled={!lazy.checked ? true : false}
                checked={humble.checked}
                onChange={handleChange}
                name={humble.name}
              />
            }
            label={humble.label}
          />
          <FormControlLabel
            control={
              <GreenCheckbox
                disabled={!humble.checked ? true : false}
                checked={clever.checked}
                onChange={handleChange}
                name={clever.name}
              />
            }
            label={clever.label}
          />
          <FormControlLabel
            control={
              <GreenCheckbox
                disabled={!clever.checked ? true : false}
                checked={great.checked}
                onChange={handleChange}
                name={great.name}
              />
            }
            label={great.label}
          />
        </FormGroup>
        <FormHelperText>Válassz legalább egyet</FormHelperText>
      </FormControl>
    </div>
  );
};

export default CheckBoxField;
