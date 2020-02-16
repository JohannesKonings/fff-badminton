import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
// core components
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js";

const useStyles = makeStyles(styles);

export default function CustomInputSelect(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  const { labelText, id, formControlProps, menuItems, textFieldValue } = props;

  const handleChange = event => {
    setValue(event.target.value);
    textFieldValue(event.target.value)
  };


  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      <TextField
        id={id}
        label={labelText}
        select
        value={value}
        onChange={handleChange}
      >
        {menuItems.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
}

CustomInputSelect.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool
};
